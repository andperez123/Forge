import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, Calendar, Clock, User, Tag, BookOpen, Share2, Twitter, Facebook, Linkedin } from 'lucide-react';
import { useBlogPosts } from '../lib/hooks/useFirebase';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export function BlogDetailPage() {
  const { slug } = useParams();
  const { blogPosts: posts, loading: isLoading, error } = useBlogPosts();
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (posts && posts.length > 0) {
      const foundPost = posts.find(p => p.slug === slug);
      console.log('Found post:', foundPost);
      console.log('Post content:', foundPost?.content);
      console.log('Post excerpt:', foundPost?.excerpt);
      setPost(foundPost);
    }
  }, [posts, slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mb-4"></div>
            <div className="h-12 bg-muted rounded w-3/4 mb-8"></div>
            <div className="h-64 bg-muted rounded mb-8"></div>
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-4 bg-muted rounded w-full"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Error Loading Article</h1>
            <p className="text-muted-foreground mb-8">There was an error loading the article: {error}</p>
            <Link to="/blog">
              <Button>Back to Blog</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist.</p>
            <Link to="/blog">
              <Button>Back to Blog</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

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

  const shareUrl = window.location.href;
  const shareText = `Check out this article: ${post.title}`;

  // Sample markdown content for demonstration
  const sampleMarkdown = post.content || `# ${post.title}

${post.excerpt || 'No excerpt available.'}

## Article Content

This article is currently being prepared. Please check back soon for the full content.

### What to Expect

- Detailed analysis and insights
- Step-by-step guides
- Code examples and strategies
- Risk management tips
- Best practices for DeFi

---

*This article is under development. The full content will be available soon.*`;

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Article Header */}
        <article className="mb-12">
          {/* Category and Tags */}
          <div className="flex items-center gap-3 mb-6">
            {post.category && (
              <Badge variant="secondary">{post.category}</Badge>
            )}
            {post.featured && (
              <Badge className="bg-gradient-to-r from-primary to-accent text-white">
                Featured
              </Badge>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          {/* Meta Information */}
          <div className="flex items-center gap-6 text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{post.author || 'Forge Team'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(post.publishedAt || post.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readTime || 5} min read</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="bg-gradient-to-br from-primary/20 to-accent/20 h-64 rounded-lg flex items-center justify-center mb-8">
            <BookOpen className="w-16 h-16 text-primary" />
          </div>
        </article>

        {/* Article Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="markdown-content">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({node, ...props}) => <h1 className="text-3xl font-bold text-foreground mb-6 mt-8" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-foreground mb-4 mt-8" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-xl font-bold text-foreground mb-3 mt-6" {...props} />,
                  h4: ({node, ...props}) => <h4 className="text-lg font-bold text-foreground mb-2 mt-4" {...props} />,
                  p: ({node, ...props}) => <p className="text-muted-foreground leading-relaxed mb-4" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal list-inside text-muted-foreground mb-4 space-y-1" {...props} />,
                  li: ({node, ...props}) => <li className="text-muted-foreground" {...props} />,
                  strong: ({node, ...props}) => <strong className="font-bold text-foreground" {...props} />,
                  em: ({node, ...props}) => <em className="italic text-muted-foreground" {...props} />,
                  code: ({node, inline, ...props}) => 
                    inline ? (
                      <code className="bg-muted px-2 py-1 rounded text-primary font-mono text-sm" {...props} />
                    ) : (
                      <code className="block bg-muted p-4 rounded text-foreground font-mono text-sm overflow-x-auto" {...props} />
                    ),
                  pre: ({node, ...props}) => <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4" {...props} />,
                  blockquote: ({node, ...props}) => (
                    <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground mb-4" {...props} />
                  ),
                  table: ({node, ...props}) => (
                    <div className="overflow-x-auto mb-4">
                      <table className="min-w-full border border-border rounded-lg" {...props} />
                    </div>
                  ),
                  th: ({node, ...props}) => <th className="border border-border px-4 py-2 text-left font-bold text-foreground" {...props} />,
                  td: ({node, ...props}) => <td className="border border-border px-4 py-2 text-muted-foreground" {...props} />,
                  a: ({node, ...props}) => <a className="text-primary hover:text-accent underline" {...props} />,
                  hr: ({node, ...props}) => <hr className="border-border my-8" {...props} />
                }}
              >
                {sampleMarkdown}
              </ReactMarkdown>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 pt-8 border-t border-border">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Tag className="w-5 h-5" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Share Article */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="w-5 h-5" />
                  Share Article
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank')}
                >
                  <Twitter className="w-4 h-4 mr-2" />
                  Share on Twitter
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')}
                >
                  <Facebook className="w-4 h-4 mr-2" />
                  Share on Facebook
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank')}
                >
                  <Linkedin className="w-4 h-4 mr-2" />
                  Share on LinkedIn
                </Button>
              </CardContent>
            </Card>

            {/* Article Info */}
            <Card>
              <CardHeader>
                <CardTitle>Article Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span>{post.category || 'General'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Published:</span>
                  <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Read Time:</span>
                  <span>{post.readTime || 5} minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Author:</span>
                  <span>{post.author || 'Forge Team'}</span>
                </div>
              </CardContent>
            </Card>

            {/* Related Articles */}
            <Card>
              <CardHeader>
                <CardTitle>Related Articles</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Related articles feature coming soon. Check back for more content!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16">
          <Card className="text-center">
            <CardHeader>
              <CardTitle>Stay Updated</CardTitle>
              <CardDescription>
                Get the latest DeFi insights and strategies delivered to your inbox
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
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
  );
}
