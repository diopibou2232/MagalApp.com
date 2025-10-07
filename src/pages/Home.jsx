import React, { useState, useEffect } from 'react';
import { ArrowRightIcon, BellAlertIcon, MapPinIcon, CalendarDaysIcon, NewspaperIcon } from '@heroicons/react/24/outline';

// Utilisation de l'image depuis le dossier public
const toubaImg = "/télécharger.jpeg";

// --- COMPOSANT POUR LE COMPTE À REBOURS ---
// J'ai créé ce petit composant pour rendre le code principal plus propre.
const CountdownTimer = () => {
  // IMPORTANT : Changez cette date pour celle du prochain Magal !
  const targetDate = new Date("June 25, 2026 00:00:00").getTime();

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Nettoyer l'intervalle quand le composant est démonté
    return () => clearInterval(timer);
  }, []);

  // Pour afficher les chiffres du compteur dans des boîtes stylisées
  const timeUnits = [
    { label: 'Jours', value: timeLeft.days },
    { label: 'Heures', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Secondes', value: timeLeft.seconds },
  ];

  return (
    <div className="flex justify-center gap-4 sm:gap-8">
      {timeUnits.map(unit => (
        <div key={unit.label} className="flex flex-col items-center">
          <div className="flex h-16 w-16 sm:h-24 sm:w-24 items-center justify-center rounded-lg bg-white/30 text-3xl sm:text-5xl font-bold text-blue-900 shadow-lg">
            {String(unit.value).padStart(2, '0')}
          </div>
          <span className="mt-2 text-sm sm:text-base font-semibold text-white/80">{unit.label}</span>
        </div>
      ))}
    </div>
  );
};


// --- COMPOSANT PRINCIPAL DE LA PAGE D'ACCUEIL ---
export default function Home() {

  // Données pour les cartes de fonctionnalités (vous pouvez les modifier)
  const features = [
    {
      icon: <BellAlertIcon className="h-8 w-8 text-blue-600" />,
      title: "Notifications",
      description: "Recevez les alertes et informations importantes en temps réel.",
      link: "/notifications",
    },
    {
      icon: <CalendarDaysIcon className="h-8 w-8 text-blue-600" />,
      title: "Programme",
      description: "Consultez les horaires des prières et des conférences.",
      link: "/programme",
    },
    {
      icon: <MapPinIcon className="h-8 w-8 text-blue-600" />,
      title: "Lieux utiles",
      description: "Trouvez les points de restauration, les postes de secours, etc.",
      link: "/carte",
    }
  ];

  return (
    <div className="h-full w-full bg-gray-50">
      {/* Section 1 : Héros avec l'image de fond */}
      <section 
        className="relative flex h-[60vh] min-h-[400px] items-center justify-center text-center text-white"
        style={{ backgroundImage: `url(${toubaImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black/50"></div> {/* Superposition sombre pour la lisibilité */}
        <div className="relative z-10 flex flex-col items-center p-4 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg">
            Bienvenue sur Magal App
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-white/90 drop-shadow-md">
            Votre guide complet pour vivre le Grand Magal de Touba.
          </p>
        </div>
      </section>

      {/* Section 2 : Cartes de fonctionnalités */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <a href={feature.link} key={index} className="group block rounded-xl border border-gray-200 bg-white p-8 text-center shadow-lg transition hover:-translate-y-2 hover:shadow-2xl hover:border-blue-300">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 transition group-hover:bg-blue-200">
                  {feature.icon}
                </div>
                <h3 className="mt-4 text-xl font-bold text-gray-800">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
                <div className="mt-4 font-semibold text-blue-600 flex items-center justify-center gap-2 opacity-0 transition group-hover:opacity-100">
                  Voir plus <ArrowRightIcon className="h-5 w-5" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 : Compte à rebours dynamique */}
      <section 
        className="relative py-20"
        style={{ backgroundImage: `url(${toubaImg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}
      >
        <div className="absolute inset-0 bg-blue-800/80 backdrop-blur-sm"></div>
        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold">Le prochain Magal dans</h2>
          <div className="mt-8">
            <CountdownTimer />
          </div>
        </div>
      </section>

      {/* Section 4 : "À la Une" */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">À la Une</h2>
            <p className="mt-2 text-gray-600">Les dernières informations et actualités.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Article 1 (Exemple) */}
            <div className="overflow-hidden rounded-lg bg-white shadow-md transition hover:shadow-xl">
              <img src="https://via.placeholder.com/400x250/0000FF/FFFFFF?text=Info+Magal" alt="Actualité" className="h-56 w-full object-cover"/>
              <div className="p-6">
                <span className="text-sm font-semibold text-blue-500">Organisation</span>
                <h3 className="mt-2 text-xl font-bold text-gray-800">Le comité d'organisation finalise les préparatifs</h3>
                <p className="mt-2 text-gray-600">Les derniers ajustements sont en cours pour accueillir les pèlerins dans les meilleures conditions...</p>
              </div>
            </div>
             {/* Article 2 (Exemple) */}
            <div className="overflow-hidden rounded-lg bg-white shadow-md transition hover:shadow-xl">
              <img src="https://via.placeholder.com/400x250/1E90FF/FFFFFF?text=Spiritualité" alt="Actualité" className="h-56 w-full object-cover"/>
              <div className="p-6">
                <span className="text-sm font-semibold text-blue-500">Spiritualité</span>
                <h3 className="mt-2 text-xl font-bold text-gray-800">Retour sur les enseignements de Serigne Touba</h3>
                <p className="mt-2 text-gray-600">Une série de conférences est prévue pour approfondir la connaissance de l'œuvre du Cheikh...</p>
              </div>
            </div>
             {/* Article 3 (Exemple) */}
            <div className="overflow-hidden rounded-lg bg-white shadow-md transition hover:shadow-xl">
              <img src="https://via.placeholder.com/400x250/87CEFA/FFFFFF?text=Infos+Pratiques" alt="Actualité" className="h-56 w-full object-cover"/>
              <div className="p-6">
                <span className="text-sm font-semibold text-blue-500">Infos Pratiques</span>
                <h3 className="mt-2 text-xl font-bold text-gray-800">Guide du pèlerin : comment bien préparer son voyage</h3>
                <p className="mt-2 text-gray-600">Découvrez nos conseils pour le transport, l'hébergement et la santé durant votre séjour à Touba...</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
