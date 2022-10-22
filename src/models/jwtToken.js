"use strict";

// eslint-disable-next-line node/no-extraneous-require
var moment = require("moment");

module.exports = (sequelize, DataTypes) => {
  const JwtToken = sequelize.define(
    "JwtToken",
    {
      id: {
        type: DataTypes.BIGINT(20),
        primaryKey: true,
        autoIncrement: true,
      },
      token: DataTypes.TEXT("long"),
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
      status: {
        type: DataTypes.ENUM("0", "1"),
        defaultValue: "0",
        comment: "0: Expired; 1: Active",
      },
    },
    {
      tableName: "jwt_tokens",
      timestamps: false,
    }
  );
  // eslint-disable-next-line no-unused-vars
  JwtToken.associate = function (models) {
    // associations can be defined here
  };
  return JwtToken;
};
