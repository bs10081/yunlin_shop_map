import { useParams, useNavigate } from 'react-router-dom';
import { useContentItem } from '@/hooks/useContent';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import AudioPlayer from '@/components/AudioPlayer';
import CheckInButton from '@/components/CheckInButton';
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
    <div className="retro-page-bg min-h-screen">
      {/* Header with Back Button */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-retro-pink/20 via-retro-purple/20 to-retro-cyan/20 backdrop-blur-md border-b-2 border-neon-pink">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="retro-button inline-flex items-center space-x-2 px-6 py-3 text-sm font-retro font-bold uppercase tracking-wider"
          >
            <i className="fas fa-arrow-left" aria-hidden="true"></i>
            <span className="hidden sm:inline">BACK</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Image */}
        {item.image && (
          <div className="mb-8 rounded-lg overflow-hidden neon-border-pink">
            <LazyImage
              src={`/static/images/${item.image}`}
              alt={item.title}
              className="w-full h-auto max-h-[500px] object-cover"
            />
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-retro font-black mb-6">
          <span className="neon-text-pink glitch">{item.title}</span>
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-sm mb-8 pb-6 border-b-2 border-neon-purple/30">
          <span className="inline-flex items-center space-x-2 bg-gradient-to-r from-retro-pink/30 to-retro-purple/30 px-4 py-2 rounded-lg border border-neon-pink/50">
            <i className="fas fa-folder text-neon-pink" aria-hidden="true"></i>
            <span className="text-white font-retro">{getCategoryLabel(category!)}</span>
          </span>

          {item.address && (
            <span className="inline-flex items-center space-x-2 bg-gradient-to-r from-retro-cyan/30 to-retro-blue/30 px-4 py-2 rounded-lg border border-neon-cyan/50">
              <i className="fas fa-map-marker-alt text-neon-cyan" aria-hidden="true"></i>
              <span className="text-white font-retro text-xs">{item.address}</span>
            </span>
          )}
        </div>

        {/* Audio Player */}
        {item.audio && <AudioPlayer src={`/static/audio/${item.audio}`} />}

        {/* Check-In Button */}
        <div className="mb-8">
          <CheckInButton
            locationId={id!}
            locationName={item.title}
            category={category!}
            requireGPS={false}
          />
        </div>

        {/* Story Content */}
        {item.story_content && (
          <div
            className="retro-card p-8 mb-8 prose prose-lg max-w-none prose-headings:text-neon-cyan prose-headings:font-retro prose-p:text-gray-100 prose-a:text-neon-pink prose-a:no-underline hover:prose-a:text-neon-purple prose-strong:text-neon-cyan prose-strong:font-retro prose-img:rounded-lg prose-img:neon-border-cyan"
            dangerouslySetInnerHTML={{ __html: item.story_content }}
          />
        )}

        {/* Additional Info */}
        {(item.phone || item.opening_hours || item.website) && (
          <div className="retro-card p-8 space-y-6">
            <h3 className="text-2xl font-retro font-black mb-6">
              <span className="neon-text-cyan">詳細資訊</span>
            </h3>

            {item.phone && (
              <div className="flex items-center space-x-4 bg-black/50 p-4 rounded-lg border border-neon-blue/30">
                <i className="fas fa-phone text-neon-blue w-6 text-xl animate-neon-pulse" aria-hidden="true"></i>
                <a
                  href={`tel:${item.phone}`}
                  className="text-white hover:text-neon-cyan transition-colors font-retro"
                >
                  {item.phone}
                </a>
              </div>
            )}

            {item.opening_hours && (
              <div className="flex items-start space-x-4 bg-black/50 p-4 rounded-lg border border-neon-purple/30">
                <i className="fas fa-clock text-neon-purple w-6 text-xl mt-1 animate-neon-pulse" aria-hidden="true"></i>
                <span className="text-white font-retro">{item.opening_hours}</span>
              </div>
            )}

            {item.website && (
              <a
                href={item.website}
                target="_blank"
                rel="noopener noreferrer"
                className="retro-button inline-flex items-center space-x-3 text-base mt-4"
              >
                <i className="fas fa-directions text-xl" aria-hidden="true"></i>
                <span>GOOGLE MAPS</span>
              </a>
            )}
          </div>
        )}
      </article>

      {/* Decorative Elements */}
      <div className="fixed top-20 left-0 w-24 h-24 border-l-4 border-t-4 border-neon-pink opacity-30 pointer-events-none"></div>
      <div className="fixed top-20 right-0 w-24 h-24 border-r-4 border-t-4 border-neon-cyan opacity-30 pointer-events-none"></div>
    </div>
  );
}
