var fs = require('fs');

fs.writeFileSync(
  './package.json',
  JSON.stringify(
    Object.assign(JSON.parse(fs.readFileSync('./package.json', 'utf-8').toString()), {
      homepage: 'https://choewy.github.io/socket-io-client',
    }),
    null,
    2,
  ),
  'utf-8',
);
