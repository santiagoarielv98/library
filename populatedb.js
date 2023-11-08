const userArgs = process.argv.slice(2);

const Book = require("./models/book");
const Author = require("./models/author");
const Genre = require("./models/genre");
const BookInstance = require("./models/bookinstance");

const genres = [];
const authors = [];
const books = [];
const bookinstances = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");

  console.log("Debug: Removing all genres");
  await Genre.deleteMany({});
  console.log("Debug: Removing all authors");
  await Author.deleteMany({});
  console.log("Debug: Removing all books");
  await Book.deleteMany({});
  console.log("Debug: Removing all bookinstances");
  await BookInstance.deleteMany({});

  await createGenres();
  await createAuthors();
  await createBooks();
  await createBookInstances();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function genreCreate({ index, name }) {
  const genre = new Genre({ name: name });
  await genre.save();
  genres[index] = genre;
  console.log(`Added genre: ${name}`);
}

async function authorCreate({ index, first_name, family_name, d_birth, d_death }) {
  const authordetail = { first_name: first_name, family_name: family_name };
  if (d_birth != false) authordetail.date_of_birth = d_birth;
  if (d_death != false) authordetail.date_of_death = d_death;

  const author = new Author(authordetail);

  await author.save();
  authors[index] = author;
  console.log(`Added author: ${first_name} ${family_name}`);
}

async function bookCreate({ index, title, summary, isbn, author, genre }) {
  const bookdetail = {
    title: title,
    summary: summary,
    author: author,
    isbn: isbn,
  };
  if (genre != false) bookdetail.genre = genre;

  const book = new Book(bookdetail);
  await book.save();
  books[index] = book;
  console.log(`Added book: ${title}`);
}

async function bookInstanceCreate({ index, book, imprint, due_back, status }) {
  const bookinstancedetail = {
    book: book,
    imprint: imprint,
  };
  if (due_back != false) bookinstancedetail.due_back = due_back;
  if (status != false) bookinstancedetail.status = status;
  const bookinstance = new BookInstance(bookinstancedetail);
  await bookinstance.save();
  bookinstances[index] = bookinstance;
  console.log(`Added bookinstance: ${imprint}`);
}

async function createGenres() {
  console.log("Adding genres");
  await Promise.all([
    genreCreate({ index: 0, name: "Fantasy" }),
    genreCreate({ index: 1, name: "Science Fiction" }),
    genreCreate({ index: 2, name: "French Poetry" }),
  ]);
}

async function createAuthors() {
  console.log("Adding authors");
  await Promise.all([
    authorCreate({ index: 0, first_name: "Patrick", family_name: "Rothfuss", d_birth: "1973-06-06", d_death: false }),
    authorCreate({ index: 1, first_name: "Ben", family_name: "Bova", d_birth: "1932-11-8", d_death: false }),
    authorCreate({
      index: 2,
      first_name: "Isaac",
      family_name: "Asimov",
      d_birth: "1920-01-02",
      d_death: "1992-04-06",
    }),
    authorCreate({ index: 3, first_name: "Bob", family_name: "Billings", d_birth: false, d_death: false }),
    authorCreate({ index: 4, first_name: "Jim", family_name: "Jones", d_birth: "1971-12-16", d_death: false }),
  ]);
}

