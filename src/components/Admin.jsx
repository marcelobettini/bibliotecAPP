import React, { useState } from "react";
import { db } from "../FirebaseConfig";
const Admin = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [error, setError] = useState(null);

  const uploadBook = async (e) => {
    e.preventDefault();
    if (!title.trim() || !author.trim() || !synopsis.trim()) {
      setError(
        "No puede haber camnpos vacíos. Debe completar 'Título', 'Autor' y 'Sinopsis'"
      );
    } else {
      console.log(title, author, synopsis);
      setError(null);
      const book = {
        title: title,
        author: author,
        synopsis: synopsis,
      };
      try {
        const data = await db.collection("books").add(book);
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <div className="container justify-content-center">
      <h2 className="display-2">Admin page</h2>
      <div className="row">
        <div className="col-sm-6">
          <form className="form-group mt-5" onSubmit={uploadBook}>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Título"
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Autor"
              onChange={(e) => setAuthor(e.target.value)}
            />
            <textarea
              className="form-control mb-4"
              placeholder="Sinopsis"
              rows="10"
              onChange={(e) => setSynopsis(e.target.value)}
            />
            {error ? (
              <div className="alert alert-danger">{error}</div>
            ) : (
              <span></span>
            )}

            <div className="d-grid">
              <input
                type="submit"
                className="btn btn-success"
                value="Confirmar"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admin;
