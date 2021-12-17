import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

export default class CitaTableRow extends Component {

    constructor(props) {
        super(props);
        this.borrarCita = this.borrarCita.bind(this);
    }

    borrarCita() {
        if(window.confirm('Esta seguro de borrar la cita?')){
            axios.delete('http://localhost:4000/citas/borrar-cita/' + this.props.obj._id)
                .then((res) => {
                    console.log('Cita borrada con exito!')
                    window.location.reload();
                }).catch((error) => {
                    console.log(error)
                })
        }
        
    }

    render() {
        //const esPlanta = this.props.obj.tipo === 'Planta'
        //const esMecanico = this.props.obj.tipo === 'Mecanico'
        const usuarioAdmin = JSON.parse(localStorage.getItem('token')).usuario.tipo === 'Administrador'

        
        return (
            <tr>
                <td>{this.props.obj.servicio.nombre}</td>
                {this.props.obj.mecanico ? (
                    <td>{this.props.obj.mecanico.nombre}</td>
                ):(<td></td>)}
                <td>{this.props.obj.servicio.duracionhoras}</td>
                <td>{this.props.obj.estado}</td>
                <td>{this.props.obj.cliente}</td>
                <td>{this.props.obj.cedula}</td>
                <td>{this.props.obj.telefono}</td>
                <td>{this.props.obj.email}</td>
                <td>{this.props.obj.fecha.split('T')[0]}</td>
                <td>{this.props.obj.hora+":00"}</td>
                <td>{this.props.obj.placavehiculo}</td>
                <td>
                    <Link className="btn btn-primary" to={"/agenda/servicio/" + this.props.obj.servicio._id}>
                        Agenda
                    </Link>
                    <Link className="btn btn-success" to={"/editar-cita/" + this.props.obj._id}>
                        Editar
                    </Link>
                    <Link className="btn btn-warning" to={"/comentarios/" + this.props.obj._id}>
                        Comentarios
                    </Link>
                    {usuarioAdmin ? (
                        <Button onClick={this.borrarCita} className="btn btn-danger" variant="danger">Borrar</Button>
                    ):(<div></div>)}
                </td>
            </tr>
        );
    }
}