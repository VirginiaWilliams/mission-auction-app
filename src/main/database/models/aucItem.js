import { DataTypes, Model } from "sequelize";

const AucItemModel = (sequelize) => {
  class AucItem extends Model {}

  AucItem.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      itemNum: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      type: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      name: {
        type: DataTypes.STRING,
      },
      value: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      winningAmount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      bidderNum: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      bidderName: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
    },
    {
      sequelize,
      modelName: "AucItem",
      tableName: "aucItems",
      timestamps: false,
    }
  );

  return AucItem;
};

export default AucItemModel;
