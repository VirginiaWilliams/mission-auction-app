import { DataTypes, Model } from "sequelize";

const BidderModel = (sequelize) => {
  class Bidder extends Model {}

  Bidder.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      bidderNum: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      name: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
    },
    {
      sequelize,
      modelName: "Bidder",
      tableName: "bidders",
      timestamps: false,
    }
  );

  return Bidder;
};

export default BidderModel;
