import React, { useState } from 'react';
import { Badge, Button } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import AGGridTabla from '../../../ComponentesGlobales/AGGridTabla';
import { useAlerta } from '../../../ControlesGlobales/Alertas/useAlerta';
import { useModalAlerta } from '../../../ControlesGlobales/ModalAlerta/useModalAlerta';
import { useClasificacionFormulario } from '../Controles/useClasificacionFormulario';
import { pagination, paginationPageSize, paginationPageSizeSelector, rowSelection } from '../Modelos/EstadoInicialClasificacionFormulario';

export default function DetalleClasificacion() {

    const { state, dispatch, eliminaLinea } = useClasificacionFormulario();
    const { dispatch: dispatchAlerta } = useAlerta();
    const { dispatch: dispatchModalAlerta } = useModalAlerta();

    const BotonesAcciones = (parametros) => {
        const linea = parametros.data;
        return (
            <>
                {!linea.acciones && (<Button title="Eliminar clasificacion" size='sm' variant='outline-primary' style={{ marginLeft: 5 }} onClick={() => eliminaLinea(linea.id_clasificacion)}> <Icon.Trash /> </Button>)}
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
        { headerName: 'ID', field: "id_clasificacion", flex: 1 },
        { headerName: 'Codigo Clasificacion', field: "codigo_clasificacion", flex: 2 },
        { headerName: 'Descripción', field: "descripcion", flex: 8 },
        { headerName: 'Estado', field: "estado", cellRenderer: BadgedEstadosUsuarios, flex: 1, },
        // { headerName: 'Acciones', field: "Accion", cellRenderer: BotonesAcciones, flex: 1 },
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
