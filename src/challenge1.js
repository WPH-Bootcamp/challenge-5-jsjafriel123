"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addBook = addBook;
exports.listBooks = listBooks;
exports.searchBook = searchBook;
var prompt = require("prompt-sync")({ sigint: true });
var fs = require("fs"); // Prerequsite for JSON file Read - Write
var path = require("path"); // Prerequsite for absolute path of the JSON file
var my_Books_Path = path.join(__dirname, "my_Books.json");
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
            return console.log("- ".concat(parameter.title, " by ").concat(parameter.author, " (").concat(parameter.year, ")"));
        });
    }
}
// 5. Implement a function named `searchBook` to find books by title (should be an optional parameter) ==> Optional by initializing the parameter.
function searchBook(searchKey) {
    var _a;
    if (searchKey === void 0) { searchKey = ""; }
    if (searchKey == "" || searchKey == " ") {
        console.log("Please provide a title to search.");
        searchKey = prompt("Enter Title Key Word: ", "");
        (_a = searchKey.trim()) !== null && _a !== void 0 ? _a : "";
    }
    console.log("Search Results for \"".concat(searchKey, "\":"));
    var searchResult = myBooks.filter(function (book) {
        return book.title.includes(searchKey !== null && searchKey !== void 0 ? searchKey : "");
    });
    if (searchResult.length == 0) {
        console.log("No books found with title containing \"".concat(searchKey, "\"."));
    }
    else {
        searchResult.map(function (parameter) {
            return console.log("- ".concat(parameter.title, " by ").concat(parameter.author, " (").concat(parameter.year, ")"));
        });
    }
}
// 6. All functions must return void
var running = true;
var inMenu = "";
// Read previous records from JSON file
try {
    var rawData = fs.readFileSync(my_Books_Path, "utf-8");
    myBooks = JSON.parse(rawData);
}
catch (error) {
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
                        var dataString = JSON.stringify(myBooks, null, 2);
                        fs.writeFileSync(my_Books_Path, dataString);
                    }
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
