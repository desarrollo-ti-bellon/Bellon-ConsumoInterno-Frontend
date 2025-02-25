import React, { useState } from 'react';
import AGGridTabla from '../../../ComponentesGlobales/AGGridTabla';
import { useUsuarioFormulario } from '../Controles/useUsuarioFormulario';
import { pagination, paginationPageSize, paginationPageSizeSelector, rowSelection } from '../Modelos/EstadoInicialUsuarioFormulario';
import { formatoMoneda } from '../../../FuncionesGlobales';
import { Button } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons'

export default function DetalleUsuario() {

    const { state, dispatch, eliminaLinea } = useUsuarioFormulario();

    const BotonesAcciones = (parametros) => {
        const linea = parametros.data;
        return (
            <>
                {!linea.acciones && (<Button title="Eliminar usuario" size='sm' variant='outline-primary' style={{ marginLeft: 5 }} onClick={() => eliminaLinea(linea.id_usuario_ci)}> <Icon.Trash /> </Button>)}
            </>
        )
    }

    const [columnasProductos] = useState([
        { headerName: "ID", field: "id_usuario_ci", flex: 1 },
        { headerName: "Nombre", field: "nombre_usuario", flex: 2 },
        { headerName: "Posicion", field: "posicion_descripcion", flex: 1 },
        { headerName: "Correo", field: "correo", flex: 2 },
        { headerName: "Sucursal", field: "codigo_sucursal", flex: 1 },
        { headerName: "Departamento", field: "codigo_departamento", flex: 1 },
        { headerName: "Limite", field: "limite", valueFormatter: (e) => formatoMoneda(e.value, 0, '$'), flex: 1 },
        { headerName: "Estado", field: "estado", flex: 1 },
        // { headerName: 'Acciones', field: "Accion", cellRenderer: BotonesAcciones, flex: 1 },
    ]);

    const llenarFormulario = (parametros) => {
        dispatch({ type: 'llenarFormulario', payload: { formulario: parametros.data } });
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
