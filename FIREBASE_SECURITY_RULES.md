# Firebase Security Rules for Production

## Current Rules (Development)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow all reads and writes for now (for testing)
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

## Production Rules (Recommended)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Strategies - anyone can read, only authenticated admins can write
    match /strategies/{strategyId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    
    // Blog posts - anyone can read, only authenticated admins can write
    match /blog_posts/{postId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    
    // Admin users collection
    match /admin_users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## How to Implement:

1. **Go to Firebase Console → Firestore Database → Rules**
2. **Replace current rules with production rules above**
3. **Click "Publish"**

## Next Steps:
- Set up Firebase Authentication
- Create admin user accounts
- Implement admin-only access to /admin route
