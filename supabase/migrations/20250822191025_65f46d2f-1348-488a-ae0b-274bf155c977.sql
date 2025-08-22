-- Criar tabela de pedidos
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  items JSONB NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente', 'em_preparo', 'enviado', 'entregue')),
  stripe_session_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserção de pedidos (público)
CREATE POLICY "Permitir inserir pedidos" 
ON public.orders 
FOR INSERT 
WITH CHECK (true);

-- Política para visualizar todos os pedidos (para admin)
CREATE POLICY "Visualizar todos os pedidos" 
ON public.orders 
FOR SELECT 
USING (true);

-- Política para atualizar status dos pedidos
CREATE POLICY "Atualizar status dos pedidos" 
ON public.orders 
FOR UPDATE 
USING (true);

-- Função para atualizar timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar timestamp automaticamente
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();