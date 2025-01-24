import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import AGGridTabla from '../../../ComponentesGlobales/AGGridTabla';
import { useUsuarioFormulario } from '../Controles/useUsuarioFormulario';
import { pagination, paginationPageSize, paginationPageSizeSelector, rowSelection } from '../Modelos/EstadoInicialUsuarioFormulario';

export default function DetalleUsuario() {

    const { state, dispatch } = useUsuarioFormulario();

    const { dispatch: dispatchAlerta } = useAlerta();
    const { dispatch: dispatchModalAlerta } = useModalAlerta();

    const [columnasProductos] = useState([
        { headerName: 'Producto ID', field: "id_producto", flex: 1 },
        { headerName: 'Descripcion', field: "descripcion", flex: 4 },
        { headerName: 'Unidad', field: "codigo_unidad_medida", flex: 1 },
        { headerName: 'Precio Unitario', field: "precio_unitario", flex: 1 },
        { headerName: 'Cantidad', field: "cantidad", editable: inactivarCamposEditablesTabla, valueFormatter: (e) => formatoCantidad(e.value), cellStyle: quitarStylosColumnaFooter, flex: 1, },
        { headerName: 'Nota', field: "nota", editable: inactivarCamposEditablesTabla, cellStyle: quitarStylosColumnaFooter, flex: 4 },
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
