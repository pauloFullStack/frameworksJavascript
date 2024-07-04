import Sequelize from 'sequelize';

const connectDB = new Sequelize('codelibrary', 'user_paulo', 'Davi91445129!', {
    host: 'localhost',
    dialect: 'mysql',
 });

export const section = connectDB.define(
    "sections",
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
       description: {
          type: Sequelize.STRING,
          allowNull: false,
       },
       icon: {
          type: Sequelize.STRING,
          allowNull: false,
       },
       position: {
          type: Sequelize.INTEGER,
          allowNull: false,
       },
       routeParameter: {
          type: Sequelize.STRING,
          allowNull: false,
       },
       sectionType: {
          type: Sequelize.STRING,
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
       tableName: 'sections', // Defina o nome exato da tabela aqui
       timestamps: false
    }
 );