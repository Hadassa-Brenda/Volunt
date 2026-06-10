import { Code2, Heart, Search } from 'lucide-react';

import './HowItWorks.css';

const STEPS = [
  {
    title: 'Encontre',
    description: 'Busque serviços por categoria, localização e tipo.',
    icon: Search,
  },
  {
    title: 'Ofereça',
    description: 'Cadastre iniciativas voluntárias da sua comunidade.',
    icon: Heart,
  },
  {
    title: 'Conecte',
    description: 'Entre em contato pelo WhatsApp, Instagram ou link oficial.',
    icon: Code2,
  },
];

export default function HowItWorks() {
  return (
    <section className="how-it-works" id="como-funciona">
      <h2>Como funciona</h2>

      <div className="how-it-works__steps">
        {STEPS.map(({ title, description, icon: Icon }) => (
          <div className="how-it-works__step" key={title}>
            <Icon size={22} />
            <strong>{title}</strong>
            <span>{description}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
