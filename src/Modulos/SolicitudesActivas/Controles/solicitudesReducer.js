import { EstadoInicialSolicitudes } from "../Modelos/EstadoInicialSolicitudes";

export const solicitudesReducer = (state = EstadoInicialSolicitudes, action) => {

    // console.log('solicitudesReducer', action)

    // ACCIONES DE LA PANTALLA PRINCIPAL
    if (action.type === 'llenarSolicitudes') {
        return { ...state, listadoSolicitudes: action.payload.solicitudes }
    }

    if (action.type === 'llenarEstadosSolicitudes') {
        return { ...state, comboEstadosSolicitudes: action.payload.estadosSolicitudes }
    }

    if (action.type === 'combinarEstadosSolicitudes') {
        const listadoSolicitudesActualizado = state.listadoSolicitudes.map(el => {
            const descripcionEstadoSolicitud = state.comboEstadosSolicitudes.find(estadoSolicitud => estadoSolicitud.id_estado_solicitud === el.id_estado_solicitud)?.descripcion ?? 'N/A';
            return { ...el, estado_solicitud_descripcion: descripcionEstadoSolicitud };
        });
        return { ...state, listadoSolicitudes: listadoSolicitudesActualizado }
    }

    //ACCIONES DE LOS MODALES
    if (action.type === 'mostrarModalAgregarSolicitud') {
        return { ...state, modalAgregarSolicitudes: action.payload.mostrar }
    }

    return state;
}