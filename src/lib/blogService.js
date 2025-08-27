import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';

const BLOG_COLLECTION = 'blog_posts';

// Blog post data structure
export const createBlogPost = async (blogData) => {
  try {
    const blogWithTimestamp = {
      ...blogData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      status: 'published',
      views: 0,
      likes: 0
    };
    
    const docRef = await addDoc(collection(db, BLOG_COLLECTION), blogWithTimestamp);
    return { id: docRef.id, ...blogWithTimestamp };
  } catch (error) {
    console.error('Error creating blog post:', error);
    throw error;
  }
};

export const getAllBlogPosts = async () => {
  try {
    const q = query(
      collection(db, BLOG_COLLECTION),
      where('status', '==', 'published'),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting blog posts:', error);
    throw error;
  }
};

export const getBlogPostById = async (postId) => {
  try {
    const docRef = doc(db, BLOG_COLLECTION, postId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error('Blog post not found');
    }
  } catch (error) {
    console.error('Error getting blog post:', error);
    throw error;
  }
};

export const updateBlogPost = async (postId, updateData) => {
  try {
    const docRef = doc(db, BLOG_COLLECTION, postId);
    const updateWithTimestamp = {
      ...updateData,
      updatedAt: serverTimestamp()
    };
    
    await updateDoc(docRef, updateWithTimestamp);
    return { id: postId, ...updateWithTimestamp };
  } catch (error) {
    console.error('Error updating blog post:', error);
    throw error;
  }
};

export const deleteBlogPost = async (postId) => {
  try {
    const docRef = doc(db, BLOG_COLLECTION, postId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Error deleting blog post:', error);
    throw error;
  }
};

export const getBlogPostsByCategory = async (category) => {
  try {
    const q = query(
      collection(db, BLOG_COLLECTION),
      where('category', '==', category),
      where('status', '==', 'published'),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting blog posts by category:', error);
    throw error;
  }
};

export const getBlogPostsByAuthor = async (authorId) => {
  try {
    const q = query(
      collection(db, BLOG_COLLECTION),
      where('authorId', '==', authorId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting blog posts by author:', error);
    throw error;
  }
};

export const incrementViews = async (postId) => {
  try {
    const docRef = doc(db, BLOG_COLLECTION, postId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const currentViews = docSnap.data().views || 0;
      await updateDoc(docRef, { views: currentViews + 1 });
    }
  } catch (error) {
    console.error('Error incrementing views:', error);
  }
};

export const likeBlogPost = async (postId) => {
  try {
    const docRef = doc(db, BLOG_COLLECTION, postId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const currentLikes = docSnap.data().likes || 0;
      await updateDoc(docRef, { likes: currentLikes + 1 });
    }
  } catch (error) {
    console.error('Error liking blog post:', error);
  }
};
