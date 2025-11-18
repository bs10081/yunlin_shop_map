import { useEffect, useRef, useState } from 'react';
import { useContent } from '@/hooks/useContent';
import type { ContentItem } from '@/types';

// 斗六市中心座標
const DOULIU_CENTER = { lat: 23.7079, lng: 120.5444 };

interface LocationMarker {
  id: string;
  title: string;
  position: { lat: number; lng: number };
  category: string;
  item: ContentItem;
}

export default function Map80s() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<LocationMarker | null>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'food' | 'culture' | 'shopping'>('all');

  const { items: foodItems } = useContent('food');
  const { items: cultureItems } = useContent('culture');
  const { items: shoppingItems } = useContent('shopping');

  // 解析地址獲取座標（簡化版本，實際應使用 Geocoding API）
  const parseCoordinates = (address: string): { lat: number; lng: number } => {
    // 這裡使用隨機偏移模擬不同位置，實際應該使用 Google Geocoding API
    const offset = Math.random() * 0.02 - 0.01;
    return {
      lat: DOULIU_CENTER.lat + offset,
      lng: DOULIU_CENTER.lng + offset,
    };
  };

  // 初始化地圖
  useEffect(() => {
    if (!mapRef.current || map) return;

    const newMap = new google.maps.Map(mapRef.current, {
      center: DOULIU_CENTER,
      zoom: 15,
      styles: [
        {
          featureType: 'all',
          elementType: 'geometry',
          stylers: [{ color: '#1a1a2e' }],
        },
        {
          featureType: 'all',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#ff006e' }],
        },
        {
          featureType: 'all',
          elementType: 'labels.text.stroke',
          stylers: [{ color: '#1a1a2e' }, { lightness: -80 }],
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{ color: '#16213e' }],
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#8338ec' }],
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{ color: '#0f3460' }],
        },
        {
          featureType: 'poi',
          elementType: 'geometry',
          stylers: [{ color: '#16213e' }],
        },
      ],
      disableDefaultUI: true,
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: false,
    });

    setMap(newMap);
  }, []);

  // 添加標記
  useEffect(() => {
    if (!map) return;

    const allItems: LocationMarker[] = [];

    // 添加美食標記
    foodItems.forEach((item) => {
      if (item.address) {
        allItems.push({
          id: item.id,
          title: item.title,
          position: parseCoordinates(item.address),
          category: 'food',
          item,
        });
      }
    });

    // 添加文化標記
    cultureItems.forEach((item) => {
      if (item.address) {
        allItems.push({
          id: item.id,
          title: item.title,
          position: parseCoordinates(item.address),
          category: 'culture',
          item,
        });
      }
    });

    // 添加商店標記
    shoppingItems.forEach((item) => {
      if (item.address) {
        allItems.push({
          id: item.id,
          title: item.title,
          position: parseCoordinates(item.address),
          category: 'shopping',
          item,
        });
      }
    });

    // 創建標記
    allItems.forEach((location) => {
      if (activeCategory !== 'all' && location.category !== activeCategory) {
        return;
      }

      const markerColor =
        location.category === 'food'
          ? '#ff006e'
          : location.category === 'culture'
          ? '#3a86ff'
          : '#06ffa5';

      const marker = new google.maps.Marker({
        position: location.position,
        map: map,
        title: location.title,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: markerColor,
          fillOpacity: 0.9,
          strokeColor: '#ffffff',
          strokeWeight: 2,
          scale: 10,
        },
        animation: google.maps.Animation.DROP,
      });

      marker.addListener('click', () => {
        setSelectedMarker(location);
        map.panTo(location.position);
      });
    });
  }, [map, foodItems, cultureItems, shoppingItems, activeCategory]);

  return (
    <div className="relative h-screen overflow-hidden bg-retro-gradient">
      {/* 80s Grid Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div
          className="h-[200%] w-full bg-retro-grid animate-grid-slide"
          style={{
            backgroundSize: '50px 50px',
          }}
        ></div>
      </div>

      {/* CRT Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="w-full h-1 bg-gradient-to-b from-transparent via-neon-blue to-transparent opacity-30 animate-scanline"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-gradient-to-r from-retro-pink/20 via-retro-purple/20 to-retro-cyan/20 backdrop-blur-md border-b-2 border-neon-pink">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-4xl md:text-5xl font-retro font-black text-transparent bg-clip-text bg-neon-gradient animate-neon-pulse">
            <i className="fas fa-map-marked-alt mr-3"></i>
            斗六舊城 • 時空地圖
          </h1>
          <p className="mt-2 text-neon-cyan font-retro text-sm md:text-base tracking-wider">
            RETRO MAP INTERFACE • 1980s EDITION
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="relative z-10 bg-black/50 backdrop-blur-sm border-b border-neon-purple/50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-3">
            {[
              { id: 'all', label: '全部顯示', icon: 'fa-globe', color: 'neon-pink' },
              { id: 'food', label: '美食地圖', icon: 'fa-utensils', color: 'retro-pink' },
              { id: 'culture', label: '文化景點', icon: 'fa-landmark', color: 'retro-blue' },
              { id: 'shopping', label: '特色商店', icon: 'fa-store', color: 'retro-cyan' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-6 py-2 rounded font-retro font-bold text-sm uppercase tracking-wider transition-all transform hover:scale-105 ${
                  activeCategory === cat.id
                    ? `bg-${cat.color} text-black shadow-lg shadow-${cat.color}/50`
                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 border border-gray-600'
                }`}
                style={
                  activeCategory === cat.id
                    ? {
                        boxShadow: `0 0 20px var(--tw-shadow-color), 0 0 40px var(--tw-shadow-color)`,
                      }
                    : undefined
                }
              >
                <i className={`fas ${cat.icon} mr-2`}></i>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative z-0 h-[calc(100vh-200px)]">
        <div
          ref={mapRef}
          className="w-full h-full border-4 border-neon-purple/50"
          style={{
            filter: 'contrast(1.1) saturate(1.2)',
          }}
        ></div>

        {/* Map Loading Placeholder */}
        {!map && (
          <div className="absolute inset-0 flex items-center justify-center bg-retro-gradient">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-neon-pink mb-4"></div>
              <p className="text-neon-cyan font-retro text-xl tracking-wider animate-neon-pulse">
                LOADING MAP...
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Selected Marker Info */}
      {selectedMarker && (
        <div className="absolute bottom-8 left-8 right-8 md:left-auto md:w-96 z-20 animate-slide-up">
          <div className="bg-gradient-to-br from-retro-purple/90 to-retro-pink/90 backdrop-blur-lg rounded-lg border-2 border-neon-pink shadow-2xl overflow-hidden">
            {/* Glowing header */}
            <div className="bg-black/50 border-b-2 border-neon-cyan p-4">
              <h3 className="text-2xl font-retro font-black text-neon-cyan animate-neon-pulse">
                {selectedMarker.title}
              </h3>
              <span className="inline-block mt-2 px-3 py-1 bg-neon-pink text-black font-retro text-xs font-bold rounded">
                {selectedMarker.category === 'food'
                  ? '美食'
                  : selectedMarker.category === 'culture'
                  ? '文化'
                  : '商店'}
              </span>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              {selectedMarker.item.address && (
                <div className="flex items-start space-x-2 text-white">
                  <i className="fas fa-map-marker-alt text-neon-green mt-1"></i>
                  <span className="text-sm">{selectedMarker.item.address}</span>
                </div>
              )}

              {selectedMarker.item.phone && (
                <div className="flex items-center space-x-2 text-white">
                  <i className="fas fa-phone text-neon-blue"></i>
                  <a href={`tel:${selectedMarker.item.phone}`} className="text-sm hover:text-neon-cyan">
                    {selectedMarker.item.phone}
                  </a>
                </div>
              )}

              {selectedMarker.item.opening_hours && (
                <div className="flex items-start space-x-2 text-white">
                  <i className="fas fa-clock text-neon-yellow mt-1"></i>
                  <span className="text-sm">{selectedMarker.item.opening_hours}</span>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                {selectedMarker.item.website && (
                  <a
                    href={selectedMarker.item.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-neon-blue text-black px-4 py-2 rounded font-retro font-bold text-sm text-center hover:bg-neon-cyan transition-all shadow-lg hover:shadow-neon-blue/50"
                  >
                    <i className="fas fa-directions mr-2"></i>
                    導航
                  </a>
                )}

                {selectedMarker.item.story && (
                  <a
                    href={`/story/${selectedMarker.category}/${selectedMarker.id}`}
                    className="flex-1 bg-neon-pink text-black px-4 py-2 rounded font-retro font-bold text-sm text-center hover:bg-neon-purple hover:text-white transition-all shadow-lg hover:shadow-neon-pink/50"
                  >
                    <i className="fas fa-book-reader mr-2"></i>
                    故事
                  </a>
                )}
              </div>

              <button
                onClick={() => setSelectedMarker(null)}
                className="w-full bg-gray-800/80 text-neon-green px-4 py-2 rounded font-retro font-bold text-sm hover:bg-gray-700/80 transition-all border border-neon-green/50"
              >
                <i className="fas fa-times mr-2"></i>
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Decorative Corner Elements */}
      <div className="absolute top-20 left-0 w-32 h-32 border-l-4 border-t-4 border-neon-pink opacity-50 pointer-events-none"></div>
      <div className="absolute top-20 right-0 w-32 h-32 border-r-4 border-t-4 border-neon-cyan opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l-4 border-b-4 border-neon-purple opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-4 border-b-4 border-neon-blue opacity-50 pointer-events-none"></div>
    </div>
  );
}
