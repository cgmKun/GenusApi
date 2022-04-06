const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/test/:test', (req, res) => {
    res.send(req.params.test);
});

app.listen(3000, () => console.log('Listening on port 3000...'));