import React from 'react';
import { SparklesIcon, CodeBracketIcon, UserGroupIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';

// --- CHANGEMENT ICI ---
// On importe les logos comme des URL, pas comme des composants.
// C'est la méthode standard de Vite.
import reactLogoUrl from '../assets/react.svg';
import viteLogoUrl from '../assets/php.png';
import tailwindLogoUrl from '../assets/touba2.jpg';
import tailwind from '../assets/tailwindcss.png';

const toubaImg = "/télécharger.jpeg"; // L'image de la mosquée pour l'en-tête

export default function About() {

  // Données pour les cartes de fonctionnalités
  const features = [
    {
      icon: <RocketLaunchIcon className="h-8 w-8 text-white" />,
      title: "Moderne et Rapide",
      description: "Construite avec Vite et React pour une expérience utilisateur ultra-fluide et réactive.",
    },
    {
      icon: <SparklesIcon className="h-8 w-8 text-white" />,
      title: "Design Élégant",
      description: "Une interface soignée et intuitive grâce à Tailwind CSS, pour une navigation agréable.",
    },
    {
      icon: <UserGroupIcon className="h-8 w-8 text-white" />,
      title: "Centrée sur l'Utilisateur",
      description: "Pensée pour les pèlerins, avec des informations claires et accessibles à tout moment.",
    },
  ];

  // On utilise les URL importées
  const techStack = [
     { name: 'React', logoUrl: reactLogoUrl },
     { name: 'PHP', logoUrl: viteLogoUrl },
     { name: 'Tailwind CSS', logoUrl: tailwind }
  ];

  return (
    <div className="w-full bg-white animate-fade-in">
      {/* Section 1 : Notre Mission */}
      <section className="bg-gray-50 py-12 sm:py-20">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800">
              Notre Mission
            </h1>
            <p className="mt-4 text-lg text-gray-700">
              Magal App a été créée avec la vision de fournir un compagnon numérique fiable et complet pour chaque pèlerin du Grand Magal de Touba. 
              Notre objectif est de centraliser toutes les informations essentielles pour enrichir votre expérience spirituelle.
            </p>
            <p className="mt-4 text-lg text-gray-700">
              Cette application est également un projet passionné, visant à démontrer la puissance des technologies web modernes comme React, Vite, et Tailwind CSS pour créer des applications belles, rapides et utiles.
            </p>
          </div>
          <div className="animate-fade-in delay-200">
            <img 
              src={toubaImg} 
              alt="Grande Mosquée de Touba" 
              className="rounded-xl shadow-2xl object-cover w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Section 2 : Les piliers de l'application */}
      <section className="py-12 sm:py-20 bg-blue-700 text-white">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">Les Piliers de Notre Application</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <div key={index} className="text-center p-8 bg-white/10 rounded-lg backdrop-blur-sm transition hover:bg-white/20 hover:-translate-y-2">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 mb-4">
                            {feature.icon}
                        </div>
                        <h3 className="text-xl font-bold">{feature.title}</h3>
                        <p className="mt-2 text-blue-100">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Section 3 : La Technologie */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <CodeBracketIcon className="h-12 w-12 mx-auto text-blue-500" />
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-800">
            La Technologie Derrière le Projet
          </h2>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            Nous utilisons un ensemble d'outils modernes pour garantir performance et maintenabilité.
          </p>
          <div className="mt-12 flex flex-wrap justify-center items-center gap-12">
            {techStack.map(tech => (
              <div key={tech.name} className="flex flex-col items-center gap-2 text-gray-700 font-semibold transition hover:scale-110">
                {/* --- CHANGEMENT ICI --- */}
                {/* On utilise une balise <img> standard avec l'URL importée */}
                <img src={tech.logoUrl} alt={`${tech.name} logo`} className="h-16 w-16 grayscale transition hover:grayscale-0" />
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 : L'équipe (identique, pas de changement ici) */}
      <section className="py-12 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">L'Équipe</h2>
            <p className="mt-2 text-gray-600">Le développeur passionné derrière ce projet.</p>
            <div className="mt-8 flex justify-center">
                <div className="text-center">
                    <img 
                        src="https://via.placeholder.com/150" // Remplacez par votre photo
                        alt="Photo du développeur"
                        className="h-32 w-32 rounded-full mx-auto shadow-lg border-4 border-blue-300"
                    />
                    <h3 className="mt-4 text-xl font-bold text-gray-800">khalil</h3>
                    <p className="text-blue-600 font-semibold">Développeur Full-Stack</p>
                    <div className="mt-4 flex justify-center gap-4">
                        <a href="#" className="text-gray-500 hover:text-blue-700">
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.492.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" /></svg>
                        </a>
                        <a href="#" className="text-gray-500 hover:text-blue-700">
                           <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}