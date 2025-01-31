export const EstadoInicialUsuarioFormulario = {
    formulario: {
        id_usuario_ci: null,
        id_usuario: "",
        nombre_usuario: "",
        correo: "",
        codigo_sucursal: "",
        id_sucursal: "",
        codigo_departamento: "",
        id_departamento: "",
        limite: 0,
        posicion_id: 0,
        estado: true
    },
    inactivarCampos: {
        campo_id_usuario_ci: true,
        campo_id_usuario: true,
        campo_nombre_usuario: true,
        campo_correo: true,
        campo_codigo_sucursal: true,
        campo_id_sucursal: true,
        campo_codigo_departamento: true,
        campo_id_departamento: true,
        campo_limite: true,
        campo_posicion_id: true,
        campo_estado: true,
    },
    ultimaActualizacionDeRegistro: 'ninguna',
    lineas: [],
    validadoFormulario: false,
    comboDepartamentos: [],
    comboUsuarios: [],
    comboSucursales: [],
    comboPosiciones: [],
}

export const pagination = true;
export const paginationPageSize = 500;
export const paginationPageSizeSelector = [200, 500, 1000];
export const rowSelection = false