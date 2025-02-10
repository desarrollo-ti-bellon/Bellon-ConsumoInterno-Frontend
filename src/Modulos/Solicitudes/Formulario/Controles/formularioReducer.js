import { EstadoInicialFormulario } from "../Modelos/EstadoInicialFormulario"

export const formularioReducer = (state = EstadoInicialFormulario, action) => {

    console.log(action)

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

    if (action.type === 'camposRequeridos') {
        return { ...state, camposRequeridos: action.payload.campos }
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

    if (action.type === 'llenarComboEstadosSolicitudes') {
        return { ...state, comboEstadoSolicitudes: action.payload.estadosSolicitudes }
    }

    if (action.type === 'llenarComboDepartamentos') {
        return { ...state, comboDepartamentos: action.payload.comboDepartamentos }
    }

    if (action.type === 'llenarComboUsuarios') {
        return { ...state, comboUsuarios: action.payload.comboUsuarios }
    }

    if (action.type === 'llenarComboUsuariosCI') {
        return { ...state, comboUsuariosCI: action.payload.comboUsuariosCI }
    }

    if (action.type === 'llenarComboSucursales') {
        return { ...state, comboSucursales: action.payload.comboSucursales }
    }

    if (action.type === 'llenarComboClasificaciones') {
        return { ...state, comboClasificaciones: action.payload.comboClasificaciones }
    }

    if (action.type === 'llenarComboPosiciones') {
        return { ...state, comboPosiciones: action.payload.comboPosiciones }
    }

    if (action.type === 'llenarComboUsuariosAprobadores') {
        return { ...state, comboUsuariosAprobadores: action.payload.comboUsuariosAprobadores }
    }

    if (action.type === 'difinirLimite') {
        return { ...state, limiteAprobacion: action.payload.limiteAprobacion }
    }

    return state;
}