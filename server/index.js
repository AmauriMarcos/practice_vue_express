const express    = require ('express');
const bodyParser = require('body-parser');
const cors       = require('cors');

const app = express();

bodyParser.urlencoded({extended: true});
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Server running on port ${port}`));