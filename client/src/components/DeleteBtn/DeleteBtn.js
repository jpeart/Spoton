import React from "react";
import "./DeleteBtn.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const DeleteBtn = props => (
  <div className="delete-btn"><button type="button" className="btn btn-primary btn-sm" {...props}>Delete</button>
  </div>
);

export default DeleteBtn;
