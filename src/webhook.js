const express = require('express');
const bodyParser = require('body-parser');
const simpleGit = require('simple-git');

const app = express();
const git = simpleGit();

app.use(bodyParser.json());

app.post('/webhook', (req, res) => {

    // Pull the latest changes from the repo
    git.pull((err, update) => {
    if (err) {
        console.error('Failed to pull from repo', err);
        return res.sendStatus(500);
    }

    if (update && update.summary.changes) {
        console.log('Successfully pulled from GitHub');
        // Restart your app with PM2
        require('child_process').exec('pm2 restart nextjs-app');
        }
    });


    res.sendStatus(200); // OK
});

app.listen(3001, () => {
    console.log('Webhook listener running on port 3001');
});
