import { EstadoInicialClasificacionFormulario } from "../Modelos/EstadoInicialClasificacionFormulario"

export const formularioClasificacionReducer = (state = EstadoInicialClasificacionFormulario, action) => {

    if (action.type === 'actualizarFormulario') {
        const { id, value } = action.payload
        if (id === 'codigo_clasificacion') {
            const clasificacion = state.comboClasificaciones.find(clasificacion => clasificacion.codigo === value);
            return { ...state, formulario: { ...state.formulario, [id]: value, ['id_grupo_cont_producto_general']: clasificacion.id_grupo_cont_producto_general ?? null } }
        }
        return { ...state, formulario: { ...state.formulario, [id]: value } }
    }

    if (action.type === 'limpiarFormulario') {
        return { ...state, formulario: { ...EstadoInicialClasificacionFormulario.formulario } }
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

    if (action.type === 'llenarClasificaciones') {
        return { ...state, comboClasificaciones: action.payload.clasificaciones }
    }

    if (action.type === 'inactivarCampos') {
        return { ...state, inactivarCampos: action.payload.campos }
    }

    return state;
}