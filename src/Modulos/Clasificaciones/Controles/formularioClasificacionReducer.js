import { EstadoInicialClasificacionFormulario } from "../Modelos/EstadoInicialClasificacionFormulario"

export const formularioClasificacionReducer = (state = EstadoInicialClasificacionFormulario, action) => {

    console.log('solicitudesReducer', action)

    //ACCIONES DEL FORMULARIO 
    if (action.type === 'actualizarFormulario') {
        const { id, value } = action.payload
        return { ...state, formulario: { ...state.formulario, [id]: value } }
    }

    if (action.type === 'limpiarFormulario') {
        return { ...state, formulario: { ...EstadoInicialFormulario.formulario } }
    }

    if (action.type === 'limpiarProductosSeleccionados') {
        return { ...state, productosSeleccionados: [] }
    }

    if (action.type === 'validarFormulario') {
        return { ...state, validadoFormulario: action.payload.validadoFormulario }
    }

    if (action.type === 'llenarFormulario') {
        return { ...state, formulario: action.payload.formulario }
    }

    if (action.type === 'llenarLineas') {
        return { ...state, lineas: action.payload.lineas }
    }

    if (action.type === 'actualizarCampoEnLineaSolicitud') {
        const lineaId = action.payload.id;
        const lineaActualizada = action.payload.linea;
        const campoActualizado = action.payload.cantidad;
        const lineas = state.lineas.map(linea => {
            if (linea.id_linea_solicitud === lineaId) {
                return { ...lineaActualizada, cantidad: campoActualizado };
            }
            return linea;
        })
        return { ...state, lineas: lineas }
    }

    if (action.type === 'llenarProductosSeleccionados') {
        return { ...state, productosSeleccionados: action.payload.productosSeleccionados }
    }

    if (action.type === 'inactivarCampos') {
        return { ...state, inactivarCampos: action.payload.campos }
    }

    //ACCIONES DE LOS MODALES
    if (action.type === 'mostrarModalAgregarSolicitud') {
        return { ...state, modalAgregarSolcitudes: action.payload.mostrar }
    }

    if (action.type === 'mostrarModalAgregarProductos') {
        return { ...state, modalAgregarProductos: action.payload.mostrar }
    }

    if (action.type === 'llenarProductos') {
        return { ...state, listadoProductos: action.payload.productos }
    }

    if (action.type === 'llenarEstadosSolicitudes') {
        return { ...state, comboEstadoSolicitudes: action.payload.estadosSolicitudes }
    }

    return state;
}