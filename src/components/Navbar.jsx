import React, { useEffect, useState, Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../FirebaseConfig";

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
      <div className="container-fluid">
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
              Libros
            </Link>
            {!logged ? (
              <Link
                className="nav-link text-success"
                aria-current="page"
                to="/login"
              >
                Login
              </Link>
            ) : (
              <Fragment>
                <Link className="nav-link" aria-current="page" to="/admin">
                  Administrar
                </Link>
                <span
                  className="nav-link text-danger"
                  aria-current="page"
                  onClick={logout}
                >
                  Logout
                </span>
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
