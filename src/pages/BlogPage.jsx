import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Button } from '../components/ui/button';
import { Search, Calendar, Clock, User, TrendingUp, BookOpen, ArrowRight, Tag } from 'lucide-react';
import { useBlogPosts } from '../lib/hooks/useFirebase';
import { BlogListingSEO } from '../components/SEOHead';

export function BlogPage() {
  const { blogPosts: posts, loading: isLoading, error } = useBlogPosts();
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');

  // Get unique categories and tags from Firebase data
  const categories = ['all', ...new Set(posts?.map(post => post.category) || [])];
  const allTags = posts?.flatMap(post => post.tags || []) || [];
  const uniqueTags = ['all', ...new Set(allTags)];

  // Filter and search logic
  useEffect(() => {
    if (!posts || posts.length === 0) {
      setFilteredPosts([]);
      return;
    }

    let filtered = posts;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    // Tag filter
    if (selectedTag !== 'all') {
      filtered = filtered.filter(post => post.tags && post.tags.includes(selectedTag));
    }

    // Sort by publish date (newest first) - use createdAt if publishedAt is not available
    filtered.sort((a, b) => {
      const dateA = a.publishedAt || a.createdAt;
      const dateB = b.publishedAt || b.createdAt;
      return new Date(dateB) - new Date(dateA);
    });

    setFilteredPosts(filtered);
  }, [posts, searchTerm, selectedCategory, selectedTag]);

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    
    // Handle Firestore timestamps
    if (dateString.toDate) {
      return dateString.toDate().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const BlogPostCard = ({ post, featured = false }) => (
    <Card className={`group hover:shadow-lg transition-all duration-300 ${featured ? 'md:col-span-2 lg:col-span-3' : ''}`}>
      <div className={`${featured ? 'md:flex' : ''}`}>
        {/* Image placeholder */}
        <div className={`bg-gradient-to-br from-primary/20 to-accent/20 ${featured ? 'md:w-1/2' : 'h-48'} flex items-center justify-center`}>
          <BookOpen className={`${featured ? 'w-16 h-16' : 'w-12 h-12'} text-primary`} />
        </div>
        
        <div className={`${featured ? 'md:w-1/2' : ''}`}>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">{post.category}</Badge>
              {post.featured && <Badge className="bg-gradient-to-r from-primary to-accent text-white">Featured</Badge>}
            </div>
            <CardTitle className={`group-hover:text-primary transition-colors ${featured ? 'text-2xl' : 'text-xl'}`}>
              <Link to={`/blog/${post.slug}`}>
                {post.title}
              </Link>
            </CardTitle>
            <CardDescription className={`${featured ? 'text-base' : 'text-sm'}`}>
              {post.excerpt}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags && post.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {post.tags && post.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{post.tags.length - 3} more
                </Badge>
              )}
            </div>

            {/* Meta info */}
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime || 5} min read</span>
                </div>
              </div>
            </div>

            {/* Read more link */}
            <Link 
              to={`/blog/${post.slug}`}
              className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors font-medium"
            >
              Read More
              <ArrowRight className="w-4 h-4" />
            </Link>
          </CardContent>
        </div>
      </div>
    </Card>
  );

  return (
    <>
      <BlogListingSEO posts={posts || []} />
      <div className="min-h-screen bg-background pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-foreground">Forge </span>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Blog</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Insights, strategies, and updates from the world of DeFi. Stay ahead with expert analysis and practical guides.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search articles, authors, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedTag} onValueChange={setSelectedTag}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Tag" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueTags.map((tag) => (
                    <SelectItem key={tag} value={tag}>
                      {tag === 'all' ? 'All Tags' : tag}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-400">Error loading blog posts: {error}</p>
            </div>
          )}

          {/* Results count */}
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              Showing {filteredPosts.length} of {posts?.length || 0} articles
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="w-4 h-4" />
              <span>Updated weekly</span>
            </div>
          </div>
        </div>

        {/* Featured Posts */}
        {filteredPosts.some(post => post.featured) && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-primary" />
              Featured Articles
            </h2>
            <div className="grid gap-6">
              {filteredPosts.filter(post => post.featured).map((post) => (
                <BlogPostCard key={post.id} post={post} featured={true} />
              ))}
            </div>
          </div>
        )}

        {/* All Posts */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Latest Articles</h2>
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-muted" />
                  <CardHeader>
                    <div className="h-6 bg-muted rounded w-3/4 mb-2" />
                    <div className="h-4 bg-muted rounded w-full" />
                    <div className="h-4 bg-muted rounded w-2/3" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded w-full" />
                      <div className="h-4 bg-muted rounded w-1/2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.filter(post => !post.featured).map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                <Search className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No articles found</h3>
              <p className="text-muted-foreground mb-6">
                {posts && posts.length === 0 
                  ? "No blog posts available yet. Check back soon for new content!"
                  : "Try adjusting your search criteria or filters"
                }
              </p>
              {posts && posts.length === 0 ? (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    To add sample blog posts, visit the Firebase Test page and click "Add Sample Data"
                  </p>
                  <Link to="/admin">
                    <Button variant="outline">Go to Admin</Button>
                  </Link>
                </div>
              ) : (
                <Button onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedTag('all');
                }}>
                  Clear Filters
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <Tag className="w-5 h-5 text-primary" />
                Stay Updated
              </CardTitle>
              <CardDescription>
                Get the latest DeFi insights and strategies delivered to your inbox
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Input placeholder="Enter your email address" className="flex-1" />
                <Button className="bg-gradient-to-r from-primary to-accent">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                No spam, unsubscribe anytime. We respect your privacy.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </>
  );
}

