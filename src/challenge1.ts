"use strict";
const prompt = require("prompt-sync")({ sigint: true });
import * as fs from "fs"; // Prerequsite for JSON file Read - Write
import * as path from "path"; // Prerequsite for absolute path of the JSON file
const my_Books_Path = path.join(__dirname, "my_Books.json");

// 1. Create a type for `book` where each book has a title, author, and publication year
type book = {
  title: string;
  author: string;
  year: number;
};
// 2. Create `books` array to store books
let myBooks: book[] = [];
let myBook: book = {
  title: "", // Initialize as an empty string
  author: "", // Initialize as an empty string
  year: 0, // Initialize as 0 or current year
};

// 3. Implement a function named `addBook` to add new books to the collection
function addBook(title: string, author: string, year: number): void {
  let newBook: book = {
    title: title,
    author: author,
    year: year,
  };
  myBooks.push(newBook);
  console.log(
    `Book added: "${newBook.title}" by ${newBook.author} (${newBook.year})`
  );
}

// 4. Implement a function named `listBooks` to 1display all stored books
function listBooks(): void {
  if (myBooks.length == 0) {
    console.log("No book is found! the list is empty");
  } else {
    console.log("All Books:");
    myBooks.map((parameter) =>
      console.log(
        `- ${parameter.title} by ${parameter.author} (${parameter.year})`
      )
    );
  }
}

// 5. Implement a function named `searchBook` to find books by title (should be an optional parameter) ==> Optional by initializing the parameter.
function searchBook(searchKey: string = ""): void {
  if (searchKey == "" || searchKey == " ") {
    console.log("Please provide a title to search.");
    searchKey = prompt("Enter Title Key Word: ", "");
    searchKey.trim() ?? "";
  }

  console.log(`Search Results for "${searchKey}":`);
  const searchResult: book[] = myBooks.filter((book) => {
    return book.title.includes(searchKey ?? "");
  });
  if (searchResult.length == 0) {
    console.log(`No books found with title containing "${searchKey}".`);
  } else {
    searchResult.map((parameter) =>
      console.log(
        `- ${parameter.title} by ${parameter.author} (${parameter.year})`
      )
    );
  }
}
// 6. All functions must return void

let running = true;
let inMenu = "";

// Read previous records from JSON file
try {
  const rawData = fs.readFileSync(my_Books_Path, "utf-8");
  myBooks = JSON.parse(rawData);
} catch (error) {
  myBooks = [];
}

while (running) {
  while (inMenu == "") {
    console.log("-------------------");
    console.log("------- MENU ------");
    console.log("1. Add New Book");
    console.log("2. List All Books");
    console.log("3. Search Book");
    console.log("4. Exit");
    console.log("-------------------");
    console.log("-------------------");

    inMenu = prompt("Enter the Menu Number: ", "");
    inMenu.trim();

    if (inMenu == "" || inMenu == " ") {
      console.log("Enter a valid Menu number!");
      inMenu = "";
      break;
    }
    if (Number(inMenu) > 0 && Number(inMenu) < 6) {
      switch (inMenu) {
        case "1": // Add Book
          myBook.title = prompt("Book Title: ", "");
          myBook.author = prompt("Author: ", "");
          myBook.year = Number(prompt("Year of Publication: ", ""));
          addBook(myBook.title, myBook.author, myBook.year);
          inMenu = "";
          break;
        case "2": // List all Book
          listBooks();
          inMenu = "";
          break;
        case "3": // Search Book
          // Call without any parameter (optional)
          searchBook();
          inMenu = "";
          break;
        case "4": // Exit App
          // Write existing records in JSON file, for future use.
          if (myBooks.length !== 0) {
            const dataString = JSON.stringify(myBooks, null, 2);
            fs.writeFileSync(my_Books_Path, dataString);
          }
          console.log("Thank you for using this application...");
          running = false; // Stop running
      }
    } else {
      console.log("The Menu number is not valid!");
      inMenu = "";
    }
  }
}

// Don't delete code bellow and this code must be at the bottom of the file
export { addBook, listBooks, searchBook };
