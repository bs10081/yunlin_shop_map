// 照片牆頁面

import { useState, useEffect } from 'react';
import { photoService } from '@/services/photoService';
import { PHOTO_FILTERS } from '@/types/photo';
import type { Photo } from '@/types/photo';
import type { Category } from '@/types';
import Breadcrumb from '@/components/Breadcrumb';

export default function PhotoWall() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    loadPhotos();
  }, [selectedCategory]);

  const loadPhotos = () => {
    let allPhotos = photoService.getAllPhotos();

    if (selectedCategory !== 'all') {
      allPhotos = photoService.getPhotosByCategory(selectedCategory);
    }

    setPhotos(allPhotos);
  };

  const handleLike = (photoId: string) => {
    photoService.likePhoto(photoId);
    loadPhotos();
  };

  const breadcrumbItems = [
    { label: '首頁', path: '/' },
    { label: '照片牆' },
  ];

  const categories = [
    { id: 'all' as const, label: '全部', icon: 'fa-th', color: 'text-neon-cyan' },
    { id: 'food' as Category, label: '美食', icon: 'fa-utensils', color: 'text-neon-pink' },
    { id: 'culture' as Category, label: '文化', icon: 'fa-landmark', color: 'text-neon-blue' },
    { id: 'shopping' as Category, label: '商店', icon: 'fa-store', color: 'text-neon-green' },
  ];

  return (
    <div className="retro-page-bg min-h-screen">
      <Breadcrumb items={breadcrumbItems} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 border-4 border-neon-purple"
            style={{
              background: 'linear-gradient(135deg, rgba(181, 55, 242, 0.2), rgba(255, 16, 240, 0.2))',
              boxShadow: '0 0 40px rgba(181, 55, 242, 0.6), 0 0 80px rgba(181, 55, 242, 0.4)',
            }}
          >
            <i className="fas fa-camera-retro text-5xl text-neon-purple animate-neon-pulse" aria-hidden="true"></i>
          </div>
          <h1 className="text-5xl font-retro font-black mb-4">
            <span className="neon-text-purple glitch">照片牆</span>
          </h1>
          <p className="text-lg text-retro-pink font-retro tracking-wide">
            PHOTO WALL • 1980s EDITION
          </p>
        </div>

        {/* 分類篩選 */}
        <div className="flex justify-center space-x-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-3 rounded-lg border-2 font-retro font-bold transition-all ${
                selectedCategory === cat.id
                  ? 'border-neon-pink bg-neon-pink/20 text-neon-pink'
                  : 'border-gray-700 text-gray-300 hover:border-neon-pink/50'
              }`}
            >
              <i className={`fas ${cat.icon} mr-2 ${cat.color}`} aria-hidden="true"></i>
              {cat.label}
              {cat.id !== 'all' && selectedCategory === cat.id && (
                <span className="ml-2 text-sm">({photos.length})</span>
              )}
            </button>
          ))}
        </div>

        {/* 照片網格 */}
        {photos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="retro-card overflow-hidden cursor-pointer hover:scale-105 transition-transform border-2 border-gray-700 hover:border-neon-purple"
                onClick={() => setSelectedPhoto(photo)}
              >
                {/* 圖片 */}
                <div className="aspect-square overflow-hidden">
                  <img
                    src={photo.imageData}
                    alt={photo.locationName}
                    className="w-full h-full object-cover"
                    style={{
                      filter: photo.filters ? PHOTO_FILTERS[photo.filters].css : '',
                    }}
                  />
                </div>

                {/* 資訊 */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <i className="fas fa-user text-neon-cyan" aria-hidden="true"></i>
                      <span className="text-white font-retro text-sm">{photo.username}</span>
                      <span className="text-xs text-gray-400">Lv.{photo.level}</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(photo.id);
                      }}
                      className="flex items-center space-x-1 text-neon-pink hover:scale-110 transition-transform"
                    >
                      <i className="fas fa-heart" aria-hidden="true"></i>
                      <span className="text-xs font-retro">{photo.likes}</span>
                    </button>
                  </div>

                  <h3 className="text-white font-retro font-bold mb-1">{photo.locationName}</h3>
                  {photo.caption && (
                    <p className="text-sm text-gray-300 line-clamp-2">{photo.caption}</p>
                  )}

                  <div className="mt-2 text-xs text-gray-500">
                    {new Date(photo.timestamp).toLocaleDateString('zh-TW')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <i className="fas fa-images text-6xl text-gray-600 mb-4" aria-hidden="true"></i>
            <p className="text-gray-400 font-retro text-lg">
              {selectedCategory === 'all' ? '還沒有照片' : '這個分類還沒有照片'}
            </p>
            <p className="text-gray-500 font-retro text-sm mt-2">
              趕快去探索並分享你的照片吧！
            </p>
          </div>
        )}
      </div>

      {/* 照片詳情模態框 */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="retro-card max-w-4xl w-full max-h-[90vh] overflow-y-auto border-4 border-neon-purple"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 關閉按鈕 */}
            <div className="sticky top-0 bg-gradient-to-b from-gray-900 to-transparent p-4 flex justify-end z-10">
              <button
                onClick={() => setSelectedPhoto(null)}
                className="w-10 h-10 rounded-full bg-gray-800 border-2 border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-black transition-all"
              >
                <i className="fas fa-times" aria-hidden="true"></i>
              </button>
            </div>

            {/* 圖片 */}
            <div className="px-6 pb-6">
              <img
                src={selectedPhoto.imageData}
                alt={selectedPhoto.locationName}
                className="w-full rounded-lg neon-border-purple"
                style={{
                  filter: selectedPhoto.filters ? PHOTO_FILTERS[selectedPhoto.filters].css : '',
                }}
              />

              {/* 詳細資訊 */}
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center border-2 border-neon-cyan">
                      <i className="fas fa-user text-white" aria-hidden="true"></i>
                    </div>
                    <div>
                      <div className="text-white font-retro font-bold">{selectedPhoto.username}</div>
                      <div className="text-sm text-gray-400">Level {selectedPhoto.level}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleLike(selectedPhoto.id)}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-neon-pink/20 to-neon-purple/20 border-2 border-neon-pink hover:scale-105 transition-transform"
                  >
                    <i className="fas fa-heart text-neon-pink text-xl" aria-hidden="true"></i>
                    <span className="text-white font-retro">{selectedPhoto.likes}</span>
                  </button>
                </div>

                <div>
                  <h2 className="text-2xl font-retro font-black neon-text-cyan mb-2">
                    {selectedPhoto.locationName}
                  </h2>
                  {selectedPhoto.caption && (
                    <p className="text-gray-200">{selectedPhoto.caption}</p>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-400 pt-4 border-t border-gray-700">
                  <span>{new Date(selectedPhoto.timestamp).toLocaleString('zh-TW')}</span>
                  {selectedPhoto.filters && selectedPhoto.filters !== 'none' && (
                    <span className="flex items-center space-x-2">
                      <i className="fas fa-magic" aria-hidden="true"></i>
                      <span>{PHOTO_FILTERS[selectedPhoto.filters].label}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
