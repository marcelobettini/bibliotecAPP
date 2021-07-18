import React, { useEffect, useState, Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../FirebaseConfig";
import "../styles/Navbar.css";

const Navbar = () => {
  const navigate = useHistory();
  const [logged, setLogged] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setLogged(user);
      }
    });
  }, [logged]);
  const logout = () => {
    auth.signOut();
    setLogged(null);
    navigate.push("/");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          LOGO
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link" to="/listado">
              <button className="btn btn-sm btn-outline-primary push">
                Libros
              </button>
            </Link>
            {!logged ? (
              <Link
                className="nav-link text-success"
                aria-current="page"
                to="/login"
              >
                <button className="btn btn-sm btn-outline-success push">
                  Login
                </button>
              </Link>
            ) : (
              <Fragment>
                <Link className="nav-link" aria-current="page" to="/admin">
                  <button className="btn btn-sm btn-outline-primary push">
                    Administrar
                  </button>
                </Link>
                <Link className="nav-link" aria-current="page" to="/">
                  <button
                    className="btn btn-sm btn-outline-danger push"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </Link>
              </Fragment>
            )}
            {/* <Link
              className="nav-link disabled"
              to="#"
              tabIndex="-1"
              aria-disabled="true"
            >
              Disabled
            </Link> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
