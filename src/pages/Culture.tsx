import { useContent } from '@/hooks/useContent';
import ContentCard from '@/components/ContentCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import Breadcrumb from '@/components/Breadcrumb';

export default function Culture() {
  const { items, loading, error } = useContent('culture');

  const breadcrumbItems = [
    { label: '首頁', path: '/' },
    { label: '文化景點' },
  ];

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
            <i className="fas fa-landmark text-2xl" aria-hidden="true"></i>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">文化景點</h1>
          <p className="text-lg text-gray-600">感受斗六歷史文化風華，探索古城故事</p>
        </div>

        {/* Content */}
        {loading && <LoadingSpinner />}

        {error && <ErrorMessage message={error} />}

        {!loading && !error && items.length === 0 && (
          <div className="text-center py-12">
            <i className="fas fa-inbox text-5xl text-gray-300 mb-4" aria-hidden="true"></i>
            <p className="text-gray-600">目前沒有內容</p>
          </div>
        )}

        {!loading && !error && items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => (
              <ContentCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
