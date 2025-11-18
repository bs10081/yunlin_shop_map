import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: '/', label: '首頁', icon: 'fa-home' },
    { path: '/food', label: '美食地圖', icon: 'fa-utensils' },
    { path: '/culture', label: '文化景點', icon: 'fa-landmark' },
    { path: '/shopping', label: '特色商店', icon: 'fa-store' },
    { path: '/map', label: '80s 地圖', icon: 'fa-map-marked-alt', special: true },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50" role="navigation" aria-label="主導航">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-xl font-bold text-primary-600 hover:text-primary-700 transition-colors"
            aria-label="回到首頁"
          >
            <i className="fas fa-map-marked-alt" aria-hidden="true"></i>
            <span>斗六舊城漫遊</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-1">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    (link as any).special && isActive(link.path)
                      ? 'bg-gradient-to-r from-retro-pink to-retro-purple text-white font-bold shadow-lg'
                      : isActive(link.path)
                      ? 'bg-primary-100 text-primary-700 font-medium'
                      : (link as any).special
                      ? 'bg-gradient-to-r from-gray-700 to-gray-800 text-neon-cyan hover:from-retro-pink hover:to-retro-purple hover:text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  aria-current={isActive(link.path) ? 'page' : undefined}
                  style={
                    (link as any).special && isActive(link.path)
                      ? {
                          textShadow: '0 0 10px rgba(255, 0, 110, 0.8)',
                        }
                      : undefined
                  }
                >
                  <i className={`fas ${link.icon}`} aria-hidden="true"></i>
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? '關閉導航選單' : '開啟導航選單'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`} aria-hidden="true"></i>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden py-4 border-t border-gray-200 animate-slide-up"
          >
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                      (link as any).special && isActive(link.path)
                        ? 'bg-gradient-to-r from-retro-pink to-retro-purple text-white font-bold'
                        : isActive(link.path)
                        ? 'bg-primary-100 text-primary-700 font-medium'
                        : (link as any).special
                        ? 'bg-gradient-to-r from-gray-700 to-gray-800 text-neon-cyan'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                    aria-current={isActive(link.path) ? 'page' : undefined}
                  >
                    <i className={`fas ${link.icon} w-5`} aria-hidden="true"></i>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
