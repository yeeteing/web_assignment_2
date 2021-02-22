var assert = require('assert');
const Book = require('../models/book');
const request = require('request');
const mongo = require('../utils/db');

var db;
// This method runs once and connects to the mongoDB
before(async function () {
    try {
        db = await mongo.connectToDB();
    } catch (err) {
        throw err;
    }
});
// this method will close your connection to MongoDB after the tests
after(async function () {
    try {
        mongo.closeDBConnection();
    } catch (err) {
        throw err;
    }

}); 

describe('Testing the Book API', async function () {
    describe('Testing the Book Model - Simple cases', function () {
        let id       = 1
        let name     = "Harry"
        let authors  = "JK"
        let year     = 2010
        let publisher= "Nort"
        var book = new Book(id, name, authors, year, publisher);
        it('Fail 1 - Test creation of a valid Book with parameters matching', function () {
            assert.strictEqual(book.id, 1);
            assert.strictEqual(book.name, "Harry");
            assert.strictEqual(book.authors, "JK");
            assert.strictEqual(book.year, 2010);
            assert.strictEqual(book.publisher, "Nort");
        });
        it('Fail 2 - Test an invalid Book id', async function () {
            var book = new Book("x", name, authors, year, publisher);
            assert.strictEqual(await book.isValid(), false);
        });
        it('Fail 3 - Test an invalid Book name',async function () {
            var book = new Book(id, "", authors, year, publisher);
            assert.strictEqual(await book.isValid(), false);
        });
        it('Fail 4 - Test an invalid Book authors', async function () {
            var book = new Book(id, name, "", year, publisher);
            assert.strictEqual(await book.isValid(), false);
        });
        it('Fail 5 - Test Invalid Book year', async function () {
            var book = new Book(id, name, authors, "year", publisher);
            assert.strictEqual(await book.isValid(), false);
        });
        it('Success 1 - Test the insertion of a valid Book (Book.save) - Success Msg test', function () {

        });
        it('Success 2 - Test the update of a valid Book (Book.update) - Success Msg test', function () {

        });
        it('Success 3 - Test the deletetion of a valid Book (Book.delete) - Success Msg test', function () {

        });
        it('Success 4 - Test the retrieval of a book by id (Book.getBookById) - Success Msg test', function () {

        });
        it('Success 5 - Test the retrieval of all books (Book.getBooks) - Success Msg test', function () {

        });
    });
    describe('Testing the Book API - Complex Cases', function () {
        it('Success 1 - POST /books, DELETE /books/:id', function () {

        });
        it('Success 2 - POST /books, GET /books (retrieval greater than 1), DELETE /book/:id', function () {

        });
        it('Success 3 - POST /books, GET /books/:id, DELETE /book/:id', function () {

        });
        it('Success 4 - POST /books, PUT /books/:id, GET /books/:id, DELETE /book/:id', function () {

        });
        it('Success 5 - (Optional) Open', function () {

        });
        it('Success 6 - (Optional) Open', function () {

        });
    });
});