import pizzaLogo from '@/assets/pizza-logo.png';
import { Instagram, Facebook, Twitter, Heart } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-pizza-brown text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img src={pizzaLogo} alt="Pizza Joy Feast" className="h-10 w-10" />
              <div>
                <h3 className="text-xl font-bold">Pizza Joy Feast</h3>
                <p className="text-sm opacity-80 font-script">Sabor que alegra</p>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              Desde 2009 levando o melhor da culinária italiana para sua mesa, 
              com ingredientes frescos e receitas tradicionais.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#hero" className="opacity-80 hover:opacity-100 transition-opacity">Início</a></li>
              <li><a href="#menu" className="opacity-80 hover:opacity-100 transition-opacity">Cardápio</a></li>
              <li><a href="#about" className="opacity-80 hover:opacity-100 transition-opacity">Sobre Nós</a></li>
              <li><a href="#contact" className="opacity-80 hover:opacity-100 transition-opacity">Contato</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <div className="space-y-2 text-sm opacity-80">
              <p>Rua das Pizzas, 123 - Centro</p>
              <p>São Paulo, SP</p>
              <p>(11) 9999-8888</p>
              <p>Seg a Dom: 18h às 23h</p>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold mb-4">Redes Sociais</h4>
            <div className="flex space-x-4">
              <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
            <p className="text-sm opacity-80 mt-4">
              Siga-nos para promoções exclusivas e novidades!
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm opacity-80 flex items-center">
            © {currentYear} Pizza Joy Feast. Feito com <Heart className="w-4 h-4 mx-1 text-red-400" /> para você.
          </p>
          <div className="flex space-x-6 text-sm opacity-80 mt-4 md:mt-0">
            <a href="#" className="hover:opacity-100 transition-opacity">Política de Privacidade</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
};