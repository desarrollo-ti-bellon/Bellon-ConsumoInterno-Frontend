import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { useCallback, useEffect, useRef, useState } from 'react';
import { ListGroup } from "react-bootstrap";
import '../ComponentesEstilos/ListadoGrupoDelPopup.css'
import { useAlerta } from "../ControlesGlobales/Alertas/useAlerta";

export default function AGGridTabla({ obtenerReferenciaAgGrid, colDefs, rowData, rowSelection, pagination, paginationPageSize, paginationPageSizeSelector, onCellClicked, onSelectionChanged, onCellValueChanged, altura = 500, datosPieTabla, rowValueChanged, cellEditingStarted, cellEditingStopped, onColumnMoved, onCellDoubleClicked }) {

    const referenciaAgGrid = useRef(null);
    const divReferencia = useRef(null);
    const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
    const [popupVisible, setPopupVisible] = useState(false);
    const { dispatch: dispatchAlerta } = useAlerta()
    const [valorSeleccionado, setValorSeleccionado] = useState(null);
    // const [fila, setFila] = useState(null);

    useEffect(() => {
        if (obtenerReferenciaAgGrid) {
            obtenerReferenciaAgGrid(referenciaAgGrid);
        }
    }, [obtenerReferenciaAgGrid]);

    const manejarClicDerecho = (event) => {
        event.preventDefault();
        const { x, y } = event
        if (divReferencia.current) {
            const posX = x + window.scrollX;
            const posY = y + window.scrollY - 90;
            setPopupPosition({ x: posX + 10, y: posY + 10 });
            setPopupVisible(true);
        }
    };

    const manejarScroll = () => {
        setPopupVisible(false);
    };

    useEffect(() => {
        const divElement = divReferencia.current;
        if (divElement) {
            divElement.addEventListener('contextmenu', manejarClicDerecho);
        }
        window.addEventListener('scroll', manejarScroll);
        return () => {
            if (divElement) {
                divElement.removeEventListener('contextmenu', manejarClicDerecho);
            }
            window.removeEventListener('scroll', manejarScroll);
        };
    }, [divReferencia.current]);

    const celdaSeleccionada = (parametros) => {
        // setFila(parametros.data);
        setValorSeleccionado(parametros.value); // Guardar los datos de la celda seleccionada
    };

    const opcionesFiltros = {
        enableRangeSelection: true, // Permitir la selección de rangos
        suppressCopyRowsToClipboard: false, // Permitir copiar filas completas
        localeText: {
            applyFilter: "Aplicar",
            clearFilter: "Limpiar",
            resetFilter: "Restablecer",
            cancelFilter: "Cancelar",
            textFilter: "Filtro de texto",
            numberFilter: "Filtro numérico",
            dateFilter: "Filtro de fecha",
            setFilter: "Establecer filtro",
            filterOoo: "Filtrar...",
            empty: "Elige uno",
            equals: "Es igual a",
            notEqual: "No es igual a",
            lessThan: "Menor que",
            greaterThan: "Mayor que",
            inRange: "Entre",
            inRangeStart: "Desde",
            inRangeEnd: "Hasta",
            lessThanOrEqual: "Menor o igual que",
            greaterThanOrEqual: "Mayor o igual que",
            contains: "Contiene",
            notContains: "No contiene",
            startsWith: "Comienza con",
            endsWith: "Termina con",
            blank: "En blanco",
            notBlank: "No en blanco",
            before: "Antes",
            after: "Después",
            andCondition: "Y",
            orCondition: "O",
            dateFormatOoo: "aaaa-mm-dd",
            pageSizeSelectorLabel: "Filas por página",
            page: "Página",
            to: "Desde",
            of: "Hasta",
            loadingMessage: "Cargando...",
            noRowsMessage: "No hay datos para mostrar",
            noRowsShowMessage: "No hay datos para mostrar", //
            filterRowLabel: "Fila de filtro",
            noRowsToShow: 'No hay filas para mostrar'
        },
    }

    const exportarCSV = () => {
        referenciaAgGrid.current.api.exportDataAsCsv();
        setPopupVisible(false);
    };

    const copiarAlPortaPapeles = () => {
        if (valorSeleccionado) {
            const celdaSeleccionada = valorSeleccionado;
            navigator.clipboard.writeText(celdaSeleccionada).then(() => {
                dispatchAlerta({ type: 'mostrarAlerta', payload: { mensaje: '¡Datos copiados al portapapeles!', tipo: 'success', mostrar: true } });
            }).catch(err => {
                dispatchAlerta({ type: 'mostrarAlerta', payload: { mensaje: 'Error al copiar: ' + err, tipo: 'danger', mostrar: true } });
            });
            setValorSeleccionado(null);
        }
        setPopupVisible(false);
    };

    const estiloPiePagina = (params) => {
        // console.log('estiloPiePagina', params)
        if (params.node.rowPinned) {
            return {
                "font-weight": "bold",
                "pointer-events": "none",
                "border": "0px solid transparent",
                "backgroundColor": "#fafafb"
            }
        }
        return null;
    };

    const obtenerEventoFueraTabla = useCallback((event) => {
        if (referenciaAgGrid.current) {
            setPopupVisible(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener("click", obtenerEventoFueraTabla);
        return () => document.removeEventListener("click", obtenerEventoFueraTabla);
    }, [obtenerEventoFueraTabla]);

    return (
        <div>
            <div
                ref={divReferencia}
                className="ag-theme-quartz custom-ag-theme"
                style={{ height: altura }}
                id={`ag-grid-${Math.floor(Math.random() + 100)}`}
            >
                <AgGridReact
                    gridOptions={opcionesFiltros}
                    ref={referenciaAgGrid}
                    rowData={rowData}
                    columnDefs={colDefs}
                    rowSelection={rowSelection}
                    pagination={pagination}
                    paginationPageSize={paginationPageSize}
                    paginationPageSizeSelector={paginationPageSizeSelector}
                    onCellClicked={onCellClicked}
                    onSelectionChanged={onSelectionChanged}
                    onCellValueChanged={onCellValueChanged}
                    pinnedBottomRowData={datosPieTabla}
                    getRowStyle={estiloPiePagina}
                    rowValueChanged={rowValueChanged}
                    cellEditingStarted={cellEditingStarted}
                    cellEditingStopped={cellEditingStopped}
                    animateRows={true}
                    onColumnMoved={onColumnMoved}
                    onCellContextMenu={celdaSeleccionada}
                    onCellDoubleClicked={onCellDoubleClicked}
                />
                {/* Popup contextual con opciones */}
                {popupVisible && valorSeleccionado && (
                    <div
                        style={{
                            position: 'absolute',
                            top: popupPosition.y,
                            left: popupPosition.x,
                            backgroundColor: 'white',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            zIndex: 1000,
                            borderRadius: '4px',
                            width: '200px',
                        }}
                    >
                        <ListGroup>
                            <ListGroup.Item className="list-group-bellon-item-hover" onClick={copiarAlPortaPapeles}>Copiar</ListGroup.Item>
                            <ListGroup.Item className="list-group-bellon-item-hover" onClick={exportarCSV}>Exportar CSV </ListGroup.Item>
                            {/* <ListGroup.Item className="list-group-bellon-item-hover" onClick={() => verDocumento(valorSeleccionado, fila)}>Ver Documento </ListGroup.Item> */}
                            {/* <ListGroup.Item className="list-group-bellon-item-hover" onClick={() => setPopupVisible(false)}> Ocultar </ListGroup.Item> */}
                        </ListGroup>
                    </div>
                )}
            </div >
        </div>
    )
}
