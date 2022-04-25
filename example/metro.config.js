const path = require('path');
const exclusionList = require('metro-config/src/defaults/exclusionList');

const escapeRegExp = (string) => {
  return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
}

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  }, 
  resolver: {
    extraNodeModules: {
      'layers-react-native': path.resolve(__dirname + '/../src'),
    },
    nodeModulesPaths: [path.resolve(path.join(__dirname, './node_modules'))],
    blacklistRE: exclusionList([
      escapeRegExp(path.resolve(__dirname, '..', 'node_modules')),
    ])
  },
  watchFolders: [
    path.resolve(__dirname + '/../src')
  ],
};