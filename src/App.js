import "./App.css";

import axios from "axios";
import React from "react";

class App extends React.Component {
  state = {
    contacts: [],
    name: "",
    telephoneNumber: ""
  };

  componentDidMount() {
    this.getContacts();
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  getContacts() {
    axios
      .get(
        "https://uaufkl5gs9.execute-api.us-east-2.amazonaws.com/prod/contacts"
      )
      .then(res => {
        const contacts = res.data.data;
        this.setState({ contacts });
      });
  }

  handleSubmit = event => {
    event.preventDefault();

    axios
      .post(
        "https://uaufkl5gs9.execute-api.us-east-2.amazonaws.com/prod/contacts",
        {
          name: this.state.name,
          telephoneNumber: this.state.telephoneNumber
        }
      )
      .then(res => {
        console.log(res.data);
      });
  };

  render() {
    return (
      <div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Person Name:
              <input type="text" name="name" onChange={this.handleChange} />
            </label>
            <label>
              Telephone Number:
              <input
                type="text"
                name="telephoneNumber"
                onChange={this.handleChange}
              />
            </label>
            <button type="submit">Add</button>
          </form>
        </div>
        <div>
          <ul>
            {this.state.contacts.map(contact => (
              <li key={contact.id}>
                {contact.name} - {contact.telephoneNumber}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
