import React from "react";
import { ShieldCheckIcon } from '@heroicons/react/24/solid';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen w-full bg-white p-4 sm:p-8 lg:p-12 animate-fade-in">
      <div className="w-full max-w-4xl mx-auto">
        
        <header className="text-center mb-12">
          <ShieldCheckIcon className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
            Politique de Confidentialité
          </h1>
          <p className="mt-4 text-gray-600">
            Votre confiance est importante pour nous.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Dernière mise à jour : 27 septembre 2025
          </p>
        </header>

        <div className="prose lg:prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
          <p>
            Bienvenue sur la page de politique de confidentialité de Magal App. Cette politique explique comment nous collectons, utilisons, protégeons et partageons vos informations personnelles lorsque vous utilisez notre application.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">1. Informations que nous collectons</h2>
          <p>
            Nous collectons plusieurs types d'informations pour fournir et améliorer notre service :
          </p>
          <ul>
            <li>
              <strong>Données fournies par l'utilisateur :</strong> Lors de votre inscription, nous collectons votre nom, votre adresse e-mail et votre mot de passe (chiffré). Si vous êtes un administrateur et que vous inscrivez un pèlerin, nous pouvons collecter son nom, prénom, email, numéro de téléphone et ville.
            </li>
            <li>
              <strong>Données de localisation :</strong> Lorsque vous utilisez les fonctionnalités de carte (page "Points d'Intérêt"), nous pouvons vous demander l'accès à votre géolocalisation pour vous aider à vous orienter. Cette information n'est utilisée qu'au moment de la demande et n'est pas stockée sur nos serveurs.
            </li>
            <li>
              <strong>Données d'utilisation :</strong> Nous pouvons collecter des informations sur la manière dont vous interagissez avec l'application, telles que les pages que vous visitez et les fonctionnalités que vous utilisez, afin d'améliorer l'expérience utilisateur.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">2. Comment nous utilisons vos informations</h2>
          <p>
            Les informations collectées sont utilisées pour les finalités suivantes :
          </p>
          <ul>
            <li>
              <strong>Fournir et gérer notre service :</strong> Pour vous permettre de vous connecter, d'accéder aux différentes fonctionnalités et de gérer votre compte.
            </li>
            <li>
              <strong>Personnaliser votre expérience :</strong> Pour afficher les fonctionnalités appropriées en fonction de votre rôle (utilisateur ou administrateur).
            </li>
            <li>
              <strong>Communication :</strong> Pour envoyer des notifications importantes relatives au Magal, si cette fonctionnalité est activée.
            </li>
            <li>
              <strong>Sécurité et amélioration :</strong> Pour protéger la sécurité de notre application et analyser les données d'utilisation afin d'améliorer nos services.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">3. Partage et divulgation des données</h2>
          <p>
            Magal App s'engage à ne pas vendre, louer ou partager vos informations personnelles avec des tiers à des fins de marketing. Vos données ne sont partagées que dans les cas suivants :
          </p>
          <ul>
            <li>
              Avec votre consentement explicite.
            </li>
            <li>
              Pour se conformer à une obligation légale, à une ordonnance d'un tribunal ou pour répondre à des demandes valides des autorités publiques.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">4. Sécurité de vos données</h2>
          <p>
            La sécurité de vos données est une priorité. Nous utilisons des mesures de sécurité administratives, techniques et physiques pour protéger vos informations personnelles. Les mots de passe sont chiffrés (hashés) et nous utilisons des protocoles de communication sécurisés (HTTPS). Cependant, aucune méthode de transmission sur Internet n'est sûre à 100%, et nous ne pouvons garantir une sécurité absolue.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">5. Cookies et Stockage Local</h2>
          <p>
            Nous utilisons le stockage local (`localStorage`) de votre navigateur pour conserver votre jeton d'authentification ("token") et vos informations utilisateur après votre connexion. Cela vous permet de rester connecté sans avoir à vous identifier à chaque visite. Ces données restent sur votre appareil et ne sont pas utilisées à des fins de suivi.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">6. Vos droits</h2>
          <p>
            Conformément à la réglementation, vous disposez de plusieurs droits sur vos données :
          </p>
          <ul>
            <li>
              <strong>Droit d'accès :</strong> Vous pouvez demander à voir les informations que nous détenons sur vous.
            </li>
            <li>
              <strong>Droit de rectification :</strong> Vous pouvez demander la correction de toute information incorrecte ou incomplète.
            </li>
            <li>
              <strong>Droit à l'effacement :</strong> Vous pouvez demander la suppression de votre compte et des données associées.
            </li>
          </ul>
          <p>
            Pour exercer ces droits, veuillez nous contacter à l'adresse ci-dessous.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">7. Modifications de cette politique</h2>
          <p>
            Nous pouvons mettre à jour notre politique de confidentialité de temps à autre. Nous vous informerons de tout changement en publiant la nouvelle politique sur cette page. Il est conseillé de consulter cette page périodiquement pour prendre connaissance de toute modification.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">8. Nous contacter</h2>
          <p>
            Si vous avez des questions concernant cette politique de confidentialité, veuillez nous contacter par e-mail :
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