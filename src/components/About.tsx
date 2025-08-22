import { Badge } from '@/components/ui/badge';
import { Award, Clock, Heart, Users } from 'lucide-react';

export const About = () => {
  const features = [
    {
      icon: Heart,
      title: 'Receitas Tradicionais',
      description: 'Herdadas de gerações de pizzaiolos italianos'
    },
    {
      icon: Award,
      title: 'Ingredientes Premium',
      description: 'Selecionados diretamente dos melhores fornecedores'
    },
    {
      icon: Clock,
      title: 'Massa Artesanal',
      description: 'Fermentação natural de 24 horas para máximo sabor'
    },
    {
      icon: Users,
      title: 'Família Pizza Joy',
      description: 'Mais de 10.000 clientes satisfeitos'
    }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <Badge className="mb-4 bg-secondary text-secondary-foreground">
                Nossa História
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                15 Anos de 
                <span className="font-script text-primary block text-5xl md:text-6xl">
                  Tradição
                </span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Desde 2009, a Pizza Joy Feast tem sido sinônimo de qualidade e sabor autêntico. 
                Começamos como uma pequena pizzaria familiar e hoje somos referência na cidade, 
                mantendo sempre o cuidado artesanal em cada pizza.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Nossa paixão é criar experiências únicas através de sabores memoráveis, 
                usando apenas ingredientes frescos e receitas que passam de geração em geração.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            <div className="pizza-card text-center">
              <div className="text-4xl font-bold text-primary mb-2">15+</div>
              <div className="text-muted-foreground font-medium">Anos de Experiência</div>
            </div>
            <div className="pizza-card text-center">
              <div className="text-4xl font-bold text-secondary mb-2">50+</div>
              <div className="text-muted-foreground font-medium">Sabores Únicos</div>
            </div>
            <div className="pizza-card text-center">
              <div className="text-4xl font-bold text-accent mb-2">10k+</div>
              <div className="text-muted-foreground font-medium">Clientes Felizes</div>
            </div>
            <div className="pizza-card text-center">
              <div className="text-4xl font-bold text-primary mb-2">4.9★</div>
              <div className="text-muted-foreground font-medium">Avaliação Média</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};