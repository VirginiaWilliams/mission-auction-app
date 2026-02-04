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
      name: {
        type: DataTypes.INTEGER,
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
