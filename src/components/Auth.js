import React, { useEffect, useState } from 'react';
import API from '../api-service';
import { useCookies } from 'react-cookie';

function Auth() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginView, setIsLoginView] = useState(true);

    const [token, setToken] = useCookies(['mr-token']);

    const loginClicked = () => {
        API.loginUser({username, password})
        .then(res => setToken('mr-token', res.token))
        .catch(err => console.log(err))
    }

    const registerClicked = () => {
        API.registerUser({username, password})
        .then(() => loginClicked())
        .catch(err => console.log(err))
    }

    useEffect(() => {
        if (token['mr-token']) window.location.href ='/movies';
    }, [token])

    const isDisabled = username.length === 0 || password.length === 0;

    return (
        <div className="App">
            <header className="App-header">
                {isLoginView ? <h1>Login</h1> : <h1>Register</h1>}
            </header>
            <div className="login-container">
                <label htmlFor="username">username</label><br/>
                <input
                    id="username" 
                    type="text" 
                    placeholder="username" 
                    value={username}
                    onChange={ event => setUsername(event.target.value)}
                /><br/>
                <label htmlFor="password">password</label><br/>
                <input 
                    id="password" 
                    type="password" 
                    placeholder="password" 
                    value={password} 
                    onChange={ event => setPassword(event.target.value)}
                /><br/>
                {isLoginView ? 
                    <button onClick={loginClicked} disabled={isDisabled}>Log in</button> 
                    : 
                    <button onClick={registerClicked} disabled={isDisabled}>Register</button> 
                }
                {isLoginView ? 
                    <p onClick={() => setIsLoginView(false)}>You don't have an account? Register here</p> 
                    : 
                    <p onClick={() => setIsLoginView(true)}> You already have an account? Login</p>
                }
            </div>
        </div>
    )
}

export default Auth;