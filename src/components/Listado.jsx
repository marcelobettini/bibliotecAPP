import React, { useEffect, useState } from "react";
import { storage } from "../FirebaseConfig";

const Listado = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const getBooks = async () => {
      const { docs } = await storage.collection("books").get(); //{docs} = res.docs
      const arrBooks = docs.map((book) => ({ id: book.id, ...book.data() }));
      setBooks(arrBooks);      
    };
    getBooks();
  }, []);

  return (
    <div>
      <ul>
        {books.length ? (          
          books.sort((a,b) => a.title.localeCompare(b.title)).map((item) => (
            <li key={item.id}>
              {item.title} - {item.author}
            </li>
          ))
        ) : (
          <span></span>
        )}
      </ul>
    </div>
  );
};

export default Listado;
