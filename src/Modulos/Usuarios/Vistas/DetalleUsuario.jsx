import React, { useState } from 'react';
import AGGridTabla from '../../../ComponentesGlobales/AGGridTabla';
import { useUsuarioFormulario } from '../Controles/useUsuarioFormulario';
import { pagination, paginationPageSize, paginationPageSizeSelector, rowSelection } from '../Modelos/EstadoInicialUsuarioFormulario';
import { formatoMoneda } from '../../../FuncionesGlobales';
import { Badge, Button } from 'react-bootstrap';
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

    const BadgedEstadosUsuarios = (parametros) => {
        const estado = parametros.data.estado;
        return (
            estado ? <Badge bg="primary">Activo</Badge> : <Badge bg="primary">Inactivo</Badge>
        )
    }

    const [columnasProductos] = useState([
        { headerName: "ID", field: "id_usuario_ci", filter: true, flex: 1, autoHeaderHeight: true, minWidth: 100 },
        { headerName: "Nombre", field: "nombre_usuario", filter: true, flex: 2, autoHeaderHeight: true, minWidth: 100 },
        { headerName: "Posicion", field: "posicion_descripcion", filter: true, flex: 1, autoHeaderHeight: true, minWidth: 100 },
        { headerName: "Correo", field: "correo", filter: true, flex: 2, autoHeaderHeight: true, minWidth: 100 },
        { headerName: "Sucursal", field: "codigo_sucursal", filter: true, flex: 1, autoHeaderHeight: true, minWidth: 100 },
        { headerName: "Departamento", field: "codigo_departamento", filter: true, flex: 1, autoHeaderHeight: true, minWidth: 100 },
        { headerName: "Limite", field: "limite", valueFormatter: (e) => formatoMoneda(e.value, 0, ''), filter: true, flex: 1, autoHeaderHeight: true, minWidth: 100 },
        { headerName: "Estado", field: "estado", cellRenderer: BadgedEstadosUsuarios, filter: true, flex: 1, autoHeaderHeight: true, minWidth: 100 },
        // { headerName: 'Acciones', field: "Accion", cellRenderer: BotonesAcciones, flex: 1 , autoHeaderHeight: true, minWidth: 100},
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
