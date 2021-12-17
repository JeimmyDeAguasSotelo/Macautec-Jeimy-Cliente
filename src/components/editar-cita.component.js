import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

export default class EditarCita extends Component {

  constructor(props) {
    super(props)

    
    // Setting up functions
    this.onChangeServicio = this.onChangeServicio.bind(this);
    this.onChangeMecanicoServicio = this.onChangeMecanicoServicio.bind(this);
    this.onChangeEstado = this.onChangeEstado.bind(this);
    this.onChangeCliente = this.onChangeCliente.bind(this);
    this.onChangeCedula = this.onChangeCedula.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeTelefono = this.onChangeTelefono.bind(this);
    this.onChangeFecha = this.onChangeFecha.bind(this);
    this.onChangeHora = this.onChangeHora.bind(this);
    this.onChangePlacaVehiculo = this.onChangePlacaVehiculo.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      servicio: {},
      mecanico:{},
      cliente:'',
      cedula:'',
      email:'',
      telefono:'',
      estado: 'Agendada',
      fecha: '',      
      hora: '',
      placavehiculo: '',
      servicios:[],
      mecanicos:[]
    }
  }

  componentDidMount() {
    axios.get('https://macautec-jeimy-server.vercel.app/citas/editar-cita/' + this.props.match.params.id)
      .then(res => {
        var id = {}
        if(res.data.mecanico){
          id = res.data.mecanico          
        }else{
          id = {_id:''}
        }

        this.setState({
          servicio: res.data.servicio,
          mecanico:id,
          cliente:res.data.cliente,
          cedula:res.data.cedula,
          email:res.data.email,
          telefono:res.data.telefono,
          estado:res.data.estado,
          fecha: res.data.fecha.split('T')[0],
          hora: res.data.hora,
          placavehiculo: res.data.placavehiculo,          
          servicios:this.state.servicios,
          mecanicos:this.state.mecanicos
        });
      })
      .catch((error) => {
        console.log(error);
      })

      axios.get('https://macautec-jeimy-server.vercel.app/servicios/activos').then(res => {
        this.setState({
          servicios: res.data
        });
      });
      
      axios.get('https://macautec-jeimy-server.vercel.app/usuarios/mecanicos').then(res => {
    
        this.setState({
          mecanicos: res.data
        });
      });
      
  }

  onChangeServicio(e) {
    var found = false
    var i = 0
    while(!found && i < this.state.servicios.length){

      if(this.state.servicios[i]._id === e.target.value){
        this.setState({ servicio: this.state.servicios[i]})        
        found = true
      }
      i++
    }
  }

  onChangeMecanicoServicio(e) {
    var found = false
    var i = 0
    while(!found && i < this.state.mecanicos.length){

      if(this.state.mecanicos[i]._id === e.target.value){        
        this.setState({ mecanico: this.state.mecanicos[i]})        
        found = true
      }
      i++
    }
  }
  
  onChangeCliente(e) {
    this.setState({ cliente: e.target.value })
  }

  onChangeCedula(e) {
    this.setState({ cedula: e.target.value })
  }

  onChangeEmail(e) {
    this.setState({ email: e.target.value })
  }

  onChangeTelefono(e) {
    this.setState({ telefono: e.target.value })
  }

  onChangeEstado(e) {
    this.setState({ estado: e.target.value })
  }

  onChangeFecha(e) {
    this.setState({ fecha: e.target.value })
  }

  onChangeHora(e) {
    this.setState({ hora: e.target.value })
  }

  onChangePlacaVehiculo(e) {
    this.setState({ placavehiculo: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()
    var ahora = new Date()
    const CitaObject = {
      servicio: this.state.servicio,
      mecanico: this.state.mecanico,
      fecha: this.state.fecha,
      estado: this.state.estado,
      cedula: this.state.cedula,
      email: this.state.email,
      telefono: this.state.telefono,
      cliente: this.state.cliente,
      hora: this.state.hora,
      placavehiculo: this.state.placavehiculo,      
      actualizado: ahora
    };

    axios.put('https://macautec-jeimy-server.vercel.app/citas/editar-cita/' + this.props.match.params.id, CitaObject)
      .then((res) => {
        //console.log(res.data)
        alert('Cita editada con exito')
        window.location.reload()
      }).catch((error) => {
        console.log(error)
      })
      const session = localStorage.getItem('token');
      const sess = JSON.parse(session)
  
      const usuarioMecanico = sess.usuario.tipo === 'Mecanico'      
      
      if(usuarioMecanico)      
        this.props.history.push('/agenda/mecanico/'+sess.usuario._id)
      else
        this.props.history.push('/citas')
  }


  render() {

    const { servicios } = this.state;

    let servsList = servicios.length > 0
      && servicios.map((item, i) => {
      return (
        <option key={i} value={item._id}>{item.nombre+', Horas: '+item.duracionhoras}</option>
      )
    }, this);

    const { mecanicos } = this.state;

    let mecsList = mecanicos.length > 0
      && mecanicos.map((item, i) => {
      return (
        <option key={i} value={item._id}>{item.nombre}</option>
      )
    }, this);

    const session = localStorage.getItem('token');
    const sess = JSON.parse(session)

    const usuarioMecanico = sess.usuario.tipo === 'Mecanico'
    const usuarioPlanta = sess.usuario.tipo === 'Planta'

    return (<div className="form-wrapper">
      <Table>
        <thead>
          <tr>
            <th><h1>Editar cita</h1></th>
          </tr>
        </thead>
      </Table>
      <Form onSubmit={this.onSubmit}>
        
      <div className="form-group" >
          <label>
            <strong>Servicio</strong>
            </label>
            <br></br>
              <select disabled={usuarioMecanico} value={this.state.servicio._id} onChange={this.onChangeServicio} required>
                <option value="">Seleccione (Servicio, Estimado)</option>
                {servsList}
              </select>
        </div>

        <div className="form-group" >
          <label>
            <strong>Mecanico</strong>
            </label>
            <br></br>
              <select disabled={usuarioMecanico} className="form-select" value={this.state.mecanico._id} onChange={this.onChangeMecanicoServicio}>
                <option>Seleccione</option>
                {mecsList}
              </select>
            
        </div>
        
        <Form.Group controlId="Cliente">
          <Form.Label><strong>Cliente</strong></Form.Label>
          <Form.Control disabled={usuarioMecanico} type="text" value={this.state.cliente} onChange={this.onChangeCliente} required/>
        </Form.Group>

        <Form.Group controlId="Cedula">
          <Form.Label><strong>Cedula</strong></Form.Label>
          <Form.Control disabled={usuarioMecanico} type="number" value={this.state.cedula} onChange={this.onChangeCedula} required/>
        </Form.Group>

        <Form.Group controlId="Email">
          <Form.Label><strong>Email</strong></Form.Label>
          <Form.Control disabled={usuarioMecanico} type="email" value={this.state.email} onChange={this.onChangeEmail} required/>
        </Form.Group>

        <Form.Group controlId="Telefono">
          <Form.Label><strong>Telefono</strong></Form.Label>
          <Form.Control disabled={usuarioMecanico} type="number" value={this.state.telefono} onChange={this.onChangeTelefono} required/>
        </Form.Group>
        
        <Form.Group controlId="Estado">
          <Form.Label><strong>Estado</strong></Form.Label>
        </Form.Group>
        <div className="form-group">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="OpcionesEstado"
                id="Agendado"
                value="Agendado"
                checked={this.state.estado === "Agendado"}
                onChange={this.onChangeEstado}
                required
              />
              <label className="form-check-label">Agendado</label>
            </div>
            {!usuarioMecanico ? (
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="OpcionesEstado"
                id="Cancelado"
                value="Cancelado"
                checked={this.state.estado === "Cancelado"}
                onChange={this.onChangeEstado}
              />
              <label className="form-check-label">Cancelado</label>
            </div>
            ):(<div></div>)}
            {!usuarioPlanta ? (
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="OpcionesEstado"
                id="Completo"
                value="Completo"
                checked={this.state.estado === "Completo"}
                onChange={this.onChangeEstado}
              />
              <label className="form-check-label">Completo</label>
            </div>
            ):(<div></div>)}
          </div>

        <Form.Group controlId="Fecha">
          <Form.Label><strong>Fecha</strong></Form.Label>
          <Form.Control disabled={usuarioMecanico} type="Date" value={this.state.fecha} onChange={this.onChangeFecha} required/>
        </Form.Group>

        <div className="form-group" >
          <label>
            <strong>Hora</strong>
            </label>
            <br></br>
              <select disabled={usuarioMecanico} value={this.state.hora} onChange={this.onChangeHora} required>
                <option value="8">8:00 am</option>
                <option value="9">9:00 am</option>
                <option value="10">10:00 am</option>
                <option value="11">11:00 am</option>
                <option value="12">12:00 pm</option>
                <option value="13">1:00 pm</option>
                <option value="14">2:00 pm</option>
                <option value="15">3:00 pm</option>
                <option value="16">4:00 pm</option>
                <option value="17">5:00 pm</option>
              </select>
        </div>

        <Form.Group controlId="Descripcion">
          <Form.Label><strong>Placa Vehiculo</strong></Form.Label>
          <Form.Control disabled={usuarioMecanico} type="text" value={this.state.placavehiculo} onChange={this.onChangePlacaVehiculo} required/>
        </Form.Group>

        <Button variant="danger" size="lg" block="block" type="submit">
          Editar Cita
        </Button>
      </Form>
    </div>);
  }
}
