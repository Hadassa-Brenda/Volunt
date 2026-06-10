import { Heart, Search, Users } from 'lucide-react';

import { heroImages } from '../../assets/heroImages';
import { HERO_CONTENT } from '../../constants/content';
import './Hero.css';

export default function Hero({ onOpenServiceModal }) {
  return (
    <section className="hero" id="top">
      <div className="hero__text">
        <h1>
          Conectando pessoas <br />
          que querem <span>ajudar</span> com <br />
          quem <span>precisa</span>
        </h1>
        <p>
          Encontre ou ofereça serviços voluntários na sua comunidade. Juntos,
          podemos transformar vidas!
        </p>

        <div className="hero__buttons">
          <a className="hero__button hero__button--primary" href="#explorar">
            <Search size={18} />
            {HERO_CONTENT.findHelpButton}
          </a>

          <button
            className="hero__button hero__button--secondary"
            type="button"
            onClick={onOpenServiceModal}
          >
            <Heart size={18} />
            {HERO_CONTENT.offerHelpButton}
          </button>
        </div>
      </div>

      <div className="hero__art" aria-label="Ilustração da plataforma">
        <div className="hero__blob hero__blob--blue" />
        <div className="hero__blob hero__blob--pink" />

        <div
          className="hero__small-photo hero__small-photo--tutor"
          style={{ backgroundImage: `url(${heroImages.tutor})` }}
        />
        <div
          className="hero__small-photo hero__small-photo--clean"
          style={{ backgroundImage: `url(${heroImages.clean})` }}
        />

        <div className="hero__main-volunteer">
          <img src={heroImages.volunteer} alt="Pessoa voluntária sorrindo" />
          <span>VOLUNTÁRIO</span>
        </div>

        <div
          className="hero__small-photo hero__small-photo--guitar"
          style={{ backgroundImage: `url(${heroImages.guitar})` }}
        />

        <div className="hero__stats-bubble">
          <div>
            <Users size={20} />
          </div>
          <strong>+2.500</strong>
          <span>serviços cadastrados</span>
        </div>

        <div className="hero__spark hero__spark--one">✦</div>
        <div className="hero__spark hero__spark--two">✧</div>
      </div>
    </section>
  );
}
