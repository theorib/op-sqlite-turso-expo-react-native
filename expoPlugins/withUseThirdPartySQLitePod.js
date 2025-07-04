const { withPodfileProperties } = require('@expo/config-plugins');

const withUseThirdPartySQLitePod = expoConfig => {
  return withPodfileProperties(expoConfig, config => {
    config.modResults = {
      ...config.modResults,
      'expo.updates.useThirdPartySQLitePod': 'true',
    };
    return config;
  });
};

module.exports = withUseThirdPartySQLitePod;
