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

const STRATEGIES_COLLECTION = 'strategies';

// Strategy data structure
export const createStrategy = async (strategyData) => {
  try {
    const strategyWithTimestamp = {
      ...strategyData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      status: 'active'
    };
    
    const docRef = await addDoc(collection(db, STRATEGIES_COLLECTION), strategyWithTimestamp);
    return { id: docRef.id, ...strategyWithTimestamp };
  } catch (error) {
    console.error('Error creating strategy:', error);
    throw error;
  }
};

export const getAllStrategies = async () => {
  try {
    const q = query(
      collection(db, STRATEGIES_COLLECTION),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting strategies:', error);
    throw error;
  }
};

export const getStrategyById = async (strategyId) => {
  try {
    const docRef = doc(db, STRATEGIES_COLLECTION, strategyId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error('Strategy not found');
    }
  } catch (error) {
    console.error('Error getting strategy:', error);
    throw error;
  }
};

export const updateStrategy = async (strategyId, updateData) => {
  try {
    const docRef = doc(db, STRATEGIES_COLLECTION, strategyId);
    const updateWithTimestamp = {
      ...updateData,
      updatedAt: serverTimestamp()
    };
    
    await updateDoc(docRef, updateWithTimestamp);
    return { id: strategyId, ...updateWithTimestamp };
  } catch (error) {
    console.error('Error updating strategy:', error);
    throw error;
  }
};

export const deleteStrategy = async (strategyId) => {
  try {
    const docRef = doc(db, STRATEGIES_COLLECTION, strategyId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Error deleting strategy:', error);
    throw error;
  }
};

export const getStrategiesByCategory = async (category) => {
  try {
    const q = query(
      collection(db, STRATEGIES_COLLECTION),
      where('category', '==', category),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting strategies by category:', error);
    throw error;
  }
};

export const getStrategiesByUser = async (userId) => {
  try {
    const q = query(
      collection(db, STRATEGIES_COLLECTION),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting strategies by user:', error);
    throw error;
  }
};
