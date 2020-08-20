const penthouse = require('penthouse');
const fs = require('fs');
const path = require('path');

// const css = fs.readFileSync('./src/themes/semantic/dist/semantic.css', {
//   encoding: 'utf-8',
// });

penthouse({
  url: 'http:/localhost:3000/',
  css: path.join(__dirname, 'src/themes/semantic/dist/semantic.css'),
  renderWaitTime: 2000,
  blockJSRequests: false,
}).then(criticalCss => {
  // use the critical css
  fs.writeFileSync('outfile.css', criticalCss);
});
