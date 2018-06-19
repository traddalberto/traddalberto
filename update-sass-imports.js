const fs = require('fs');
const path = require('path');

const folders = [
  'abstracts',
  'base',
  'components',
  'layout',
];


const updateImports = () => {
  let content = '';

  folders.forEach((folder) => {
    fs.readdirSync(path.join(__dirname, 'style', folder)).forEach((file) => {
      const fileName = file.replace(/(.scss|_)/g, '');

      content += `@import '${folder}/${fileName}';\n`;
    });

    content += '\n';
  });

  fs.writeFile(path.join(__dirname, 'style/main.scss'), content, (error) => {
    if (error) throw error;

    console.log('Imports Updated!');
  });
};

fs.watch(path.join(__dirname, 'style'), { recursive: true }, (event, file) => {
  if (event !== 'change' && file !== 'main.scss') {
    console.log(`${file}: ${event}`);

    updateImports();
  }
});

