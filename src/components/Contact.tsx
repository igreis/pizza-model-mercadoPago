import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Clock, MapPin, Phone, Instagram, Facebook, Twitter } from 'lucide-react';

export const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Endereço',
      content: 'Rua das Pizzas, 123 - Centro\nSão Paulo, SP - CEP: 01234-567',
      action: 'Ver no Mapa'
    },
    {
      icon: Phone,
      title: 'Telefone',
      content: '(11) 9999-8888\n(11) 3333-4444',
      action: 'Ligar Agora'
    },
    {
      icon: Clock,
      title: 'Horário',
      content: 'Seg a Dom: 18h às 23h\nDelivery até 23:30',
      action: 'Fazer Pedido'
    }
  ];

  const socialLinks = [
    { icon: Instagram, label: 'Instagram', href: '#' },
    { icon: Facebook, label: 'Facebook', href: '#' },
    { icon: Twitter, label: 'Twitter', href: '#' }
  ];

  return (
    <section id="contact" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary text-primary-foreground">
            Fale Conosco
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Venha nos 
            <span className="font-script text-primary block text-5xl md:text-6xl">
              Visitar
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Estamos sempre prontos para atendê-lo com o melhor da nossa culinária italiana
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {contactInfo.map((info, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-warm transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <info.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {info.title}
              </h3>
              <p className="text-muted-foreground mb-4 whitespace-pre-line leading-relaxed">
                {info.content}
              </p>
              <Button variant="outline" size="sm">
                {info.action}
              </Button>
            </Card>
          ))}
        </div>

        {/* Social Links */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-foreground mb-6">
            Siga-nos nas Redes Sociais
          </h3>
          <div className="flex justify-center space-x-4">
            {socialLinks.map((social, index) => (
              <Button
                key={index}
                variant="outline"
                size="lg"
                className="w-12 h-12 rounded-full p-0 hover:shadow-gold transition-all duration-300"
                asChild
              >
                <a href={social.href} aria-label={social.label}>
                  <social.icon className="w-5 h-5" />
                </a>
              </Button>
            ))}
          </div>
        </div>

        {/* Delivery Notice */}
        <div className="mt-12 text-center p-6 bg-card rounded-xl shadow-warm">
          <h4 className="text-lg font-semibold text-foreground mb-2">
            🚚 Delivery Grátis para pedidos acima de R$ 60,00
          </h4>
          <p className="text-muted-foreground">
            Cobrimos toda a região central da cidade com entrega rápida e segura
          </p>
        </div>
      </div>
    </section>
  );
};