const express = require("express");
const app = express();  
const PORT = process.env.PORT || 3001;
const cors = require('cors');
var bodyParser = require('body-parser');

const CreditCard = require('./controllers/CreditCard')

app.use(cors())
app.use(bodyParser.json())


app.use('/CreditCard',CreditCard)


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

