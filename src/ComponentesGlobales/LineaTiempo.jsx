import React from 'react'
import { Badge, Card, Col, Container, Form, Row } from 'react-bootstrap'
import '../ComponentesEstilos/LineaTiempo.css'
import { formateadorDeFechaYHoraEspanol, formatoMoneda, verDocumento } from '../FuncionesGlobales'

export default function LineaTiempo({ no_documento = "", lineas = [] }) {

    const hypervinculoDocumento = (e) => {
        console.log('hypervinculoDocumento', e);
        const fila = e;
        const no_documento = fila.no_documento;
        const titulo = `ver solicitud ${no_documento}`;
        verDocumento(no_documento, fila);
    }

    return (
        <div className="py-5">
            <h2 className="text-center mb-4">
                Historial Movimientos <a href="#" className="primary" style={{ color: "#00b7c3" }} onClick={() => hypervinculoDocumento(lineas[0])}>{no_documento}</a>
            </h2>
            <Container fluid>
                <Row>
                    <Col style={{ overflowY: 'scroll', backgroundColor: "#f9f9f9", maxHeight: 600 }}>
                        <div className="timeline">
                            {
                                lineas.length > 0 &&
                                lineas.map((linea, index) => (
                                    <div
                                        key={index}
                                        className={`timeline-event ${index % 2 === 0 ? 'left' : 'right'}`}
                                    >
                                        <Card border="primary" className="mb-3">
                                            <Card.Body>
                                                <Card.Title><Badge size={35} variant="primary">{linea.evento}</Badge></Card.Title>
                                                <Card.Text>
                                                    <p><b>Fecha:</b> {formateadorDeFechaYHoraEspanol(linea.fecha_creado)}</p>
                                                    <p><b>Responsable Accion:</b> {linea.modificado_por ? linea.modificado_por : linea.creado_por}</p>
                                                    <p><b>No Documento:</b> {linea.no_documento}</p>
                                                    <p><b>Solicitante:</b> {linea.creado_por}</p>
                                                    <p><b>Aprobador:</b> {linea.usuario_responsable}</p>
                                                    <p><b>Despacho:</b> {linea.usuario_despacho}</p>
                                                    <p><b>Total:</b> {formatoMoneda(linea.total, 2, '')}</p>
                                                    {
                                                        <p><b>Comentario:</b>
                                                            <Form.Group className="mb-3" >
                                                                <Form.Control
                                                                    as="textarea"
                                                                    rows={3}
                                                                    defaultValue={linea.comentario}
                                                                    disabled
                                                                />
                                                            </Form.Group>
                                                        </p>
                                                    }
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                ))
                            }
                        </div>
                    </Col>
                </Row>
            </Container>
        </div >
    )
}
