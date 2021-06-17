import React, { useState } from "react";
import { storage, storageImg } from "../FirebaseConfig";
const Admin = () => {
  const formEl = document.getElementById("form")
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [cover, setCover] = useState(null);
  const [error, setError] = useState(null);

  const uploadBook = async (url) => {
    const book = {
      title: title,
      author: author,
      synopsis: synopsis,
      cover: url,
    };
    try {
      await storage.collection("books").add(book); //quité const data = await...
    } catch (e) {}
    setError(null);
    setCover(null);
    formEl.reset()
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setCover(e.target.files[0]);
    }
  };
  const handleUpload = (e) => {
    e.preventDefault();
    if (!title.trim() || !author.trim() || !synopsis.trim()) {
      setError(
        "No puede haber campos vacíos. Complete 'Título', 'Autor' y 'Sinopsis'"
      );
    } else if (cover === null) {
      setError("Debe cargar la portada del libro");
    } else {
      const uploadTask = storageImg.ref(`covers/${cover.name}`).put(cover);
      console.log("dentro de handleUpload, antes de uploadTask.on");
      console.log(uploadTask);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          console.log(`transferido: ${(snapshot.totalBytes / snapshot.bytesTransferred)*100}`)
          
        },
        (error) => {
          setError(error);
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
    }
  };
  return (
    <div className="container-fluid text-center">
      <div className="row d-flex justify-content-center">
        <div className="col-sm-5">
          <h6 className="display-6">Sección de Administración</h6>
          <p>Formulario de carga de libros en la base de datos</p>

          <form id="form" className="form-group mt-5" onSubmit={handleUpload}>
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
              <input
                type="file"
                accept=".png, .jpg"
                className="form-control mb-4"
                onChange={handleChange}
              />
            </div>
            {error ? (
              <div>
                <p className="alert alert-danger">{error}</p>
              </div>
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
