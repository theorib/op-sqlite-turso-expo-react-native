import { ConfigContext, ExpoConfig } from 'expo/config';
import type { ConfigPlugin } from '@expo/config-plugins';
import { withPodfileProperties } from '@expo/config-plugins';

const config = ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'your-app-your-name',
  slug: 'your-app-your-name',
  version: '1.0.0',

  plugins: ['expo-router'],

  orientation: 'portrait',
  icon: './assets/images/icon.png',
  userInterfaceStyle: 'light',
  platforms: ['ios', 'android'],

  // scheme: 'yourapp',
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

const withUseThirdPartySQLitePod: ConfigPlugin<never> = expoConfig => {
  return withPodfileProperties(expoConfig, config => {
    config.modResults = {
      ...config.modResults,
      'expo.updates.useThirdPartySQLitePod': 'true',
    };
    return config;
  });
};
export default withUseThirdPartySQLitePod;
