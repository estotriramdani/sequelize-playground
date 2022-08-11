import { DataTypes } from 'sequelize';
import sequelize from '.';
import Book from './Book';

const Author = sequelize.define('authors', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Author.hasMany(Book, { foreignKey: 'author_id' });

(async () => {
  await Author.sync();
})();

export default Author;
