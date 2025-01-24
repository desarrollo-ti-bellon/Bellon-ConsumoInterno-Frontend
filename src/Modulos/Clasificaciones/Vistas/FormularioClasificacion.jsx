import React from 'react';
import { useClasificacionFormulario } from '../Controles/useClasificacionFormulario';
import { Col, Form, Row } from 'react-bootstrap';

export default function FormularioClasificacion() {

    const { state, dispatch } = useClasificacionFormulario();

    const actualizarFormulario = (e) => {
        const { id, value } = e.target
        dispatch({ type: 'actualizarFormulario', payload: { id, value } })
        enviar();
    }

    const enviar = () => {
        document.getElementById('enviarFormulario').click()
    }

    const validarFormulario = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch({ type: 'validarFormulario', payload: { validadoFormulario: false } })
        const form = e.currentTarget;
        if (form.checkValidity()) {
            dispatch({ type: 'validarFormulario', payload: { validadoFormulario: true } })
        }
    }

    return (
        <>
            <Form noValidate onSubmit={validarFormulario}>

                <Row className="mb-2">

                    <Form.Group as={Col} md="4" controlId="id_solicitud">
                        <Form.Label>ID Solicitud</Form.Label>
                        <Form.Control
                            type="text"
                            value={id_cabecera_solicitud || ''}
                            disabled={campo_id_cabecera_solicitud}
                        />
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="fecha_creado">
                        <Form.Label>Fecha Creado</Form.Label>
                        <Form.Control
                            type="date"
                            defaultValue={formateadorDeFechas(fecha_creado)}
                            disabled={campo_fecha_creado}
                        />
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="creado_por">
                        <Form.Label>Creado Por</Form.Label>
                        <Form.Control
                            type="text"
                            defaultValue={creado_por}
                            disabled={campo_creado_por}

                        />
                    </Form.Group>

                </Row>

                <Row className="mb-2">

                    <Form.Group as={Col} md="4" controlId="usuario_responsable">
                        <Form.Label>Usuario Aprobador</Form.Label>
                        <Form.Control
                            type="text"
                            value={usuario_responsable}
                            onChange={actualizarFormulario}
                            isValid={usuario_responsable}
                            isInvalid={!usuario_responsable}
                            disabled={campo_usuario_responsable}
                        />
                        <Form.Control.Feedback type="invalid">
                            El usuario aprobador es obligatorio.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="id_departamento">
                        <Form.Label>Departamento</Form.Label>
                        <Form.Control
                            type="text"
                            value={id_departamento}
                            onChange={actualizarFormulario}
                            isValid={id_departamento}
                            isInvalid={!id_departamento}
                            disabled={campo_id_departamento}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            El departamento es obligatorio.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="usuario_despacho">
                        <Form.Label>Usuario Despachador</Form.Label>
                        <Form.Control
                            type="text"
                            value={usuario_despacho}
                            onChange={actualizarFormulario}
                            isValid={usuario_despacho}
                            isInvalid={!usuario_despacho}
                            disabled={campo_usuario_despacho}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            El usuario despachador es obligatorio.
                        </Form.Control.Feedback>
                    </Form.Group>

                </Row>

                <Row className="mb-2">

                    {/* 
                                <Form.Group as={Col} md="4" controlId="usuario_asistente_control">
                                    <Form.Label>Usuario Asistente Control</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={usuario_asistente_control}
                                        onChange={actualizarFormulario}
                                        isValid={usuario_asistente_control}
                                        isInvalid={!usuario_asistente_control}
                                        required
                                        disabled={campo_usuario_asistente_control}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        El usuario asistente control es obligatorio.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} md="4" controlId="usuario_asistente_contabilidad">
                                    <Form.Label>Usuario Asistente Contabilidad</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={usuario_asistente_contabilidad}
                                        onChange={actualizarFormulario}
                                        isValid={usuario_asistente_contabilidad}
                                        isInvalid={!usuario_asistente_contabilidad}
                                        required
                                        disabled={campo_usuario_asistente_contabilidad}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        El usuario asistente contabilidad es obligatorio.
                                    </Form.Control.Feedback>
                                </Form.Group> 
                            */}

                </Row>

                <Row className="mb-2">
                    <Form.Group as={Col} md="4" controlId="id_estado_solicitud">
                        <Form.Label>Estado Solicitud</Form.Label>
                        <Form.Select
                            value={id_estado_solicitud}
                            onChange={actualizarFormulario}
                            // isValid={id_estado_solicitud}
                            isInvalid={!id_estado_solicitud}
                            disabled={campo_id_estado_solicitud}
                            required
                        >
                            <option value={''}>
                                Por favor seleccione ...
                            </option>
                            {
                                state.comboEstadoSolicitudes.map(estado_solicitud => {
                                    return (
                                        <option key={estado_solicitud.id_estado_solicitud} value={estado_solicitud.id_estado_solicitud}>
                                            [{estado_solicitud.id_estado_solicitud}] {estado_solicitud.descripcion}
                                        </option>
                                    )
                                })
                            }
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            El estado de la solicitud es obligatorio.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="total">
                        <Form.Label>Total</Form.Label>
                        <Form.Control
                            type="text"
                            value={total || ''}
                            onChange={actualizarFormulario}
                            isValid={total}
                            isInvalid={total < 0}
                            disabled={campo_total}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            El campo "Total" es obligatorio.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="comentario">
                        <Form.Label>Comentario</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={1}
                            value={comentario}
                            onChange={actualizarFormulario}
                            isValid={comentario}
                            isInvalid={!comentario}
                            disabled={campo_comentario}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            El comentario es obligatorio.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <Button id="enviarFormulario" hidden variant="primary" type="submit">
                    Enviar
                </Button>

            </Form>
        </>
    )
}
