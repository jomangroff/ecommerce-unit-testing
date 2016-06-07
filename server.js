const express    = require('express')
    , bodyParser = require('body-parser')
    , cors       = require('cors')
    , products   = require('./controllers/productsCtrl')
    , mongoose   = require('mongoose')
    , config     = require('./_config');

app = express();

mongoose.connect(config.mongoURI[app.settings.env], (e, r) => {
  if (e) console.log('Error connecting to database...')
  else console.log(`Connected to database: ${config.mongoURI[app.settings.env]}`)
})

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

var port = process.env.port || 3000
app.listen(port, function() {
  console.log('A Lannister always pays his debts...')
})

app.get('/test', products.test);
app.post('/products', products.create);

app.get('/products', products.index);
app.get('/products/:id', products.show);

app.put('/products/:id', products.update);

app.delete('/products/:id', products.delete);

module.exports = app;
