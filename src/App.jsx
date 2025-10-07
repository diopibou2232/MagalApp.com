import { useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import router from './router';

function App() {
  return (
    <RouterProvider router={router}>
      <Layout>
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white animate-fade-in">Bienvenue sur Magal Application</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8 animate-fade-in delay-200">Une application moderne avec React, Tailwind CSS et animations.</p>
          {/* Ajoute ici d'autres composants/pages selon la route */}
        </div>
      </Layout>
    </RouterProvider>
  );
}

export default App;
