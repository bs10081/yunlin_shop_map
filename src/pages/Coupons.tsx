import { useState, useEffect } from 'react';
import { useGame } from '@/hooks/useGame';
import { couponService } from '@/services/couponService';
import type { Coupon } from '@/types/coupon';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Coupons() {
  const { progress } = useGame();
  const [availableCoupons, setAvailableCoupons] = useState<Coupon[]>([]);
  const [redeemedCoupons, setRedeemedCoupons] = useState<Coupon[]>([]);
  const [selectedTab, setSelectedTab] = useState<'available' | 'redeemed'>('available');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCoupons();
  }, []);

  const loadCoupons = () => {
    setLoading(true);

    // 解鎖可用優惠券
    const unlockedCoupons = couponService.unlockAvailableCoupons(progress);
    if (unlockedCoupons.length > 0) {
      console.log('解鎖了新優惠券:', unlockedCoupons);
    }

    // 獲取優惠券
    const available = couponService.getAvailableCoupons();
    const redeemed = couponService.getRedeemedCoupons();

    setAvailableCoupons(available);
    setRedeemedCoupons(redeemed);
    setLoading(false);
  };

  const handleRedeem = (couponId: string) => {
    const success = couponService.redeemCoupon(couponId);
    if (success) {
      loadCoupons();
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const getDaysUntilExpiry = (expiresAt: Date) => {
    const now = new Date();
    const expiry = new Date(expiresAt);
    const diff = expiry.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  const CouponCard = ({ coupon, isRedeemed }: { coupon: Coupon; isRedeemed: boolean }) => {
    const daysLeft = getDaysUntilExpiry(coupon.expiresAt);
    const isExpiring = daysLeft <= 7;

    return (
      <div
        className={`retro-card p-6 ${
          isRedeemed ? 'opacity-60' : ''
        } ${isExpiring && !isRedeemed ? 'border-neon-orange animate-neon-pulse' : ''}`}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-2xl font-retro font-black mb-2">
              <span className={isRedeemed ? 'text-gray-400' : 'neon-text-pink'}>
                {coupon.title}
              </span>
            </h3>
            <p className="text-gray-300 text-sm mb-2">{coupon.description}</p>
          </div>
          <div
            className={`px-4 py-2 rounded-lg border-2 ${
              isRedeemed
                ? 'bg-gray-800 border-gray-600 text-gray-400'
                : 'bg-gradient-to-r from-retro-pink/30 to-retro-purple/30 border-neon-pink'
            }`}
          >
            <span className="text-xl font-retro font-black">{coupon.discount}</span>
          </div>
        </div>

        {/* Category */}
        {coupon.category && (
          <div className="mb-3">
            <span className="inline-flex items-center space-x-2 bg-gradient-to-r from-retro-cyan/20 to-retro-blue/20 px-3 py-1 rounded-lg border border-neon-cyan/50 text-xs">
              <i
                className={`fas ${
                  coupon.category === 'food'
                    ? 'fa-utensils'
                    : coupon.category === 'culture'
                    ? 'fa-landmark'
                    : 'fa-store'
                } text-neon-cyan`}
              />
              <span className="text-white font-retro">
                {coupon.category === 'food'
                  ? '美食'
                  : coupon.category === 'culture'
                  ? '文化'
                  : '購物'}
              </span>
            </span>
          </div>
        )}

        {/* Location */}
        {coupon.locationName && (
          <div className="mb-3">
            <span className="inline-flex items-center space-x-2 text-sm text-gray-300">
              <i className="fas fa-map-marker-alt text-neon-cyan" />
              <span>{coupon.locationName}</span>
            </span>
          </div>
        )}

        {/* Coupon Code */}
        <div className="mb-4 p-4 bg-black/50 rounded-lg border-2 border-dashed border-neon-cyan/50">
          <div className="text-xs text-gray-400 mb-1 font-retro">優惠碼</div>
          <div className="text-2xl font-retro font-black text-neon-cyan tracking-wider">
            {coupon.code}
          </div>
        </div>

        {/* Expiry */}
        <div className="flex items-center justify-between mb-4 text-sm">
          <span className="text-gray-400 font-retro">
            {isRedeemed && coupon.redeemedAt ? (
              <>使用於：{formatDate(coupon.redeemedAt)}</>
            ) : (
              <>有效期限：{formatDate(coupon.expiresAt)}</>
            )}
          </span>
          {!isRedeemed && (
            <span
              className={`font-retro ${
                isExpiring ? 'text-neon-orange animate-pulse' : 'text-neon-cyan'
              }`}
            >
              剩餘 {daysLeft} 天
            </span>
          )}
        </div>

        {/* Action Button */}
        {!isRedeemed && (
          <button
            onClick={() => handleRedeem(coupon.id)}
            className="retro-button w-full text-center"
          >
            <i className="fas fa-check-circle mr-2" />
            立即使用
          </button>
        )}

        {isRedeemed && (
          <div className="w-full text-center py-3 bg-gray-800/50 rounded-lg border border-gray-700">
            <i className="fas fa-check-circle text-gray-500 mr-2" />
            <span className="text-gray-500 font-retro">已使用</span>
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="retro-page-bg min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-retro font-black mb-4">
            <span className="neon-text-pink glitch">優惠券中心</span>
          </h1>
          <p className="text-gray-300 text-lg font-retro">
            探索斗六，解鎖專屬優惠
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="retro-card p-6 text-center">
            <div className="text-4xl font-retro font-black neon-text-cyan mb-2">
              {availableCoupons.length}
            </div>
            <div className="text-gray-300 font-retro">可用優惠券</div>
          </div>
          <div className="retro-card p-6 text-center">
            <div className="text-4xl font-retro font-black neon-text-purple mb-2">
              {redeemedCoupons.length}
            </div>
            <div className="text-gray-300 font-retro">已使用</div>
          </div>
          <div className="retro-card p-6 text-center">
            <div className="text-4xl font-retro font-black neon-text-pink mb-2">
              {progress.level}
            </div>
            <div className="text-gray-300 font-retro">當前等級</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-6">
          <button
            onClick={() => setSelectedTab('available')}
            className={`flex-1 py-3 px-6 rounded-lg font-retro font-bold transition-all ${
              selectedTab === 'available'
                ? 'bg-gradient-to-r from-retro-pink to-retro-purple text-white border-2 border-neon-pink shadow-lg'
                : 'bg-gray-800/50 text-gray-400 border-2 border-gray-700 hover:border-gray-600'
            }`}
          >
            <i className="fas fa-ticket-alt mr-2" />
            可用優惠券 ({availableCoupons.length})
          </button>
          <button
            onClick={() => setSelectedTab('redeemed')}
            className={`flex-1 py-3 px-6 rounded-lg font-retro font-bold transition-all ${
              selectedTab === 'redeemed'
                ? 'bg-gradient-to-r from-retro-pink to-retro-purple text-white border-2 border-neon-pink shadow-lg'
                : 'bg-gray-800/50 text-gray-400 border-2 border-gray-700 hover:border-gray-600'
            }`}
          >
            <i className="fas fa-history mr-2" />
            使用記錄 ({redeemedCoupons.length})
          </button>
        </div>

        {/* Content */}
        {selectedTab === 'available' ? (
          <div>
            {availableCoupons.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableCoupons.map((coupon) => (
                  <CouponCard key={coupon.id} coupon={coupon} isRedeemed={false} />
                ))}
              </div>
            ) : (
              <div className="retro-card p-12 text-center">
                <i className="fas fa-ticket-alt text-6xl text-gray-600 mb-4" />
                <p className="text-gray-400 text-lg font-retro mb-4">目前沒有可用的優惠券</p>
                <p className="text-gray-500 text-sm font-retro">
                  繼續探索斗六，提升等級解鎖更多優惠！
                </p>
              </div>
            )}
          </div>
        ) : (
          <div>
            {redeemedCoupons.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {redeemedCoupons.map((coupon) => (
                  <CouponCard key={coupon.id} coupon={coupon} isRedeemed={true} />
                ))}
              </div>
            ) : (
              <div className="retro-card p-12 text-center">
                <i className="fas fa-history text-6xl text-gray-600 mb-4" />
                <p className="text-gray-400 text-lg font-retro mb-4">尚未使用任何優惠券</p>
                <p className="text-gray-500 text-sm font-retro">
                  開始使用優惠券，享受專屬折扣！
                </p>
              </div>
            )}
          </div>
        )}

        {/* How to Unlock */}
        <div className="retro-card p-8 mt-8">
          <h2 className="text-2xl font-retro font-black mb-6">
            <span className="neon-text-cyan">
              <i className="fas fa-lightbulb mr-2" />
              如何解鎖優惠券？
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3 bg-black/30 p-4 rounded-lg border border-neon-cyan/30">
              <i className="fas fa-level-up-alt text-neon-cyan text-2xl mt-1" />
              <div>
                <div className="text-white font-retro font-bold mb-1">提升等級</div>
                <div className="text-gray-400 text-sm">
                  完成打卡和任務，提升探險家等級解鎖高級優惠券
                </div>
              </div>
            </div>
            <div className="flex items-start space-x-3 bg-black/30 p-4 rounded-lg border border-neon-purple/30">
              <i className="fas fa-medal text-neon-purple text-2xl mt-1" />
              <div>
                <div className="text-white font-retro font-bold mb-1">收集徽章</div>
                <div className="text-gray-400 text-sm">
                  解鎖特定徽章可獲得專屬優惠券獎勵
                </div>
              </div>
            </div>
            <div className="flex items-start space-x-3 bg-black/30 p-4 rounded-lg border border-neon-pink/30">
              <i className="fas fa-map-marker-alt text-neon-pink text-2xl mt-1" />
              <div>
                <div className="text-white font-retro font-bold mb-1">完成打卡</div>
                <div className="text-gray-400 text-sm">
                  累積打卡次數可解鎖更多優惠券
                </div>
              </div>
            </div>
            <div className="flex items-start space-x-3 bg-black/30 p-4 rounded-lg border border-neon-orange/30">
              <i className="fas fa-scroll text-neon-orange text-2xl mt-1" />
              <div>
                <div className="text-white font-retro font-bold mb-1">完成任務</div>
                <div className="text-gray-400 text-sm">
                  持續完成每日和主線任務，快速提升進度
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="fixed bottom-20 left-0 w-32 h-32 border-l-4 border-b-4 border-neon-cyan opacity-20 pointer-events-none" />
      <div className="fixed bottom-20 right-0 w-32 h-32 border-r-4 border-b-4 border-neon-pink opacity-20 pointer-events-none" />
    </div>
  );
}
