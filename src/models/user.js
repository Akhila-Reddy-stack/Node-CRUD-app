"use strict";

// eslint-disable-next-line node/no-extraneous-require
var moment = require("moment");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.BIGINT(20),
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: null,
        defaultValue: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
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
      role: {
        type: DataTypes.ENUM("Admin", "User"),
        defaultValue: "Admin",
        comment: "Admin, User",
      },
      status: {
        type: DataTypes.ENUM("0", "1"),
        defaultValue: "1",
        comment: "0: Inactive; 1: Active",
      },
    },
    {
      tableName: "users",
      timestamps: false,
    }
  );
  return User;
};
