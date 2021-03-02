// Note: Please do not change the name of the functions. The tests use those names to validate your code.

function findAccountById(accounts, id) {
  // Filter accounts to find account by id //
  const result = accounts.filter((account) => account.id === id);
  // Return object from array //
  return result[0];
}

function sortAccountsByLastName(accounts) {
  // Sort accounts alphabetically by last name //
  return accounts.sort((accountA, accountB) =>
    accountA.name.last > accountB.name.last ? 1 : -1
  );
}

function getTotalNumberOfBorrows(account, books) {
  // Deconstruct id from account //
  const { id } = account;
  // Counter for loop //
  let total = 0;
  for (let book in books) {
    // Deconstruct borrow list from each book //
    const { borrows } = books[book];
    // Filter each borrow list for books checked out by account id //
    const result = borrows.filter((borrow) => borrow.id === id);
    // Add amount of borrows to total //
    total += result.length;
  }
  return total;
}

function getBooksPossessedByAccount(account, books, authors) {
  // Deconstruct account ID from account //
  const { id } = account;
  // Create array for entries to be pushed into //
  const result = [];
  for (let book in books) {
    // Deconstruct borrow list from book //
    const { borrows } = books[book];
    // Filter books borrowed by account ID that have not been returned //
    const match = borrows.filter(
      (borrow) => borrow.id === id && borrow.returned === false
    );
    // If there are any books not been returned by account, push book into result array //
    if (match.length > 0) result.push(books[book]);
  }

  // Adds author key after authorId in key order for organization //
  result.forEach((book) => {
    // Filter authors by author of book //
    const found = authors.find((author) => author.id === book.authorId);
    // Deconstruct borrows from book //
    const { borrows } = book;
    // Delete borrows key from book//
    delete book.borrows;
    // Add new author key and original borrow key //
    book.author = found;
    book.borrows = borrows;
  });

  return result;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
