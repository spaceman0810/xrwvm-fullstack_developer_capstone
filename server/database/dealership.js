const mongoose = require('mongoose');
const { app } = require('./app');

const Schema = mongoose.Schema;

const dealerships = new Schema({
	id: {
    type: Number,
    required: true,
	},
	city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  zip: {
    type: String,
    required: true
  },
  lat: {
    type: String,
    required: true
  },
  long: {
    type: String,
    required: true
  },
  short_name: {
    type: String,
  },
  full_name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('dealerships', dealerships);
// Express route to fetch dealer by a particular id
app.get('/fetchDealer/:id', async (req, res) => {
    //Write your code here
    try {
        const id = req.params.id;
        const documents = await Dealerships.findById(id);
        res.json(documents);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching dealers' });
    }
});
