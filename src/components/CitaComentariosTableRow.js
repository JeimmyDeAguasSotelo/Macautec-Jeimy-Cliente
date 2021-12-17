import React, { Component } from 'react';
//import { Link } from 'react-router-dom';

export default class CitaComentariosTableRow extends Component {

    render() {

        return (
            <tr>
                <td>{this.props.obj.servicio.nombre}</td>
                <td>{this.props.obj.mecanico.nombre}</td>
                <td>{this.props.obj.servicio.duracionhoras}</td>
                <td>{this.props.obj.estado}</td>
                <td>{this.props.obj.cliente}</td>
                <td>{this.props.obj.telefono}</td>
                <td>{this.props.obj.fecha.split('T')[0]}</td>
                <td>{this.props.obj.hora+":00"}</td>
                <td>{this.props.obj.placavehiculo}</td>                
            </tr>
        );
    }
}