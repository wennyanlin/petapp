import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./RegisterForm.css";

const RegisterForm = (props) => {
    let [email, setEmail] = useState("");
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");

    const handleChangeEmail = (e) => {
        const value = e.target.value;
        setEmail(value);
    };
    const handleChangeUsername = (e) => {
        const value = e.target.value;
        setUsername(value);
    };
    const handleChangePassword = (e) => {
        const value = e.target.value;
        setPassword(value);
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        props.addUser(email, username, password);
        
    };


    return (
        <div className="form99">
            <form onSubmit={handleSubmit} >
                <div className="btn-group">
                    <button className="btn btn-warning active" type="button">Register</button>
                    <Link className="btn btn-light" type="button" to="/login"> Login</Link>
                </div>
                <div className="mb-3 mb99">
                <label className="form-label">
                    Email address
                </label>
                <input type="email" className="form-control input99" value={email} onChange={handleChangeEmail}/>
                </div>
                <div className="mb-3">
                <label className="form-label">
                    Username
                </label>
                <input type="text" className="form-control input99" value={username} onChange={handleChangeUsername}/>
                </div>
                <div className="mb-3">
                <label className="form-label">
                    Password
                </label>
                <input type="password" className="form-control input99" value={password} onChange={handleChangePassword}/>
                </div>
                <button type="submit" className="btn btn-warning submitbtn99" id="formBtn">Register</button>
                
            </form>
        </div>
    )
}

export default RegisterForm;