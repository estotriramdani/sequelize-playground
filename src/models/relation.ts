import Author from './Author';
import Book from './Book';

export default async function relation() {
  Author.hasMany(Book, { foreignKey: 'author_id', constraints: false });
  Book.belongsTo(Author, { foreignKey: 'author_id', constraints: false });
  await Author.sync();
  await Book.sync();
}
