import { EstadoInicialSolicitudes } from "../Modelos/EstadoInicialSolicitudes";

export const solicitudesReducer = (state = EstadoInicialSolicitudes, action) => {

    // console.log('solicitudesReducer', action)

    // ACCIONES DE LA PANTALLA PRINCIPAL
    if (action.type === 'llenarSolicitudes') {
        const llenarDatos = [...action.payload.solicitudes].map(solicitud => {
            const clasificacion = state.clasificaciones.find(clasificacion => clasificacion.id_clasificacion === solicitud.id_clasificacion)?.descripcion ?? 'N/A';
            const departamento = state.departamentos.find(departamento => departamento.id_valor_dimension === solicitud.id_departamento)?.nombre ?? 'N/A';
            const sucursal = state.sucursales.find(sucursal => sucursal.id_valor_dimension === solicitud.id_sucursal)?.nombre ?? 'N/A';
            return {
                ...solicitud,
                clasificacion: clasificacion,
                departamento: departamento,
                sucursal: sucursal
            }
        })
        return { ...state, listadoSolicitudes: llenarDatos }
    }

    if (action.type === 'llenarEstadosSolicitudes') {
        return { ...state, comboEstadosSolicitudes: action.payload.estadosSolicitudes }
    }

    if (action.type === 'llenarDatos') {
        return { ...state, [action.payload.propiedad]: action.payload.valor }
    }

    if (action.type === 'actualizarFiltros') {
        const { id, value } = action.payload
        return { ...state, filtros: { ...state.filtros, [id]: value } }
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