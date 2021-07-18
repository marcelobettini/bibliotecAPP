import React, { useState } from "react";
import { auth } from "../FirebaseConfig";
import { useHistory } from "react-router-dom";
import { MdEmail, MdLock } from "react-icons/md";
import { HiEye, HiEyeOff } from "react-icons/hi";
const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(null);
  const [pwdShown, setPwdShown] = useState(false);
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
    <div className="container  d-flex justify-content-center">
      <div className="row">
        <div className="col border border-2 rounded  mt-5 px-5 py-5">
          <form className="form-group" onSubmit={login}>
            <div className="input-group">
              <div className="input-group-text">
                <MdEmail></MdEmail>
              </div>
              <input
                type="text"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Ingrese su email..."
                autoComplete="user-name"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div id="emailHelp" className="form-text mb-5">
              Correo electrónico con que accede al sistema de administración
            </div>

            <div className="input-group">
              <div className="input-group-text">
                <MdLock />
              </div>
              <input
                type={pwdShown ? "text" : "password"}
                className="form-control"
                id="password"
                aria-describedby="password-help"
                placeholder="Ingrese la contraseña..."
                autoComplete="current-password"
                onChange={(e) => setPass(e.target.value)}
              />
              <div
                className="input-group-text"
                onClick={() => setPwdShown(!pwdShown)}
              >
                {pwdShown ? <HiEye /> : <HiEyeOff />}
              </div>
            </div>

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
