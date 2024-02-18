const asyncHandler = require("express-async-handler");
const Sequelize = require("sequelize");
const uuid = require("uuid");
const connectDB = require("../config/db");
const section = require('./section');

const page = connectDB.define(
    "pages",
    {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        content: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        sectionId: {
            type: Sequelize.UUID,
            allowNull: false,
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal("NOW()"),
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal("NOW()"),
        },
        deleteAt: {
            type: Sequelize.DATE,
            allowNull: true,
        },
    },
    {
        // Opções do modelo
        tableName: 'pages', // Defina o nome exato da tabela aqui
        timestamps: false
    }
);

section.hasOne(page);
page.belongsTo(section);

module.exports = page;