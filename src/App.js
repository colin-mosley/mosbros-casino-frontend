import React from 'react';
import './App.css';
import SignUp from './Containers/SignUp'
import LogIn from './Containers/LogIn'

class App extends React.Component {
  State = {
    user: ''
  }

  userCreateOrLogIn = (e, type) => {
    let endpoint
    if (type === "Sign Up") {
      endpoint = 'users'
    } else if (type === "Log In") {
      endpoint = 'login'
    }
    let username = e.target.username.value
    let password = e.target.password.value

    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        username: username,  
        password: password, 
        game_id: 1
      })
    }
    fetch(`http://localhost:3001/${endpoint}`, configObj)
      .then(resp=> resp.json())
      .then(user=> this.userResponse(user))
  }

  userResponse= (response) => {
    if (response.error) {
      response.error.forEach(error => console.log(error))
    } else {
      localStorage.setItem('Token', response.jwt)
      this.setState({user: response.user.id})
      // localStorage.getItem('myValueInLocalStorage') || ''
    }
  }

  render() {
    return (
      <div className="App">
        <SignUp userCreateOrLogIn={this.userCreateOrLogIn} />
        <LogIn userCreateOrLogIn={this.userCreateOrLogIn}/>
      </div>
    );
  }
}

export default App;
