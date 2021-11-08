module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        regenerator: true,
      },
    ],
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          components: './src/components',
          styles: './src/styles',
          assets: './src/assets',
          utils: './src/utils',
          hooks: './src/hooks',
          config: './src/config',
          constants: './src/constants',
        },
      },
    ],
    'babel-plugin-styled-components',
  ],
};
