import React, { Fragment } from "react";
const Admin = () => {
  return (
    <div className="container justify-content-center">
      <div className="row">
        <div className="col-sm-6">
          <form className="form-group">
            <input type="text" className="form-control" placeholder="Título" />
            <input type="text" className="form-control" placeholder="Autor" />
            <textarea
              className="form-control"
              placeholder="Sinopsis"
              rows="10"
            />
          </form>
          <h2 className="display-2">Admin page</h2>
        </div>
      </div>
    </div>
  );
};

export default Admin;
