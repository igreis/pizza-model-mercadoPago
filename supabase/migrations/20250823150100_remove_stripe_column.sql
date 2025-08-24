-- Remove Stripe-specific column from orders
ALTER TABLE public.orders
  DROP COLUMN IF EXISTS stripe_session_id;
