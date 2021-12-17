import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Moment from 'moment';

export default class ComentarioTableRow extends Component {

    constructor(props) {
        super(props);
        this.borrarComentario = this.borrarComentario.bind(this);
    }

    borrarComentario() {
        axios.delete('https://macautec-jeimy-server.vercel.app/comentarios/borrar-comentario/' + this.props.obj._id)
            .then((res) => {
                console.log('Cita borrada con exito!')
                window.location.reload();
            }).catch((error) => {
                console.log(error)
            })
        
    }

    
    render() {        
        const usuarioMecanico = JSON.parse(localStorage.getItem('token')).usuario.tipo === 'Mecanico'
        return (
            <tr>
                <td>{this.props.obj.comentario}</td>                
                <td>{Moment(this.props.obj.actualizado).format('MM-DD-yyyy HH:mm:ss')}</td>                
                <td>                   
                    {usuarioMecanico ? (
                        <Button onClick={this.borrarComentario} className="btn btn-danger" variant="danger">Borrar</Button>
                    ):(<div></div>)}
                </td>
            </tr>
        );
    }
}