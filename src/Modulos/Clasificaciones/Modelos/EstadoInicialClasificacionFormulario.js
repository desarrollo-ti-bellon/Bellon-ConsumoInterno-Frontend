export const EstadoInicialClasificacionFormulario = {
    formulario: {
        id_clasificacion: null,
        id_grupo_cont_producto_general: "",
        codigo_clasificacion: "",
        descripcion: "",
        estado: true
    },
    inactivarCampos: {
        campo_id_clasificacion: true,
        campo_id_grupo_cont_producto_general: true,
        campo_codigo_clasificacion: true,
        campo_descripcion: true,
        campo_estado: true,
    },
    comboClasificaciones: [],
    comboUsuarios: [],
    comboUsuariosCI: [],
    comboDepartamentos: [],
    comboPosiciones: [],
    comboSucursales: [],
    lineas: [],
    validadoFormulario: false,
    ultimaActualizacionDeRegistro: 'ninguna',
}

export const pagination = true;
export const paginationPageSize = 500;
export const paginationPageSizeSelector = [200, 500, 1000];
export const rowSelection = false