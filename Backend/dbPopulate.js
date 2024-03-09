import { USERMODEL } from "./model/userModel.js";
import { Database } from "./config/database.js";

const MONGODB_URI = "ADD YOUR MONGODB URI HERE";

const database = new Database(MONGODB_URI);
database.connect();

const databasePopulate = async () => {
  const data = [
    { username: "Ayroid", number: 1 },
    { username: "John", number: 2 },
    { username: "Tester", number: 3 },
  ];

  for (const user of data) {
    try {
      const newUser = new USERMODEL({
        username: user.username,
        number: user.number,
      });

      await newUser.save().then(() => {
        console.log("User added: ", user.username);
      });
    } catch (err) {
      console.log(err);
    }
  }
};

database
  .connect()
  .then(async () => {
    await databasePopulate();
  })
  .finally(() => {
    database.disconnect();
  });
