import React from 'react';
import axios from 'axios';

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        };
    }

    submitForm = (event) => {
        event.preventDefault();
        axios({
            method: 'post',
            url: '/login',
            data: {
              username: this.state.username,
              password: this.state.password
            }
        }).then(response => {
            // store the token in local storage so we can include it later!
            localStorage.setItem('token', response.data.token)

        }).then(()=>{
            const token = localStorage.getItem('token');
            // we're using this to make a special object so we can
            // set the request
            var instance = axios.create({
                headers: {'Authorization': `Bearer ${token}`}
            });
            // This makes a call to the server with our custom token and then
            // we display log the token to the console. /api/users is a protected
            // route and we can test this in postman to confirm whether or not
            // we need a token!
            instance.get('/api/users').then(response=>console.log(response.data)).catch(err=>console.log(err));
            instance.get('/api/users/' + this.state.username).then(response=>console.log(response.data)).catch(err=>console.log(err))
            // instance.get('/api/users').then(response=>console.log(response.data)).catch(err=>console.log(err));
        })
        .catch(error=> {
            console.log('Something happened', error)
        });
    }

    handleInputChange = event => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div>
                <form className="form">
                    <input name="username" value={this.state.username} onChange={this.handleInputChange}/>
                    <input type="password" name="password" value={this.state.password} onChange={this.handleInputChange}/>
                    <button onClick={this.submitForm}>LOGIN</button>
                </form>
            </div>
        );
    }
}
