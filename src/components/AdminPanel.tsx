import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Clock, ChefHat, Truck, CheckCircle, RefreshCw } from 'lucide-react';

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  items: any;
  total: number;
  status: 'pendente' | 'em_preparo' | 'enviado' | 'entregue';
  created_at: string;
  updated_at: string;
}

const statusConfig = {
  pendente: { icon: Clock, color: 'bg-yellow-500', label: 'Pendente' },
  em_preparo: { icon: ChefHat, color: 'bg-blue-500', label: 'Em Preparo' },
  enviado: { icon: Truck, color: 'bg-purple-500', label: 'Enviado' },
  entregue: { icon: CheckCircle, color: 'bg-green-500', label: 'Entregue' }
};

export const AdminPanel = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setOrders((data as Order[]) || []);
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os pedidos.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: Order['status']) => {
    try {
      setUpdatingStatus(orderId);
      
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) {
        throw error;
      }

      setOrders(prev => prev.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus }
          : order
      ));

      toast({
        title: "Status atualizado",
        description: `Pedido marcado como ${statusConfig[newStatus].label.toLowerCase()}.`,
      });
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o status do pedido.",
        variant: "destructive"
      });
    } finally {
      setUpdatingStatus(null);
    }
  };

  const getNextStatus = (currentStatus: Order['status']): Order['status'] | null => {
    const statusFlow: Record<Order['status'], Order['status'] | null> = {
      pendente: 'em_preparo',
      em_preparo: 'enviado',
      enviado: 'entregue',
      entregue: null
    };
    return statusFlow[currentStatus];
  };

  useEffect(() => {
    fetchOrders();

    // Set up real-time subscription
    const channel = supabase
      .channel('orders-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'orders' },
        () => {
          fetchOrders();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Painel Administrativo</h1>
          <p className="text-muted-foreground">Gerencie os pedidos da pizzaria</p>
        </div>
        <Button onClick={fetchOrders} variant="outline" size="icon">
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-muted-foreground">
              Nenhum pedido encontrado
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => {
            const StatusIcon = statusConfig[order.status].icon;
            const nextStatus = getNextStatus(order.status);
            
            return (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        Pedido #{order.id.slice(-8)}
                      </CardTitle>
                      <CardDescription>
                        {new Date(order.created_at).toLocaleString('pt-BR')}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="flex items-center gap-2">
                      <StatusIcon className="h-4 w-4" />
                      {statusConfig[order.status].label}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-semibold text-sm">Cliente</h4>
                      <p className="text-sm">{order.customer_name}</p>
                      <p className="text-xs text-muted-foreground">{order.customer_email}</p>
                      <p className="text-xs text-muted-foreground">{order.customer_phone}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-sm">Itens do Pedido</h4>
                      {order.items.map((item, index) => (
                        <p key={index} className="text-sm">
                          {item.quantity}x {item.name}
                        </p>
                      ))}
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-sm">Total</h4>
                      <p className="text-lg font-bold">
                        R$ {Number(order.total).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {nextStatus && (
                    <div className="flex justify-end">
                      <Button
                        onClick={() => updateOrderStatus(order.id, nextStatus)}
                        disabled={updatingStatus === order.id}
                        size="sm"
                      >
                        {updatingStatus === order.id ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : null}
                        Marcar como {statusConfig[nextStatus].label}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};