import { DataTypes, Model } from "sequelize";

const LogoModal = (sequelize) => {
  class Logo extends Model {}

  Logo.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      data: {
        type: DataTypes.BLOB("long"),
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "Logo",
      tableName: "logos",
      timestamps: false,
    }
  );

  return Logo;
};

export default LogoModal;
