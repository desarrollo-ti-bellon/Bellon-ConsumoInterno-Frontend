import { EstadoInicialMovimientosSolicitudes } from "../Modelos/EstadoInicialHistorialMovimientosSolicitudes";

export const historialMovimientosSolicitudesReducer = (state = EstadoInicialMovimientosSolicitudes, action) => {

    if (action.type === 'llenarLineaTiempo') {
        const actulizadoHistorial = action.payload.historialMovimientosSolicitudes.map(linea => {
            const estado = state.estadosSolicitud.find(estado => estado.id_estado_solicitud === linea.id_estado_solicitud);
            return {
                ...linea, // Conservamos todas las propiedades de la línea original
                evento: estado ? estado.descripcion : '' // Asignamos la descripción del estado
            };
        });
        return { ...state, historialMovimientosSolicitudes: actulizadoHistorial }
    }

    if (action.type === 'llenarEstadosSolicitudes') {
        return { ...state, estadosSolicitud: action.payload.estadosSolicitud }
    }

    return state;
}