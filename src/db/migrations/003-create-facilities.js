"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("facilities", {
      id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      age: {
        type: Sequelize.BIGINT(20),
        allowNull: true,
        defaultValue: null,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      phone: {
        type: Sequelize.BIGINT(20),
        allowNull: true,
        defaultValue: null,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      qualification: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: null,
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
    });
  },
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("facilities");
  },
};
