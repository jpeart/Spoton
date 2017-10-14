import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import SaveBtn from "../../components/SaveBtn";
//import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn, Select } from "../../components/Form";
//import helpers from '../../utils/helpers';
import DatePicker from 'react-datepicker';
import moment from 'moment';
 
import 'react-datepicker/dist/react-datepicker.css';
// a select with dynamically created options
const options = ["Wake", "Breakfast", "One hour after breakfast", "Lunch", "One hour after lunch", "Dinner", "One hour after dinner", "Bed", "Prior to workout", "Post workout", "Snack", "One hour after snack", "Felt low", "Felt high", "Miscellaneous"];

class MainLayout extends Component {
  state = {
    books: [],
    title: "",
    url: "",
    results: [],
    searchTerm: "",
    searchOptions: ["Select an Option", "First Option", "Second Option", "Third Option"]
  };

  constructor (props) {
    super(props)
    this.state = {
      dateTime: moment()
    };
    this.handleChange = this.handleChange.bind(this);
  }



  onChange(e) {
    this.setState({
      value: e.target.value
    })
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  // LIFECYCLE EVENT
  componentDidMount() {
    
  }

  // EVENTS
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleChange(date) {
    this.setState({
      dateTime: date
    });
  }

  handleFormSubmit = event => {
    event.preventDefault();
    console.log("Date:" + this.state.dateTime);
    console.log("Category:" + this.state.category);
    console.log("Reading:" + this.state.reading);
    console.log("Carbs:" + this.state.carbs);
    console.log("Bolus:" + this.state.bolus);
  };
   


  //LIFECYCLE EVENT
  render() {
    
    return (
      <Container fluid>
        <Row>
          <form>
      <div className="form-group">
          <DatePicker
          name="dateTime"
          selected={this.state.dateTime}
          onChange={this.handleChange}
          showTimeSelect
          dateFormat="LLL"
          />
        </div>

      <div className="form-group">
        <select value={this.state.value} onChange={this.handleInputChange} className="form-control" name="category">
        {options.map(option => {
          return <option value={option} key={option} >{option}</option>
        })}
      </select>
      </div>
            <Input
              value={this.state.reading}
              onChange={this.handleInputChange}
              name="reading"
              placeholder="Reading*"
            />
            <Input
              value={this.state.carbs}
              onChange={this.handleInputChange}
              name="carbs"
              placeholder="Carbs"
            />
            <Input
              value={this.state.bolus}
              onChange={this.handleInputChange}
              name="bolus"
              placeholder="Bolus"
            />
            <FormBtn
              //disabled={!(this.state.userdate && this.state.category && this.state.reading)}
              onClick={this.handleFormSubmit}
            >
              Add
            </FormBtn>
          </form>
          <hr />
        </Row>
      </Container>
    );
  }
}

export default MainLayout;

