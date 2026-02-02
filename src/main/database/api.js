import { Sequelize } from "sequelize";
import TestModel from "./models/test";

const sequelize = new Sequelize({
  dialect: "sqlite", // type of the database
  storage: "./database/db_dev.db", // database file path
});

const Test = TestModel(sequelize);

SyncDB();

async function SyncDB() {
  await sequelize.sync();
}

async function CreateTest(testData) {
  if (!testData) throw new Error("testData must be a valid object");

  if (typeof testData !== "object")
    throw new Error("testData must be a object");

  let test = await Test.create(testData);

  return test;
}

async function ReadTest() {
  let tests;
  tests = await Test.findAll();

  return tests.map((test) => {
    return test.toJSON();
  });
}

// async function DeleteVideo(id) {
//   if (
//     typeof id === "number" ||
//     (Array.isArray(id) && id.every((i) => typeof i === "number"))
//   ) {
//     return Video.destroy({
//       where: { id },
//     });
//   }

//   throw new Error("id must be Number or Array of numbers");
// }

export { CreateTest, ReadTest };
