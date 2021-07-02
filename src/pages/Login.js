import React from "react";
import "../styles/Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Login() {
  return (
    <div className="Login">
      <div className="container">
        <p>Seja bem-vindo treinador!</p>
        <Form>
          <Form.Group>
            <Form.Label>Usuário:</Form.Label>
            <Form.Control type="email" placeholder="Digite seu usuário" />
          </Form.Group>

          <Form.Group>
            <Form.Label>Senha:</Form.Label>
            <Form.Control type="password" placeholder="Digite sua senha" />
          </Form.Group>
          <Button variant="primary">Entrar</Button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
