import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { db } from '../lib/firebase';
import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';

export function FirebaseTest() {
  const [connectionStatus, setConnectionStatus] = useState('Testing...');
  const [testData, setTestData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Test Firebase connection
  useEffect(() => {
    const testConnection = async () => {
      try {
        // Try to access Firestore
        const testCollection = collection(db, 'test');
        const querySnapshot = await getDocs(testCollection);
        setConnectionStatus('✅ Firebase Connected Successfully');
      } catch (error) {
        console.error('Firebase connection error:', error);
        setConnectionStatus(`❌ Firebase Connection Failed: ${error.message}`);
      }
    };

    testConnection();
  }, []);

  // Test adding data
  const addTestData = async () => {
    setLoading(true);
    try {
      const testCollection = collection(db, 'test');
      const docRef = await addDoc(testCollection, {
        message: 'Test data from Forge DeFi Platform',
        timestamp: serverTimestamp(),
        testId: Date.now()
      });
      
      console.log('Test document added with ID:', docRef.id);
      alert(`Test data added successfully! Document ID: ${docRef.id}`);
      
      // Refresh test data
      loadTestData();
    } catch (error) {
      console.error('Error adding test data:', error);
      alert(`Error adding test data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Load test data
  const loadTestData = async () => {
    try {
      const testCollection = collection(db, 'test');
      const querySnapshot = await getDocs(testCollection);
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTestData(data);
    } catch (error) {
      console.error('Error loading test data:', error);
    }
  };

  // Load test data on mount
  useEffect(() => {
    loadTestData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🔥 Firebase Integration Test
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Connection Status */}
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Connection Status:</h3>
            <p className="text-sm">{connectionStatus}</p>
          </div>

          {/* Test Actions */}
          <div className="flex gap-4">
            <Button 
              onClick={addTestData} 
              disabled={loading}
              className="bg-gradient-to-r from-primary to-accent"
            >
              {loading ? 'Adding...' : 'Add Test Data'}
            </Button>
            <Button 
              onClick={loadTestData} 
              variant="outline"
            >
              Refresh Test Data
            </Button>
          </div>

          {/* Test Data Display */}
          <div>
            <h3 className="font-semibold mb-2">Test Data ({testData.length} items):</h3>
            {testData.length > 0 ? (
              <div className="space-y-2">
                {testData.map((item) => (
                  <div key={item.id} className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{item.message}</span>
                      <Badge variant="secondary" className="text-xs">
                        {item.testId}
                      </Badge>
                    </div>
                    {item.timestamp && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Created: {item.timestamp.toDate ? item.timestamp.toDate().toLocaleString() : 'Unknown'}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No test data found. Click "Add Test Data" to create some.</p>
            )}
          </div>

          {/* Instructions */}
          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <h3 className="font-semibold text-blue-400 mb-2">Testing Instructions:</h3>
            <ol className="text-sm text-blue-300 space-y-1">
              <li>1. Check the connection status above</li>
              <li>2. Click "Add Test Data" to test writing to Firestore</li>
              <li>3. Click "Refresh Test Data" to test reading from Firestore</li>
              <li>4. Check browser console for detailed logs</li>
            </ol>
          </div>

          {/* Environment Check */}
          <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <h3 className="font-semibold text-yellow-400 mb-2">Environment Variables Check:</h3>
            <div className="text-sm text-yellow-300 space-y-1">
              <p>Firebase API Key: {process.env.REACT_APP_FIREBASE_API_KEY ? '✅ Set' : '❌ Missing'}</p>
              <p>Firebase Project ID: {process.env.REACT_APP_FIREBASE_PROJECT_ID ? '✅ Set' : '❌ Missing'}</p>
              <p>Firebase Auth Domain: {process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ? '✅ Set' : '❌ Missing'}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
