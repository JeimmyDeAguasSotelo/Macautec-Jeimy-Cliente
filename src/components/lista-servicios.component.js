import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import ServicioTableRow from './ServicioTableRow';
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom';

export default class ListaServicios extends Component {

  constructor(props) {
    super(props)

    this.onChangeTipoFiltro = this.onChangeTipoFiltro.bind(this);
    this.onChangeCadenaFiltro = this.onChangeCadenaFiltro.bind(this);

    this.state = {
      textobuscar:'',
      filtrobuscar:'nombre',
      servicios: [],
      filtrados: []
    };
  }

  ejecutaFiltro(cadena, filtro){
    if(cadena === ''){
        this.setState({ filtrados: this.state.servicios });
        return;
    }            
    this.setState({ filtrados: this.state.servicios.filter(function (el) {
      return el[filtro].toString().toLowerCase().indexOf(cadena.toString().toLowerCase()) > -1;
    }) });            
   
  }

  componentDidMount() {
    axios.get('http://localhost:4000/servicios/')
      .then(res => {
        this.setState({
          servicios: res.data,
          filtrados: res.data
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeCadenaFiltro(e) {

    this.setState({ textobuscar: e.target.value });
    this.ejecutaFiltro(e.target.value, this.state.filtrobuscar)
  }
  onChangeTipoFiltro(e) {
      this.setState({ filtrobuscar: e.target.value });
      this.ejecutaFiltro(this.state.textobuscar, e.target.value)
  }

  DataTable() {
    return this.state.filtrados.map((res, i) => {
      return <ServicioTableRow obj={res} key={i} />;
    });
  }

  render() {
    return (<div>
      <Table>
        <thead>
          <tr>
            <th><h1>Servicios</h1></th>
            <th className="contenedor"><h1><Link className="btn btn-info lado-derecho centrado-link" to={"/crear-servicio/"}>Nuevo</Link></h1></th>
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
                            <option value="estado">Estado</option>                            
                            <option value="descripcion">Descripcion</option>
                            <option value="costo">Costo</option>                            
                            <option value="duracionhoras">Horas</option>  
                        </Form.Control>
                    </td>
                </tr>
            </tbody>
          </Table>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Estado</th>            
            <th>Descripcion</th>
            <th>Costo</th>
            <th>Duracion horas</th>
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