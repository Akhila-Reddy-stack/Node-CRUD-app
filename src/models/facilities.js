"use strict";

module.exports = (sequelize, DataTypes) => {
  const Facility = sequelize.define(
    "Facility",
    {
      id: {
        type: DataTypes.BIGINT(20),
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      age: DataTypes.BIGINT(20),
      city: DataTypes.TEXT,
      phone: {
        type: DataTypes.BIGINT(20),
      },
      email: {
        type: DataTypes.STRING,
      },
      qualification: {
        type: DataTypes.STRING,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: null,
        defaultValue: null,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: null,
        defaultValue: null,
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
    },
    { tableName: "facilities", timestamps: false }
  );
  // eslint-disable-next-line no-unused-vars
  return Facility;
};
