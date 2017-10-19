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

  componentDidMount() {
    //console.log("hello");
    // Jordan: Attach appropriate username to header
    var usr = this.props.location.pathname
    var usrName = usr.substring(7,(usr.length));
    //console.log(usrName + " attached to header");
    document.getElementById("userheader").innerHTML = "User: "+usrName;

    this.getInstance();
  }
  
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
      .then(response => {
        this.findpatterns(response.data);
        this.setState({ userData: response.data });
      })
      .catch(err => console.log(err))
      //.then(this.state.userData.forEach(function(d) { d.time = new Date(d.time * 1000); }))
  }

  refreshInstance() {
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
      .then(response => {
        this.setState({ userData: response.data });
      })
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
      .then(response=> console.log(response.data))

    this.modalToggle();
    this.setState({
      dateTime: moment(),
      category: "",
      reading: "",
      carbs: "",
      bolus: ""
  })

  this.refreshInstance();
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

          <Button color="info" onClick={this.modalToggle} className="nav-item rm-20">Add Reading</Button>
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
            <Button color="info" onClick={this.handleFormSubmit}>Submit</Button>{' '}
            <Button color="secondary" onClick={this.modalToggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
    );
  }
}

//**************************** JORDAN's DUMBASS PATTERN RECOGNITION **********************************
//====================================================================================================

findpatterns(stuff){
//************************************************************************************************************************************
//====================================================================================================================================
//************************************************************************************************************************************

//sent an array of "readings" { username: "",
//  time: Timestamp,
  // wake, breakfast, 1 hr after breakfast, lunch, 1 hr after lunch, dinner, 1 hr after dinner
  // bed, prior to workout, post workout, snack, 1 hr after snack, felt low, felt high,
  // Miscellaneous 
  // 14 categories
//  category: String,
//  usertime: Timestamp,
//  reading: Number,
//  note: String,
//  carbs: Number,
//  bolus: Number
//3 or more of similar readings to signify a pattern
//todo later: save patterns to database, check to see if improvements made

//counter? throw similar in a separate array? 
//cant group by time (not a control group) so have to use category

//throw each reading in an array based on its category 
//(loop through readings array N times where N = # of categories) 
//can do better? (loop through readings once by pushing to temp based on category)
//( N if statements =/ ) 

//***********************************************************************************************************************************
// ==================================================================================================================================
//***********************************************************************************************************************************
var alertme = "Hi "+stuff[0].username+",\n"+"Before Reading your graphs here are a few patterns we have found:\n\n";
//how many readings per category? (week's worth for now)
var pool = 7;

// array of categories
var categories =  ["wake", "breakfast", "afterbreakfast", "lunch", "afterlunch", "dinner", "afterdinner",
"bed", "prior to workout", "post workout", "snack", "aftersnack", "felt low", "felt high", "miscellaneous"];

//make 2 dimentional array where [i][0] = name of category
var patterns = new Array(categories.length);

console.log("stuff: "+ stuff);
//loop each index
for(let i=0; i<categories.length; i++){
  //make each index an array
  patterns[i] = new Array();
  //assign the first index of new array the name of the category
  patterns[i][0] = categories[i];
}
  
//put readings in their respective arrays

// for each reading
for(let i=0; i<stuff.length; i++){
  // check its category
  for(let j=0; j<categories.length; j++){
    //push it to corresponding array
    if(stuff[i].category == categories[j]){
      patterns[j].push(stuff[i].reading);
      // dont do more work than needed
      break;
    }//end if statement
  }//end j loop
}//end for loop

//call showmethesugarfacts() for each category
var addme = "";
//console.log(alertme[alertme.length-1]);
for(let i=0;i<patterns.length; i++){
  console.log("sugar by category: " + patterns[i]);
  if(patterns[i].length > 1){
    addme += this.showmethesugarfacts(patterns[i]);
  }
}
if(!addme)
  alertme += "No  negative patterns. Way to go! You must be Wilfred Brimley!";
else
  alertme += addme;

alert(alertme);

}//end findpatterns


showmethesugarfacts(sugars){
//console.log("sugars called for "+sugars[0]);
//console.log(sugars);
var patternstring = "";
//highs counter
var highs = 0;
//lows counter
var lows = 0;
//avg 
var avg = 0;
//not enough readings to find a pattern
if(sugars.length-1 < 3){
  console.log("No pattern, Not enough sugars for the "+sugars[0]+" category");
  return;
}
//atleast 3 readings
else{
  //find lows and highs
  for(let i=1;i<sugars.length; i++){
    //highs
    if(sugars[i] > 190)
      highs++;
    else if(sugars[i] < 75)
      lows++;
    avg += sugars[i];
    // console.log(sugars[i]);
    // console.log("avg = "+avg);
  }

  avg = Math.floor(avg / (sugars.length-1));
  if(highs >= 3)
    patternstring += "There is a tendency to go high at "+sugars[0]+". Average = "+avg+"\n";
  else if(lows >= 3)
    patternstring += "There is a tendency to go low at "+sugars[0]+". Average = "+avg+"\n";
  //else
  //   patternstring += "no bad patterns found for "+sugars[0];

  // //no patterns
  // if(!patternstring)
  //   patternstring="You have no known bad patterns! woo";

  return patternstring;
  
  }//end else
}//end showmethesugarfacts()

//*******************************************************************************************************
//=======================================================================================================
}

export default InputFormGroup;