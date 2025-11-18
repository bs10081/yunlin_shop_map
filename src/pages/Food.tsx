import { useContent } from '@/hooks/useContent';
import ContentCard from '@/components/ContentCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import Breadcrumb from '@/components/Breadcrumb';

export default function Food() {
  const { items, loading, error } = useContent('food');

  const breadcrumbItems = [
    { label: '首頁', path: '/' },
    { label: '美食地圖' },
  ];

  return (
    <div className="retro-page-bg min-h-screen">
      <Breadcrumb items={breadcrumbItems} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-retro-orange to-retro-pink mb-6 border-4 border-neon-pink" style={{boxShadow: '0 0 40px rgba(255, 0, 110, 0.6)'}}>
            <i className="fas fa-utensils text-3xl text-white" aria-hidden="true"></i>
          </div>
          <h1 className="text-5xl font-retro font-black mb-4">
            <span className="neon-text-pink glitch">美食地圖</span>
          </h1>
          <p className="text-xl text-cyan-300 font-retro tracking-wide">FOOD GUIDE • 1980s EDITION</p>
          <p className="text-lg text-cyan-400 mt-2">探索斗六在地特色美食，品味傳統風味</p>
        </div>

        {/* Content */}
        {loading && <LoadingSpinner />}

        {error && <ErrorMessage message={error} />}

        {!loading && !error && items.length === 0 && (
          <div className="text-center py-12 retro-card max-w-md mx-auto">
            <i className="fas fa-inbox text-5xl text-neon-purple mb-4 animate-pulse" aria-hidden="true"></i>
            <p className="text-cyan-300 font-retro">目前沒有內容</p>
          </div>
        )}

        {!loading && !error && items.length > 0 && (
          <>
            <div className="text-center mb-8">
              <p className="text-neon-cyan font-retro text-sm tracking-widest">
                共 {items.length} 個美食景點 • TOTAL {items.length} LOCATIONS
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ContentCard item={item} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
