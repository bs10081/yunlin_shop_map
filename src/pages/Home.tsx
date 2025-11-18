import { Link } from 'react-router-dom';

export default function Home() {
  const categories = [
    {
      path: '/food',
      title: '美食地圖',
      icon: 'fa-utensils',
      description: '探索在地特色美食',
      color: 'from-retro-orange to-retro-pink',
      neonColor: 'neon-pink',
    },
    {
      path: '/culture',
      title: '文化景點',
      icon: 'fa-landmark',
      description: '感受歷史文化風華',
      color: 'from-retro-blue to-retro-purple',
      neonColor: 'neon-blue',
    },
    {
      path: '/shopping',
      title: '特色商店',
      icon: 'fa-store',
      description: '發現在地特色商品',
      color: 'from-retro-cyan to-retro-blue',
      neonColor: 'neon-cyan',
    },
  ];

  return (
    <div className="retro-page-bg min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 relative z-10">
          <div className="text-center">
            {/* Glowing Title */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-retro font-black mb-6 animate-fade-in">
              <span className="neon-text-pink glitch">斗六舊城</span>
              <br />
              <span className="neon-text-cyan">時空漫遊</span>
            </h1>

            {/* Subtitle with neon effect */}
            <div className="space-y-4 mb-8">
              <p className="text-2xl sm:text-3xl font-retro text-neon-pink animate-neon-pulse">
                RETRO • CULTURE • EXPERIENCE
              </p>
              <p className="text-lg sm:text-xl text-cyan-300 max-w-2xl mx-auto font-light">
                穿越時空隧道，回到 1980 年代
                <br />
                用復古視角探索斗六舊城的魅力
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Link
                to="/map"
                className="retro-button text-white inline-flex items-center space-x-2"
              >
                <i className="fas fa-map-marked-alt"></i>
                <span>啟動時空地圖</span>
              </Link>
              <button className="px-6 py-3 font-retro font-bold uppercase tracking-wider rounded bg-gradient-to-r from-gray-800 to-gray-900 border-2 border-neon-cyan text-neon-cyan hover:bg-gradient-to-r hover:from-neon-cyan hover:to-neon-blue hover:text-black transition-all">
                <i className="fas fa-play mr-2"></i>
                開始探索
              </button>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 border-l-4 border-t-4 border-neon-pink opacity-50 animate-pulse"></div>
        <div className="absolute top-10 right-10 w-32 h-32 border-r-4 border-t-4 border-neon-cyan opacity-50 animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 border-l-4 border-b-4 border-neon-purple opacity-50 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 border-r-4 border-b-4 border-neon-blue opacity-50 animate-pulse"></div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <h2 className="text-4xl font-retro font-black text-center mb-4">
          <span className="neon-text-cyan">探索分類</span>
        </h2>
        <p className="text-center text-cyan-300 mb-12 font-retro text-sm tracking-widest">
          SELECT YOUR ADVENTURE
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link
              key={category.path}
              to={category.path}
              className="group relative retro-card p-8 text-center animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Glowing Icon */}
              <div className="relative mb-6">
                <div
                  className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br ${category.color} transform group-hover:scale-110 transition-all duration-300`}
                  style={{
                    boxShadow: `0 0 30px rgba(255, 0, 110, 0.5), 0 0 60px rgba(131, 56, 236, 0.3)`,
                  }}
                >
                  <i className={`fas ${category.icon} text-4xl text-white`} aria-hidden="true"></i>
                </div>
                {/* Pulsing ring */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className={`w-24 h-24 rounded-full border-2 border-${category.neonColor} opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500`}
                  ></div>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-retro font-black text-neon-pink mb-3 group-hover:text-neon-cyan transition-colors">
                {category.title}
              </h3>

              {/* Description */}
              <p className="text-cyan-300 mb-6 font-light">{category.description}</p>

              {/* Arrow */}
              <div className="flex items-center justify-center text-neon-cyan font-retro font-bold text-sm">
                <span className="mr-2">ENTER</span>
                <i
                  className="fas fa-arrow-right transform group-hover:translate-x-2 transition-transform"
                  aria-hidden="true"
                ></i>
              </div>

              {/* Corner decorations */}
              <div className="absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 border-neon-pink opacity-50"></div>
              <div className="absolute top-2 right-2 w-8 h-8 border-r-2 border-t-2 border-neon-cyan opacity-50"></div>
              <div className="absolute bottom-2 left-2 w-8 h-8 border-l-2 border-b-2 border-neon-purple opacity-50"></div>
              <div className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-neon-blue opacity-50"></div>
            </Link>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl font-retro font-black text-center mb-4">
            <span className="neon-text-pink">特色功能</span>
          </h2>
          <p className="text-center text-pink-300 mb-12 font-retro text-sm tracking-widest">
            FEATURES • 1980s EDITION
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: 'fa-headphones',
                title: '語音導覽',
                desc: '專業語音導覽，深度介紹每個景點',
                color: 'neon-pink',
              },
              {
                icon: 'fa-book-open',
                title: '延伸閱讀',
                desc: '豐富的文化故事與歷史背景',
                color: 'neon-purple',
              },
              {
                icon: 'fa-map-marked-alt',
                title: '80s 地圖',
                desc: '復古風格互動地圖，時空穿越體驗',
                color: 'neon-cyan',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 retro-card animate-fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 bg-gradient-to-br from-purple-900 to-pink-900 border-2 border-${feature.color}`}
                  style={{
                    boxShadow: `0 0 20px var(--tw-${feature.color})`,
                  }}
                >
                  <i className={`fas ${feature.icon} text-2xl text-${feature.color}`} aria-hidden="true"></i>
                </div>
                <h3 className="text-xl font-retro font-bold text-neon-cyan mb-2">{feature.title}</h3>
                <p className="text-cyan-300 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="relative py-16 text-center">
        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <p className="text-3xl font-retro font-black mb-8">
            <span className="neon-text-pink animate-neon-pulse">準備好穿越時空了嗎？</span>
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/map" className="retro-button text-white">
              <i className="fas fa-rocket mr-2"></i>
              立即啟程
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
