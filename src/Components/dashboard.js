import React, { Component } from "react";

export default class Dashboard extends Component {
    constructor() {
      super();
      //Set default message
      this.state = {
        id: '',
        email: ''
      }
    }
    componentDidMount() {
      //GET message from server using fetch api
      let token = localStorage.getItem("token")
      fetch('http://localhost:5000/dashboard',{
        method:"GET",
        headers: {
            'Content-Type': 'application/json',
            "authorization": token,
        }
        })
        .then( async (res) => {
          let data = await res.json()
          //console.log(data.message)
          this.setState({id:data.id,email:data.email})
        })
        .catch(err => {
          console.error(err);
          alert('Something went wrong!');
        });
    }
    render() {
      return (
        <div>
          <h1>Dashboard</h1>
          <p>{this.state.id}</p>
          <p>{this.state.email}</p>
        </div>
      );
    }
  }