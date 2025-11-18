import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import UserProgress from './UserProgress';

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
    { path: '/quests', label: '任務中心', icon: 'fa-scroll' },
    { path: '/profile', label: '我的冒險', icon: 'fa-user-astronaut', special: true },
  ];

  return (
    <nav
      className="sticky top-0 z-50 bg-gradient-to-r from-retro-pink/10 via-retro-purple/10 to-retro-cyan/10 backdrop-blur-lg border-b-2 border-neon-pink/50 shadow-lg"
      role="navigation"
      aria-label="主導航"
      style={{
        boxShadow: '0 4px 20px rgba(255, 0, 110, 0.3), 0 0 40px rgba(131, 56, 236, 0.2)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-xl font-retro font-black hover:scale-105 transition-transform"
            aria-label="回到首頁"
          >
            <i className="fas fa-map-marked-alt text-neon-pink animate-neon-pulse" aria-hidden="true"></i>
            <span className="neon-text-cyan">斗六舊城</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <UserProgress />
            <ul className="flex space-x-2">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all font-retro font-bold text-sm uppercase tracking-wider ${
                    (link as any).special && isActive(link.path)
                      ? 'bg-gradient-to-r from-retro-pink to-retro-purple text-white shadow-lg'
                      : isActive(link.path)
                      ? 'bg-gradient-to-r from-neon-cyan/20 to-neon-blue/20 text-neon-cyan border-2 border-neon-cyan/50'
                      : (link as any).special
                      ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-neon-pink border-2 border-neon-pink/30 hover:border-neon-pink hover:shadow-lg hover:shadow-neon-pink/50'
                      : 'text-gray-300 hover:text-neon-cyan hover:bg-gray-800/50 border-2 border-transparent hover:border-neon-cyan/30'
                  }`}
                  aria-current={isActive(link.path) ? 'page' : undefined}
                  style={
                    (link as any).special && isActive(link.path)
                      ? {
                          textShadow: '0 0 10px rgba(255, 16, 240, 0.8), 0 0 20px rgba(255, 16, 240, 0.6)',
                          boxShadow: '0 0 20px rgba(255, 0, 110, 0.6), 0 0 40px rgba(131, 56, 236, 0.4)',
                        }
                      : isActive(link.path) && !(link as any).special
                      ? {
                          textShadow: '0 0 10px rgba(6, 255, 165, 0.8)',
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
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-3 rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 border-2 border-neon-pink/50 hover:border-neon-pink hover:shadow-lg hover:shadow-neon-pink/50 transition-all"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? '關閉導航選單' : '開啟導航選單'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl text-neon-pink`} aria-hidden="true"></i>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden py-4 border-t-2 border-neon-purple/30 animate-slide-up"
          >
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all font-retro font-bold ${
                      (link as any).special && isActive(link.path)
                        ? 'bg-gradient-to-r from-retro-pink to-retro-purple text-white shadow-lg'
                        : isActive(link.path)
                        ? 'bg-gradient-to-r from-neon-cyan/20 to-neon-blue/20 text-neon-cyan border-2 border-neon-cyan/50'
                        : (link as any).special
                        ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-neon-pink border-2 border-neon-pink/30'
                        : 'text-gray-300 hover:text-neon-cyan hover:bg-gray-800/50 border-2 border-transparent hover:border-neon-cyan/30'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                    aria-current={isActive(link.path) ? 'page' : undefined}
                    style={
                      (link as any).special && isActive(link.path)
                        ? {
                            textShadow: '0 0 10px rgba(255, 16, 240, 0.8)',
                          }
                        : isActive(link.path) && !(link as any).special
                        ? {
                            textShadow: '0 0 10px rgba(6, 255, 165, 0.8)',
                          }
                        : undefined
                    }
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
