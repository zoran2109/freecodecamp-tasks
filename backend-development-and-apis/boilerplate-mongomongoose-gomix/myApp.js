require("dotenv").config();
const mongoose = require("mongoose");

// Challenge 1 - Setup Mongoose
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Challenge 2 . CRUD Part I - CREATE
const { Schema } = mongoose;
const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});
const Person = mongoose.model("Person", personSchema);

// Challenge 3 - Create and Save a Record of a Model
const createAndSavePerson = (done) => {
  const person = new Person({
    name: "Person",
    age: 50,
    favoriteFoods: ["pizza", "other junk"],
  });
  person.save(function (err, data) {
    if (err) return done(error);
    done(null, data);
  });
};

// Challenge 4 - Create many records with model.create()
const createManyPeople = (arrayOfPeople, done) => {
  const many = Person.create(arrayOfPeople, function (err, data) {
    if (err) return done(err);
    done(null, data);
  });
};

// Challenge 5 - Use model.find() to Search Your Database
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

// Challenge 6 - Use model.findOne() to return single matching document
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

// Challenge 7 - Use model.findById() to Search Your Database By _id
const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

// Challenge 8 - Use classic find, edit save to update element
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({ _id: personId }, (err, data) => {
    if (err) return done(err);
    data.favoriteFoods.push(foodToAdd);
    data.save((err, data) => {
      if (err) return done(err);
      done(null, data);
    });
  });
};

// Challenge 9 - use findOneAndUpdate() method
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, data) => {
      if (err) return done(err);
      done(null, data);
    }
  );
};

// Challenge 10 - remove items by id
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

// Challenge 11 - Delete Many Documents with model.remove()
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

// Challenge 12 - chain search query helpers to narrow search results
const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: "asc" })
    .limit(2)
    .select("-age")
    .exec((err, data) => {
      if (err) return done(err);
      done(null, data);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
