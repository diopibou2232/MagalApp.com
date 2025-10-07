import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HomeIcon, UserIcon, Cog6ToothIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';

const navLinks = [
  { name: 'Accueil', icon: HomeIcon, path: '/' },
  { name: 'Utilisateurs', icon: UserIcon, path: '/users' },
  { name: 'Paramètres', icon: Cog6ToothIcon, path: '/settings' },
];

export default function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ x: -250, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -250, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg z-40 flex flex-col"
        >
          <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
            <span className="font-bold text-lg text-gray-800 dark:text-white">Magal Admin</span>
            <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
              <ArrowLeftOnRectangleIcon className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            {navLinks.map(link => (
              <a key={link.name} href={link.path} className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition">
                <link.icon className="h-5 w-5" />
                <span>{link.name}</span>
              </a>
            ))}
          </nav>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
