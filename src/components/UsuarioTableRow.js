import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

export default class UsuarioTableRow extends Component {

    constructor(props) {
        super(props);
        this.borrarUsuario = this.borrarUsuario.bind(this);
    }

    
    borrarUsuario() {
        if(window.confirm('Esta seguro de borrar el usuario?')){
            axios.delete('http://localhost:4000/usuarios/borrar-usuario/' + this.props.obj._id)
            .then((res) => {
                console.log('Usuario borrado con exito!')
                window.location.reload();
            }).catch((error) => {
                console.log(error)
            })
        }
    }

    render() {
        //const esPlanta = this.props.obj.tipo === 'Planta'
        const esMecanico = this.props.obj.tipo === 'Mecanico'
        const usuarioAdmin = JSON.parse(localStorage.getItem('token')).usuario.tipo === 'Administrador'
        return (
            <tr>
                <td>{this.props.obj.nombre}</td>
                <td>{this.props.obj.email}</td>
                <td>{this.props.obj.telefono}</td>
                <td>{this.props.obj.cedula}</td>
                <td>{this.props.obj.tipo}</td>
                <td>
                    {esMecanico ? (
                        <Link className="btn btn-primary" to={"/agenda/mecanico/" + this.props.obj._id}>
                            Agenda
                        </Link>
                    ):(<div></div>)}
                    <Link className="btn btn-success" to={"/editar-usuario/" + this.props.obj._id}>
                        Editar
                    </Link>
                    {usuarioAdmin ? (
                        <Button onClick={this.borrarUsuario} className="btn btn-danger" variant="danger">Borrar</Button>
                    ):(<div></div>)}
                </td>
            </tr>
        );
    }
}