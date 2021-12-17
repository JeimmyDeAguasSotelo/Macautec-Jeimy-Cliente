import React, { Component } from 'react';

export default class CitaReporteTableRow extends Component {

    render() {
        
        
        return (
            <tr>
                <td>{this.props.obj.servicio.nombre}</td>
                <td>{this.props.obj.estado}</td>
                <td>{this.props.obj.hora+":00"}</td>                                
                <td>{this.props.obj.cliente}</td>
                <td>{this.props.obj.telefono}</td>
                <td>{this.props.obj.placavehiculo}</td>
            </tr>
        );
    }
}