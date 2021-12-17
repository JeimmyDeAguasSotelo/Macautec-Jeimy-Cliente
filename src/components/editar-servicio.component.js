import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

export default class EditarServicio extends Component {

  constructor(props) {
    super(props)

    this.onChangeNombreServicio = this.onChangeNombreServicio.bind(this);
    this.onChangeEstadoServicio = this.onChangeEstadoServicio.bind(this);    
    this.onChangeDescripcionServicio = this.onChangeDescripcionServicio.bind(this);
    this.onChangeCostoServicio = this.onChangeCostoServicio.bind(this);
    this.onChangeDuracionhorasServicio = this.onChangeDuracionhorasServicio.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // State
    this.state = {
      nombre: '',
      estado: '',      
      descripcion: '',
      costo: '',
      duracionhoras: '',
      mecanicos:[]
    }
  }

  componentDidMount() {
    axios.get('https://macautec-jeimy-server.vercel.app/servicios/editar-servicio/' + this.props.match.params.id)
      .then(res => {
        this.setState({
          nombre: res.data.nombre,
          estado: res.data.estado,
          mecanico: res.data.mecanico,
          descripcion: res.data.descripcion,
          costo: res.data.costo,
          duracionhoras: res.data.duracionhoras
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeNombreServicio(e) {
    this.setState({ nombre: e.target.value })
  }

  onChangeEstadoServicio(e) {
    this.setState({ estado: e.target.value })
  }

  onChangeDescripcionServicio(e) {
    this.setState({ descripcion: e.target.value })
  }

  onChangeCostoServicio(e) {
    this.setState({ costo: e.target.value })
  }

  onChangeDuracionhorasServicio(e) {
    this.setState({ duracionhoras: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()
    var ahora = new Date()
    const servicioObject = {
      nombre: this.state.nombre,
      estado: this.state.estado,      
      descripcion: this.state.descripcion,
      costo: this.state.costo,
      duracionhoras: this.state.duracionhoras,      
      actualizado: ahora
    };

    axios.put('https://macautec-jeimy-server.vercel.app/servicios/editar-servicio/' + this.props.match.params.id, servicioObject)
      .then((res) => {
        //console.log(res.data)
        alert('Servicio editado con exito')
        window.location.reload()
      }).catch((error) => {
        console.log(error)
      })

    // Redirect to Student List 
    this.props.history.push('/servicios')
  }


  render() {
    return (<div className="form-wrapper">
      <Table>
        <thead>
          <tr>
            <th><h1>Editar servicio</h1></th>
          </tr>
        </thead>
      </Table>
      <Form onSubmit={this.onSubmit}>
        
      <div className="form-group" >
          <label>
            <strong>Nombre</strong>
            </label>
            <br></br>
              <select value={this.state.nombre} onChange={this.onChangeNombreServicio}>
                <option value="Revisión de frenos">Revisión de frenos</option>
                <option value="Pastillas">Pastillas</option>
                <option value="Discos">Discos</option>
                <option value="Suspensión">Suspensión</option>
                <option value="Amortiguadores">Amortiguadores</option>
                <option value="Cambio de aceite">Cambio de aceite</option>
                <option value="Alineación">Alineación</option>
                <option value="Rotación de llantas">Rotación de llantas</option>
              </select>
        </div>

        <Form.Group controlId="Estado">
          <Form.Label><strong>Estado</strong></Form.Label>
          <br></br>
        
        
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="OpcionesEstado"
                id="Disponible"
                value="Disponible"
                checked={this.state.estado === "Disponible"}
                onChange={this.onChangeEstadoServicio}
                required
              />
              <label className="form-check-label">Disponible</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="OpcionesEstado"
                id="No Disponible"
                value="No Disponible"
                checked={this.state.estado === "No Disponible"}
                onChange={this.onChangeEstadoServicio}
              />
              <label className="form-check-label">No Disponible</label>
            </div>
          
        </Form.Group>

        <Form.Group controlId="Descripcion">
          <Form.Label><strong>Descripcion</strong></Form.Label>
          <Form.Control type="text" value={this.state.descripcion} onChange={this.onChangeDescripcionServicio} required/>
        </Form.Group>

        <Form.Group controlId="Costo">
          <Form.Label><strong>Costo</strong></Form.Label>
          <Form.Control type="number" value={this.state.costo} onChange={this.onChangeCostoServicio} required/>
        </Form.Group>

        <Form.Group controlId="Duracionhoras">
          <Form.Label><strong>Duracion horas</strong></Form.Label>
          <Form.Control type="number" value={this.state.duracionhoras} onChange={this.onChangeDuracionhorasServicio} required/>
        </Form.Group>

        <Button variant="danger" size="lg" block="block" type="submit">
          Editar Servicio
        </Button>
      </Form>
    </div>);
  }
}
