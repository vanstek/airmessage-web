// Read from environment variables or use defaults
export const connectHostname = process.env.REACT_APP_CONNECT_HOSTNAME || "wss://connect-open.airmessage.org";

export const googleApiKey = process.env.REACT_APP_GOOGLE_API_KEY || "AIzaSyDE2nDAKL6smwPmZIBy1IP8-x_pTOqpzfM";
export const googleClientID = process.env.REACT_APP_GOOGLE_CLIENT_ID || "526640769548-gv7t20cb7evjgmnngnl804gm0ec3kl8h.apps.googleusercontent.com";
export const googleClientSecret = process.env.REACT_APP_GOOGLE_CLIENT_SECRET || "AHUS5_B5Ahmas7ioaoiBact0";

export const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyDE2nDAKL6smwPmZIBy1IP8-x_pTOqpzfM",
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "airmessage-open.firebaseapp.com",
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "airmessage-open",
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "airmessage-open.appspot.com",
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "526640769548",
	appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:526640769548:web:2b0b11b66424b3ce805c29"
};

export const sentryDSN = process.env.REACT_APP_SENTRY_DSN || undefined;

export const jwkLocalEncryption: JsonWebKey = {
	kty: "oct",
	k: process.env.REACT_APP_JWK_LOCAL_ENCRYPTION_KEY || "s9lDeHtl0rh-3FpBDZwQvw",
	alg: "A128GCM"
};