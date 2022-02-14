module.exports = {
    preset: 'react-native',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
    transformIgnorePatterns: ['/node_modules\/(.*)'],
    reporters: [
      'default',
      [
        'jest-html-reporters',
        {
          filename: 'jest.report.html',
          expand: true
        }
      ]
    ]
  };
