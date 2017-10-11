import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import SaveBtn from "../../components/SaveBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
import helpers from '../../utils/helpers';

class Books extends Component {
  state = {
    books: [],
    title: "",
    url: "",
    results: [],
    searchTerm: ""
  };

  // LIFECYCLE EVENT
  componentDidMount() {
    this.loadBooks();
  }

  // EVENTS
    handleSaveClick = (item) => {
      console.log('save button clicked');
      helpers.postSaved(item.headline.main, item.web_url, item.pub_date).then(function() {
        console.log(item);
      }).then(this.loadBooks())
    }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, title: "", url: "" })
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.term) {
      helpers.runQuery(this.state.term, this.state.start, this.state.end)
      .then((data) => {
        this.setState({ results: data.docs });
      });
    }
  };

  //LIFECYCLE EVENT
  render() {
    
    return (
      <Container fluid>
        <Row>
          <form>
            <Input
              value={this.state.term}
              onChange={this.handleInputChange}
              name="term"
              placeholder="Keyword (required)"
            />
            <Input
              value={this.state.start}
              onChange={this.handleInputChange}
              name="start"
              placeholder="Start Year (required)"
            />
            <Input
              value={this.state.end}
              onChange={this.handleInputChange}
              name="end"
              placeholder="End Year (required)"
            />
            <FormBtn
              disabled={!(this.state.term && this.state.start && this.state.end)}
              onClick={this.handleFormSubmit}
            >
              Search
            </FormBtn>
          </form>
          <hr />
        </Row>
      </Container>
    );
  }
}

export default Books;

