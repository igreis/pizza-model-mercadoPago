import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-green-600">
            Pagamento Aprovado!
          </CardTitle>
          <CardDescription>
            Seu pedido foi confirmado e será preparado em breve
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          {sessionId && (
            <p className="text-sm text-muted-foreground">
              ID da transação: {sessionId.slice(-8)}
            </p>
          )}
          
          <div className="space-y-2">
            <p className="text-sm">
              ✅ Pagamento processado com sucesso
            </p>
            <p className="text-sm">
              📧 Confirmação enviada por email
            </p>
            <p className="text-sm">
              🍕 Sua pizza será preparada em breve
            </p>
          </div>

          <div className="pt-4">
            <Link to="/">
              <Button className="w-full">
                Voltar ao Cardápio
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}