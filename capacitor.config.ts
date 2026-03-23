import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.codepillot.app',
  appName: 'Code Pillot',
  webDir: 'dist',
  server: {
    // Allow mixed content and cleartext traffic for development
    androidScheme: 'https',
    // If you want to load the app from your deployed server instead of bundled assets,
    // uncomment the following line and set the URL:
    // url: 'https://your-deployed-server.com',
  },
  android: {
    allowMixedContent: true,
  },
};

export default config;
