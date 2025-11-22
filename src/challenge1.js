"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addBook = addBook;
exports.listBooks = listBooks;
exports.searchBook = searchBook;
var prompt = require("prompt-sync")({ sigint: true });
// 2. Create `books` array to store books
var myBooks = [];
var myBook = {
    title: "", // Initialize as an empty string
    author: "", // Initialize as an empty string
    year: 0, // Initialize as 0 or current year
};
// 3. Implement a function named `addBook` to add new books to the collection
function addBook(title, author, year) {
    var newBook = {
        title: title,
        author: author,
        year: year,
    };
    myBooks.push(newBook);
    console.log("Book added: \"".concat(newBook.title, "\" by ").concat(newBook.author, " (").concat(newBook.year, ")"));
}
// 4. Implement a function named `listBooks` to 1display all stored books
function listBooks() {
    if (myBooks.length == 0) {
        console.log("No book is found! the list is empty");
    }
    else {
        console.log("All Books:");
        myBooks.map(function (parameter) {
            return console.log("> - ".concat(parameter.title, " by ").concat(parameter.author, " (").concat(parameter.year, ")"));
        });
    }
}
// 5. Implement a function named `searchBook` to find books by title (should be an optional parameter)
function searchBook(keyWord) {
    console.log("Search Results for \"".concat(keyWord, "\":"));
    var searchResult = myBooks.filter(function (book) {
        var _a;
        return book.title.toLowerCase().includes((_a = keyWord === null || keyWord === void 0 ? void 0 : keyWord.toLowerCase()) !== null && _a !== void 0 ? _a : "");
    });
    if (searchResult.length == 0) {
        console.log("Not found!");
    }
    else {
        searchResult.map(function (parameter) {
            return console.log("> - ".concat(parameter.title, " by ").concat(parameter.author, " (").concat(parameter.year, ")"));
        });
    }
}
// 6. All functions must return void
var running = true;
var inMenu = "";
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
                    var keyWord = "";
                    while (keyWord == "") {
                        keyWord = prompt("Key word (Title): ", "");
                        keyWord.trim();
                        if (keyWord == "" || keyWord == " ") {
                            console.log("Please provide a title to search.");
                            keyWord = "";
                        }
                        else {
                            searchBook(keyWord);
                        }
                    }
                    inMenu = "";
                    break;
                case "4": // Exit App
                    console.log("Thank you for using this application...");
                    running = false; // Stop running
            }
        }
        else {
            console.log("The Menu number is not valid!");
            inMenu = "";
        }
    }
}
