const fetch = require('node-fetch');
const yargs = require('yargs');
const express= require('express');

const app = express();
const port = 3000;

app.get('/github-user/:username', async (req, res) => {
  const username = req.params.username;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  const url = `https://api.github.com/users/${username}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 404) {
        return res.status(404).json({ error: `User not found: ${username}` });
      }
      throw new Error('Failed to fetch data from GitHub');
    }

    const user = await response.json();
    res.json({
      user: user.login,
      name: user.name,
      bio: user.bio,
      public_repos: user.public_repos,
      followers: user.followers,
      following: user.following,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use((req, res, next) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});