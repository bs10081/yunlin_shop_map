// 打卡按鈕組件

import { useState } from 'react';
import { useGame } from '@/hooks/useGame';
import type { Category } from '@/types';

interface CheckInButtonProps {
  locationId: string;
  locationName: string;
  category: Category;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  requireGPS?: boolean; // 是否需要 GPS 驗證
  gpsRadius?: number; // GPS 驗證半徑（公尺），預設 100
}

export default function CheckInButton({
  locationId,
  locationName,
  category,
  coordinates,
  requireGPS = false,
  gpsRadius = 100,
}: CheckInButtonProps) {
  const { checkIn, hasCheckedIn, getCheckInCount } = useGame();
  const [isChecking, setIsChecking] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string>('');

  const isCheckedIn = hasCheckedIn(locationId);
  const checkInCount = getCheckInCount(locationId);

  const handleCheckIn = async () => {
    setIsChecking(true);
    setError('');

    try {
      let userCoords: { latitude: number; longitude: number } | undefined;

      // GPS 驗證
      if (requireGPS && coordinates) {
        if (!navigator.geolocation) {
          throw new Error('您的裝置不支援 GPS 定位');
        }

        try {
          const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              enableHighAccuracy: true,
              timeout: 10000,
              maximumAge: 0,
            });
          });

          userCoords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };

          // 計算距離
          const distance = calculateDistance(
            userCoords.latitude,
            userCoords.longitude,
            coordinates.latitude,
            coordinates.longitude
          );

          if (distance > gpsRadius) {
            throw new Error(`您距離此地點還有 ${Math.round(distance)} 公尺，請靠近後再打卡`);
          }
        } catch (gpsError: any) {
          if (gpsError.code === 1) {
            throw new Error('請允許使用您的位置資訊');
          } else if (gpsError.code === 2) {
            throw new Error('無法取得位置資訊，請確認 GPS 已開啟');
          } else if (gpsError.code === 3) {
            throw new Error('定位超時，請稍後再試');
          } else {
            throw gpsError;
          }
        }
      }

      // 執行打卡
      checkIn(locationId, category, userCoords || coordinates);

      // 顯示成功動畫
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (err: any) {
      setError(err.message || '打卡失敗，請稍後再試');
    } finally {
      setIsChecking(false);
    }
  };

  // 計算距離（公尺）
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371e3;
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  return (
    <div className="relative">
      {/* 打卡按鈕 */}
      <button
        onClick={handleCheckIn}
        disabled={isChecking || showSuccess}
        className={`retro-button w-full py-4 text-lg font-bold uppercase tracking-wider transition-all ${
          isChecking ? 'opacity-50 cursor-not-allowed' : ''
        } ${showSuccess ? 'animate-pulse' : ''}`}
      >
        {isChecking ? (
          <>
            <i className="fas fa-spinner fa-spin mr-2" aria-hidden="true"></i>
            定位中...
          </>
        ) : showSuccess ? (
          <>
            <i className="fas fa-check-circle mr-2" aria-hidden="true"></i>
            打卡成功！+20 EXP
          </>
        ) : isCheckedIn ? (
          <>
            <i className="fas fa-redo mr-2" aria-hidden="true"></i>
            再次打卡 ({checkInCount})
          </>
        ) : (
          <>
            <i className="fas fa-map-pin mr-2" aria-hidden="true"></i>
            {requireGPS ? '開始打卡 (需要 GPS)' : '開始打卡'}
          </>
        )}
      </button>

      {/* 錯誤提示 */}
      {error && (
        <div className="mt-3 p-3 bg-red-900/50 border-2 border-red-500 rounded-lg animate-slide-up">
          <div className="flex items-center space-x-2">
            <i className="fas fa-exclamation-triangle text-red-400" aria-hidden="true"></i>
            <span className="text-sm text-red-200 font-retro">{error}</span>
          </div>
        </div>
      )}

      {/* 打卡狀態 */}
      {isCheckedIn && !showSuccess && (
        <div className="mt-3 p-3 bg-gradient-to-r from-neon-green/20 to-neon-cyan/20 border-2 border-neon-green rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <i className="fas fa-check-circle text-neon-green" aria-hidden="true"></i>
              <span className="text-sm text-white font-retro">已打卡 {checkInCount} 次</span>
            </div>
            <span className="text-xs text-neon-cyan font-retro">探索者 +</span>
          </div>
        </div>
      )}

      {/* 成功動畫 */}
      {showSuccess && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="absolute w-full h-full bg-gradient-to-r from-neon-pink/20 to-neon-cyan/20 rounded-lg animate-ping"></div>
          <div className="relative text-6xl animate-bounce">
            <i className="fas fa-star text-neon-pink" style={{ filter: 'drop-shadow(0 0 20px currentColor)' }}></i>
          </div>
        </div>
      )}
    </div>
  );
}
