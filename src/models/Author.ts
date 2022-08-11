import { DataTypes } from 'sequelize';
import sequelize from '.';

const Author = sequelize.define('authors', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Author;
