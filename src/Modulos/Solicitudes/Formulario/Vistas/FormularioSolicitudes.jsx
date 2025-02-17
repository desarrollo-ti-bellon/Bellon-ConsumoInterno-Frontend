import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { formateadorDeFechas, formatoCantidad, formatoMoneda, obtenerRutaUrlActual } from "../../../../FuncionesGlobales";
import { useFormulario } from "../Controles/useFormulario";
import { useSearchParams } from "react-router-dom";

export default function FormularioSolicitudes() {

    const { state, dispatch, delegarResponsable, validarFormulario: validarFormularioReducer, noValidarFormulario, actualizarFormulario, limpiarFormulario, enviar } = useFormulario();
    const { id_cabecera_solicitud, no_documento, fecha_creado, creado_por, id_departamento, usuario_despacho, usuario_responsable, id_estado_solicitud, id_clasificacion, id_sucursal, comentario, total } = state.formulario;
    const { campo_id_cabecera_solicitud, campo_no_documento, campo_fecha_creado, campo_creado_por, campo_id_departamento, campo_usuario_despacho, campo_usuario_responsable, campo_id_estado_solicitud, campo_id_clasificacion, campo_id_sucursal, campo_comentario, campo_total } = state.inactivarCampos;
    const { requerido_id_cabecera_solicitud, requerido_no_documento, requerido_fecha_creado, requerido_creado_por, requerido_id_departamento, requerido_usuario_despacho, requerido_usuario_responsable, requerido_id_estado_solicitud, requerido_id_clasificacion, requerido_id_sucursal, requerido_comentario, requerido_total } = state.camposRequeridos;
    const [bloquearBotonDelegar, setBloquearBotonDelegar] = useState(false);
    const [locacion] = useSearchParams();

    useEffect(() => {
        const condicion = (state.formulario.id_cabecera_solicitud !== null && locacion.get('accion') === 'ver' && obtenerRutaUrlActual() !== import.meta.env.VITE_APP_BELLON_SOLICITUDES_NUEVAS_FORMULARIO);
        setBloquearBotonDelegar(condicion);
    }, [state])

    useEffect(() => {
        limpiarFormulario();
        noValidarFormulario();
    }, [])

    const validarFormulario = (e) => {
        e.preventDefault();
        e.stopPropagation();
        noValidarFormulario();
        const form = e.currentTarget;
        if (form.checkValidity()) {
            validarFormularioReducer();
        }
    }

    return (
        <>
            <Row>
                <Col>
                    <Form noValidate onSubmit={validarFormulario}>

                        <Row className="mb-3">

                            <Form.Group as={Col} md="4" controlId="id_solicitud">
                                <Form.Label>ID Solicitud</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={no_documento || ''}
                                    disabled={campo_no_documento}
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

                        <Row className="mb-3">

                            <Form.Group as={Col} md="4" controlId="id_estado_solicitud">
                                <Form.Label>Estado Solicitud</Form.Label>
                                <Form.Select
                                    value={id_estado_solicitud || ''}
                                    onChange={(e) => {
                                        actualizarFormulario(e.target.id, e.target.value);
                                        enviar();
                                    }}
                                    isValid={id_estado_solicitud}
                                    isInvalid={requerido_id_estado_solicitud && !id_estado_solicitud}
                                    disabled={campo_id_estado_solicitud}
                                    required={requerido_id_estado_solicitud}
                                >
                                    <option value={''}>
                                        Por favor seleccione ...
                                    </option>
                                    {
                                        state.comboEstadoSolicitudes?.map(estado_solicitud => (
                                            <option key={estado_solicitud.id_estado_solicitud} value={estado_solicitud.id_estado_solicitud}>
                                                [{estado_solicitud.id_estado_solicitud}] {estado_solicitud.descripcion}
                                            </option>
                                        ))
                                    }
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    El campo estado de la solicitud es obligatorio.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md="4" controlId="id_departamento">
                                <Form.Label>Departamento</Form.Label>
                                <Form.Select
                                    value={id_departamento || ''}
                                    onChange={(e) => {
                                        actualizarFormulario(e.target.id, e.target.value);
                                        enviar();
                                    }}
                                    isValid={id_departamento}
                                    isInvalid={requerido_id_departamento && !id_departamento}
                                    disabled={campo_id_departamento}
                                    required={requerido_id_departamento}
                                >
                                    <option value={''}>
                                        Por favor seleccione ...
                                    </option>
                                    {
                                        state.comboDepartamentos?.map(departamento => (
                                            <option key={departamento.codigo} value={departamento.id_valor_dimension}>
                                                [{departamento.codigo}] {departamento.nombre}
                                            </option>
                                        ))
                                    }
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    El campo departamento es obligatorio.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md="4" controlId="id_sucursal">
                                <Form.Label>Sucursal</Form.Label>
                                <Form.Select
                                    value={id_sucursal || ''}
                                    onChange={(e) => {
                                        actualizarFormulario(e.target.id, e.target.value);
                                        enviar();
                                    }}
                                    isValid={id_sucursal}
                                    isInvalid={requerido_id_sucursal && !id_sucursal}
                                    disabled={campo_id_sucursal}
                                    required={requerido_id_sucursal}
                                >
                                    <option value={''}>
                                        Por favor seleccione ...
                                    </option>
                                    {
                                        state.comboSucursales?.map(sucursal => (
                                            <option key={sucursal.id_valor_dimension} value={sucursal.id_valor_dimension}>
                                                [{sucursal.codigo}] {sucursal.nombre}
                                            </option>
                                        ))
                                    }
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    El campo sucursal es obligatorio.
                                </Form.Control.Feedback>
                            </Form.Group>

                        </Row>

                        <Row className="mb-3">

                            <Form.Group as={Col} md="4" controlId="id_clasificacion">
                                <Form.Label>Clasificaciones</Form.Label>
                                <Form.Select
                                    value={id_clasificacion || ''}
                                    onChange={(e) => {
                                        actualizarFormulario(e.target.id, e.target.value);
                                        enviar();
                                    }}
                                    isValid={id_clasificacion}
                                    isInvalid={requerido_id_clasificacion && !id_clasificacion}
                                    disabled={campo_id_clasificacion}
                                    required={requerido_id_clasificacion}
                                >
                                    <option value={''}>
                                        Por favor seleccione ...
                                    </option>
                                    {
                                        state.comboClasificaciones?.map(clasificacion => (
                                            <option key={clasificacion.id_clasificacion} value={clasificacion.id_clasificacion}>
                                                [{clasificacion.id_clasificacion}] {clasificacion.descripcion}
                                            </option>
                                        ))
                                    }
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    El campo clasificaciones es obligatorio.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md="4" controlId="usuario_responsable">
                                <Form.Label>Usuario Aprobador</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={usuario_responsable || ''}
                                    onChange={(e) => {
                                        actualizarFormulario(e.target.id, e.target.value);
                                        enviar();
                                    }}
                                    isValid={usuario_responsable}
                                    isInvalid={requerido_usuario_responsable && !usuario_responsable}
                                    disabled={campo_usuario_responsable}
                                    required={requerido_usuario_responsable}
                                />
                                <Form.Control.Feedback type="invalid">
                                    El usuario aprobador es obligatorio.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md="2">
                                <Form.Label>Usuario Aprobador</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={formatoCantidad(state.limiteAprobacion)}
                                    isValid={total <= state.limiteAprobacion}
                                    isInvalid={!state.limiteAprobacion || total > state.limiteAprobacion}
                                    disabled
                                />
                                <Form.Control.Feedback type="invalid">
                                    Limite superado del usuario responsable
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md="2">
                                <div style={{ marginTop: '30px' }}>
                                    <Button variant="primary"
                                        disabled={bloquearBotonDelegar}
                                        onClick={() => {
                                            delegarResponsable();
                                            enviar();
                                        }}> <Icon.ArrowUp /> Delegar </Button>
                                </div>
                            </Form.Group>

                        </Row>

                        <Row className="mb-3" hidden>

                            <Form.Group as={Col} md="4" controlId="usuario_despacho">
                                <Form.Label>Asistente Despacho</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={usuario_despacho || ''}
                                    onChange={(e) => {
                                        actualizarFormulario(e.target.id, e.target.value);
                                        enviar();
                                    }}
                                    isValid={usuario_despacho}
                                    isInvalid={requerido_usuario_despacho && !usuario_despacho}
                                    disabled={campo_usuario_despacho}
                                    required={requerido_usuario_despacho}
                                />
                                <Form.Control.Feedback type="invalid">
                                    El campo usuario despachador es obligatorio.
                                </Form.Control.Feedback>
                            </Form.Group>

                        </Row>

                        <Row className="mb-3">

                            <Form.Group as={Col} md="4" controlId="total">
                                <Form.Label>Total</Form.Label>
                                <Form.Control
                                    type="text"
                                    defaultValue={formatoMoneda(total, 2, '')}
                                    onChange={(e) => {
                                        actualizarFormulario(e.target.id, e.target.value);
                                        enviar();
                                    }}
                                    isValid={!isNaN(total)}
                                    isInvalid={total < 0}
                                    disabled={campo_total}
                                    required={requerido_total}
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
                                    onChange={(e) => {
                                        actualizarFormulario(e.target.id, e.target.value);
                                        enviar();
                                    }}
                                    isValid={comentario}
                                    isInvalid={requerido_comentario && !comentario}
                                    disabled={campo_comentario}
                                    required={requerido_comentario}
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
                </Col>
            </Row>
        </>
    )
}
