import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [telephone, setTelephone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('/loginRequest', `<loginRequest xmlns="http://interfaces.bikeshared.uan.com">
                <telephone>${telephone}</telephone>
                <password>${password}</password>
            </loginRequest>`);
        } catch (error) {
            setError('Login failed. Please try again.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Telephone"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Login;












'use client'
 
import { useState } from 'react'
 
export default function Counter() {
  const [count, setCount] = useState(0)
 
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}