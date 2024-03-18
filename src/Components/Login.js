import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Login = (props) => {
    const {showAlert} = props
    let history = useHistory();
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const handleSubmit = async (e) => {
        e.preventDefault();
        //API call
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            localStorage.setItem('token', json.authtoken)
            history.push('/')
            showAlert("LoggedIn Succcesfully ", "success")

        }
        else {
            showAlert("Invalid credentials", "danger")
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className='container'>
            <h2 className='mb-4'>Login to continue to iNoteBook</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group my-3">
                  <b> <label htmlFor="exampleInputEmail1">Email address</label></b>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" value={credentials.email} onChange={onChange} />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                   <b> <label htmlFor="exampleInputPassword1">Password</label></b>
                    <input type="password" className="form-control" id="password" name="password" placeholder="Password" value={credentials.password} onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary my-3">Submit</button>
            </form>
        </div>
    )
}

export default Login
