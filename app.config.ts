import { ConfigContext, ExpoConfig } from 'expo/config';
const config = ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'your-app-your-name',
  slug: 'your-app-your-name',
  version: '1.0.0',

  plugins: ['expo-router', './expoPlugins/withUseThirdPartySQLitePod.js'],

  orientation: 'portrait',
  icon: './assets/images/icon.png',
  userInterfaceStyle: 'light',
  platforms: ['ios', 'android'],

  scheme: 'opsqliteexpotursotest',
  splash: {
    image: './assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.theoribeiro.opsqliteexpotursotest',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: 'com.theoribeiro.opsqliteexpotursotest',
    edgeToEdgeEnabled: true,
  },
});

export default config;
