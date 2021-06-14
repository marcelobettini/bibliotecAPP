import React, { useState } from "react";
import { db } from "../FirebaseConfig";
const Admin = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [cover, setCover] = useState(null)
  const [error, setError] = useState(null);

  const uploadBook = async (e) => {
    e.preventDefault();
    if (!title.trim() || !author.trim() || !synopsis.trim()) {
      setError(
        "No puede haber campos vacíos. Complete 'Título', 'Autor' y 'Sinopsis'"
      );
    } else {      
      setError(null);
      const book = {
        title: title,
        author: author,
        synopsis: synopsis,
        cover: cover
      };
      try {
        const data = await db.collection("books").add(book);
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <div className="d-flex justify-content-center">
    <div className="row">
    <div className="col">
          <h6 className="display-6">Sección de Administración</h6>
      <p>Formulario de carga de libros en la base de datos</p>
    
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
            <div>
            {/* <label htmlFor="coverImg" className="formL-label">Foto de la portada</label> */}
            <input type="file" accept=".png, .jpg" className="form-control mb-4" onUpload={(e) => setCover(e.target.value)}/>
            </div>
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
