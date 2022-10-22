"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("jwt_tokens", {
      id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true,
        autoIncrement: true,
      },
      token: Sequelize.TEXT("long"),
      created_at: {
        type: Sequelize.DATE,
        allowNull: null,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: null,
        defaultValue: null,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
      status: {
        type: Sequelize.ENUM("0", "1"),
        defaultValue: "0",
        comment: "0: Expired; 1: Active",
      },
    });
  },
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("posts");
  },
};
