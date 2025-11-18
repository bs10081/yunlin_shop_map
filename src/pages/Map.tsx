import { useEffect, useState } from 'react';
import Map80s from '@/components/Map80s';

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

export default function Map() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 檢查是否已經加載
    if (window.google && window.google.maps) {
      setIsLoaded(true);
      return;
    }

    // 創建script標籤
    const script = document.createElement('script');

    // 使用環境變量或替代方案
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

    if (!apiKey) {
      console.warn('Google Maps API key not found, using fallback mode');
      // 如果沒有API key，我們仍然可以顯示介面，只是地圖部分會顯示錯誤
      setError('Google Maps API key 未設定。請在 .env 文件中設置 VITE_GOOGLE_MAPS_API_KEY');
      return;
    }

    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      setIsLoaded(true);
    };

    script.onerror = () => {
      setError('無法加載 Google Maps。請檢查網絡連接。');
    };

    document.head.appendChild(script);

    return () => {
      // 清理：移除script標籤（如果需要）
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-retro-gradient flex items-center justify-center p-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-gradient-to-br from-retro-purple/90 to-retro-pink/90 backdrop-blur-lg rounded-lg border-2 border-neon-pink shadow-2xl p-8">
            <i className="fas fa-exclamation-triangle text-6xl text-neon-yellow mb-4 animate-neon-pulse"></i>
            <h2 className="text-3xl font-retro font-black text-neon-cyan mb-4">地圖載入錯誤</h2>
            <p className="text-white text-lg mb-6">{error}</p>
            <div className="bg-black/50 rounded p-4 mb-6">
              <p className="text-neon-green font-retro text-sm text-left">
                <strong>開發者提示:</strong>
                <br />
                1. 在項目根目錄創建 <code className="text-neon-pink">.env</code> 文件
                <br />
                2. 添加: <code className="text-neon-pink">VITE_GOOGLE_MAPS_API_KEY=你的API金鑰</code>
                <br />
                3. 重新啟動開發服務器
              </p>
            </div>
            <a
              href="/"
              className="inline-block bg-neon-blue text-black px-6 py-3 rounded font-retro font-bold hover:bg-neon-cyan transition-all"
            >
              <i className="fas fa-home mr-2"></i>
              返回首頁
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-retro-gradient flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-20 w-20 border-b-4 border-neon-pink mb-6"></div>
          <h2 className="text-3xl font-retro font-black text-neon-cyan animate-neon-pulse">
            LOADING MAP INTERFACE...
          </h2>
          <p className="text-neon-blue mt-4 font-retro">
            請稍候，正在初始化 80s 復古地圖系統
          </p>

          {/* 復古進度條 */}
          <div className="mt-8 w-64 mx-auto">
            <div className="h-2 bg-gray-800 border border-neon-purple rounded overflow-hidden">
              <div className="h-full bg-neon-gradient animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <Map80s />;
}
