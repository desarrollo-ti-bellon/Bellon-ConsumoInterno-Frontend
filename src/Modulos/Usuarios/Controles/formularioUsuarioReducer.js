import { EstadoInicialUsuarioFormulario } from "../Modelos/EstadoInicialUsuarioFormulario"

export const formularioUsuarioReducer = (state = EstadoInicialUsuarioFormulario, action) => {

    console.log('solicitudesReducer', action)

    //ACCIONES DEL FORMULARIO 
    if (action.type === 'actualizarFormulario') {
        const { id, value } = action.payload
        if (id === 'id_usuario') {
            const datoUsuario = state.comboUsuarios.find(usuario => usuario.id_usuario === value) ?? null;
            return { ...state, formulario: { ...state.formulario, [id]: value, nombre_usuario: datoUsuario?.nombre_completo ?? '', correo: datoUsuario?.correo_electronico ?? '' } }
        }
        if (id === 'codigo_sucursal') {
            const datoSucursal = state.comboSucursales.find(sucursal => sucursal.codigo === value);
            return { ...state, formulario: { ...state.formulario, [id]: value, id_sucursal: datoSucursal.id_valor_dimension ?? '' } }
        }
        if (id === 'codigo_departamento') {
            const datoDepartamento = state.comboDepartamentos.find(departamento => departamento.codigo === value) ?? null;
            return { ...state, formulario: { ...state.formulario, [id]: value, id_departamento: datoDepartamento?.id_valor_dimension ?? '' } }
        }
        if (id === 'codigo_almacen') {
            const datoAlmacen = state.comboAlmacenes.find(almacen => almacen.codigo === value) ?? null;
            return { ...state, formulario: { ...state.formulario, [id]: value, id_almacen: datoAlmacen?.id_almacen ?? '' } }
        }
        return { ...state, formulario: { ...state.formulario, [id]: value } }
    }

    if (action.type === 'limpiarFormulario') {
        return { ...state, formulario: { ...EstadoInicialUsuarioFormulario.formulario } }
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
        const copiarLineas = [...action.payload.lineas].map(linea => {
            const posicionData = state.comboPosiciones.find(posicion => posicion.posicion_id === linea.posicion_id);
            if (posicionData) {
                return { ...linea, posicion_descripcion: posicionData.descripcion };
            }
            return linea;
        })
        return { ...state, lineas: copiarLineas }
    }

    if (action.type === 'llenarComboDepartamentos') {
        return { ...state, comboDepartamentos: action.payload.comboDepartamentos }
    }

    if (action.type === 'llenarComboUsuarios') {
        return { ...state, comboUsuarios: action.payload.comboUsuarios }
    }

    if (action.type === 'llenarComboSucursales') {
        return { ...state, comboSucursales: action.payload.comboSucursales }
    }

    if (action.type === 'llenarComboPosiciones') {
        return { ...state, comboPosiciones: action.payload.comboPosiciones }
    }

    if (action.type === 'llenarComboAprobadores') {
        return { ...state, comboUsuariosAprobadores: action.payload.comboUsuariosAprobadores }
    }

    if (action.type === 'llenarComboAlmacenes') {
        return { ...state, comboAlmacenes: action.payload.comboAlmacenes }
    }

    if (action.type === 'inactivarCampos') {
        return { ...state, inactivarCampos: action.payload.campos }
    }

    return state;
}