import { Link } from 'react-router-dom';
import type { ContentItem } from '@/types';
import { LazyImage } from './LazyImage';

interface ContentCardProps {
  item: ContentItem;
}

export default function ContentCard({ item }: ContentCardProps) {
  const { id, title, image, address, phone, opening_hours, website, categories, story, category } =
    item;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image */}
      <Link to={story ? `/story/${category}/${id}` : website} className="block relative h-48 overflow-hidden">
        <LazyImage
          src={`/static/images/${image}`}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {story && (
          <div className="absolute top-2 right-2 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
            <i className="fas fa-book-open" aria-hidden="true"></i>
            <span>延伸閱讀</span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>

        {categories && categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {categories.map((cat, index) => (
              <span
                key={index}
                className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
              >
                {cat}
              </span>
            ))}
          </div>
        )}

        <div className="space-y-2 text-sm text-gray-600">
          {address && (
            <div className="flex items-start space-x-2">
              <i className="fas fa-map-marker-alt text-primary-600 mt-1 w-4" aria-hidden="true"></i>
              <span>{address}</span>
            </div>
          )}

          {phone && (
            <div className="flex items-center space-x-2">
              <i className="fas fa-phone text-primary-600 w-4" aria-hidden="true"></i>
              <a href={`tel:${phone}`} className="hover:text-primary-600 transition-colors">
                {phone}
              </a>
            </div>
          )}

          {opening_hours && (
            <div className="flex items-start space-x-2">
              <i className="fas fa-clock text-primary-600 mt-1 w-4" aria-hidden="true"></i>
              <span>{opening_hours}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex flex-wrap gap-2">
          {website && (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              <i className="fas fa-directions" aria-hidden="true"></i>
              <span>導航</span>
            </a>
          )}

          {story && (
            <Link
              to={`/story/${category}/${id}`}
              className="flex-1 inline-flex items-center justify-center space-x-2 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <i className="fas fa-book-reader" aria-hidden="true"></i>
              <span>閱讀更多</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
