import React from "react";
import { DocumentTextIcon } from '@heroicons/react/24/solid';

export default function TermsOfService() {
  return (
    <div className="min-h-screen w-full bg-white p-4 sm:p-8 lg:p-12 animate-fade-in">
      <div className="w-full max-w-4xl mx-auto">
        
        <header className="text-center mb-12">
          <DocumentTextIcon className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
            Conditions Générales d'Utilisation
          </h1>
          <p className="mt-4 text-gray-600">
            Règles et directives pour l'utilisation de nos services.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Dernière mise à jour : 27 septembre 2025
          </p>
        </header>

        <div className="prose lg:prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
          <p>
            Veuillez lire attentivement les présentes Conditions Générales d'Utilisation ("CGU") avant d'utiliser l'application Magal App (le "Service") exploitée par nous. Votre accès et votre utilisation du Service sont conditionnés par votre acceptation et votre respect de ces Conditions. Ces Conditions s'appliquent à tous les visiteurs, utilisateurs et autres personnes qui accèdent ou utilisent le Service.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">1. Acceptation des conditions</h2>
          <p>
            En accédant ou en utilisant le Service, vous acceptez d'être lié par ces CGU. Si vous êtes en désaccord avec une partie des conditions, vous ne pouvez pas accéder au Service.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">2. Description du Service</h2>
          <p>
            Magal App est une application conçue pour fournir des informations et des outils utiles aux pèlerins et visiteurs du Grand Magal de Touba. Les services incluent, sans s'y limiter, la consultation des horaires, la localisation de points d'intérêt, la réception de notifications et la gestion des listes de pèlerins (pour les administrateurs).
          </p>

          <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">3. Comptes utilisateurs</h2>
          <p>
            Pour accéder à certaines fonctionnalités du Service, vous devez créer un compte. Vous vous engagez à fournir des informations exactes, complètes et à jour lors de votre inscription. Vous êtes responsable de la protection de votre mot de passe et de toutes les activités qui se déroulent sous votre compte. Vous devez nous informer immédiatement de toute violation de sécurité ou utilisation non autorisée de votre compte.
          </p>
          <p>
            Nous distinguons deux types de comptes : "Utilisateur" et "Administrateur". Les fonctionnalités disponibles varient en fonction de votre rôle. L'attribution du rôle "Administrateur" est à notre seule discrétion.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">4. Utilisation acceptable</h2>
          <p>
            Vous vous engagez à ne pas utiliser le Service pour :
          </p>
          <ul>
            <li>
              Toute fin illégale ou interdite par ces Conditions.
            </li>
            <li>
              Publier ou transmettre tout contenu qui est diffamatoire, obscène, menaçant, ou qui viole les droits d'autrui.
            </li>
            <li>
              Tenter d'obtenir un accès non autorisé à nos systèmes informatiques ou d'interférer avec le bon fonctionnement du Service.
            </li>
            <li>
              Utiliser les informations des autres utilisateurs à des fins commerciales sans leur consentement explicite.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">5. Propriété Intellectuelle</h2>
          <p>
            Le Service et son contenu original (à l'exclusion du contenu fourni par les utilisateurs), ses caractéristiques et ses fonctionnalités sont et resteront la propriété exclusive de Magal App et de ses concédants de licence. Le Service est protégé par le droit d'auteur, le droit des marques et d'autres lois.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">6. Limitation de responsabilité</h2>
          <p>
            Les informations fournies par Magal App (horaires, localisations) sont données à titre indicatif. Bien que nous nous efforcions de fournir des informations exactes et à jour, nous ne garantissons pas leur exhaustivité ou leur exactitude. En aucun cas Magal App, ni ses directeurs ou employés, ne pourront être tenus responsables de tout dommage indirect, accidentel ou consécutif résultant de votre utilisation du Service.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">7. Résiliation</h2>
          <p>
            Nous pouvons résilier ou suspendre votre accès à notre Service immédiatement, sans préavis ni responsabilité, pour quelque raison que ce soit, y compris, sans limitation, si vous ne respectez pas les présentes Conditions.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">8. Modifications des conditions</h2>
          <p>
            Nous nous réservons le droit, à notre seule discrétion, de modifier ou de remplacer ces Conditions à tout moment. Si une révision est importante, nous nous efforcerons de fournir un préavis d'au moins 30 jours avant l'entrée en vigueur des nouvelles conditions. Ce qui constitue un changement important sera déterminé à notre seule discrétion.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">9. Nous contacter</h2>
          <p>
            Si vous avez des questions concernant ces Conditions Générales d'Utilisation, veuillez nous contacter par e-mail :
            <a href="mailto:contact@magalapp.com" className="text-blue-600 font-semibold hover:underline ml-2">contact@magalapp.com</a>
          </p>
        </div>

        <div className="mt-12 border-t pt-8 text-center">
            <p className="text-sm text-gray-500">
                <strong>Avis de non-responsabilité :</strong> Ce document est un modèle et ne constitue pas un avis juridique. Il est fortement recommandé de consulter un professionnel du droit pour vous assurer de sa conformité avec toutes les lois et réglementations applicables à votre situation.
            </p>
        </div>
      </div>
    </div>
  );
}