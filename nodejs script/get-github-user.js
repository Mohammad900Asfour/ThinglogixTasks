const fetch = require('node-fetch');
const yargs = require('yargs');

const argv = yargs
  .option('username', {
    alias: 'u',
    description: 'GitHub username',
    type: 'string',
    demandOption: true,
  })
  .help()
  .alias('help', 'h')
  .argv;

const username = argv.username;

if (!username) {
  console.error('Error: Missing username.');
  process.exit(1);
}

const url = `https://api.github.com/users/${username}`;

fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error(`User not found: ${username}`);
    }
    return response.json();
  })
  .then(user => {
    console.log(`User: ${user.login}`);
    console.log(`Name: ${user.name}`);
    console.log(`Bio: ${user.bio}`);
    console.log(`Public Repos: ${user.public_repos}`);
    console.log(`Followers: ${user.followers}`);
    console.log(`Following: ${user.following}`);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
