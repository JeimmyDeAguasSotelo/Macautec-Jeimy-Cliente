import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import UsuarioTableRow from './UsuarioTableRow';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';


export default class ListaUsuarios extends Component {

  constructor(props) {
    super(props)

    this.onChangeTipoFiltro = this.onChangeTipoFiltro.bind(this);
    this.onChangeCadenaFiltro = this.onChangeCadenaFiltro.bind(this);

    this.state = {
      textobuscar:'',
      filtrobuscar:'nombre',
      usuarios: [],
      filtrados: []
    };
  }

  ejecutaFiltro(cadena, filtro){
    if(cadena === ''){
        this.setState({ filtrados: this.state.usuarios });
        return;
    }            
    this.setState({ filtrados: this.state.usuarios.filter(function (el) {
      return el[filtro].toString().toLowerCase().indexOf(cadena.toString().toLowerCase()) > -1;
    }) });            
   
  }

  
  onChangeCadenaFiltro(e) {

    this.setState({ textobuscar: e.target.value });
    this.ejecutaFiltro(e.target.value, this.state.filtrobuscar)
  }
  onChangeTipoFiltro(e) {
      this.setState({ filtrobuscar: e.target.value });
      this.ejecutaFiltro(this.state.textobuscar, e.target.value)
  }

  componentDidMount() {
    axios.get('http://localhost:4000/usuarios/')
      .then(res => {
        this.setState({
          usuarios: res.data,
          filtrados: res.data
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  DataTable() {
    return this.state.filtrados.map((res, i) => {
      return <UsuarioTableRow obj={res} key={i} />;
    });
  }


  render() {
    return (<div>
      <Table>
        <thead>
          <tr>
            <th><h1>Usuarios</h1></th>
            <th className="contenedor"><h1><Link className="btn btn-info lado-derecho centrado-link" to={"/crear-usuario/"}>Nuevo</Link></h1></th>
          </tr>
        </thead>
      </Table>
      
      <Table striped bordered hover>
            <tbody>
                <tr>
                    <td>
                        <Form.Group controlId="Descripcion">
                            <Form.Control placeholder="Buscar" type="text" value={this.state.textobuscar} onChange={this.onChangeCadenaFiltro} />
                        </Form.Group>
                    </td>
                    <td>
                        <Form.Control as="select" value={this.state.filtrobuscar} onChange={this.onChangeTipoFiltro} >
                            <option value="nombre">Nombre</option>
                            <option value="email">Email</option>                            
                            <option value="telefono">Telefono</option>
                            <option value="cedula">Cedula</option>                            
                            <option value="tipo">Tipo</option>  
                        </Form.Control>
                    </td>                    
                </tr>
            </tbody>
          </Table>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Telefono</th>
            <th>Cedula</th>
            <th>Tipo</th>
            <th>Accion</th>
          </tr>
        </thead>
        <tbody>
          {this.DataTable()}
        </tbody>
      </Table>
    </div>);
  }
}