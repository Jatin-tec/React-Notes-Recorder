import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

function Login(props) {
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const history = useHistory();

    const handelSubmit = async (e) => {
        e.preventDefault();
        const response_note = await fetch(`http://localhost:5000/api/auth/user-login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": credentials.email,
                "password": credentials.password
            })
        });
        const json = await response_note.json();
        if(json.success===true){
            localStorage.setItem("auth", json.authToken);
            props.alertMsg({type:"success", msg:"Login successful ;)"});
            history.push('/')
        }
        else{
            props.alertMsg({type:"danger", msg:"Invalid credentials :("});
        }
        console.log(json);

    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className='card my-4 container'>
                <div className="card-body ">
                    <form onSubmit={handelSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" onChange={onChange} id="email" name="email" aria-describedby="emailHelp" required />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" onChange={onChange} name="password" id="password" required />
                        </div>

                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
            <div className=" container d-flex">
                <p>Don't have an accout?</p>
                <Link type="button" style={{ textDecoration: "none" }} to='/signup' className="mx-1">Sign Up</Link>
            </div>
        </>
    )
}

export default Login