async function createBooks() {
  console.log("Adding Books");
  await Promise.all([
    bookCreate({
      index: 0,
      title: "The Name of the Wind (The Kingkiller Chronicle, #1)",
      summary:
        "I have stolen princesses back from sleeping barrow kings. I burned down the town of Trebon. I have spent the night with Felurian and left with both my sanity and my life. I was expelled from the University at a younger age than most people are allowed in. I tread paths by moonlight that others fear to speak of during day. I have talked to Gods, loved women, and written songs that make the minstrels weep.",
      isbn: "9781473211896",
      author: authors[0],
      genre: [genres[0]],
    }),
    bookCreate({
      index: 1,
      title: "The Wise Man's Fear (The Kingkiller Chronicle, #2)",
      summary:
        "Picking up the tale of Kvothe Kingkiller once again, we follow him into exile, into political intrigue, courtship, adventure, love and magic... and further along the path that has turned Kvothe, the mightiest magician of his age, a legend in his own time, into Kote, the unassuming pub landlord.",
      isbn: "9788401352836",
      author: authors[0],
      genre: [genres[0]],
    }),
    bookCreate({
      index: 2,
      title: "The Slow Regard of Silent Things (Kingkiller Chronicle)",
      summary:
        "Deep below the University, there is a dark place. Few people know of it: a broken web of ancient passageways and abandoned rooms. A young woman lives there, tucked among the sprawling tunnels of the Underthing, snug in the heart of this forgotten place.",
      isbn: "9780756411336",
      author: authors[0],
      genre: [genres[0]],
    }),
    bookCreate({
      index: 3,
      title: "Apes and Angels",
      summary:
        "Humankind headed out to the stars not for conquest, nor exploration, nor even for curiosity. Humans went to the stars in a desperate crusade to save intelligent life wherever they found it. A wave of death is spreading through the Milky Way galaxy, an expanding sphere of lethal gamma ...",
      isbn: "9780765379528",
      author: authors[1],
      genre: [genres[1]],
    }),
    bookCreate({
      index: 4,
      title: "Death Wave",
      summary:
        "In Ben Bova's previous novel New Earth, Jordan Kell led the first human mission beyond the solar system. They discovered the ruins of an ancient alien civilization. But one alien AI survived, and it revealed to Jordan Kell that an explosion in the black hole at the heart of the Milky Way galaxy has created a wave of deadly radiation, expanding out from the core toward Earth. Unless the human race acts to save itself, all life on Earth will be wiped out...",
      isbn: "9780765379504",
      author: authors[1],
      genre: [genres[1]],
    }),
    bookCreate({
      index: 5,
      title: "Test Book 1",
      summary: "Summary of test book 1",
      isbn: "ISBN111111",
      author: authors[4],
      genre: [genres[0], genres[1]],
    }),
    bookCreate({
      index: 6,
      title: "Test Book 2",
      summary: "Summary of test book 2",
      isbn: "ISBN222222",
      author: authors[4],
      genre: false,
    }),
  ]);
}

async function createBookInstances() {
  console.log("Adding authors");
  await Promise.all([
    bookInstanceCreate({
      index: 0,
      book: books[0],
      imprint: "London Gollancz, 2014.",
      due_back: false,
      status: "Available",
    }),
    bookInstanceCreate({ index: 1, book: books[1], imprint: " Gollancz, 2011.", due_back: false, status: "Loaned" }),
    bookInstanceCreate({ index: 2, book: books[2], imprint: " Gollancz, 2015.", due_back: false, status: false }),
    bookInstanceCreate({
      index: 3,
      book: books[3],
      imprint: "New York Tom Doherty Associates, 2016.",
      due_back: false,
      status: "Available",
    }),
    bookInstanceCreate({
      index: 4,
      book: books[3],
      imprint: "New York Tom Doherty Associates, 2016.",
      due_back: false,
      status: "Available",
    }),
    bookInstanceCreate({
      index: 5,
      book: books[3],
      imprint: "New York Tom Doherty Associates, 2016.",
      due_back: false,
      status: "Available",
    }),
    bookInstanceCreate({
      index: 6,
      book: books[4],
      imprint: "New York, NY Tom Doherty Associates, LLC, 2015.",
      due_back: false,
      status: "Available",
    }),
    bookInstanceCreate({
      index: 7,
      book: books[4],
      imprint: "New York, NY Tom Doherty Associates, LLC, 2015.",
      due_back: false,
      status: "Maintenance",
    }),
    bookInstanceCreate({
      index: 8,
      book: books[4],
      imprint: "New York, NY Tom Doherty Associates, LLC, 2015.",
      due_back: false,
      status: "Loaned",
    }),
    bookInstanceCreate({ index: 9, book: books[0], imprint: "Imprint XXX2", due_back: false, status: false }),
    bookInstanceCreate({ index: 10, book: books[1], imprint: "Imprint XXX3", due_back: false, status: false }),
  ]);
}
