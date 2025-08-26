import { NextRequest, NextResponse } from "next/server";
import { Preference } from "mercadopago";
import mpClient from "@/lib/mercado-pago";

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { items, userEmail, testeId } = await req.json();

    if (!process.env.MERCADO_PAGO_ACCESS_TOKEN) {
      return NextResponse.json(
        { error: "MERCADO_PAGO_ACCESS_TOKEN não configurado no servidor" },
        { status: 500 }
      );
    }

    const preference = new Preference(mpClient);

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Itens do checkout ausentes ou inválidos." },
        { status: 400 }
      );
    }

    const mpItems = items.map((it: any) => ({
      id: it.id ?? it.sku ?? "produto",
      title: it.title ?? it.name ?? "Produto",
      description: it.description ?? undefined,
      quantity: Number(it.quantity ?? 1),
      unit_price: Number(it.unit_price ?? it.price ?? 0),
      currency_id: it.currency_id ?? "BRL",
      category_id: it.category_id ?? "category",
    }));

    const preferenceBody = {
      external_reference: testeId,
      metadata: {
        testeId,
        userEmail: userEmail,
        plan: '123'
      },
      ...(userEmail && {
        payer: {
          email: userEmail,
        },
      }),
      items: mpItems,
      // Testando apenas back_urls (sem auto_return)
      back_urls: {
        success: `${req.nextUrl.origin}/success`,
        failure: `${req.nextUrl.origin}/failure`,
        pending: `${req.nextUrl.origin}/pending`,
      },
    };

    const createdPreference = await preference.create({
      body: preferenceBody,
    });

    if (!createdPreference.id) {
      throw new Error("No preferenceID");
    }

    return NextResponse.json({
      preferenceId: createdPreference.id,
      initPoint: createdPreference.init_point,
    });
  } catch (err) {
    const e: any = err;
    const message = e?.message || "Erro interno";
    return NextResponse.json({ error: String(message) }, { status: 500 });
  }
}