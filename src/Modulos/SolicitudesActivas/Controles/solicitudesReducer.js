import { EstadoInicialSolicitudes } from "../Modelos/EstadoInicialSolicitudes";

export const solicitudesReducer = (state = EstadoInicialSolicitudes, action) => {

    console.log('solicitudesReducer', action)

    //ACCIONES DEL FORMULARIO 
    if (action.type === 'actualizarFormulario') {
        const { id, value } = action.payload
        return { ...state, formulario: { [id]: value } }
    }

    if (action.type === 'limpiarFormulario') {
        return { ...state, formulario: { ...EstadoInicialSolicitudes.formulario } }
    }

    if (action.type === 'validarFormulario') {
        return { ...state, validadoFormulario: action.payload.validadoFormulario }
    }

    if (action.type === 'llenarLineas') {
        return { ...state, lineas: action.payload.lineas }
    }

    if (action.type === 'listadoProductos') {
        return { ...state, listadoProductos: action.payload.listadoProductos }
    }

    // ACCIONES DE LA PANTALLA PRINCIPAL
    if (action.type === 'llenarSolicitudes') {
        return { ...state, lineas: action.payload.solicitudes }
    }

    //ACCIONES DE LOS MODALES
    if (action.type === 'mostrarModalAgregarSolicitud') {
        return { ...state, modalAgregarSolcitudes: action.payload.mostrar }
    }

    if (action.type === 'mostrarModalAgregarProductos') {
        return { ...state, modalAgregarProductos: action.payload.mostrar }
    }

    return state;
}