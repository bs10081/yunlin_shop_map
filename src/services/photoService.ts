// 照片管理服務

import type { Photo, PhotoFilter } from '@/types/photo';
import type { Category } from '@/types';

const STORAGE_KEY = 'yunlin_photos';
const MAX_PHOTOS = 100; // 最多存儲100張照片

class PhotoService {
  /**
   * 獲取所有照片
   */
  getAllPhotos(): Photo[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        const photos = JSON.parse(data);
        return photos.map((p: any) => ({
          ...p,
          timestamp: new Date(p.timestamp),
        }));
      }
    } catch (error) {
      console.error('Error loading photos:', error);
    }
    return [];
  }

  /**
   * 保存照片
   */
  private savePhotos(photos: Photo[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
    } catch (error) {
      console.error('Error saving photos:', error);
    }
  }

  /**
   * 上傳照片
   */
  uploadPhoto(
    locationId: string,
    locationName: string,
    category: Category,
    imageData: string,
    caption: string,
    username: string,
    level: number,
    filter: PhotoFilter = 'none'
  ): Photo {
    const photos = this.getAllPhotos();

    const photo: Photo = {
      id: `photo_${Date.now()}`,
      locationId,
      locationName,
      category,
      imageData,
      caption,
      username,
      level,
      timestamp: new Date(),
      likes: 0,
      filters: filter,
    };

    photos.unshift(photo); // 新照片放在最前面

    // 限制照片數量
    if (photos.length > MAX_PHOTOS) {
      photos.splice(MAX_PHOTOS);
    }

    this.savePhotos(photos);
    return photo;
  }

  /**
   * 獲取地點的照片
   */
  getPhotosByLocation(locationId: string): Photo[] {
    return this.getAllPhotos().filter((p) => p.locationId === locationId);
  }

  /**
   * 獲取分類的照片
   */
  getPhotosByCategory(category: Category): Photo[] {
    return this.getAllPhotos().filter((p) => p.category === category);
  }

  /**
   * 點贊照片
   */
  likePhoto(photoId: string): boolean {
    const photos = this.getAllPhotos();
    const photo = photos.find((p) => p.id === photoId);

    if (photo) {
      photo.likes++;
      this.savePhotos(photos);
      return true;
    }

    return false;
  }

  /**
   * 刪除照片
   */
  deletePhoto(photoId: string): boolean {
    let photos = this.getAllPhotos();
    const initialLength = photos.length;

    photos = photos.filter((p) => p.id !== photoId);

    if (photos.length < initialLength) {
      this.savePhotos(photos);
      return true;
    }

    return false;
  }

  /**
   * 壓縮圖片
   */
  async compressImage(file: File, maxWidth: number = 1200, quality: number = 0.8): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = new Image();

        img.onload = () => {
          const canvas = document.createElement('canvas');
          let { width, height } = img;

          // 計算縮放比例
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('無法取得 canvas context'));
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);

          // 轉換為 base64
          const compressedData = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedData);
        };

        img.onerror = () => reject(new Error('圖片載入失敗'));
        img.src = e.target?.result as string;
      };

      reader.onerror = () => reject(new Error('檔案讀取失敗'));
      reader.readAsDataURL(file);
    });
  }
}

export const photoService = new PhotoService();
