import { Sequelize } from "sequelize";
import AucItemModel from "./models/aucItem";
import BidderModel from "./models/bidder";

const sequelize = new Sequelize({
  dialect: "sqlite", // type of the database
  storage: "./database/db_dev.db", // database file path
});

const AucItem = AucItemModel(sequelize);
const Bidder = BidderModel(sequelize);

SyncDB();

async function SyncDB() {
  await sequelize.sync();
}

// Third and final stop in the API action process
// ********** Auc Item **********
async function CreateAucItem(data) {
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

// ********** Bidder **********
async function CreateBidder(data) {
  let bidder = await Bidder.create(data);
  return bidder;
}

async function ReadBidder() {
  let bidders;
  bidders = await Bidder.findAll();

  return bidders.map((bidder) => {
    return bidder.toJSON();
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

export { CreateAucItem, ReadAucItem, CreateBidder, ReadBidder };
