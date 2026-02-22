import { DataTypes, Model } from "sequelize";

const LogoModel = (sequelize) => {
  class Logo extends Model {}

  Logo.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      fileName: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      data: {
        type: DataTypes.BLOB,
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

export default LogoModel;
