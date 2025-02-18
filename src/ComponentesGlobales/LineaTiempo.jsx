import React from 'react'
import '../ComponentesEstilos/LineaTiempo.css'
import { Badge, Col, Container, Form, Row } from 'react-bootstrap'
import { formateadorDeFechaYHoraEspanol } from '../FuncionesGlobales'

export default function LineaTiempo({ no_documento = "", lineas = [] }) {
    return (
        <div className=" py-5">
            <h2 className="text-center mb-4">Historial Movimientos <span className='primary'>{no_documento}</span></h2>
            <ul className="timeline">
                <li className="timeline-item">
                    <div className="timeline-badge bg-primary">
                        <i className="bi bi-activity"></i>
                    </div>
                    <Container fluid>
                        <Row>
                            <Col style={{ overflowY: 'scroll', maxHeight: 500 }}>


                                {
                                    lineas.length > 0 &&
                                    lineas.map((linea, index) => (
                                        <li key={index} className={`timeline-item ${index % 2 === 0 ? 'timeline-inverted' : ''}`}>
                                            <div className="timeline-badge bg-success">
                                                <i className="bi bi-calendar3-fill"></i>
                                            </div>
                                            <div className="timeline-content">
                                                <h5>Accion #{index + 1}</h5>
                                                <p><Badge size={35} variant="primary">{linea.evento}</Badge></p>
                                                <p><Form.Control
                                                    type="textarea"
                                                    value={linea.comentario}
                                                    placeholder="Comentario"
                                                    className="form-control mb-3"
                                                    disabled
                                                    required
                                                /></p>
                                                <p><b>No Documento:</b> {linea.no_documento}  </p>
                                                <p><b>Solicitante:</b> {linea.creado_por}  </p>
                                                <p><b>Aprobador:</b>   {linea.usuario_responsable}   </p>
                                                <p><b>Despacho:</b>    {linea.usuario_despacho}  </p>
                                                <small className="text-muted">Fecha: {formateadorDeFechaYHoraEspanol(linea.fecha_creado)}</small>
                                            </div>
                                        </li>
                                    ))
                                }
                            </Col>
                        </Row>
                    </Container>
                </li>
            </ul>
        </div>
    )
}
