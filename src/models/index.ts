import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('sequelize_playground', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;
