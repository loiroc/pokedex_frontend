import React, { useState, useEffect, useContext } from "react";
import "../styles/Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import history from '../routes/history';
import Image from "../assets/forest.jpg"
import { Context } from '../contexts/AuthContext';

function Login() {

  useEffect(() => {
    document.body.style.backgroundImage = `url(${Image})`
  }, [])
  
  const { authenticated, handleLogin } = useContext(Context);

  useEffect(() => {
    if (authenticated) {
        history.push('/home');
    }
}, [])

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");


    function verifyFields() {
        if (!user || !password) {
            alert("Login/senha vazios")
        }
        if (user && password) { 
            handleLogin(user, password);
        }        
                
    }
    
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          verifyFields();
        }
      }


  return (
    <div className="Login">
      <div className="container">
        <p>Welcome, trainer!</p>
        <Form>
          <Form.Group>
            <Form.Label>User:</Form.Label>
            <Form.Control type="email" placeholder="Digite seu usuário" onKeyDown={handleKeyDown} onChange={(e) => {setUser(e.target.value)}} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" placeholder="Digite sua senha" onKeyDown={handleKeyDown} onChange={(e) => {setPassword(e.target.value)}}/>
          </Form.Group>
          <Button variant="primary" style={{marginTop: "10px"}} onClick={verifyFields}>Log in</Button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
