import React, { useEffect } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useUsuarioFormulario } from '../Controles/useUsuarioFormulario';

export default function FormularioUsuario() {

    const { state, dispatch, validarCampoAlmacen } = useUsuarioFormulario();
    const { id_usuario_ci, id_usuario, nombre_usuario, correo, codigo_sucursal, id_sucursal, codigo_departamento, id_departamento, limite, posicion_id, estado, almacen_id, codigo_almacen } = state.formulario;
    const { campo_id_usuario_ci, campo_id_usuario, campo_nombre_usuario, campo_correo, campo_codigo_sucursal, campo_id_sucursal, campo_codigo_departamento, campo_id_departamento, campo_limite, campo_posicion_id, campo_estado, campo_almacen_id, campo_codigo_almacen } = state.inactivarCampos;

    const actualizarFormulario = (e) => {
        const { id, value } = e.target
        if (id === 'estado') {
            dispatch({ type: 'actualizarFormulario', payload: { id, value: e.target.checked } })
        } else {
            dispatch({ type: 'actualizarFormulario', payload: { id, value } })
        }
        validarFormulario();
    }

    const validarFormulario = () => {
        document.getElementById('enviarFormulario').click()
    }

    const enviar = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch({ type: 'validarFormulario', payload: { validadoFormulario: false } })
        const form = e.currentTarget;
        if (form.checkValidity()) {
            dispatch({ type: 'validarFormulario', payload: { validadoFormulario: true } })
        }
    }

    useEffect(() => {
        validarFormulario();
    }, [state.formulario])

    return (
        <>
            <Form noValidate onSubmit={enviar}>

                <Row className="mb-2">

                    <Form.Group as={Col} md="2" controlId="id_usuario_ci">
                        <Form.Label>ID</Form.Label>
                        <Form.Control
                            type="text"
                            defaultValue={id_usuario_ci || ''}
                            disabled={campo_id_usuario_ci}
                        />
                    </Form.Group>

                    <Form.Group as={Col} md="5" controlId="id_usuario">
                        <Form.Label>Usuarios</Form.Label>
                        <Form.Select
                            value={id_usuario || ''}
                            onChange={actualizarFormulario}
                            isValid={id_usuario}
                            isInvalid={!id_usuario}
                            disabled={campo_id_usuario}
                            required
                        >
                            <option value={''}>
                                Por favor seleccione ...
                            </option>
                            {
                                state.comboUsuarios?.map(usuario => {
                                    return (
                                        <option key={usuario.id_usuario} value={usuario.id_usuario}>
                                            [{usuario.nombre_usuario}] {usuario.nombre_completo}
                                        </option>
                                    )
                                })
                            }
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            El código de la usuario es obligatorio.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="5" controlId="nombre_usuario">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            value={nombre_usuario || ''}
                            onChange={actualizarFormulario}
                            isValid={nombre_usuario}
                            isInvalid={!nombre_usuario}
                            disabled={campo_nombre_usuario}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            El nombre del usuario es obligatorio.
                        </Form.Control.Feedback>
                    </Form.Group>

                </Row>

                <Row className="mb-2">

                    <Form.Group as={Col} md="4" controlId="correo">
                        <Form.Label>Correo</Form.Label>
                        <Form.Control
                            type="email"
                            value={correo || ''}
                            onChange={actualizarFormulario}
                            isValid={correo}
                            isInvalid={!correo}
                            disabled={campo_correo}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            El campo correo del usuario es obligatorio.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="codigo_sucursal">
                        <Form.Label>Sucursal</Form.Label>
                        <Form.Select
                            value={codigo_sucursal || ''}
                            onChange={actualizarFormulario}
                            isValid={codigo_sucursal}
                            isInvalid={!codigo_sucursal}
                            disabled={campo_codigo_sucursal}
                            required
                        >
                            <option value={''}>
                                Por favor seleccione ...
                            </option>
                            {
                                state.comboSucursales?.map(sucursal => {
                                    return (
                                        <option key={sucursal.codigo} value={sucursal.codigo}>
                                            [{sucursal.codigo}] {sucursal.nombre}
                                        </option>
                                    )
                                })
                            }
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            El código de la sucursal es obligatorio.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="codigo_departamento">
                        <Form.Label>Departamento</Form.Label>
                        <Form.Select
                            value={codigo_departamento || ''}
                            onChange={actualizarFormulario}
                            isValid={codigo_departamento}
                            isInvalid={!codigo_departamento}
                            disabled={campo_codigo_departamento}
                            required
                        >
                            <option value={''}>
                                Por favor seleccione ...
                            </option>
                            {
                                state.comboDepartamentos?.map(departamento => {
                                    return (
                                        <option key={departamento.codigo} value={departamento.codigo}>
                                            [{departamento.codigo}] {departamento.nombre}
                                        </option>
                                    )
                                })
                            }
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            El código del departamento es obligatorio.
                        </Form.Control.Feedback>
                    </Form.Group>

                </Row>

                <Row className="mb-2">

                    <Form.Group as={Col} md="3" controlId="posicion_id">
                        <Form.Label>Posicion</Form.Label>
                        <Form.Select
                            value={posicion_id || ''}
                            onChange={actualizarFormulario}
                            isValid={posicion_id}
                            isInvalid={!posicion_id}
                            disabled={campo_posicion_id}
                            required
                        >
                            <option value={''}>
                                Por favor seleccione ...
                            </option>
                            {
                                state.comboPosiciones?.map(posicion => {
                                    return (
                                        <option key={posicion.posicion_id} value={posicion.posicion_id}>
                                            [{posicion.posicion_id}] {posicion.descripcion}
                                        </option>
                                    )
                                })
                            }
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            El campo posición es obligatorio.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="3" controlId="limite">
                        <Form.Label>Limite</Form.Label>
                        <Form.Control
                            type="text"
                            value={limite || 0}
                            onChange={actualizarFormulario}
                            isValid={limite}
                            isInvalid={!limite && !isNaN(limite) && +limite < 0}
                            disabled={campo_limite}
                        />
                        <Form.Control.Feedback type="invalid">
                            El limite que se puede aprobar es obligatorio.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="codigo_almacen">
                        <Form.Label>Almacen</Form.Label>
                        <Form.Select
                            value={codigo_almacen || ''}
                            onChange={actualizarFormulario}
                            isValid={codigo_almacen}
                            isInvalid={!codigo_almacen && validarCampoAlmacen()}
                            disabled={campo_codigo_almacen}
                            required={validarCampoAlmacen()}
                        >
                            <option value={''}>
                                Por favor seleccione ...
                            </option>
                            {
                                state.comboAlmacenes?.map(almacen => {
                                    return (
                                        <option key={almacen.codigo} value={almacen.codigo}>
                                            [{almacen.codigo}] {almacen.nombre}
                                        </option>
                                    )
                                })
                            }
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            El almacen es obligatorio.
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
