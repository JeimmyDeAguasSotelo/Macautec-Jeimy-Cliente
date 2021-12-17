import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../login.css';

async function loginUser(credentials) {
 return fetch('https://macautec-jeimy-server.vercel.app/usuarios/login', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then( data => data.json())
}


export default function Login({ setToken }) {
  const [email, setUserName] = useState();
  const [password, setPassword] = useState();
  let [error, setError] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const data = await loginUser({
      email,
      password
    });
    if(data.login){
      setToken(data);
    }else{
      setError(data.error);
    }
    
  }

  return(
    <div className="login-wrapper">
      <h1>Macautec</h1>
      <Form onSubmit={handleSubmit}>
      
        <Form.Group controlId="Email">
          <Form.Label><strong>Email</strong></Form.Label>
          <Form.Control type="text" onChange={e => setUserName(e.target.value)} required/>
        </Form.Group>

        <Form.Group controlId="Contrasena">
          <Form.Label><strong>Contraseña</strong></Form.Label>
          <Form.Control type="password" onChange={e => setPassword(e.target.value)} required/>
        </Form.Group>
        

        <Button variant="danger" size="lg" block="block" type="submit">
          Ingresar
        </Button>
        </Form>
        <div className="text-danger">{error}</div>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};