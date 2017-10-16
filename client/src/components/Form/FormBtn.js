import React from "react";
import "./Form.css";


export const FormBtn = props =>
  <div className="form-group">
    <button {...props} className="btn btn-success">
      {props.children}
    </button>
  </div>;
