const Book = require("../models/book.js")
async function get_collection(db){
    return await db.collection('books');
}
const create = async (req, res) => {
	const new_book = new Book(parseInt(req.body.id), req.body.name, req.body.authors, parseInt(req.body.year), req.body.publisher);
	if(new_book.isValid()) {
		let db = req.db;
		let collection = await get_collection(db);
		try{
			let msg = await new_book.save(collection);
			res.send(msg);
		}catch(err){
			res.send('There was an error while saving your Book. (err:'+err+')');
			throw new Error(err);
		}
	} else {
		console.log(new_book.isValid())
		res.send('client-side: The Book data you entered is invalid')
	}
}

const getOne = async (req, res) => {
	const book_to_get = req.params.id;
	let db = req.db;
	let collection = await get_collection(db);
	try{
		let obj = await Book.getBookById(collection, book_to_get);
		res.send(obj);
	}catch(err){
		res.send('There was an error while retrieving your Book. (err:'+err+')');
		throw new Error(err);
	}	
}

const updateOne = async (req, res) => {
	const book_to_update = req.body
	const book_id = req.params.id
	let db = req.db;
	let collection = await get_collection(db);
	try{
		let msg = await Book.update(collection, book_id, book_to_update.name, book_to_update.authors, book_to_update.year, book_to_update.publisher);
		res.send(msg);
	}catch(err){
		res.send('There was an error while updating your Book. (err:'+err+')');
		throw new Error(err);
	}	
}

const deleteOne = async (req, res) => {
	const book_id = req.params.id;
	let db = req.db;
	let collection = await get_collection(db);
	try{
		let msg = await Book.delete(collection, book_id);
		res.send(msg);	
	}catch(err){
		res.send('There was an error while deleting your Book. (err:'+err+')');
		throw new Error(err);
	}		
}

const all = async (req, res) => {
	let db = req.db;
	let collection = await get_collection(db);
	try{
		let obj = await Book.getBooks(collection);
		console.log('server-side: '+obj.books.length+' book(s) were returned');
		res.send(obj);
	}catch(err){
		res.send('There was an error while retrieving all Books. (err:'+err+')');
		throw new Error(err);
	}
		
}

// Make all methods available for use.
module.exports = {
	create,
	getOne,
	updateOne,
	deleteOne,
	all
}
