import { Link } from 'react-router-dom';

export default function Home() {
  const categories = [
    {
      path: '/food',
      title: '美食地圖',
      icon: 'fa-utensils',
      description: '探索在地特色美食',
      color: 'from-orange-500 to-red-500',
    },
    {
      path: '/culture',
      title: '文化景點',
      icon: 'fa-landmark',
      description: '感受歷史文化風華',
      color: 'from-blue-500 to-indigo-500',
    },
    {
      path: '/shopping',
      title: '特色商店',
      icon: 'fa-store',
      description: '發現在地特色商品',
      color: 'from-green-500 to-teal-500',
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              斗六舊城漫遊
            </h1>
            <p className="text-xl sm:text-2xl mb-4 text-primary-100 animate-fade-in">
              探索歷史 • 體驗文化 • 感受生活
            </p>
            <p className="text-lg text-primary-200 max-w-2xl mx-auto animate-slide-up">
              一趟穿越時空的文化之旅，帶您品味在地特色、感受歷史風華
            </p>
          </div>
        </div>

        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            <path
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
              fill="rgb(249, 250, 251)"
            />
          </svg>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">開始探索</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.path}
              to={category.path}
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              ></div>

              <div className="relative p-8 text-center">
                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${category.color} text-white mb-6 transform group-hover:scale-110 transition-transform duration-300`}
                >
                  <i className={`fas ${category.icon} text-3xl`} aria-hidden="true"></i>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                  {category.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-6">{category.description}</p>

                {/* Arrow */}
                <div className="flex items-center justify-center text-primary-600 font-medium">
                  <span className="mr-2">探索更多</span>
                  <i
                    className="fas fa-arrow-right transform group-hover:translate-x-2 transition-transform"
                    aria-hidden="true"
                  ></i>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">特色功能</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-4">
                <i className="fas fa-headphones text-2xl" aria-hidden="true"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">語音導覽</h3>
              <p className="text-gray-600">專業語音導覽，深度介紹每個景點</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-4">
                <i className="fas fa-book-open text-2xl" aria-hidden="true"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">延伸閱讀</h3>
              <p className="text-gray-600">豐富的文化故事與歷史背景</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-4">
                <i className="fas fa-map-marked-alt text-2xl" aria-hidden="true"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">導航指引</h3>
              <p className="text-gray-600">一鍵導航，輕鬆抵達目的地</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
