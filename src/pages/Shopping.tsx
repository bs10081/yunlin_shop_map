import { useContent } from '@/hooks/useContent';
import ContentCard from '@/components/ContentCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import Breadcrumb from '@/components/Breadcrumb';

export default function Shopping() {
  const { items, loading, error } = useContent('shopping');

  const breadcrumbItems = [
    { label: '首頁', path: '/' },
    { label: '特色商店' },
  ];

  return (
    <div className="retro-page-bg min-h-screen">
      <Breadcrumb items={breadcrumbItems} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 border-4 border-neon-green"
            style={{
              background: 'linear-gradient(135deg, rgba(6, 255, 165, 0.2), rgba(58, 134, 255, 0.2))',
              boxShadow: '0 0 30px rgba(6, 255, 165, 0.6), 0 0 60px rgba(6, 255, 165, 0.4)',
            }}
          >
            <i className="fas fa-store text-3xl text-neon-green animate-neon-pulse" aria-hidden="true"></i>
          </div>
          <h1 className="text-5xl font-retro font-black mb-4">
            <span className="neon-text-cyan glitch">特色商店</span>
          </h1>
          <p className="text-lg text-retro-cyan font-retro tracking-wide">
            UNIQUE SHOPS • 1980s EDITION
          </p>
        </div>

        {/* Content */}
        {loading && <LoadingSpinner />}

        {error && <ErrorMessage message={error} />}

        {!loading && !error && items.length === 0 && (
          <div className="text-center py-12">
            <i className="fas fa-inbox text-5xl text-neon-cyan mb-4 animate-neon-pulse" aria-hidden="true"></i>
            <p className="text-neon-green font-retro">目前沒有內容</p>
          </div>
        )}

        {!loading && !error && items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item, index) => (
              <div
                key={item.id}
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
                className="animate-slide-up"
              >
                <ContentCard item={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
