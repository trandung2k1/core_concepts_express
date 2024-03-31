const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 4000;
const app = require('./app');
app.listen(port, () => {
    console.log(`Server listen on http://localhost:${4000}`);
});
