import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import * as Icon from "react-bootstrap-icons";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
export default function BarraAcciones({ titulo, contexto }) {

    if (!contexto) {
        return;
    }

    const { guardar, anular, imprimir, cancelar } = useContext(contexto);
    return (
        <Navbar expand="lg" className="bg-body-tertiary" style={{ padding: 16 }}>
            <Container fluid>
                <Navbar.Brand >{titulo}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto" style={{ position: 'absolute', right: 0, zIndex: 100 }}>
                        <Nav.Item style={{ left: 2 }}><Button className='m-1' size='md' title="guardar" variant="primary" onClick={(e) => guardar()}><Icon.Floppy2Fill /> Guardar </Button></Nav.Item>
                        {/* <Nav.Item style={{ left: 2 }}><Button className='m-1' size='md' title="anular" variant="outline-info" onClick={() => anular()}> <Icon.Ban size={20} />  </Button></Nav.Item> */}
                        {/* <Nav.Item style={{ left: 2 }}><Button className='m-1' size='md' variant="outline-info" onClick={() => imprimir()}>  <Icon.PrinterFill size={20} /> </Button></Nav.Item> */}
                        {/* <Nav.Item style={{ left: 2 }}><Button className='m-1' size='md' title="Limpiar" variant="outline-info" onClick={() => cancelar()}> <Icon.XCircleFill size={20} /> </Button></Nav.Item> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
