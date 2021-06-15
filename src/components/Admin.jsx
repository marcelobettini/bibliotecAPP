import React, { useState } from "react";
import { storage, storageImg } from "../FirebaseConfig";
const Admin = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [cover, setCover] = useState(null);
  const [error, setError] = useState(null);

  const uploadBook = async (url) => {
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
        cover: url,
      };
      try {
        const data = await storage.collection("books").add(book);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setCover(e.target.files[0]);
      console.log(e.target.files[0]);
    }
  };
  const handleUpload = (e) => {
    e.preventDefault();
    const uploadTask = storageImg.ref(`covers/${cover.name}`).put(cover);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storageImg
          .ref("covers")
          .child(cover.name)
          .getDownloadURL()
          .then((url) => {
            uploadBook(url);
          });
      }
    );
  };
  return (
    <div className="d-flex justify-content-center">
      <div className="row">
        <div className="col">
          <h6 className="display-6">Sección de Administración</h6>
          <p>Formulario de carga de libros en la base de datos</p>

          <form className="form-group mt-5" onSubmit={handleUpload}>
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
              <input
                type="file"
                accept=".png, .jpg"
                className="form-control mb-4"
                onChange={handleChange}
              />
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
