import React, { useState } from "react";
import { auth } from "../FirebaseConfig";
import { useHistory } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(null);
  const navigate = useHistory();

  function login(e) {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, pass)
      .then((res) => {
        setError(null);
        navigate.push("/admin");
      })
      .catch((err) => {
        console.log(err);
        if (err.code === "auth/invalid-email") {
          setError(
            "No es un formato de email válido. Ej. válido: xxxxx@yyyyy.zzz"
          );
        }
        if (err.code === "auth/user-not-found") {
          setError("No hay registro de ese email en la base de datos");
        }
        if (err.code === "auth/wrong-password") {
          setError("La contraseña es incorrecta");
        }
      });
  }

  return (
    <div className="d-flex justify-content-center">
      <div className="row mt-4">
        <div className="col-8 mt-4">
          <form className="form-group" onSubmit={login}>
            <label htmlFor="email" className="form-label">
              E-Mail
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Ingrese su email aquí..."
              autoComplete="user-name"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div id="emailHelp" className="form-text">
              Debe escribir la dirección de coreo electrónico que le permite
              acceder al sistema de administración.
            </div>
            <label htmlFor="password" className="form-label mt-4">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              aria-describedby="password-help"
              placeholder="Ingrese la contraseña..."
              autoComplete="current-password"
              onChange={(e) => setPass(e.target.value)}
            />
            <div id="password-help" className="form-text mb-5">
              Su contraseña debe tener al menos seis caracteres alfanuméricos.
            </div>
            <div className="d-grid">
              {error ? (
                <span className="alert alert-danger">{error}</span>
              ) : (
                <span></span>
              )}
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

export default Login;
