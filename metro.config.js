const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Add support for pnpm
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// Handle pnpm node_modules structure
config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, 'node_modules'),
];

// Make sure Metro can handle symlinks properly
config.resolver.unstable_enableSymlinks = true;

module.exports = config;
