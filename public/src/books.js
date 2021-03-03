// Note: Please do not change the name of the functions. The tests use those names to validate your code.

function findAuthorById(authors, id) {
  // Return author object by id number //
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  // Return book by id number //
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  // Filter for books that are checked out //
  const checkedOut = books.filter((book) =>
    book.borrows.some((borrow) => borrow.returned === false)
  );

  // Filter for books that are not checked out //
  const returned = books.filter((book) =>
    book.borrows.every((borrow) => borrow.returned === true)
  );
  // Return both arrays in one array //
  return [checkedOut, returned];
}

// Helper function for getBorrowersForBook to append borrow information //
function appendBorrow(borrow, accounts) {
  // Find user account //
  const user = accounts.find(
    (account) => borrow.id === account.id
  );
  // Create new entry //
  const newBorrow = {
    ...borrow,
    picture: user.picture,
    age: user.age,
    name: user.name,
    company: user.company,
    email: user.email,
    registered: user.registered,
  };
  return newBorrow;
}

function getBorrowersForBook(book, accounts) {
  // Deconstruct borrow list from book //
  const { borrows } = book;

  // Append borrower information to borrow list //
  let result = borrows.map((borrow) => appendBorrow(borrow, accounts));

  // Remove entries in array past 10 elements //
  result.length = 10;
 
  return result; 
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
