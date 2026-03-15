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
async function ReadAucItem() {
  let aucItems;
  aucItems = await AucItem.findAll();

  return aucItems.map((aucItem) => {
    return aucItem.toJSON();
  });
}

async function CreateAucItem(data) {
  let aucItem = await AucItem.create(data);
  return aucItem;
}

async function EditAucItem(data) {
  let aucItem = await AucItem.findByPk(data.id);

  aucItem.num = data.num;
  aucItem.type = data.type;
  aucItem.description = data.description;
  aucItem.value = data.value;
  aucItem.winningAmount = data.winningAmount;
  aucItem.bidderNum = data.bidderNum;
  aucItem.bidderName = data.bidderName;

  return await aucItem.save();
}

async function DeleteAucItem(id) {
  return AucItem.destroy({
    where: { id },
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

async function DeleteBidder(id) {
  return Bidder.destroy({
    where: { id },
  });
}

export {
  CreateAucItem,
  ReadAucItem,
  EditAucItem,
  DeleteAucItem,
  CreateBidder,
  ReadBidder,
  DeleteBidder,
};
