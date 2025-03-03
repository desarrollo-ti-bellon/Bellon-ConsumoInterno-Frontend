export const EstadoInicialSolicitudes = {
    listadoSolicitudes: [],
    modalAgregarSolicitudes: false,
    comboEstadosSolicitudes: [],
    sucursales: [],
    departamentos: [],
    clasificaciones: [],
    almacenes: [],
    filtros: {
        noDocumento: null,
        creadoPor: null,
        fechaDesde: null,
        fechaHasta: null,
        usuarioResponsable: null,
        estadoSolicitudId: null,
        idSucursal: null,
        idDepartamento: null
    }
}

export const pagination = true;
export const paginationPageSize = 500;
export const paginationPageSizeSelector = [200, 500, 1000];
export const rowSelection = false