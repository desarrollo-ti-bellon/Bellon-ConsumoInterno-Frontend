import { obtenerDatosDelLocalStorage } from "../../../../FuncionesGlobales"
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
        let copiaLineas = [...action.payload.lineas] ?? [];
        const { id_almacen, codigo_almacen } = obtenerDatosDelLocalStorage(import.meta.env.VITE_APP_LOCALSTORAGE_NOMBRE_PERFIL_USUARIO)
        copiaLineas.forEach(linea => {
            const unidadMedida = state.comboUnidadesMedida?.find(el => el.codigo === linea.codigo_unidad_medida) ?? null;
            linea.almacen_id = id_almacen ?? '';
            linea.almacen_codigo = codigo_almacen ?? '';
            linea.id_unidad_medida = unidadMedida?.id_unidad_medida ?? '';
        });
        return { ...state, lineas: copiaLineas }
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

    if (action.type === 'cambiarEstadoGeneral') {
        return { ...state, [action.payload.id]: action.payload.value }
    }

    //ACCIONES DE LOS MODALES
    if (action.type === 'mostrarModalAgregarSolicitud') {
        return { ...state, modalAgregarSolicitudes: action.payload.mostrar }
    }

    if (action.type === 'mostrarModalAgregarProductos') {

        // Crear un Set de 'no_producto' en las líneas existentes para mejorar la búsqueda
        const productosEnLineas = new Set(state.lineas.map(linea => linea.id_producto));
        console.log('productosEnLineas =>', productosEnLineas);

        // Filtrar los productos que no están listados en 'lineas'
        const productosNoListados = state.listadoProductosTemp.filter(el => !productosEnLineas.has(el.id_producto));
        console.log('productosEnLineas =>', productosEnLineas);

        return { ...state, modalAgregarProductos: action.payload.mostrar, listadoProductos: productosNoListados }
    }

    if (action.type === 'llenarProductos') {

        // Crear un Set de 'no_producto' en las líneas existentes para mejorar la búsqueda
        const productosEnLineas = new Set(state.lineas.map(linea => linea.id_producto));
        console.log('productosEnLineas =>', productosEnLineas);

        // Filtrar los productos que no están listados en 'lineas'
        const productosNoListados = action.payload.productos.filter(el => !productosEnLineas.has(el.id_producto));
        console.log('productosEnLineas =>', productosEnLineas);

        // Devolver el nuevo estado con los productos no listados
        return { ...state, listadoProductos: productosNoListados, listadoProductosTemp: [...action.payload.productos] }

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

    if (action.type === 'actualizarUltimaActualizacionDeRegistro') {
        return { ...state, ultimaActualizacionDeRegistro: action.payload.ultimaActualizacionDeRegistro }
    }

    if (action.type === 'llenarComboUnidadesMedida') {
        return { ...state, comboUnidadesMedida: action.payload.comboUnidadesMedida }
    }

    if (action.type === 'llenarComboAlmacenes') {
        return { ...state, comboAlmacenes: action.payload.comboAlmacenes }
    }

    return state;
}