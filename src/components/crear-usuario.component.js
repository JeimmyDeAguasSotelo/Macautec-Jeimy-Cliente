import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

export default class CrearUsuario extends Component {

  constructor(props) {
    super(props)

    // Setting up functions
    this.onChangeNombreUsuario = this.onChangeNombreUsuario.bind(this);
    this.onChangeEmailUsuario = this.onChangeEmailUsuario.bind(this);
    this.onChangeCedulaUsuario = this.onChangeCedulaUsuario.bind(this);
    this.onChangeTelefonoUsuario = this.onChangeTelefonoUsuario.bind(this);
    this.onChangeFechaUsuario = this.onChangeFechaUsuario.bind(this);
    this.onChangePasswordUsuario1 = this.onChangePasswordUsuario1.bind(this);
    this.onChangePasswordUsuario2 = this.onChangePasswordUsuario2.bind(this);
    this.onChangeTipoUsuario = this.onChangeTipoUsuario.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      nombre: '',
      email: '',
      cedula: '',
      telefono: '',
      fechanacimiento: '',
      password: '',
      password2: '',
      tipo: '',
      errors: {}
    }
  }

  onChangeNombreUsuario(e) {
    this.setState({ nombre: e.target.value })
  }

  onChangeCedulaUsuario(e) {
    this.setState({ cedula: e.target.value })
  }

  onChangeTelefonoUsuario(e) {
    this.setState({ telefono: e.target.value })
  }

  onChangeFechaUsuario(e) {
    this.setState({ fechanacimiento: e.target.value })
  }

  onChangePasswordUsuario1(e) {
    let errors = {};
    errors["password2"] = "";
    if(e.target.value !== this.state.password2){
      errors["password2"] = "Las contraseñas deben ser iguales.";
    }
    this.setState({errors: errors});
    this.setState({ password: e.target.value })
  }

  onChangePasswordUsuario2(e) {
    let errors = {};
    errors["password2"] = "";
    if(e.target.value !== this.state.password){
      errors["password2"] = "Las contraseñas deben ser iguales.";
    }
    this.setState({errors: errors});
    this.setState({ password2: e.target.value })
  }

  onChangeEmailUsuario(e) {
    this.setState({ email: e.target.value })
  }

  onChangeTipoUsuario(e) {
    this.setState({ tipo: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()

    var ahora = new Date()

    
    const usuarioObject = {
      nombre: this.state.nombre,
      email: this.state.email,
      cedula: this.state.cedula,
      telefono: this.state.telefono,
      fechanacimiento: this.state.fechanacimiento,
      password: this.state.password,
      tipo: this.state.tipo,
      creado:ahora,
      actualizado: ahora 
    };
    //console.log(usuarioObject)

    axios.post('http://localhost:4000/usuarios/crear-usuario', usuarioObject)
      .then(res => console.log(res.data));
      alert('Usuario creado con exito')
      //this.props.history.push('/usuarios');
      //window.location.href = "http://localhost:3000/usuarios/";
    this.setState({
      nombre: '',
      email: '',
      cedula: '',
      telefono: '',
      fechanacimiento: '',
      password: '',
      password2: '',
      tipo: '',
      errors: {}
    });

  }

  render() {
    return (<div className="form-wrapper">
      <Table>
        <thead>
          <tr>
            <th><h1>Crear usuario</h1></th>
          </tr>
        </thead>
      </Table>
      <Form onSubmit={this.onSubmit}>
      <Form.Group controlId="Nombre">
          <Form.Label><strong>Nombre</strong></Form.Label>
          <Form.Control type="text" value={this.state.nombre} onChange={this.onChangeNombreUsuario} required/>
        </Form.Group>

        <Form.Group controlId="Cedula">
          <Form.Label><strong>Cedula</strong></Form.Label>
          <Form.Control type="number" value={this.state.cedula} onChange={this.onChangeCedulaUsuario} required/>
        </Form.Group>

        <Form.Group controlId="Telefono">
          <Form.Label><strong>Telefono</strong></Form.Label>
          <Form.Control type="number" value={this.state.telefono} onChange={this.onChangeTelefonoUsuario} required/>
        </Form.Group>

        <Form.Group controlId="Email">
          <Form.Label><strong>Email</strong></Form.Label>
          <Form.Control type="email" value={this.state.email} onChange={this.onChangeEmailUsuario} required/>
        </Form.Group>
        
        <Form.Group controlId="Fecha">
          <Form.Label><strong>Fecha nacimiento</strong></Form.Label>
          <Form.Control type="Date" value={this.state.fechanacimiento} onChange={this.onChangeFechaUsuario} required/>
        </Form.Group>

        <Form.Group controlId="Password1">
          <Form.Label><strong>Contraseña</strong></Form.Label>
          <Form.Control type="password" value={this.state.password} onChange={this.onChangePasswordUsuario1} required/>
        </Form.Group>

        <Form.Group controlId="Password2">
          <Form.Label><strong>Repetir contraseña</strong></Form.Label>
          <Form.Control type="password" value={this.state.password2} onChange={this.onChangePasswordUsuario2} required/>
          <div className="text-danger">{this.state.errors.password2}</div>
        </Form.Group>

        <Form.Group controlId="Tipo">
          <Form.Label><strong>Tipo</strong></Form.Label>
        </Form.Group>

        <div className="form-group">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="OpcionesTipo"
                id="Planta"
                value="Planta"
                checked={this.state.tipo === "Planta"}
                onChange={this.onChangeTipoUsuario}
                required
              />
              <label className="form-check-label">Planta</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="OpcionesTipo"
                id="Mecanico"
                value="Mecanico"
                checked={this.state.tipo === "Mecanico"}
                onChange={this.onChangeTipoUsuario}
              />
              <label className="form-check-label">Mecanico</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="OpcionesTipo"
                id="Administrador"
                value="Administrador"
                checked={this.state.tipo === "Administrador"}
                onChange={this.onChangeTipoUsuario}
              />
              <label className="form-check-label">Administrador</label>
            </div>
          </div>

        <Button variant="danger" size="lg" block="block" type="submit">
          Crear Usuario
        </Button>
      </Form>
    </div>);
  }
}

