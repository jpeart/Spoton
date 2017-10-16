import React from 'react';
import { Nav, NavItem, NavDropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink, Container, Row } from 'reactstrap';
import "./Nav.css";

export default class NavClass extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <div className="nav-container">        
          <Nav pills>
            <NavItem color="danger">
              <NavLink href="/inputform" active>Add Reading</NavLink>
            </NavItem>
            <NavDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle nav caret>
                Visualizations
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>Viz #1</DropdownItem>
                <DropdownItem>Viz #2</DropdownItem>
                <DropdownItem>Viz #3</DropdownItem>
                <DropdownItem>Viz #4</DropdownItem>                
              </DropdownMenu>
            </NavDropdown>
          </Nav>
      </div>
    );
  }
}