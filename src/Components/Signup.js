import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Signup = (props) => {
    let history = useHistory();
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    const handleSubmit = async (e) => {
        e.preventDefault();
        //API call
        const response = await fetch(`http://localhost:5000/api/auth/createUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password }),
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            localStorage.setItem('token', json.authtoken)
            history.push('/')
            props.showAlert("Account Created Successfully", "success")
        }
        else {
           props.showAlert("Invalid credentials", "danger")
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <h2 className='mb-4'>Create account to continue to iNoteBook</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group my-3">
                   <b> <label htmlFor="exampleInputEmail1">Name</label></b>
                    <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp"  value={credentials.name} onChange={onChange} />
                </div>
                <div className="form-group my-3">
                <b> <label htmlFor="exampleInputEmail1">Email address</label></b>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp"  value={credentials.email} onChange={onChange} />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group my-3">
                <b> <label htmlFor="exampleInputPassword1">Password</label></b>
                    <input type="password" className="form-control" id="password" name="password"  value={credentials.password} onChange={onChange} minLength={5} required />
                </div>
                <div className="form-group my-3">
                <b> <label htmlFor="exampleInputPassword1">Confirm Password</label></b>
                    <input type="password" className="form-control" id="cpassword" name="cpassword"  value={credentials.cpassword} onChange={onChange} minLength={5} required />
                </div>
                <button type="submit" className="btn btn-primary my-3">Submit</button>
            </form>
        </div>
    )
}

export default Signup
