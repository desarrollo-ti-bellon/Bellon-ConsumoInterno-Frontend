import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Collapse, Form, Offcanvas, Row } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import Select from 'react-select';
import { useModalConfirmacion } from '../ControlesGlobales/ModalConfirmacion/useModalConfirmacion';
import { useNotas } from '../ControlesGlobales/Notas/useNotas';
import { formateadorDeFechas, formateadorDeFechaYHoraEspanol, obtenerNombreUsuarioLoggeado } from '../FuncionesGlobales';
import { useAlerta } from '../ControlesGlobales/Alertas/useAlerta';

export const Notas = () => {

    const { state, dispatch, guardar, eliminar } = useNotas();
    const { mostrar, notas, formulario } = state;
    const { id_nota, fecha_creado, creado_por, usuario_destino, descripcion, tipo_documento, id_documento, no_documento } = formulario
    const opcionesNotas = state.usuarios?.map(usuario => { return { value: usuario.correo_electronico, label: usuario.nombre_completo } });
    const { dispatch: dispatchModalConfirmacion } = useModalConfirmacion();
    const { dispatch: dispatchAlerta } = useAlerta();
    const bloquearAccionesYCampos = (creado_por !== obtenerNombreUsuarioLoggeado() && id_nota) ?? false;
    const [filtro, setFiltro] = useState('');
    const [notasFiltradas, setNotasFiltradas] = useState([]);

    const bloquearBotonEliminar = (usuario) => {
        return usuario !== obtenerNombreUsuarioLoggeado();
    }

    const actualizarFormulario = (e) => {
        const campoId = e.target.id;
        const campoValue = e.target.value;
        dispatch({ type: 'actualizarFormulario', payload: { id: campoId, value: campoValue } })
    }

    const estilosSelect = {
        control: (provided) => ({
            ...provided,
            borderColor: '#dee2e6',
            boxShadow: null,
            '&:hover': {
                borderColor: '#006d75', // Change this to your desired hover color
            },
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#00b7c3' : state.isFocused ? '#ccf0f3' : '#fff',
            color: state.isSelected ? '#fff' : '#000',
            '&:active': {
                backgroundColor: state.isSelected ? '#00b7c3' : '#ccf0f3',
            },
        }),
    };

    const obtenerCambiosDelSelectModificado = (combo_id, opcion) => {
        if (opcion) {
            dispatch({ type: 'actualizarFormulario', payload: { id: combo_id, value: opcion.value } })
        } else {
            dispatch({ type: 'actualizarFormulario', payload: { id: combo_id, value: '' } })
        }
    };

    const enviar = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const form = e.currentTarget;
        console.log('submit =>', form.checkValidity())
        if (form.checkValidity()) {
            guardar(state.formulario)
            dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: 'se guardó correctamente la nota', tipo: 'success' } })
        } else {
            dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: 'Debes de llenar los campos requeridos', tipo: 'danger' } })
        }
    };

    const limpiar = () => {
        dispatch({ type: 'mostrarFormularioNotas', payload: { mostrarFormulario: !state.mostrarFormulario } })
        dispatch({ type: 'limpiarFormulario' })
    }

    const eliminarNota = (e, id) => {
        e.stopPropagation();
        dispatchModalConfirmacion({ type: "mostrarModalConfirmacion", payload: { mensaje: "Realmente deseas eliminar esta nota?", funcionEjecutar: () => eliminar(id) } });
        dispatch({ type: 'mostrarFormularioNotas', payload: { mostrarFormulario: false } })
    }

    const mostrarFormularioNotas = () => {
        dispatch({ type: 'mostrarFormularioNotas', payload: { mostrarFormulario: !state.mostrarFormulario } })
    }

    const llenarFormulario = (formulario) => {
        dispatch({ type: 'llenarFormulario', payload: { formulario } })
        dispatch({ type: 'mostrarFormularioNotas', payload: { mostrarFormulario: true } })
    }

    useEffect(() => {
        setNotasFiltradas(notas)
    }, [notas])

    const filtrarNotas = (e) => {
        const filtro = e.target.value.toLowerCase();
        setFiltro(filtro);
        const clavesAExcluir = ['fecha_modificado', 'modificado_por'];
        const notasFiltradas = notas.filter(nota => {
            return Object.entries(nota).some(([clave, valor]) => {
                if (clavesAExcluir.includes(clave)) {
                    return false;
                }
                const valorString = valor ? valor.toString().toLowerCase() : '';
                return valorString.includes(filtro); // Compara si el valor incluye el filtro
            });
        });
        setNotasFiltradas(notasFiltradas);
    }

    return (
        <Offcanvas show={mostrar} onHide={() => dispatch({ type: 'mostrarNotas', payload: { mostrar: false } })} placement="end">
            <Offcanvas.Header>
                <Offcanvas.Title>Notas</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>

                {/* FILTRO PARA FILTRAR NOTAS */}
                <Form.Control className='mb-2' type='text' value={filtro} onChange={(e) => filtrarNotas(e)} placeholder='Buscar...' />

                {/* BOTON PARA MOSTRAR O OCULTAR BOTON */}
                <Button
                    variant="primary"
                    onClick={() => mostrarFormularioNotas()}
                    className="w-100"
                    disabled={!state.formulario.id_documento}
                >
                    {!state.mostrarFormulario ? (
                        <>Mostrar Formulario</>
                    ) : (
                        <>Ocultar Formulario</>
                    )}
                </Button>

                {/* FORMULARIO DE NOTAS */}
                <Collapse in={state.mostrarFormulario} >
                    <Card className="mt-2">
                        <Card.Body >
                            <Form noValidate onSubmit={enviar}>

                                <Row>
                                    <Form.Group as={Col} md="6" controlId="id_nota">
                                        <Form.Label># Nota</Form.Label>
                                        <Form.Control
                                            type="text"
                                            defaultValue={id_nota || ''}
                                            disabled
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} md="6" controlId="fecha_creado">
                                        <Form.Label>Fecha</Form.Label>
                                        <Form.Control
                                            type="datetime"
                                            defaultValue={formateadorDeFechas(fecha_creado) || ''}
                                            disabled
                                        />
                                    </Form.Group>
                                </Row>

                                <Row >
                                    <Form.Group as={Col} md="6" controlId="id_documento">
                                        <Form.Label>ID Documento</Form.Label>
                                        <Form.Control
                                            type="text"
                                            defaultValue={id_documento || ''}
                                            disabled
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} md="6" controlId="no_documento">
                                        <Form.Label># Documento</Form.Label>
                                        <Form.Control
                                            type="text"
                                            defaultValue={no_documento || ''}
                                            disabled
                                        />
                                    </Form.Group>
                                </Row>

                                <Row>
                                    <Form.Group as={Col} md="12" controlId="creado_por" hidden>
                                        <Form.Label>Usuario Origen</Form.Label>
                                        <Form.Control
                                            type="text"
                                            defaultValue={creado_por || ''}
                                            disabled
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} md="12" controlId="usuario_destino" hidden>
                                        <Form.Label>Usuario Destino</Form.Label>
                                        <Form.Select
                                            value={usuario_destino || ''}
                                            onChange={(e) => actualizarFormulario(e)}
                                            // isValid={usuario_destino}
                                            // isInvalid={!usuario_destino || usuario_destino === ''}
                                        // required
                                        >
                                            <option value={''}>Por favor seleccione...</option>
                                            {
                                                state.usuarios.map((usuario, index) => (
                                                    <option key={index} value={usuario.correo_electronico}>
                                                        {usuario.nombre_completo}
                                                    </option>
                                                ))
                                            }
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            Campo requerido
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="usuario_destino1" md="12">
                                        <Form.Label>Usuario Destino</Form.Label>
                                        <div>
                                            <Select
                                                styles={estilosSelect}
                                                value={opcionesNotas.find(usuario => usuario.value === usuario_destino) || ''}
                                                onChange={(e) => obtenerCambiosDelSelectModificado('usuario_destino', e)}
                                                options={opcionesNotas}
                                                isSearchable={true}
                                                isClearable={true}
                                                isInvalid={!usuario_destino}
                                                isDisabled={bloquearAccionesYCampos}
                                                className={'form-control ' + !usuario_destino ? 'is-invalid' : 'is-valid'}
                                                placeholder="Por favor seleccione..."
                                            />
                                            {!usuario_destino && (<div className="invalid-feedback">Campo requerido</div>)}
                                        </div>
                                    </Form.Group>
                                </Row>

                                <Row>
                                    <Form.Group as={Col} md="12" controlId="descripcion">
                                        <Form.Label>Nota</Form.Label>
                                        <Form.Control
                                            type="text"
                                            as="textarea"
                                            value={descripcion || ''}
                                            rows={2}
                                            onChange={(e) => actualizarFormulario(e)}
                                            isInvalid={!descripcion && descripcion === ''}
                                            required
                                            disabled={bloquearAccionesYCampos}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Campo requerido
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col} md="12" controlId="tipo_documento" hidden>
                                        <Form.Label>Módulo</Form.Label>
                                        <Form.Control
                                            type="text"
                                            defaultValue={tipo_documento || ''}
                                            disabled
                                        />
                                    </Form.Group>
                                </Row>

                                <Row>
                                    <Col md={12}>
                                        <div className="d-flex justify-content-between mt-4">
                                            <Button
                                                variant="primary"
                                                type='submit'
                                                disabled={bloquearAccionesYCampos}
                                            >
                                                <Icon.Floppy2Fill /> {' '} Guardar
                                            </Button>
                                            <Button
                                                variant="primary"
                                                onClick={() => limpiar()}
                                                disabled={bloquearAccionesYCampos}
                                            >
                                                <Icon.Ban /> {' '} Cancelar
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>

                            </Form>
                        </Card.Body>
                    </Card>
                </Collapse>

                {/* LISTADO DE NOTAS */}
                {
                    notasFiltradas.length > 0 ? (
                        <div
                            className="d-flex flex-wrap my-2"
                            style={{ position: 'sticky', overflowY: 'scroll', maxHeight: 800 }}
                        >
                            {
                                notasFiltradas.map((nota) => (
                                    <Card key={nota.id_nota} className="w-100 mt-2" onClick={() => llenarFormulario(nota)} style={{ cursor: 'pointer' }}>
                                        <Card.Body>
                                            <Card.Title>#{nota.id_nota} → {formateadorDeFechaYHoraEspanol(nota.fecha_creado)}</Card.Title>
                                            <Card.Subtitle className="text-muted my-2">
                                                <p style={{ fontSize: 12 }}><b>De</b> {nota.creado_por} {nota.usuario_destino && (<span><b>A</b>{' '}{nota.usuario_destino.toLowerCase()}</span>)}</p>
                                                <p style={{ fontSize: 12 }}>Tipo documento: {nota.tipo_documento}</p>
                                                <p style={{ fontSize: 12 }}>Documento: {nota.no_documento}</p>
                                            </Card.Subtitle>
                                            <Card.Text>
                                                <Form.Control
                                                    type="text"
                                                    as="textarea"
                                                    value={nota.descripcion}
                                                    disabled
                                                    rows={2}
                                                />
                                            </Card.Text>
                                            <Row>
                                                <Col md={12}>
                                                    <Button
                                                        variant="primary"
                                                        onClick={(e) => eliminarNota(e, nota.id_nota)}
                                                        className="w-100"
                                                        disabled={bloquearBotonEliminar(nota.creado_por)}
                                                    >
                                                        <Icon.Ban />{' '}Eliminar
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                ))
                            }
                        </div>
                    ) : (
                        <Card className="w-100 mt-1">
                            <Card.Body>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                                    <Icon.JournalBookmark size={25} />
                                    <h5 style={{ marginLeft: 3, marginTop: 5 }}>No hay notas que mostrar</h5> {/* Añadí un pequeño margen a la izquierda del texto */}
                                </div>
                            </Card.Body>
                        </Card>
                    )
                }
            </Offcanvas.Body>
        </Offcanvas >
    );
};