import "server-only";
import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";

/**
 * Função para tratar os pagamentos recebidos pelo Mercado Pago
 * @param paymentData - Objeto de resposta do pagamento vindo do Mercado Pago
 */
export async function handleMercadoPagoPayment(paymentData: PaymentResponse) {
  try {
    if (!paymentData) {
      console.error("❌ Nenhum dado de pagamento recebido.");
      return { success: false, message: "Pagamento inválido" };
    }

    const metadata = paymentData.metadata || {};
    const userEmail = metadata.user_email ?? null;
    const testeId = metadata.teste_id ?? null;

    // Aqui você pode aplicar regras de negócio de acordo com o status
    switch (paymentData.status) {
      case "approved":
        console.log(`✅ Pagamento aprovado para ${userEmail}`);
        // Ex: liberar acesso, salvar no banco, enviar email...
        break;

      case "pending":
        console.log(`⏳ Pagamento pendente de ${userEmail}`);
        // Ex: avisar usuário que está aguardando
        break;

      case "rejected":
        console.log(`❌ Pagamento rejeitado para ${userEmail}`);
        // Ex: enviar email pedindo para tentar de novo
        break;

      default:
        console.warn(`⚠️ Status de pagamento não tratado: ${paymentData.status}`);
    }

    return { success: true, status: paymentData.status };
  } catch (error) {
    console.error("Erro ao processar pagamento:", error);
    return { success: false, message: "Erro interno ao processar pagamento" };
  }
}
