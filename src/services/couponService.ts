// 優惠券管理服務

import type { Coupon } from '@/types/coupon';
import { COUPONS } from '@/types/coupon';
import type { UserProgress } from '@/types/game';

const STORAGE_KEY = 'yunlin_coupons';

class CouponService {
  /**
   * 獲取用戶優惠券
   */
  getUserCoupons(): Coupon[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        const coupons = JSON.parse(data);
        return coupons.map((c: any) => ({
          ...c,
          expiresAt: new Date(c.expiresAt),
          redeemedAt: c.redeemedAt ? new Date(c.redeemedAt) : undefined,
        }));
      }
    } catch (error) {
      console.error('Error loading coupons:', error);
    }
    return [];
  }

  /**
   * 保存優惠券
   */
  private saveCoupons(coupons: Coupon[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(coupons));
    } catch (error) {
      console.error('Error saving coupons:', error);
    }
  }

  /**
   * 檢查用戶是否符合優惠券條件
   */
  checkEligibility(
    coupon: Omit<Coupon, 'redeemed' | 'redeemedAt'>,
    progress: UserProgress
  ): { eligible: boolean; reason?: string } {
    // 檢查等級
    if (progress.level < coupon.requiredLevel) {
      return {
        eligible: false,
        reason: `需要達到 Level ${coupon.requiredLevel}`,
      };
    }

    // 檢查打卡數
    if (coupon.requiredCheckIns && progress.stats.totalCheckIns < coupon.requiredCheckIns) {
      return {
        eligible: false,
        reason: `需要完成 ${coupon.requiredCheckIns} 次打卡`,
      };
    }

    // 檢查徽章
    if (coupon.requiredBadges && coupon.requiredBadges.length > 0) {
      const unlockedBadgeIds = progress.badges.filter((b) => b.unlocked).map((b) => b.id);
      const hasAllBadges = coupon.requiredBadges.every((badgeId) =>
        unlockedBadgeIds.includes(badgeId)
      );

      if (!hasAllBadges) {
        return {
          eligible: false,
          reason: '需要解鎖特定徽章',
        };
      }
    }

    return { eligible: true };
  }

  /**
   * 解鎖可用優惠券
   */
  unlockAvailableCoupons(progress: UserProgress): Coupon[] {
    const userCoupons = this.getUserCoupons();
    const userCouponIds = new Set(userCoupons.map((c) => c.id));
    const unlockedCoupons: Coupon[] = [];

    // 檢查每個優惠券
    COUPONS.forEach((couponTemplate) => {
      // 如果已經擁有，跳過
      if (userCouponIds.has(couponTemplate.id)) return;

      // 檢查是否符合條件
      const { eligible } = this.checkEligibility(couponTemplate, progress);
      if (eligible) {
        const newCoupon: Coupon = {
          ...couponTemplate,
          redeemed: false,
        };
        userCoupons.push(newCoupon);
        unlockedCoupons.push(newCoupon);
      }
    });

    if (unlockedCoupons.length > 0) {
      this.saveCoupons(userCoupons);
    }

    return unlockedCoupons;
  }

  /**
   * 兌換優惠券
   */
  redeemCoupon(couponId: string): boolean {
    const coupons = this.getUserCoupons();
    const coupon = coupons.find((c) => c.id === couponId);

    if (!coupon) return false;
    if (coupon.redeemed) return false;
    if (coupon.expiresAt < new Date()) return false;

    coupon.redeemed = true;
    coupon.redeemedAt = new Date();

    this.saveCoupons(coupons);
    return true;
  }

  /**
   * 獲取可用優惠券
   */
  getAvailableCoupons(): Coupon[] {
    return this.getUserCoupons()
      .filter((c) => !c.redeemed && c.expiresAt > new Date())
      .sort((a, b) => a.expiresAt.getTime() - b.expiresAt.getTime());
  }

  /**
   * 獲取已使用優惠券
   */
  getRedeemedCoupons(): Coupon[] {
    return this.getUserCoupons()
      .filter((c) => c.redeemed)
      .sort((a, b) => (b.redeemedAt?.getTime() || 0) - (a.redeemedAt?.getTime() || 0));
  }
}

export const couponService = new CouponService();
