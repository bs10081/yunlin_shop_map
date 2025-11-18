import express from 'express';
import { contentService } from '../services/contentService.js';
import type { Category } from '../types/content.js';

const router = express.Router();

/**
 * GET /api/:category - Get all items for a category
 */
router.get('/:category', async (req, res, next) => {
  try {
    const { category } = req.params;

    // Validate category
    if (!['food', 'culture', 'shopping'].includes(category)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid category',
      });
    }

    const items = await contentService.loadContent(category as Category);

    res.json({
      success: true,
      data: items,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/:category/:id - Get a specific item
 */
router.get('/:category/:id', async (req, res, next) => {
  try {
    const { category, id } = req.params;

    // Validate category
    if (!['food', 'culture', 'shopping'].includes(category)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid category',
      });
    }

    const item = await contentService.getItem(category as Category, id);

    if (!item) {
      return res.status(404).json({
        success: false,
        error: 'Item not found',
      });
    }

    res.json({
      success: true,
      data: item,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
