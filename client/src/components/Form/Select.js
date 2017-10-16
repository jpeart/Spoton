import React from "react";
import "./Form.css";


const options = ["Select an Option", "First Option", "Second Option", "Third Option"]

export const Select = props =>
  <div className="form-group">
    <label htmlFor="select2" >Select2</label>
        <select value={this.state.value} onChange={this.onChange.bind(this)} className="form-control" {...props}>
        {options.map(option => {
          return <option value={option} key={option} >{option}</option>
        })}
    </select>
  </div>;
