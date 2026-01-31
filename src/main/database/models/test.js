import { DataTypes, Model } from "sequelize";

const TestModel = (sequelize) => {
  class Test extends Model {}

  Test.init(
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
    { sequelize, modelName: "Test", tableName: "tests", timestamps: false }
  );

  return Test;
};

export default TestModel;
