import { EstadoInicialMovimientosSolicitudes } from "../Modelos/EstadoInicialHistorialMovimientosSolicitudes";

export const historialMovimientosSolicitudesReducer = (state = EstadoInicialMovimientosSolicitudes, action) => {

    if (action.type === 'llenarLineaTiempo') {
        const actulizadoHistorial = [...action.payload.historialMovimientosSolicitudes].map(linea => {
            const clasificacion = state.clasificaciones.find(clasificacion => clasificacion.id_clasificacion === linea.id_clasificacion)?.descripcion ?? 'N/A';
            const departamento = state.departamentos.find(departamento => departamento.id_valor_dimension === linea.id_departamento)?.nombre ?? 'N/A';
            const sucursal = state.sucursales.find(sucursal => sucursal.id_valor_dimension === linea.id_sucursal)?.nombre ?? 'N/A';
            const estado = state.estadosSolicitudes.find(estado => estado.id_estado_solicitud === linea.id_estado_solicitud);
            return {
                ...linea,
                clasificacion: clasificacion,
                departamento: departamento,
                sucursal: sucursal,
                estado_solicitud_descripcion: estado ? estado.descripcion : '' // Asignamos la descripción del estado
            }
        })
        return { ...state, historialMovimientosSolicitudes: actulizadoHistorial }
    }

    if (action.type === 'llenarDatos') {
        return { ...state, [action.payload.propiedad]: action.payload.valor }
    }

    return state;
}