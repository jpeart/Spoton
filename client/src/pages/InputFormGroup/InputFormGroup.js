import React, { Component } from "react";
import { Input, FormBtn } from "../../components/Form";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Button, Form, FormGroup, Label, FormText, Col, Row, Container, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-datepicker/dist/react-datepicker.css';
import './InputFormGroup.css';
import SVGChart from '../Viz/Viz1.js';
import SVGChart2 from '../Viz/Viz2.js';
import glucosedataimport from '../Viz/glucoseData.json'
import glucosedataimport2 from '../Viz/glucoseData2.json'
import * as d3 from 'd3'
import axios from 'axios';
import { Redirect } from 'react-router';

// Select Options
const options = ["Make a selection:", "Wake", "Breakfast", "One hour after breakfast", "Lunch", "One hour after lunch", "Dinner", "One hour after dinner", "Bed", "Prior to workout", "Post workout", "Snack", "One hour after snack", "Felt low", "Felt high", "Miscellaneous"];
const testdata = glucosedataimport;

//glucosedataimport2.forEach(function(d) { d.time = new Date(d.time * 1000); });
//const testdata2 = glucosedataimport2;

const testwidth = 960;
const testheight = 500;

class InputFormGroup extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dateTime: moment(),
      modal: false,
      dropdownOpen: false,
      viz1Visible: true,
      viz2Visible: false,
      userData: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.modalToggle = this.modalToggle.bind(this);
    this.viz1Visible = this.viz1Visible.bind(this);
    this.viz2Visible = this.viz2Visible.bind(this);
  }

  componentDidMount() {
    //console.log("hello");
    // Jordan: Attach appropriate username to header
    var usr = this.props.location.pathname
    var usrName = usr.substring(7,(usr.length));
    //console.log(usrName + " attached to header");
    document.getElementById("userheader").innerHTML = "User: "+usrName;
    this.getInstance();
    //this.state.userData.forEach(function(d) { d.time = new Date(d.time * 1000); }); 
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
    //console.log(usrQuery);
    instance
      .get('/api/users/' + usrQuery)
      .then(response =>
        this.setState({ userData: response.data })
      )
      .catch(err => console.log(err))
      //.then(this.state.userData.forEach(function(d) { d.time = new Date(d.time * 1000); }))

  }


  modalToggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  viz1Visible() {
    this.setState({
      viz1Visible: true,
      viz2Visible: false
    });
  }

  viz2Visible() {
    this.setState({
      viz1Visible: false,
      viz2Visible: true
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

    //console.log("Date:" + this.state.dateTime);
    // console.log("Category:" + this.state.category);
    // console.log("Reading:" + this.state.reading);
    // console.log("Carbs:" + this.state.carbs);
    // console.log("Bolus:" + this.state.bolus);



    //create reading object
    var temp = { username: "", time: 0, category: "", reading: 0, note: "", carbs: 0, bolus: 0 };

    // jordan: make the api call here
    const token = localStorage.getItem('token');
    var instance = axios.create({
        headers: {'Authorization': `Bearer ${token}`}
    });

    var usr = this.props.location.pathname
    var usrQuery = usr.substring(7,(usr.length));

    //populate reading with data from form / URL
    temp.username = usrQuery;
    temp.time = this.state.dateTime;
    temp.category = this.state.category;
    temp.reading = this.state.reading;
    temp.carbs = this.state.carbs;
    temp.bolus = this.state.bolus;
    console.log("time: "+temp.time);

    // make the api call
    instance
      //.post('/api/users/' + usrQuery, function(req, res){res.send(temp)})
      .post('/api/users/'+usrQuery, temp)
      .then(response=>console.log(response.data))

    this.modalToggle();
    this.setState({
      dateTime: moment(),
      category: "",
      reading: "",
      carbs: "",
      bolus: ""
  })
};

logout = (event) => {
  localStorage.setItem('token', 'logged out')
  this.setState({redirect: true});
}



  //LIFECYCLE EVENT
  // jordan: Gave h2 an ID and manipulate it in ComponentDidMount();
  render() {

    if (this.state.redirect) {
      return <Redirect push to={"/"}/>;
    } else {

    return (
      <div>
        <h2 id="userheader">User: Don Frito</h2>
        <div className="nav-container">

          <Button color="danger" onClick={this.modalToggle} className="nav-item rm-20">Add Reading</Button>
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className="nav-item rm-20" outline>
            <DropdownToggle outline caret>
              Dashboards
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={this.viz1Visible}>Glucose Readings</DropdownItem>
              <DropdownItem onClick={this.viz2Visible}>Heatmap</DropdownItem>               
            </DropdownMenu>
          </Dropdown>
          <Button color="danger" onClick={this.logout} classname="nav-item">Log Out</Button>
    </div>
    {
          this.state.viz1Visible
            ? <SVGChart2 data={this.state.userData} width={testwidth} height={testheight} />
            : null
          }
    {
          this.state.viz2Visible
            ? <SVGChart data={testdata} width={testwidth} height={testheight} />
            : null
        }

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
}

export default InputFormGroup;