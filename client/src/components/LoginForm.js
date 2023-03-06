import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginForm.css";

const LoginForm = (props) => {
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");

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
        props.loginUser(username, password);
        
    };


    return (
        <div>
            <form onSubmit={handleSubmit} >
                <div class="btn-group">
                    <Link class="btn btn-light" type="button" to="/register"> Register</Link>
                    <button class="btn btn-warning active" type="button">Login</button>
                </div>
                <div className="mb-3 mb99">
                <label className="form-label">
                    Username
                    
                </label>
                <input type="text" className="form-control input99" value={username} onChange={handleChangeUsername}></input>
                </div>
                <div className="mb-3">
                <label className="form-label" >
                    Password
                    
                </label>
                <input type="password" className="form-control input99" value={password} onChange={handleChangePassword}></input>
                </div>
                <button type="submit" className="btn btn-warning">Login</button>
            </form>
        </div>
    )
}

export default LoginForm;