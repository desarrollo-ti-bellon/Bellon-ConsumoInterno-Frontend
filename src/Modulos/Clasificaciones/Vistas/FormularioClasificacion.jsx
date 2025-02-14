import React, { useEffect } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useClasificacionFormulario } from '../Controles/useClasificacionFormulario';

export default function FormularioClasificacion() {

    const { state, dispatch } = useClasificacionFormulario();
    const {
        id_clasificacion,
        id_grupo_cont_producto_general,
        codigo_clasificacion,
        descripcion,
        estado,
    } = state.formulario;

    const {
        campo_id_clasificacion,
        campo_id_grupo_cont_producto_general,
        campo_codigo_clasificacion,
        campo_descripcion,
        campo_estado,
    } = state.inactivarCampos;

    const actualizarFormulario = (e) => {
        const { id, value } = e.target
        if (id === 'estado') {
            dispatch({ type: 'actualizarFormulario', payload: { id, value: e.target.checked } })
        } else {
            dispatch({ type: 'actualizarFormulario', payload: { id, value } })
        }
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

    useEffect(() => {
        enviar();
    },[state.formulario])

    return (
        <>
            <Form noValidate onSubmit={validarFormulario}>

                <Row className="mb-2">

                    <Form.Group as={Col} md="2" controlId="id_clasificacion">
                        <Form.Label>ID</Form.Label>
                        <Form.Control
                            type="text"
                            defaultValue={id_clasificacion || ''}
                            onChange={actualizarFormulario}
                            disabled={campo_id_clasificacion}
                        />
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="codigo_clasificacion">
                        <Form.Label>Clasificacion</Form.Label>
                        <Form.Select
                            value={codigo_clasificacion}
                            onChange={actualizarFormulario}
                            isValid={codigo_clasificacion}
                            isInvalid={!codigo_clasificacion}
                            disabled={campo_codigo_clasificacion}
                            required
                        >
                            <option value={''}> Por favor seleccione ... </option>
                            {
                                state.comboClasificaciones?.map(clasificacion => {
                                    return (
                                        <option key={clasificacion.codigo} value={clasificacion.codigo}>
                                            [{clasificacion.codigo}] {clasificacion.descripcion}
                                        </option>
                                    )
                                })
                            }
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            El campo de clasificacion es obligatorio.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="descripcion">
                        <Form.Label>Descripcion</Form.Label>
                        <Form.Control
                            type="text"
                            value={descripcion}
                            onChange={actualizarFormulario}
                            isValid={descripcion}
                            isInvalid={!descripcion}
                            disabled={campo_descripcion}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            El campo descripción es obligatorio.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="2" className="mb-3" controlId="estado">
                        <Form.Label>Estado</Form.Label>
                        <Form.Switch
                            className="form-switch-lg"
                            onChange={actualizarFormulario}
                            checked={estado}
                            disabled={campo_estado}
                        />
                    </Form.Group>

                </Row>

                <Button id="enviarFormulario" hidden variant="primary" type="submit">
                    Enviar
                </Button>

            </Form>
        </>
    )
}
