import React from "react";
import { Input, FormBtn } from "../../components/Form";

const Search = () =>

<form>
<Input
  value={this.state.title}
  onChange={this.handleInputChange}
  name="title"
  placeholder="Title (required)"
/>
<Input
  value={this.state.url}
  onChange={this.handleInputChange}
  name="url"
  placeholder="URL (required)"
/>
<FormBtn
  disabled={!(this.state.url && this.state.title)}
  onClick={this.handleFormSubmit}
>
  Submit Book
</FormBtn>
</form>

export default Search;

