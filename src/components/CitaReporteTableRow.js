import React, { Component } from 'react';
import CitaReporteTableRow2 from './CitaReporteTableRow2'
import Table from 'react-bootstrap/Table';

export default class CitaReporteTableRow extends Component {

    DataTable() {
        return this.props.obj.citas.map((res, i) => {
            return <CitaReporteTableRow2 obj={res} key={i} />;
    });
    }

    render() {
        
        
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>{this.props.obj._id.fecha.split('T')[0]}</th>
                        <th colSpan="6">{this.props.obj._id.mecanico}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Servicio</th>
                        <th>Estado</th>
                        <th>Hora</th>
                        <th>Cliente</th>
                        <th>Telefono</th>
                        <th>Placa vehiculo</th>
                    </tr>
                    {this.DataTable()}
                </tbody>
            </Table>
        );
    }
}