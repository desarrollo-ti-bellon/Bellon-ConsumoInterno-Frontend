import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import AGGridTabla from '../../../../ComponentesGlobales/AGGridTabla';
import { useFormulario } from '../Controles/useFormulario';
import { pagination, paginationPageSize, paginationPageSizeSelector, rowSelection } from '../Modelos/EstadoInicialFormulario';
import { formatoCantidad } from '../../../../FuncionesGlobales';
import { useAlerta } from '../../../../ControlesGlobales/Alertas/useAlerta';
import { useModalAlerta } from '../../../../ControlesGlobales/ModalAlerta/useModalAlerta';

export default function DetalleSolicitudes() {

    const { state, dispatch, guardarLineas } = useFormulario();
    const { dispatch: dispatchAlerta } = useAlerta();
    const { dispatch: dispatchModalAlerta } = useModalAlerta();
    const gridRef = useRef(null);

    const nuevaSolicitud = !state.formulario.id_cabecera_solicitud;
    const inactivarCamposEditablesTabla = nuevaSolicitud;

    const campoEdicionEstilos = !inactivarCamposEditablesTabla ? {} : {
        backgroundColor: "#f2f2f2",
        padding: 0,
        border: "1px solid #bebebe",
        borderRadius: "5px",
        cursor: "pointer"
    };

    const quitarStylosColumnaFooter = (params) => {
        return !params.node.rowPinned ? campoEdicionEstilos : null;
    };

    const obtenerReferenciaAgGrid = (ref) => {
        gridRef.current = ref.current;
    };

    const [columnasProductos] = useState([
        { headerName: 'Producto ID', field: "id_producto", flex: 1 },
        { headerName: 'Descripcion', field: "descripcion", flex: 4 },
        { headerName: 'Unidad', field: "codigo_unidad_medida", flex: 1 },
        { headerName: 'Precio Unitario', field: "precio_unitario", flex: 1 },
        { headerName: 'Cantidad', field: "cantidad", editable: inactivarCamposEditablesTabla, valueFormatter: (e) => formatoCantidad(e.value), cellStyle: quitarStylosColumnaFooter, flex: 1, },
        { headerName: 'Nota', field: "nota", editable: inactivarCamposEditablesTabla, cellStyle: quitarStylosColumnaFooter, flex: 4 },
    ]);

    const mostrarAgregarProductos = () => {
        dispatch({ type: 'mostrarModalAgregarProductos', payload: { mostrar: true } })
    }

    const obtenerEventoFueraTabla = useCallback((event) => {
        if (gridRef.current) {
            gridRef.current.api.stopEditing();
        }
    }, []);

    useEffect(() => {
        document.addEventListener("click", obtenerEventoFueraTabla);
        return () => document.removeEventListener("click", obtenerEventoFueraTabla);
    }, [obtenerEventoFueraTabla]);

    const cambioElValorEnLaTabla = (params) => {

        console.log("Celda actualizada:", params.data);
        const { colDef, newValue, oldValue } = params;
        let error = false;
        if (newValue !== oldValue) {
            if (colDef.field === "cantidad") {

                if (isNaN(newValue) || newValue <= 0) {
                    dispatchAlerta({ type: "mostrarAlerta", payload: { tipo: "danger", mensaje: "La cantidad debe ser un número positivo.", mostrar: true, } });
                    dispatch({ type: "actualizarCampoEnLineaSolicitud", payload: { linea: params.data, id: params.data.id_linea_llegada, [colDef.field]: oldValue, }, });
                    error = true;
                }

                if (!isNaN(newValue) && newValue <= 0) {
                    dispatchAlerta({
                        type: "mostrarAlerta",
                        payload: {
                            tipo: "danger",
                            mensaje: "La cantidad debe ser mayor a 0.",
                            mostrar: true,
                        },
                    });
                    dispatch({
                        type: "actualizarCampoEnLineaSolicitud",
                        payload: {
                            linea: params.data,
                            id: params.data.id_linea_solicitud,
                            [colDef.field]: oldValue,
                        },
                    });
                    error = true;
                }

            }
            if (!error) {
                guardarLineas(state.lineas);
            }
        }
    }

    return (
        <>
            <Row>
                <Col>
                    <div style={{ float: 'right', marginBottom: 5 }}>
                        <Button disabled={nuevaSolicitud} size='md' variant='primary' onClick={() => mostrarAgregarProductos()}><Icon.Plus />Agregar Productos</Button>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <AGGridTabla
                        obtenerReferenciaAgGrid={obtenerReferenciaAgGrid}
                        colDefs={columnasProductos}
                        rowData={state.lineas}
                        rowSelection={rowSelection}
                        pagination={pagination}
                        paginationPageSize={paginationPageSize}
                        paginationPageSizeSelector={paginationPageSizeSelector}
                        onCellValueChanged={cambioElValorEnLaTabla}
                    />
                </Col>
            </Row>
        </>
    )
}
