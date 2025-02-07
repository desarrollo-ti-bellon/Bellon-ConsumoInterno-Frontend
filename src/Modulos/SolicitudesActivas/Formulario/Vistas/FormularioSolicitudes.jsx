import { Button, Col, Form, Row } from "react-bootstrap";
import { formateadorDeFechas, formatoMoneda } from "../../../../FuncionesGlobales";
import { useFormulario } from "../Controles/useFormulario";
import { useEffect } from "react";
import * as Icon from "react-bootstrap-icons"

export default function FormularioSolicitudes() {

    const { state, dispatch, delegarResponsable } = useFormulario();
    const { id_cabecera_solicitud, no_documento, fecha_creado, creado_por, id_departamento, usuario_despacho, usuario_responsable, usuario_asistente_control, usuario_asistente_contabilidad, id_estado_solicitud, id_clasificacion, id_sucursal, comentario, total } = state.formulario;
    const { campo_id_cabecera_solicitud, campo_no_documento, campo_fecha_creado, campo_creado_por, campo_id_departamento, campo_usuario_despacho, campo_usuario_responsable, campo_usuario_asistente_control, campo_usuario_asistente_contabilidad, campo_id_estado_solicitud, campo_id_clasificacion, campo_id_sucursal, campo_comentario, campo_total } = state.inactivarCampos;
    const { requerido_id_cabecera_solicitud, requerido_no_documento, requerido_fecha_creado, requerido_creado_por, requerido_id_departamento, requerido_usuario_despacho, requerido_usuario_responsable, requerido_usuario_asistente_control, requerido_usuario_asistente_contabilidad, requerido_id_estado_solicitud, requerido_id_clasificacion, requerido_id_sucursal, requerido_comentario, requerido_total } = state.camposRequeridos;

    useEffect(() => {
        dispatch({ type: 'limpiarFormulario' })
    }, [])

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
                                    value={id_estado_solicitud}
                                    onChange={actualizarFormulario}
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
                                    value={id_departamento}
                                    onChange={actualizarFormulario}
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
                                    value={id_sucursal}
                                    onChange={actualizarFormulario}
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
                                    value={id_clasificacion}
                                    onChange={actualizarFormulario}
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
                                    value={usuario_responsable}
                                    onChange={actualizarFormulario}
                                    isValid={usuario_responsable}
                                    isInvalid={requerido_usuario_responsable && !usuario_responsable}
                                    disabled={campo_usuario_responsable}
                                    required={requerido_usuario_responsable}
                                />
                                <Form.Control.Feedback type="invalid">
                                    El usuario aprobador es obligatorio.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md="4" style={{ paddingTop: 30 }} controlId="usuario_responsable">
                                <Button variant="primary" onClick={delegarResponsable}> <Icon.ArrowUp /> Delegar </Button>
                            </Form.Group>

                        </Row>

                        <Row className="mb-3" hidden>

                            <Form.Group as={Col} md="4" controlId="usuario_asistente_contabilidad">
                                <Form.Label>Asistente Contabilidad</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={usuario_asistente_contabilidad}
                                    onChange={actualizarFormulario}
                                    isValid={usuario_asistente_contabilidad}
                                    isInvalid={requerido_usuario_responsable && !usuario_asistente_contabilidad}
                                    disabled={campo_usuario_asistente_contabilidad}
                                    required={requerido_usuario_asistente_contabilidad}
                                />
                                <Form.Control.Feedback type="invalid">
                                    El campo usuario despachador es obligatorio.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md="4" controlId="usuario_asistente_control">
                                <Form.Label>Asistente Control</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={usuario_asistente_control}
                                    onChange={actualizarFormulario}
                                    isValid={usuario_asistente_control}
                                    isInvalid={requerido_usuario_asistente_control && !usuario_asistente_control}
                                    disabled={campo_usuario_asistente_control}
                                    required={requerido_usuario_asistente_control}
                                />
                                <Form.Control.Feedback type="invalid">
                                    El campo usuario despachador es obligatorio.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md="4" controlId="usuario_despacho">
                                <Form.Label>Asistente Despacho</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={usuario_despacho}
                                    onChange={actualizarFormulario}
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
                                    value={total || ''}
                                    onChange={actualizarFormulario}
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
                                    onChange={actualizarFormulario}
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
