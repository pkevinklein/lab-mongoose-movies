const mongoose = require('mongoose');
const Celebrity = require('../models/Book')
mongoose.connect('mongodb://localhost/starter-code', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const celebrities = [{
  name: "John",
  occupation: "comedian",
  catchPhrase: "I'm gonna get you some day"
},
{
  name: "Patricia",
  occupation: "actress",
  catchPhrase: "Clean after yourself"
},
{
  name: "Kristell",
  occupation: "unknown",
  catchPhrase: "And what's wrong with that?!"
}
]


Celebrity.insertMany(celebrities)
  .then(data => {
    console.log(`Success! Added ${data.length} celebrities to the database`);
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(err);
  });