import { useState, useEffect } from 'react';
import { getAllStrategies, getStrategyById } from '../strategiesService';
import { getAllBlogPosts, getBlogPostById } from '../blogService';

// Custom hook for strategies
export const useStrategies = () => {
  const [strategies, setStrategies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStrategies = async () => {
      try {
        setLoading(true);
        const data = await getAllStrategies();
        setStrategies(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStrategies();
  }, []);

  return { strategies, loading, error, refetch: () => {
    setLoading(true);
    getAllStrategies().then(setStrategies).catch(setError).finally(() => setLoading(false));
  }};
};

// Custom hook for a single strategy
export const useStrategy = (strategyId) => {
  const [strategy, setStrategy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!strategyId) {
      setLoading(false);
      return;
    }

    const fetchStrategy = async () => {
      try {
        setLoading(true);
        const data = await getStrategyById(strategyId);
        setStrategy(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStrategy();
  }, [strategyId]);

  return { strategy, loading, error };
};

// Custom hook for blog posts
export const useBlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        const data = await getAllBlogPosts();
        setBlogPosts(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  return { blogPosts, loading, error, refetch: () => {
    setLoading(true);
    getAllBlogPosts().then(setBlogPosts).catch(setError).finally(() => setLoading(false));
  }};
};

// Custom hook for a single blog post
export const useBlogPost = (postId) => {
  const [blogPost, setBlogPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!postId) {
      setLoading(false);
      return;
    }

    const fetchBlogPost = async () => {
      try {
        setLoading(true);
        const data = await getBlogPostById(postId);
        setBlogPost(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [postId]);

  return { blogPost, loading, error };
};
