// Note: Please do not change the name of the functions. The tests use those names to validate your code.

function getTotalBooksCount(books) {
  // Return number of books
  return books.length;
}

function getTotalAccountsCount(accounts) {
  // Return number of accounts
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  // Filter books for books that are checked out //
  const result = books.filter((book) =>
    book.borrows.some((borrow) => borrow.returned === false)
  );
  // Return number of checked out books //
  return result.length;
}

function getMostCommonGenres(books) {
  // Counter for reduce to add entries into array //
  let counter = 0;

  const genreArray = books.reduce((acc, book) => {
    // Deconstruct genre from book //
    const { genre } = book;
    // Filter books for all books in the genre //
    const count = books.filter((book) => book.genre === genre);
    // Test for duplicate entry //
    if (acc.some((entry) => entry.name === genre)) return acc;
    // Add entry to accumulator array//
    acc[counter] = { name: genre, count: count.length };
    // Increase counter to move to next array element //
    counter++;
    return acc;
  }, []);

  // Sort array by highest count of genre //
  const finalArray = genreArray.sort((genreA, genreB) =>
    genreA.count > genreB.count ? -1 : 1
  );
  // Remove entries from array past 5 elements //
  while (finalArray.length > 5) finalArray.pop();
  return finalArray;
}

function getMostPopularBooks(books) {
  // Counter for reduce to add entries into array //
  let counter = 0;

  const popularArray = books.reduce((acc, book) => {
    // Deconstruct title and borrows from book //
    const { title, borrows } = book;
    // Add entry to accumulator array //
    acc[counter] = { name: title, count: borrows.length };
    // Increase counter to move to next array element //
    counter++;
    return acc;
  }, []);

  // Sort array by highest borrow count //
  const result = popularArray.sort((popularA, popularB) =>
    popularA.count > popularB.count ? -1 : 1
  );
  // Remove entries from array past 5 elements //
  while (result.length > 5) result.pop();
  return result;
}

function getMostPopularAuthors(books, authors) {
  // Helper function to find total number of borrows by author //
  function borrowNumber(author) {
    return books.reduce((acc, book) => {
      // Deconstruct borrows array from book //
      const { borrows } = book;
      // Test if book is by the author //
      if (book.authorId === author) {
        // Add number of borrows to accumulator if by correct author //
        acc += borrows.length;
        return acc;
      } else {
        return acc;
      }
    }, 0);
  }

  // Counter for following reduce to add entries into array //
  let counter = 0;

  const authorArray = books.reduce((acc, book) => {
    // Deconstruct authorId from book //
    const { authorId } = book;
    // Run helper script to get total borrows of author //
    const count = borrowNumber(authorId);
    // Find author //
    const authorName = authors.find((author) => author.id === authorId);
    // Deconstruct name from author object //
    const {
      name: { first },
      name: { last },
    } = authorName;
    // Check for duplicate entry //
    if (acc.some((entry) => entry.name === `${first} ${last}`)) return acc;
    // Add new entry //
    acc[counter] = { name: `${first} ${last}`, count: count };
    // Increase counter to move to next array element //
    counter++;
    return acc;
  }, []);

  // Sort array by total borrows //
  const result = authorArray.sort((authorA, authorB) =>
    authorA.count > authorB.count ? -1 : 1
  );
  // Remove array elements past 5 entries
  while (result.length > 5) result.pop();
  return result;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
