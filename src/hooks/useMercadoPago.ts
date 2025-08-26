import { useEffect } from "react";
import { initMercadoPago } from "@mercadopago/sdk-react";
import { useRouter } from "next/navigation";

const useMercadoPago = () => {
  const router = useRouter();

  useEffect(() => {
    initMercadoPago(process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY!);
  }, []);

  async function createMercadoPagoCheckout(checkoutData: any) {
    try {
      
      const response = await fetch("/api/mercado-pago/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutData),
      });

      if (!response.ok) {
        let serverMessage = "";
        try {
          const maybeJson = await response.json();
          serverMessage = maybeJson?.error || JSON.stringify(maybeJson);
        } catch (jsonError) {
          try {
            serverMessage = await response.text();
          } catch (textError) {
            serverMessage = `Erro ${response.status}`;
          }
        }
        
        throw new Error(serverMessage || `Falha ao criar checkout (status ${response.status})`);
      }

      const data = await response.json();
      
      if (data?.initPoint) {
        router.push(data.initPoint);
      } else {
        throw new Error("Resposta sem initPoint do Mercado Pago");
      }
    } catch (error) {
      throw error;
    }
  }

  return { createMercadoPagoCheckout };
};

export default useMercadoPago;