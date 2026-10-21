import { useEffect } from 'react';
import './App.css';

// Child Component
function Book({ title, author }) {
  return (
    <div>
      <h3>Book Title: {title}</h3>
      <p>Author: {author}</p>
    </div>
  );
}

// Parent Component
function App() {
  const books = [
    { title: "Java Programming", author: "James Gosling" },
    { title: "Python Basics", author: "Guido van Rossum" }
  ];

  // Display message when page loads
  useEffect(() => {
    console.log("Welcome to the Book Management System");
  }, []);

  // Notification when the number of books changes
  useEffect(() => {
    console.log("Number of books: " + books.length);
  }, [books.length]);

  return (
    <div>
      <h1>Book Management System</h1>

      {books.length > 0 ? (
        <h2>Books Available</h2>
      ) : (
        <h2>No Books Available</h2>
      )}

      {books.map((book, index) => (
        <Book
          key={index}
          title={book.title}
          author={book.author}
        />
      ))}
    </div>
  );
}

export default App;