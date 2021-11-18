import * as admin from 'firebase-admin';
import serviceAccount from '../../../../ichooseConfig.json';
//const serviceAccount = require('./path/to/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});