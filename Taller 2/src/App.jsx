import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {

    fetch("http://localhost:5173/allData")
      .then((res) => res.json())
      .then((data) => setBooks(data.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Lista de Libros</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <img src={book.picture} alt={book.nameBook} width="80" />
            <p><strong>{book.nameBook}</strong></p>
            <p>{book.gender}</p>
            <p>{book.datePublish}</p>
            <p>{book.isActive ? "Activo" : "Inactivo"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
