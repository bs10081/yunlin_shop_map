import { useState, useEffect } from 'react';
import { api } from '@/utils/api';
import type { ContentItem, Category } from '@/types';

export function useContent(category: Category) {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadContent = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await api.getItems(category);

        if (mounted) {
          setItems(data);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to load content');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadContent();

    return () => {
      mounted = false;
    };
  }, [category]);

  return { items, loading, error };
}

export function useContentItem(category: Category, id: string) {
  const [item, setItem] = useState<ContentItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadItem = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await api.getItem(category, id);

        if (mounted) {
          setItem(data);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to load item');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadItem();

    return () => {
      mounted = false;
    };
  }, [category, id]);

  return { item, loading, error };
}
