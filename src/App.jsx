import React, { useEffect } from 'react';
import HomePage from './components/HomePage';

export default function App() {
  useEffect(() => {
    // If user loaded with a hash like #implementation, smoothly scroll to it
    if (window.location.hash) {
      const targetId = window.location.hash.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  return (
    <div className="app-root">
      <HomePage />
    </div>
  );
}
