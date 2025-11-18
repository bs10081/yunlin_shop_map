import { useParams, useNavigate } from 'react-router-dom';
import { useContentItem } from '@/hooks/useContent';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import AudioPlayer from '@/components/AudioPlayer';
import type { Category } from '@/types';

export default function AudioGuide() {
  const { category, id } = useParams<{ category: Category; id: string }>();
  const navigate = useNavigate();
  const { item, loading, error } = useContentItem(category!, id!);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <ErrorMessage message={error || '找不到內容'} />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary-50 to-primary-100 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white bg-opacity-90 backdrop-blur-md shadow-md">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 transition-all"
          aria-label="返回"
        >
          <i className="fas fa-arrow-left" aria-hidden="true"></i>
        </button>
        <h1 className="text-xl font-bold text-gray-900 flex-1 text-center pr-10">{item.title}</h1>
      </div>

      {/* Player Container */}
      <div className="flex-1 flex items-center justify-center p-8">
        {item.audio ? (
          <AudioPlayer src={`/static/audio/${item.audio}`} showProgress={false} autoplay={true} />
        ) : (
          <div className="text-center text-gray-600">
            <i className="fas fa-volume-mute text-5xl mb-4" aria-hidden="true"></i>
            <p>沒有可用的音頻</p>
          </div>
        )}
      </div>
    </div>
  );
}
