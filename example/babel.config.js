module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ["module-resolver", {
        "alias": {
          "layers-react-native": "../src/index"
        }
      }],
      'react-native-reanimated/plugin'
    ]
  };
};