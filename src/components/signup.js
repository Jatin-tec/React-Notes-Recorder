import React, { useState } from 'react';
import { useHistory } from 'react-router';

function Signup(props) {
    const [credentials, setCredentials] = useState({name: '' ,email: '', password1: '', password2: ''});
    const history = useHistory();

    const handelSubmit = async (e) => {
        e.preventDefault();
        const response_note = await fetch(`http://localhost:5000/api/auth/create-user`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "name": credentials.name,
                "email": credentials.email,
                "password": credentials.password1
            })
        });
        const json = await response_note.json();
        if(json.success===true){
            localStorage.setItem("auth", json.authToken);
            props.alertMsg({type:"success", msg:"Accout created successfully ;)"});
            history.push('/')
        }
        else{
            props.alertMsg({type:"danger", msg:"User with this email already exist :("});
        }
        console.log(json);

    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <>

            <div className='card my-4 container'>
                <div className="card-body ">
                    <form onSubmit={handelSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" onChange={onChange} className="form-control" name="name" id="name" aria-describedby="emailHelp" required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" onChange={onChange} className="form-control" name="email" id="email" aria-describedby="emailHelp" required/>
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password1" className="form-label">Password</label>
                            <input type="password" onChange={onChange} className="form-control" name="password1" id="password1" required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password2" className="form-label">Confirm Password</label>
                            <input type="password" onChange={onChange} className="form-control" name="password2" id="password2" required/>
                        </div>
                        <button type="submit" className="btn btn-primary">Create Acccount</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup
