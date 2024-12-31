To fix this, you need to ensure that your database operations occur only after Firebase has completely initialized.  Here's how you can modify your code using async/await:

```javascript
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";

// Your Firebase configuration
const firebaseConfig = {
  // ... your config
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

async function fetchData() {
  try {
    await initializeApp(firebaseConfig); // Ensures Firebase is initialized
    const dbRef = ref(database, 'your/data/path');
    const snapshot = await get(dbRef);
    const data = snapshot.val();
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchData();
```

Alternatively, you can use Promises:

```javascript
initializeApp(firebaseConfig).then(() => {
  const dbRef = ref(database, 'your/data/path');
  get(dbRef).then((snapshot) => {
    const data = snapshot.val();
    console.log(data);
  }).catch((error) => {
    console.error('Error fetching data:', error);
  });
}).catch((error) => {
  console.error('Error initializing Firebase:', error);
});
```
These solutions ensure the Firebase SDK is fully initialized before accessing the database, preventing errors.