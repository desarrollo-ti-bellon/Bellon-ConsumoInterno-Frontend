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
        { headerName: 'Producto ID', field: "id_producto", flex: 1 },
        { headerName: 'Descripcion', field: "descripcion", flex: 4 },
        { headerName: 'Unidad', field: "codigo_unidad_medida", flex: 1 },
        { headerName: 'Precio Unitario', field: "precio_unitario", flex: 1 },
        { headerName: 'Cantidad', field: "cantidad", flex: 1, },
        { headerName: 'Nota', field: "nota", flex: 1 },
    ]);

    return (
        <>
            <AGGridTabla
                colDefs={columnasProductos}
                rowData={state.lineas}
                rowSelection={rowSelection}
                pagination={pagination}
                paginationPageSize={paginationPageSize}
                paginationPageSizeSelector={paginationPageSizeSelector}
            />
        </>
    )
}
