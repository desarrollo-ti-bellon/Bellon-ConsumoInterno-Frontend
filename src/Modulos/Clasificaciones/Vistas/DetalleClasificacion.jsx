import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import AGGridTabla from '../../../ComponentesGlobales/AGGridTabla';
import { useAlerta } from '../../../ControlesGlobales/Alertas/useAlerta';
import { useModalAlerta } from '../../../ControlesGlobales/ModalAlerta/useModalAlerta';
import { useClasificacionFormulario } from '../Controles/useClasificacionFormulario';
import { pagination, paginationPageSize, paginationPageSizeSelector, rowSelection } from '../Modelos/EstadoInicialClasificacionFormulario';

export default function DetalleClasificacion() {

    const { state, dispatch } = useClasificacionFormulario();
    const { dispatch: dispatchAlerta } = useAlerta();
    const { dispatch: dispatchModalAlerta } = useModalAlerta();

    const [columnasProductos] = useState([
        { headerName: 'ID', field: "id_clasificacion", flex: 1 },
        { headerName: 'Codigo Clasificacion', field: "codigo_clasificacion", flex: 2 },
        { headerName: 'Descripción', field: "descripcion", flex: 8 },
        { headerName: 'Estado', field: "estado", flex: 1, }
    ]);

    const llenarFormulario = (parametros) => {
        dispatch({ type: 'llenarFormulario', payload: { formulario: parametros.data } })
    }

    return (
        <>
            <AGGridTabla
                colDefs={columnasProductos}
                rowData={state.lineas}
                rowSelection={rowSelection}
                pagination={pagination}
                paginationPageSize={paginationPageSize}
                paginationPageSizeSelector={paginationPageSizeSelector}
                onCellClicked={llenarFormulario}
            />
        </>
    )
}
