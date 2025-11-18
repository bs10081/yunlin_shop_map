import { useParams, useNavigate } from 'react-router-dom';
import { useContentItem } from '@/hooks/useContent';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import AudioPlayer from '@/components/AudioPlayer';
import { LazyImage } from '@/components/LazyImage';
import type { Category } from '@/types';

export default function Story() {
  const { category, id } = useParams<{ category: Category; id: string }>();
  const navigate = useNavigate();
  const { item, loading, error } = useContentItem(category!, id!);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ErrorMessage message={error || '找不到內容'} />
      </div>
    );
  }

  const getCategoryLabel = (cat: string) => {
    const labels: Record<string, string> = {
      food: '美食地圖',
      culture: '文化景點',
      shopping: '特色商店',
    };
    return labels[cat] || cat;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Button */}
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg"
          >
            <i className="fas fa-arrow-left" aria-hidden="true"></i>
            <span className="hidden sm:inline">返回</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Image */}
        {item.image && (
          <div className="mb-8 rounded-2xl overflow-hidden shadow-xl">
            <LazyImage
              src={`/static/images/${item.image}`}
              alt={item.title}
              className="w-full h-auto max-h-[500px] object-cover"
            />
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{item.title}</h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6 pb-6 border-b border-gray-200">
          <span className="inline-flex items-center space-x-2">
            <i className="fas fa-folder text-primary-600" aria-hidden="true"></i>
            <span>{getCategoryLabel(category!)}</span>
          </span>

          {item.address && (
            <span className="inline-flex items-center space-x-2">
              <i className="fas fa-map-marker-alt text-primary-600" aria-hidden="true"></i>
              <span>{item.address}</span>
            </span>
          )}
        </div>

        {/* Audio Player */}
        {item.audio && <AudioPlayer src={`/static/audio/${item.audio}`} />}

        {/* Story Content */}
        {item.story_content && (
          <div
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-primary-600 prose-strong:text-gray-900 prose-img:rounded-lg prose-img:shadow-md"
            dangerouslySetInnerHTML={{ __html: item.story_content }}
          />
        )}

        {/* Additional Info */}
        {(item.phone || item.opening_hours || item.website) && (
          <div className="mt-12 p-6 bg-white rounded-2xl shadow-md space-y-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">詳細資訊</h3>

            {item.phone && (
              <div className="flex items-center space-x-3">
                <i className="fas fa-phone text-primary-600 w-5" aria-hidden="true"></i>
                <a href={`tel:${item.phone}`} className="text-gray-700 hover:text-primary-600 transition-colors">
                  {item.phone}
                </a>
              </div>
            )}

            {item.opening_hours && (
              <div className="flex items-start space-x-3">
                <i className="fas fa-clock text-primary-600 w-5 mt-1" aria-hidden="true"></i>
                <span className="text-gray-700">{item.opening_hours}</span>
              </div>
            )}

            {item.website && (
              <a
                href={item.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors mt-4"
              >
                <i className="fas fa-directions" aria-hidden="true"></i>
                <span>Google 地圖導航</span>
              </a>
            )}
          </div>
        )}
      </article>
    </div>
  );
}
