import React  from "react";
import { slide as Menu } from "react-burger-menu";

const logout = () => {
  localStorage.clear();
  // you can also like localStorage.removeItem('Token');
  window.location.href = "/";
} 

export default function Sidebar() {
  const usuarioAdmin = JSON.parse(localStorage.getItem('token')).usuario.tipo === 'Administrador';
  const usuarioMecanico = JSON.parse(localStorage.getItem('token')).usuario.tipo === 'Mecanico';
  const usuarioPlanta = JSON.parse(localStorage.getItem('token')).usuario.tipo === 'Planta';
  const id = JSON.parse(localStorage.getItem('token')).usuario._id;
  const agendalink = "/agenda/mecanico/"+id;
  const serviciolink = "/citas/mecanico/"+id;

  if(usuarioAdmin){
    return(
      <Menu>        
        <a id="servicios" className="menu-item" href="/servicios">Servicios</a>
        <a id="citas" className="menu-item" href="/citas">Citas</a>        
        <a id="usuarios" className="menu-item" href="/usuarios">Usuarios</a>
        <a id="mecanicos" className="menu-item" href="/mecanicos">Mecanicos</a>
        <a id="agenda" className="menu-item" href="/agenda">Agenda</a>
        <a id="reportes" className="menu-item" href="/reportes">Reportes</a>
        <a id="cerrar" className="menu-item" href="/" onClick={logout}>Cerrar Sesion</a>
      </Menu>
    )
  }else if(usuarioMecanico){
    return(
      <Menu>
        <a id="misservicios" className="menu-item" href={serviciolink}>Mis servicios</a>
        <a id="agenda" className="menu-item" href={agendalink}>Mi agenda</a>
        <a id="cerrar" className="menu-item" href="/" onClick={logout}>Cerrar Sesion</a>
      </Menu>
    )
    
  }else if(usuarioPlanta){
    return(
      <Menu>        
        <a id="servicios" className="menu-item" href="/servicios">Servicios</a>        
        <a id="citas" className="menu-item" href="/citas">Citas</a>        
        <a id="agenda" className="menu-item" href="/agenda">Agenda</a>
        <a id="reportes" className="menu-item" href="/reportes">Reportes</a>
        <a id="cerrar" className="menu-item" href="/" onClick={logout}>Cerrar Sesion</a>
      </Menu>
    )
  }
}