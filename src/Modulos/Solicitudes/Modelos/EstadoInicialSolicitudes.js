export const EstadoInicialSolicitudes = {
    listadoSolicitudes: [],
    modalAgregarSolicitudes: false,
    comboEstadosSolicitudes: [],
    sucursales: [],
    departamentos: [],
    clasificaciones: [],
    almacenes: [],
    filtros: {
        noDocumento: "",
        creadoPor: "",
        fechaDesde: "",
        fechaHasta: "",
        usuarioResponsable: "",
        estadoSolicitudId: 0,
        idSucursal: "",
        idDepartamento: ""
    }
}

export const pagination = true;
export const paginationPageSize = 500;
export const paginationPageSizeSelector = [200, 500, 1000];
export const rowSelection = false