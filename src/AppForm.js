import React from 'react';
import './AppForm.css';
import Amplify, { API } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);


class AppForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        firstName: '',
        lastName:'',
        streetAddress:'',
        zipcode: '',
        city:'',
        phoneNumber:'',
        curentState: 'California',
        party:'Democratic',
        email:''
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.getRecord = this.getRecord.bind(this);
    }

    getRecord(event){
      const apiName = 'react-app-table-api';
      const path = '/';
      const myInit = { // OPTIONAL
          headers: {'id':this.state.firstName, 'Content-Type':'application/json'}, // OPTIONAL
          response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
          
      };
     
      API.get(apiName, path,myInit)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error.response);
      });

    }
  
    handleChange(event) {
      const target = event.target;
      this.setState({[target.name]: target.value});
    }

    handleSubmit(event) {
      //alert('Thank You ' + this.state.party);
      //event.preventDefault();
      this.getRecord();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>First Name</label>
          <input name = "firstName" type="text" value={this.state.firstName} onChange={this.handleChange}></input>

          <label>Last Name</label>
          <input name = "lastName" type="text" value = {this.state.lastName} onChange={this.handleChange}></input>

          <label>Street Address</label>
          <input name= "streetAddress" type="text" value = {this.state.streetAddress} onChange ={this.handleChange}></input>

          <label>City</label>
          <input name ="city" type="text" value = {this.state.city}  onChange ={this.handleChange}></input>

          <label>Zip Code</label>
          <input name="zipcode" type="text" value = {this.state.zipcode}  onChange ={this.handleChange}></input>

          <label>State</label>
          <input name="curentState" type="text" value={this.state.curentState} onChange ={this.handleChange}></input>

          <label>Phone Number</label>
          <input name="phoneNumber" type="tel" value = {this.state.phoneNumber} onChange ={this.handleChange} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="123-45-678" ></input>

          <label >Affiliated Party</label>
          <select  name="party" value = {this.state.party} onChange={this.handleChange}>
          <option value="Democratic">Democratic</option>
          <option value="Independent">Independent</option>
          <option value="Republican">Republican</option>
          </select>

          <label>Email</label>
          <input name = "email"  type="email" value = {this.state.em}  onChange ={this.handleChange}></input>

          <input type="submit" value="Submit" />
        </form>
      );
    }
  }

export default AppForm;
