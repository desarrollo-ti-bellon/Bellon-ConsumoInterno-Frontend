import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Button, Col, Container, Form, InputGroup, Modal, Row } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import AGGridTabla from '../../../../ComponentesGlobales/AGGridTabla';
import { formatoMoneda } from '../../../../FuncionesGlobales';
import { useFormulario } from '../Controles/useFormulario';

export default function ModalProductos() {

    const { state, dispatch, pasarLineasDelModalAlDetalle } = useFormulario()
    const AgGridReferencia = useRef(null);

    useEffect(() => {
        if (!state.modalAgregarProductos) {
            return;
        }
    }, [state.modalAgregarProductos])

    const cerrarModal = () => {
        dispatch({ type: 'mostrarModalAgregarProductos', payload: { mostrar: false } })
    }

    const obtenerReferenciaAgGrid = (ref) => {
        AgGridReferencia.current = ref.current; // Save the reference
    }

    const filtrarListado = (filtro) => {
        AgGridReferencia.current.api.setGridOption(
            "quickFilterText",
            filtro,
        )
    }

    const [columnasListadoProductos] = useState([
        { headerName: "Producto", field: "no", flex: 1, filter: true },
        { headerName: "Descripcion", field: "descripcion", flex: 5, filter: true },
        { headerName: "Unidad", field: "codigo_unidad_medida", flex: 2, filter: true },
        { headerName: "Cant. Existencia", field: "cantidad", valueFormatter: (e) => formatoMoneda(e.value, 0, ''), flex: 2, filter: true },
        { headerName: "Precio Unitario", field: "precio_unitario", valueFormatter: (e) => formatoMoneda(e.value, 1, '$'), flex: 2, filter: true }
    ]);

    const seleccionarMultiplesProductos = (event) => {
        const listado = event.api.getSelectedRows();
        dispatch({ type: 'llenarProductosSeleccionados', payload: { productosSeleccionados: listado } })
    };

    const rowSelection = useMemo(() => {
        return {
            mode: 'multiRow'
        };
    }, []);

    return (
        <Modal
            show={state.modalAgregarProductos}
            onHide={cerrarModal}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >

            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Productos
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Container fluid>
                    <Row>
                        <Col lg="6" >
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1"><Icon.Search /></InputGroup.Text>
                                <Form.Control
                                    type='text'
                                    placeholder="Buscar productos..."
                                    onChange={(e) => filtrarListado(e.target.value)}
                                />
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <AGGridTabla
                                obtenerReferenciaAgGrid={obtenerReferenciaAgGrid}
                                colDefs={columnasListadoProductos}
                                rowData={state.listadoProductos}
                                rowSelection={rowSelection}
                                // pagination={pagination}
                                // paginationPageSize={paginationPageSize}
                                // paginationPageSizeSelector={paginationPageSizeSelector}
                                onSelectionChanged={seleccionarMultiplesProductos}
                            />
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Row>
                    <Col>
                        <Button variant="primary" title="Agregar productos seleccionados" onClick={() => pasarLineasDelModalAlDetalle()}> Agregar </Button>
                    </Col>
                </Row>
            </Modal.Footer>

        </Modal>
    )
}
