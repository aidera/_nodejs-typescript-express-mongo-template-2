import mongoose from 'mongoose';
import config from 'config';

export const startDB = (callback) => {
  mongoose.connect(config.get("databaseURI"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
    .then(() => {
      callback();
    })
    .catch(err => {
      console.log("MongoDB connection failed");
      console.log(err);
    });
}

