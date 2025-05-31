const fs = require('fs');
const path = require('path');

const folderMap = {
  controllers: 'Controller.ts',
  services: 'Service.ts',
  validators: 'Validator.ts',
  models: 'Model.ts',
  routes: 'Router.ts'
};

// Get prefix from CLI args like: prefix=Category
const args = process.argv.slice(2);
const prefixArg = args.find(arg => arg.startsWith('prefix='));

if (!prefixArg) {
  console.error('❌ Missing argument: prefix=YourPrefix');
  process.exit(1);
}

const prefix = prefixArg.split('=')[1];

// Loop through folderMap to create files in src/
Object.entries(folderMap).forEach(([key, suffix]) => {
  const folder = key === 'route' ? 'Routes' : key; // special case for 'route'
  const fileName = `${prefix}${suffix}`;
  const dirPath = path.join(__dirname, 'src', folder);
  const filePath = path.join(dirPath, fileName);

  if (!fs.existsSync(dirPath)) {
    console.log(`❌ Folder does not exist: src/${folder}`);
  } else if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, `// ${fileName} content\n`, 'utf8');
    console.log(`✅ Created file: src/${folder}/${fileName}`);
  } else {
    console.log(`⚠️ File already exists: src/${folder}/${fileName}`);
  }
});
