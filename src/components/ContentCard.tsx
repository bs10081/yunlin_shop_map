import { Link } from 'react-router-dom';
import type { ContentItem } from '@/types';
import { LazyImage } from './LazyImage';

interface ContentCardProps {
  item: ContentItem;
}

export default function ContentCard({ item }: ContentCardProps) {
  const { id, title, image, address, phone, opening_hours, website, categories, story, category } =
    item;

  const getCategoryColor = (cat: string) => {
    const colors: Record<string, string> = {
      food: 'from-retro-orange to-retro-pink',
      culture: 'from-retro-blue to-retro-purple',
      shopping: 'from-retro-cyan to-retro-blue',
    };
    return colors[cat] || 'from-retro-pink to-retro-purple';
  };

  return (
    <div className="group relative retro-card overflow-hidden animate-fade-in hover:scale-[1.02] transition-transform duration-300">
      {/* Image with Neon Overlay */}
      <Link
        to={story ? `/story/${category}/${id}` : website}
        className="block relative h-48 overflow-hidden"
      >
        <LazyImage
          src={`/static/images/${image}`}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>

        {/* Story Badge */}
        {story && (
          <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-retro font-bold flex items-center space-x-1 neon-border-pink bg-black/50 backdrop-blur-sm">
            <i className="fas fa-book-open text-neon-pink" aria-hidden="true"></i>
            <span className="text-neon-pink">延伸閱讀</span>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-retro font-bold bg-gradient-to-r ${getCategoryColor(
              category || ''
            )} text-white shadow-lg`}
          >
            {category === 'food' ? '美食' : category === 'culture' ? '文化' : '商店'}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 bg-gradient-to-b from-gray-900/90 to-black/90 backdrop-blur-sm">
        <h3 className="text-xl font-retro font-black text-neon-cyan mb-3 group-hover:text-neon-pink transition-colors">
          {title}
        </h3>

        {categories && categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {categories.map((cat, index) => (
              <span
                key={index}
                className="inline-block bg-purple-900/50 text-cyan-300 text-xs px-2 py-1 rounded border border-purple-500/30 font-retro"
              >
                #{cat}
              </span>
            ))}
          </div>
        )}

        <div className="space-y-2 text-sm text-cyan-200 mb-4">
          {address && (
            <div className="flex items-start space-x-2">
              <i className="fas fa-map-marker-alt text-neon-pink mt-1 w-4" aria-hidden="true"></i>
              <span className="flex-1">{address}</span>
            </div>
          )}

          {phone && (
            <div className="flex items-center space-x-2">
              <i className="fas fa-phone text-neon-blue w-4" aria-hidden="true"></i>
              <a href={`tel:${phone}`} className="hover:text-neon-cyan transition-colors">
                {phone}
              </a>
            </div>
          )}

          {opening_hours && (
            <div className="flex items-start space-x-2">
              <i className="fas fa-clock text-neon-green mt-1 w-4" aria-hidden="true"></i>
              <span className="flex-1">{opening_hours}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {website && (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center space-x-2 px-4 py-2 rounded font-retro font-bold text-sm bg-gradient-to-r from-neon-blue to-neon-cyan text-black hover:from-neon-cyan hover:to-neon-green transition-all shadow-lg hover:shadow-neon-blue/50"
            >
              <i className="fas fa-directions" aria-hidden="true"></i>
              <span>導航</span>
            </a>
          )}

          {story && (
            <Link
              to={`/story/${category}/${id}`}
              className="flex-1 inline-flex items-center justify-center space-x-2 px-4 py-2 rounded font-retro font-bold text-sm bg-gradient-to-r from-retro-pink to-retro-purple text-white hover:from-neon-pink hover:to-neon-purple transition-all shadow-lg hover:shadow-neon-pink/50"
            >
              <i className="fas fa-book-reader" aria-hidden="true"></i>
              <span>閱讀</span>
            </Link>
          )}
        </div>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-neon-pink opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-neon-purple opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-neon-blue opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>
  );
}
