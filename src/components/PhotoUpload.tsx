// 照片上傳組件

import { useState, useRef } from 'react';
import { photoService } from '@/services/photoService';
import { PHOTO_FILTERS, type PhotoFilter } from '@/types/photo';
import type { Category } from '@/types';

interface PhotoUploadProps {
  locationId: string;
  locationName: string;
  category: Category;
  username: string;
  level: number;
  onUploadSuccess?: () => void;
}

export default function PhotoUpload({
  locationId,
  locationName,
  category,
  username,
  level,
  onUploadSuccess,
}: PhotoUploadProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<PhotoFilter>('none');
  const [caption, setCaption] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 檢查檔案類型
    if (!file.type.startsWith('image/')) {
      alert('請選擇圖片檔案');
      return;
    }

    // 檢查檔案大小 (限制 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('圖片大小不能超過 10MB');
      return;
    }

    try {
      setIsUploading(true);
      const compressed = await photoService.compressImage(file);
      setSelectedImage(compressed);
      setShowPreview(true);
    } catch (error) {
      console.error('圖片處理失敗:', error);
      alert('圖片處理失敗，請重試');
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpload = () => {
    if (!selectedImage) return;

    try {
      photoService.uploadPhoto(
        locationId,
        locationName,
        category,
        selectedImage,
        caption,
        username,
        level,
        selectedFilter
      );

      // 重置狀態
      setSelectedImage(null);
      setSelectedFilter('none');
      setCaption('');
      setShowPreview(false);

      if (onUploadSuccess) {
        onUploadSuccess();
      }

      alert('照片上傳成功！');
    } catch (error) {
      console.error('上傳失敗:', error);
      alert('上傳失敗，請重試');
    }
  };

  const handleCancel = () => {
    setSelectedImage(null);
    setSelectedFilter('none');
    setCaption('');
    setShowPreview(false);
  };

  return (
    <div className="retro-card p-6 border-2 border-neon-purple/50">
      <h3 className="text-xl font-retro font-black mb-4 neon-text-purple">
        <i className="fas fa-camera mr-2" aria-hidden="true"></i>
        分享照片
      </h3>

      {!showPreview ? (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="retro-button w-full py-3"
          >
            {isUploading ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2" aria-hidden="true"></i>
                處理中...
              </>
            ) : (
              <>
                <i className="fas fa-image mr-2" aria-hidden="true"></i>
                選擇照片
              </>
            )}
          </button>
          <p className="text-sm text-gray-400 mt-2 text-center font-retro">
            支援 JPG、PNG 格式，最大 10MB
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* 預覽圖 */}
          <div className="relative rounded-lg overflow-hidden neon-border-purple">
            <img
              src={selectedImage || ''}
              alt="預覽"
              className="w-full h-auto"
              style={{
                filter: PHOTO_FILTERS[selectedFilter].css,
              }}
            />
          </div>

          {/* 濾鏡選擇 */}
          <div>
            <label className="block text-sm font-retro text-neon-cyan mb-2">濾鏡效果</label>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(PHOTO_FILTERS).map(([key, filter]) => (
                <button
                  key={key}
                  onClick={() => setSelectedFilter(key as PhotoFilter)}
                  className={`px-3 py-2 rounded border-2 font-retro text-sm transition-all ${
                    selectedFilter === key
                      ? 'border-neon-pink bg-neon-pink/20 text-neon-pink'
                      : 'border-gray-700 text-gray-300 hover:border-neon-pink/50'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* 說明文字 */}
          <div>
            <label className="block text-sm font-retro text-neon-cyan mb-2">照片說明</label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="分享你的探索心得..."
              maxLength={200}
              className="w-full px-4 py-3 bg-black/50 border-2 border-gray-700 rounded-lg text-white focus:border-neon-cyan transition-colors resize-none font-retro"
              rows={3}
            />
            <div className="text-xs text-gray-400 mt-1 text-right">
              {caption.length}/200
            </div>
          </div>

          {/* 操作按鈕 */}
          <div className="flex space-x-3">
            <button
              onClick={handleCancel}
              className="flex-1 px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg text-white hover:border-gray-600 transition-all font-retro"
            >
              取消
            </button>
            <button onClick={handleUpload} className="retro-button flex-1 py-3">
              <i className="fas fa-upload mr-2" aria-hidden="true"></i>
              上傳
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
