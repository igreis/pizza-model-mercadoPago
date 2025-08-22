import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("[CREATE-PAYMENT] Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    console.log("[CREATE-PAYMENT] Stripe key verified");

    // Parse request body
    const { items, customerInfo } = await req.json();
    console.log("[CREATE-PAYMENT] Request data received", { items: items?.length, customerInfo: customerInfo?.email });

    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new Error("Items array is required");
    }

    if (!customerInfo || !customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      throw new Error("Customer information is required");
    }

    // Initialize Stripe
    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

    // Calculate total
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    console.log("[CREATE-PAYMENT] Total calculated", { total });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      customer_email: customerInfo.email,
      line_items: items.map(item => ({
        price_data: {
          currency: "brl",
          product_data: {
            name: item.name,
            description: item.description,
            images: item.image ? [item.image] : undefined,
          },
          unit_amount: Math.round(item.price * 100), // Convert to cents
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${req.headers.get("origin")}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/`,
      metadata: {
        customer_name: customerInfo.name,
        customer_phone: customerInfo.phone,
      },
    });

    console.log("[CREATE-PAYMENT] Stripe session created", { sessionId: session.id });

    // Save order to Supabase
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const { error: orderError } = await supabaseClient
      .from("orders")
      .insert({
        customer_name: customerInfo.name,
        customer_email: customerInfo.email,
        customer_phone: customerInfo.phone,
        items: items,
        total: total,
        stripe_session_id: session.id,
        status: 'pendente'
      });

    if (orderError) {
      console.error("[CREATE-PAYMENT] Error saving order to database", orderError);
      throw new Error("Failed to save order to database");
    }

    console.log("[CREATE-PAYMENT] Order saved to database");

    return new Response(JSON.stringify({ 
      url: session.url,
      sessionId: session.id 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("[CREATE-PAYMENT] ERROR", errorMessage);
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});