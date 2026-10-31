const yargs = require('yargs');
const fs = require('fs');

const argv = yargs
    .option('tag', {
      type: 'string',
      description: 'The release tag.'
    })
    .option('project', {
      type: 'string',
      description: 'The GitHub project, such as owner/repository.'
    })
    .demandOption(['tag', 'project'])
    .argv;

// Load the existing manifest.
const systemRaw = fs.readFileSync('./dist/system.json');
let system = JSON.parse(systemRaw);

system.version = argv.tag;
system.url = `https://github.com/${argv.project}`;
system.bugs = `https://github.com/${argv.project}/issues`;
system.manifest = `https://github.com/${argv.project}/releases/latest/download/system.json`;
system.download = `https://github.com/${argv.project}/releases/download/${encodeURIComponent(argv.tag)}/${system.id}.zip`;

fs.writeFileSync('./dist/system.json', JSON.stringify(system, null, 2));
console.log(`Build: ${system.version}`);
console.log(`Project: ${system.url}`);
console.log(`Manifest: ${system.manifest}`);
console.log(`Download: ${system.download}`);
