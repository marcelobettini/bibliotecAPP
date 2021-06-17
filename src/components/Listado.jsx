import React, { useEffect, useState } from "react";
import { storage } from "../FirebaseConfig";
import { Modal } from "bootstrap";

const Listado = () => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [cover, setCover] = useState("");

  function bookDetail(id) {
    storage
      .collection("books")
      .doc(id)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setTitle(snapshot.data().title);
          setAuthor(snapshot.data().author);
          setSynopsis(snapshot.data().synopsis);
          setCover(snapshot.data().cover);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
    setTitle("");
    setAuthor("");
    setSynopsis("");
    setCover("");
  }

  useEffect(() => {
    const getBooks = async () => {
      const { docs } = await storage.collection("books").get(); //{docs} = res.docs
      const arrBooks = docs.map((book) => ({ id: book.id, ...book.data() }));
      setBooks(arrBooks);
    };
    getBooks();
  }, []);

  return (
    <div className="container-fluid text-center">
      <h6 className="display-6">Listado de libros</h6>
      <p>Títulos contenidos en la base de datos</p>
      <div className="row d-flex justify-content-center">
        <div className="col-sm-5">
          <ul className="list-group mt-4">
            {books.length ? (
              books
                .sort((a, b) => a.title.localeCompare(b.title))
                .map((item) => (
                  <li
                    key={item.id}
                    className="list-group-item"
                    data-bs-toggle="modal"
                    data-bs-target="#modal"
                    onClick={(id) => {
                      bookDetail(item.id);
                    }}
                  >
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">{item.title}</div>
                      {item.author}
                    </div>
                  </li>
                ))
            ) : (
              <span></span>
            )}
          </ul>
        </div>
        <div
          className="modal fade"
          id="modal"
          tabIndex="-1"
          aria-labelledby="modal"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="modalLabel">
                  {title}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p className="text-start">{author}</p>
                <img className="img-fluid" src={cover} alt="" />
                <p>{synopsis}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listado;
