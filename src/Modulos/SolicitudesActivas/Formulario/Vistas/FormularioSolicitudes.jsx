import { Button, Col, Form, Row } from "react-bootstrap";
import { useFormulario } from "../Controles/useFormulario";

export default function FormularioSolicitudes() {

    const { state, dispatch } = useFormulario();
    const { id_solicitud, fecha_creado, comentario, creado_por, modificado_por, fecha_modificado, total, usuario_aprobador, id_departamento, usuario_despachador, usuario_asistente_control, usuario_asistente_contabilidad, estado_solicitud } = state.formulario

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
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="id_solicitud">
                        <Form.Label>ID Solicitud</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="ID Solicitud"
                            name="id_solicitud"
                            value={id_solicitud || ''}
                            onChange={actualizarFormulario}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            El ID de solicitud es obligatorio.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="fecha_creado">
                        <Form.Label>Fecha Creado</Form.Label>
                        <Form.Control
                            type="date"
                            name="fecha_creado"
                            value={fecha_creado}
                            onChange={actualizarFormulario}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            La fecha de creación es obligatoria.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="creado_por">
                        <Form.Label>Creado Por</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Creado Por"
                            name="creado_por"
                            value={creado_por}
                            onChange={actualizarFormulario}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            El campo "Creado Por" es obligatorio.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <Row hidden className="mb-3">

                    <Form.Group as={Col} md="4" controlId="modificado_por">
                        <Form.Label>Modificado Por</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Modificado Por"
                            name="modificado_por"
                            value={modificado_por}
                            onChange={actualizarFormulario}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            El campo "Modificado Por" es obligatorio.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="fecha_modificado">
                        <Form.Label>Fecha Modificado</Form.Label>
                        <Form.Control
                            type="date"
                            name="fecha_modificado"
                            value={fecha_modificado}
                            onChange={actualizarFormulario}
                        />
                        <Form.Control.Feedback type="invalid">
                            La fecha de modificación es obligatoria.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="total">
                        <Form.Label>Total</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Total"
                            name="total"
                            value={total}
                            onChange={actualizarFormulario}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            El campo "Total" es obligatorio.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="usuario_aprobador">
                        <Form.Label>Usuario Aprobador</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Usuario Aprobador"
                            name="usuario_aprobador"
                            value={usuario_aprobador}
                            onChange={actualizarFormulario}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            El usuario aprobador es obligatorio.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="id_departamento">
                        <Form.Label>ID Departamento</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="ID Departamento"
                            name="id_departamento"
                            value={id_departamento}
                            onChange={actualizarFormulario}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            El ID del departamento es obligatorio.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="usuario_despachador">
                        <Form.Label>Usuario Despachador</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Usuario Despachador"
                            name="usuario_despachador"
                            value={usuario_despachador}
                            onChange={actualizarFormulario}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            El usuario despachador es obligatorio.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="usuario_asistente_control">
                        <Form.Label>Usuario Asistente Control</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Usuario Asistente Control"
                            name="usuario_asistente_control"
                            value={usuario_asistente_control}
                            onChange={actualizarFormulario}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            El usuario asistente control es obligatorio.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="usuario_asistente_contabilidad">
                        <Form.Label>Usuario Asistente Contabilidad</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Usuario Asistente Contabilidad"
                            name="usuario_asistente_contabilidad"
                            value={usuario_asistente_contabilidad}
                            onChange={actualizarFormulario}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            El usuario asistente contabilidad es obligatorio.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="estado_solicitud">
                        <Form.Label>Estado Solicitud</Form.Label>
                        <Form.Control
                            as="select"
                            name="estado_solicitud"
                            value={estado_solicitud}
                            onChange={actualizarFormulario}
                            required
                        >
                            <option value={0}>Pendiente</option>
                            <option value={1}>Aprobada</option>
                            <option value={2}>Rechazada</option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            El estado de la solicitud es obligatorio.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="comentario">
                        <Form.Label>Comentario</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Comentario"
                            name="comentario"
                            value={comentario}
                            onChange={actualizarFormulario}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            El comentario es obligatorio.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <Button hidden variant="primary" type="submit">
                    Enviar
                </Button>
            </Form>
        </>
    )
}
