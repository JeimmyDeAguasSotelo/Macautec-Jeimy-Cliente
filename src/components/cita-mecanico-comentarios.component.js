import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import CitaComentariosTableRow from './CitaComentariosTableRow';
import ComentariosTableRow from './ComentarioTableRow';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

export default class ListaCitas extends Component {

  constructor(props) {
    super(props)

    this.onChangeComentario = this.onChangeComentario.bind(this);    
    
    this.onSubmit2 = this.onSubmit2.bind(this);
    
    this.state = {
      citas: [],
      comentarios:[],
      comentario: '',
      actualizado: '',
      cita: ''
    };
  }

  onChangeComentario(e) {
    this.setState({ comentario: e.target.value })
    //console.log(this.state.comentario)
  }

  
  onSubmit2(e) {
    e.preventDefault()
    const ComentarioObject = {
      comentario: this.state.comentario,
      actualizado: new Date(),
      cita: this.state.cita,
      creado: new Date()
    };
    //console.log(ComentarioObject)

    axios.post('http://localhost:4000/comentarios/crear-comentario', ComentarioObject)
      .then(res => console.log(res.data));
      //console.log(ComentarioObject)
      
      
    this.setState({
      comentario: '',
      actualizado: ''
    });

  }

  componentDidMount() {
    //console.log(this.props.match.params.id)
    axios.get('http://localhost:4000/citas/editar-cita/'+this.props.match.params.id)
      .then(res => {
        //console.log(res.data)
        this.setState({
          citas: [res.data],
          cita: res.data
        });
        //console.log(this.state.cita)
      })
      .catch((error) => {
        console.log(error);
      })

    axios.get('http://localhost:4000/comentarios/'+this.props.match.params.id)
      .then(res => {
        //console.log(res.data)
        this.setState({
          comentarios: res.data
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  DataTable() {
    return this.state.citas.map((res, i) => {
      return <CitaComentariosTableRow obj={res} key={i} />;
    });
  }
  
  DataTableComentarios() {
    return this.state.comentarios.map((res, i) => {
      return <ComentariosTableRow obj={res} key={i} />;
    });
  }


  render() {
    return (<div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Servicio</th>
            <th>Mecanico</th>
            <th>Duracion</th>
            <th>Estado</th>
            <th>Cliente</th>
            <th>Telefono</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Placa</th>            
          </tr>
        </thead>
        <tbody>
          {this.DataTable()}
        </tbody>
      </Table>
      <Form onSubmit={this.onSubmit}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Comentario</th>
            <th>Fecha</th>
            <th>Accion</th>            
          </tr>
        </thead>
        <tbody>
          {this.DataTableComentarios()}
        </tbody>
      </Table>
      </Form>
      <Form onSubmit={this.onSubmit2}>
      <Table striped bordered hover>
        <tbody>          
          <tr>
            <td>
              <Form.Group controlId="Comentario"><Form.Control placeholder="Nuevo comentario" type="text" value={this.state.comentario} onChange={this.onChangeComentario} required/></Form.Group>
            </td>
            <td>
            <Button variant="btn btn-primary" block="block" type="submit">
              Agregar
            </Button>
            </td>
          </tr>
          
                    
        </tbody>
        
      </Table>
      </Form>
    </div>);
  }
}