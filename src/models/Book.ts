import { DataTypes } from 'sequelize';
import sequelize from '.';
import Author from './Author';

const Book = sequelize.define('books', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

// Book.belongsTo(Author, { foreignKey: 'author_id' });

(async () => {
  await Book.sync();
})();

export default Book;
