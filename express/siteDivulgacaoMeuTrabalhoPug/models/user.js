const Sequelize = require("sequelize");
const uuid = require("uuid");
const connectDB = require("../config/db");
const bcrypt = require("bcryptjs");

const user = connectDB.define(
    "users",
    {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        telephone: {
            type: Sequelize.STRING,
            allowNull: true,
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
        hooks: {
            beforeCreate: async (user) => {
                if (user.password) {
                    const salt = await bcrypt.genSaltSync(10);
                    const hash = await bcrypt.hashSync(user.password, salt);
                    user.password = hash;
                }
            },
            beforeUpdate: async (user) => {
                if (user.password) {
                    const salt = await bcrypt.genSaltSync(10);
                    const hash = await bcrypt.hashSync(user.password, salt);
                    user.password = hash;
                }
            },
        },
    }
);

module.exports = user;
