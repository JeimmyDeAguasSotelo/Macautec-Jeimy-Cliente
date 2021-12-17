import React  from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import '@szhsin/react-menu/dist/index.css';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Sidebar from "./components/sidebar";

import CrearUsuario from "./components/crear-usuario.component";
import EditarUsuario from "./components/editar-usuario.component";
import ListaUsuarios from "./components/lista-usuarios.component";
import ListaMecanico from "./components/lista-mecanicos.component";

import Agenda from "./components/agenda-component";
import AgendaServicio from "./components/agenda-servicio-component";
import AgendaMecanico from "./components/agenda-mecanico-component";

import CrearServicio from "./components/crear-servicio.component";
import EditarServicio from "./components/editar-servicio.component";
import ListaServicio from "./components/lista-servicios.component";

import CrearCita from "./components/crear-cita.component";
import EditarCita from "./components/editar-cita.component";
import ListaCita from "./components/lista-cita.component";
import ListaCitasMecanico from "./components/lista-cita-mecanico.component";
import CitaMecanicoComentarios from "./components/cita-mecanico-comentarios.component";

import Reportes from "./components/reporte.component"

//agregue login session siguendo esta guia
//https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications
import Login from './components/login.component';
import useToken from './useToken';

function App() {
  const { token, setToken } = useToken();
  //console.log(token)
  if(!token) {
    return <Login setToken={setToken} />
  }

  const session = localStorage.getItem('token');
  const sess = JSON.parse(session)
  //console.log(sess.usuario.nombre)

  
  return (<Router>    
    <div className="App">
      <header className="App-header">
        <Navbar className="color-nav">
          <Sidebar />
          <Container>

            <Navbar.Brand>
              <Link to={"/"} className="nav-link">
                Macautec
              </Link>
            </Navbar.Brand>

            <Nav className="justify-content-end">
              <Nav className="nombre-usuario">
                
                  {sess.usuario.nombre} / {sess.usuario.tipo}
                
                
              </Nav>
            </Nav>

          </Container>
        </Navbar>
      </header>

      <Container>
        <Row>
          <Col md={12}>
            <div className="wrapper">
              <Switch>
                <Route exact path='/' component={Agenda} />
                <Route path="/crear-usuario/" component={CrearUsuario} />
                <Route path="/editar-usuario/:id" component={EditarUsuario} />
                <Route path="/usuarios/" component={ListaUsuarios} />
                <Route path="/crear-servicio/" component={CrearServicio} />
                <Route path="/editar-servicio/:id" component={EditarServicio} />
                <Route path="/servicios/" component={ListaServicio} />
                <Route path="/crear-cita/" component={CrearCita} />
                <Route path="/editar-cita/:id" component={EditarCita} />
                <Route path="/citas/mecanico/:id" component={ListaCitasMecanico} />
                <Route path="/citas/" component={ListaCita} />                
                <Route path="/comentarios/:id" component={CitaMecanicoComentarios} />                
                <Route path="/agenda/mecanico/:id" component={AgendaMecanico} />
                <Route path="/agenda/servicio/:id" component={AgendaServicio} />
                <Route path="/agenda/" component={Agenda} />
                <Route path="/mecanicos/" component={ListaMecanico} />
                <Route path="/reportes/" component={Reportes} />                
              </Switch>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  </Router>);
}

export default App;