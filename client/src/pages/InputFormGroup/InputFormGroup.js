import React, { Component } from "react";
//import DeleteBtn from "../../components/DeleteBtn";
//import SaveBtn from "../../components/SaveBtn";
//import API from "../../utils/API";
//import { Col, Row, Container } from "../../components/Grid";
//import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
//import helpers from '../../utils/helpers';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Button, Form, FormGroup, Label, FormText, Col, Row, Container, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-datepicker/dist/react-datepicker.css';
import './InputFormGroup.css';
import SVGChart from '../Viz/Viz1.js';
import glucosedataimport from '../Viz/glucoseData.json'
import axios from 'axios';

// Select Options
const options = ["Make a selection:", "Wake", "Breakfast", "One hour after breakfast", "Lunch", "One hour after lunch", "Dinner", "One hour after dinner", "Bed", "Prior to workout", "Post workout", "Snack", "One hour after snack", "Felt low", "Felt high", "Miscellaneous"];
//import chartData from './pages/Viz/data.tsv';

const testdata = glucosedataimport;
const testwidth = 960;
const testheight = 500;

class InputFormGroup extends Component {
  componentDidMount() {
    console.log("hello");
    this.getInstance();
  }
  state = {
    books: [],
    title: "",
    url: "",
    results: [],
    searchTerm: "",
  };

  constructor (props) {
    super(props)
    this.state = {
      dateTime: moment(),
      modal: false,
      dropdownOpen: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.modalToggle = this.modalToggle.bind(this);
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }





  getInstance() {
    const token = localStorage.getItem('token');
    var instance = axios.create({
        headers: {'Authorization': `Bearer ${token}`}
    });
    //console.log(instance);
    var usr = this.props.location.pathname
    var usrQuery = usr.substring(7,(usr.length));
    console.log(usrQuery);
    instance
      .get('/api/users/' + usrQuery)
      .then(response=>console.log(response.data))

  }


  modalToggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  onChange(e) {
    this.setState({
      value: e.target.value
    })
  }

  // LIFECYCLE EVENT

  // EVENTS
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
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
    this.modalToggle();
    this.setState({
      dateTime: moment(),
      category: "",
      reading: "",
      carbs: "",
      bolus: ""
  })
};



  //LIFECYCLE EVENT
  render() {

    return (
      <div>
        <h2>User: Don Frito</h2>
        <div className="nav-container">

          <Button color="danger" onClick={this.modalToggle} className="nav-item rm-20">Add Reading</Button>
          <Dropdown outline isOpen={this.state.dropdownOpen} toggle={this.toggle} className="nav-item">
            <DropdownToggle outline caret>
              Dashboards
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Dashboard #1</DropdownItem>
              <DropdownItem>Dashboard #2</DropdownItem>
              <DropdownItem>Dashboard #3</DropdownItem>
              <DropdownItem>Dashboard #4</DropdownItem>
            </DropdownMenu>
          </Dropdown>
    </div>

    <SVGChart data={testdata} width={testwidth} height={testheight}/>
    <div>
          <Modal isOpen={this.state.modal} toggle={this.modalToggle} className={this.props.className}>
          <ModalHeader toggle={this.modalToggle}>Readings Entry</ModalHeader>
          <ModalBody>
        <Form>
        <FormGroup>
            <DatePicker form-group
            name="dateTime"
            selected={this.state.dateTime}
            onChange={this.handleChange}
            showTimeSelect
            timeIntervals={15}
            dateFormat="LLL"
            />
        </FormGroup>

        <FormGroup>
          <select value={this.state.value} onChange={this.handleInputChange} className="form-control" name="category">
          {options.map(option => {
            return <option value={option} key={option} >{option}</option>
          })}
        </select>
        </FormGroup>
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
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.handleFormSubmit}>Submit</Button>{' '}
            <Button color="secondary" onClick={this.modalToggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
    );
  }
}

export default InputFormGroup;
