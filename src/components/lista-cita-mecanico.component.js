import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import CitaTableRow from './CitaTableRow';
import Form from 'react-bootstrap/Form';

export default class ListaCitas extends Component {

  constructor(props) {
    super(props)
    
    this.onChangeTipoFiltro = this.onChangeTipoFiltro.bind(this);
    this.onChangeCadenaFiltro = this.onChangeCadenaFiltro.bind(this);

    this.state = {
      textobuscar:'',
      filtrobuscar:'servicio',
      citas: [],
      filtrados: []
    };
  }

  ejecutaFiltro(cadena, filtro){
    if(cadena === ''){
        this.setState({ filtrados: this.state.citas });
        return;
    }
    if(filtro === 'mecanico' || filtro === 'servicio'){
      this.setState({ filtrados: this.state.citas.filter(function (el) {
        return el[filtro].nombre.toString().toLowerCase().indexOf(cadena.toString().toLowerCase()) > -1;
      }) 
    });
    }else if(filtro === 'horas'){
      this.setState({ filtrados: this.state.citas.filter(function (el) {
          return el.servicio.duracionhoras.toString().toLowerCase().indexOf(cadena.toString().toLowerCase()) > -1;
        }) 
      });
    }else{
      this.setState({ filtrados: this.state.citas.filter(function (el) {
          return el[filtro].toString().toLowerCase().indexOf(cadena.toString().toLowerCase()) > -1;
        }) 
      });
    }
  }

  componentDidMount() {
    const session = localStorage.getItem('token');
    const sess = JSON.parse(session)
    //console.log(sess.usuario._id)
    axios.get('https://macautec-jeimy-server.vercel.app/citas/mecanico/'+sess.usuario._id)
      .then(res => {
        this.setState({
          citas: res.data,
          filtrados: res.data
        });
        console.log(res.data);
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
      return <CitaTableRow obj={res} key={i} />;
    });
  }


  render() {
    return (<div>

      <Table>
        <thead>
          <tr>
            <th><h1>Mis servicios</h1></th>            
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
                            <option value="servicio">Servicio</option>
                            <option value="mecanico">Mecanico</option>                     
                            <option value="horas">Horas</option>
                            <option value="estado">Estado</option>
                            <option value="cliente">Cliente</option>
                            <option value="telefono">Telefono</option>
                            <option value="cedula">Cedula</option>
                            <option value="email">Email</option>
                            <option value="placavehiculo">Placa</option>
                        </Form.Control>
                    </td>
                </tr>
            </tbody>
          </Table>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Servicio</th>
            <th>Mecanico</th>
            <th>Horas</th>
            <th>Estado</th>
            <th>Cliente</th>
            <th>Cedula</th>
            <th>Telefono</th>
            <th>Email</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Placa</th>
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