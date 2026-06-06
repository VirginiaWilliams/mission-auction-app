import { Sequelize, DataTypes } from "sequelize";
import AucItemModel from "./models/aucItem";
import BidderModel from "./models/bidder";

const sequelize = new Sequelize({
  dialect: "sqlite", // type of the database
  storage: "./database/db_dev.db", // database file path
});

const AucItem = AucItemModel(sequelize);
const Bidder = BidderModel(sequelize);
const BidderAucItem = sequelize.define("bidder_aucItem", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  winningAmount: {
    type: DataTypes.INTEGER,
    defaultValue: null,
  },
});

AucItem.belongsToMany(Bidder, { through: BidderAucItem });
Bidder.belongsToMany(AucItem, { through: BidderAucItem });

SyncDB();

async function SyncDB() {
  await sequelize.sync();
}

// Third and final stop in API action process
// ********** Auc Item **********
async function ReadAucItem() {
  let aucItems;

  aucItems = await AucItem.findAll({
    include: [{ model: Bidder }],
  });

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

async function EditBidder(data) {
  let bidder = await Bidder.findByPk(data.id);

  bidder.num = data.num;
  bidder.name = data.name;

  return await bidder.save();
}

async function ReadBidder() {
  let bidders;
  bidders = await Bidder.findAll({
    include: [{ model: AucItem }],
  });

  return bidders.map((bidder) => {
    return bidder.toJSON();
  });
}

async function DeleteBidder(id) {
  return Bidder.destroy({
    where: { id },
  });
}

// ********** Link **********
async function AddLink(data) {
  await BidderAucItem.create(data);
  return;
}

async function DeleteLink(id) {
  return BidderAucItem.destroy({
    where: { id },
  });
}

export {
  CreateAucItem,
  ReadAucItem,
  EditAucItem,
  DeleteAucItem,
  CreateBidder,
  EditBidder,
  ReadBidder,
  DeleteBidder,
  AddLink,
  DeleteLink,
};
