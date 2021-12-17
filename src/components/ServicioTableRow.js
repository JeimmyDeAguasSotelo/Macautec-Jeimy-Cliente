import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

export default class ServicioTableRow extends Component {

    constructor(props) {
        super(props);
        this.borrarServicio = this.borrarServicio.bind(this);
    }

    borrarServicio() {
        if(window.confirm('Esta seguro de borrar el servicio?')){
            axios.delete('http://localhost:4000/servicios/borrar-servicio/' + this.props.obj._id)
                .then((res) => {
                    console.log('Servicio borrado con exito!')
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
                <td>{this.props.obj.nombre}</td>
                <td>{this.props.obj.estado}</td>                
                <td>{this.props.obj.descripcion}</td>
                <td>{this.props.obj.costo}</td>
                <td>{this.props.obj.duracionhoras}</td>
                <td>
                    <Link className="btn btn-primary" to={"/agenda/servicio/" + this.props.obj._id}>
                        Agenda
                    </Link>
                    <Link className="btn btn-success" to={"/editar-servicio/" + this.props.obj._id}>
                        Editar
                    </Link>
                    {usuarioAdmin ? (
                        <Button onClick={this.borrarServicio} className="btn btn-danger" variant="danger">Borrar</Button>
                    ):(<div></div>)}
                </td>
            </tr>
        );
    }
}