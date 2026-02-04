import { Sequelize } from "sequelize";
import AucItemModel from "./models/aucItem";

const sequelize = new Sequelize({
  dialect: "sqlite", // type of the database
  storage: "./database/db_dev.db", // database file path
});

const AucItem = AucItemModel(sequelize);

SyncDB();

async function SyncDB() {
  await sequelize.sync();
}

async function CreateAucItem(name, value) {
  if (!name) throw new Error("aucItemData must be a valid object");

  // if (typeof aucItemData !== "object")
  //   throw new Error("aucItemData must be a object");

  console.log("-------------- name: ");
  const data = {
    name: name,
    value: value,
  };

  let aucItem = await AucItem.create(data);

  return aucItem;
}

async function ReadAucItem() {
  let aucItems;
  aucItems = await AucItem.findAll();

  return aucItems.map((aucItem) => {
    return aucItem.toJSON();
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

export { CreateAucItem, ReadAucItem };
