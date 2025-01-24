export const EstadoInicialClasificacionFormulario = {
    formulario: {
        id_cabecera_solicitud: null,
        fecha_creado: "",
        comentario: "",
        creado_por: "",
        usuario_responsable: "",
        usuario_despacho: "",
        usuario_asistente_control: "",
        usuario_asistente_contabilidad: "",
        id_departamento: "",
        id_estado_solicitud: 0,
        id_clasificacion: 0,
        id_sucursal: 0,
        total: 0,
    },
    inactivarCampos: {
        campo_id_cabecera_solicitud: true,
        campo_fecha_creado: true,
        campo_comentario: true,
        campo_creado_por: true,
        campo_usuario_responsable: true,
        campo_usuario_despacho: true,
        campo_usuario_asistente_control: true,
        campo_usuario_asistente_contabilidad: true,
        campo_id_departamento: true,
        campo_id_estado_solicitud: true,
        campo_id_clasificacion: true,
        campo_id_sucursal: true,
        campo_total: true,
    },
    ultimaActualizacionDeRegistro: 'ninguna',
    lineas: [],
    validadoFormulario: false,
    modalAgregarProductos: false,
    listadoProductos: [],
    comboEstadoSolicitudes: [],
    productosSeleccionados: []
}

export const pagination = true;
export const paginationPageSize = 500;
export const paginationPageSizeSelector = [200, 500, 1000];
export const rowSelection = false