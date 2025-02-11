import axios from 'axios';
import currency from 'currency.js';
import moment from 'moment-timezone';
import { LOGIN_REQUEST, PUBLIC_CLIENT_APPLICATION, TOKEN_REQUEST } from '../Archivos/Configuracion/msalConfig';
moment.locale(import.meta.env.VITE_APP_LOCALE_MOMENT);

axios.interceptors.response.use(
    (response) => response, // Pasar las respuestas exitosas directamente
    async (error) => {
        if (error.response && error.response.status === 401) {
            try {
                await refrescarToken(); // Asume que refrescarToken actualiza el token en localStorage
                const obtenerToken = obtenerDatosDelLocalStorage(localStorageNombre);
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${obtenerToken.accessToken}`;
                // Reintentar la petición original con el nuevo token
                return axios(error.config);
            } catch (refreshError) {
                // Manejar el error de refresco de token si es necesario
                return Promise.reject(refreshError);
            }
        }
        if (error.response && error.response.status === 403) {
            setTimeout(() => {
                location.href = "/403";
            }, 500);
        }
        if (error.toJSON().message === "Network Error") {
            alert("No hay conexión con el servidor, por favor verifique e intentelo de nuevo");
        }
        return Promise.reject(error); // Propagar otros errores
    }
);

// CONTROLAR EL ACCESO 
export const autoAcceso = async () => {
    console.log("autologin");
    var tokenResponse = await PUBLIC_CLIENT_APPLICATION.handleRedirectPromise();

    if (!tokenResponse) {
        const accounts = await PUBLIC_CLIENT_APPLICATION.getAllAccounts();
        if (accounts.length === 0) {

            const loginResponse = await PUBLIC_CLIENT_APPLICATION.loginPopup(
                LOGIN_REQUEST
            );
            if (loginResponse.account) {
                PUBLIC_CLIENT_APPLICATION.setActiveAccount(loginResponse.account);
            }
            await refrescarToken();

        } else {
            await refrescarToken();
        }
    }
};

export const refrescarToken = async () => {
    const tokenResponse = await PUBLIC_CLIENT_APPLICATION.acquireTokenSilent(
        TOKEN_REQUEST
    ).then((data) => {
        guardarDatosEnLocalStorage(import.meta.env.VITE_APP_LOCALSTORAGE_NOMBRE, JSON.stringify(data));
        location.href = window.location.href
    }).catch((err) => {
        console.log('error found=>', err);
    })
    return tokenResponse;
};

export const cerrarAcceso = async () => {
    PUBLIC_CLIENT_APPLICATION.logoutRedirect();
    eliminarDatosDelLocalStorage(import.meta.env.VITE_APP_LOCALSTORAGE_NOMBRE);
};

//CONTROLAR TOKEN Y AUTORIZACIONES DEL LS CENTRAL
export const guardarDatosEnLocalStorage = (descripcion, json_convertido_texto) => {
    localStorage.setItem(descripcion, json_convertido_texto);
}

export const obtenerDatosDelLocalStorage = (descripcion) => {
    const datos = localStorage.getItem(descripcion);
    return datos ? JSON.parse(datos) : null;
}

export const eliminarDatosDelLocalStorage = (descripcion) => {
    localStorage.removeItem(descripcion);
}

//CONTROLA LAS LLAMADAS A LAS APIs
export const obtenerDatos = async (entidad, queryString = '') => {
    const obtenerToken = obtenerDatosDelLocalStorage(import.meta.env.VITE_APP_LOCALSTORAGE_NOMBRE);
    axios.defaults.headers.common['Authorization'] = `Bearer ${obtenerToken.accessToken}`
    return await axios.get(`${import.meta.env.VITE_APP_BASE_URL_API_REMOTA}/${entidad}`);
}

export const obtenerDatosConId = async (entidad, id) => {
    const obtenerToken = obtenerDatosDelLocalStorage(import.meta.env.VITE_APP_LOCALSTORAGE_NOMBRE);
    axios.defaults.headers.common['Authorization'] = `Bearer ${obtenerToken.accessToken}`
    return await axios.get(`${import.meta.env.VITE_APP_BASE_URL_API_REMOTA}/${entidad}?id=${id}`);
}

export const obtenerDatosConMuliplesIDs = async (entidad, arreglo) => {
    const obtenerToken = obtenerDatosDelLocalStorage(import.meta.env.VITE_APP_LOCALSTORAGE_NOMBRE);
    axios.defaults.headers.common['Authorization'] = `Bearer ${obtenerToken.accessToken}`
    return await axios.post(`${import.meta.env.VITE_APP_BASE_URL_API_REMOTA}/${entidad}`, arreglo);
}

export const enviarDatos = async (entidad, datos) => {
    const obtenerToken = obtenerDatosDelLocalStorage(import.meta.env.VITE_APP_LOCALSTORAGE_NOMBRE);
    axios.defaults.headers.common['Authorization'] = `Bearer ${obtenerToken.accessToken}`
    return await axios.post(`${import.meta.env.VITE_APP_BASE_URL_API_REMOTA}/${entidad}`, datos);
}

export const eliminarDatosConId = async (entidad, id) => {
    const obtenerToken = obtenerDatosDelLocalStorage(import.meta.env.VITE_APP_LOCALSTORAGE_NOMBRE);
    axios.defaults.headers.common['Authorization'] = `Bearer ${obtenerToken.accessToken}`
    return await axios.delete(`${import.meta.env.VITE_APP_BASE_URL_API_REMOTA}/${entidad}?id=${id}`);
}

export const obtenerErrorPorCodigo = (codigo) => {
    switch (codigo) {
        case 204:
            return "Error al intentar [guardar/actualizar/elimnar] un registro";
        case 400:
            return "Error al intentar guardar registro";
        case 401:
            autoAcceso();
            return "No está autorizado para realizar esta acción";
        case 403:
            return "No está autorizado para realizar esta acción";
        case 404:
            return "La ruta no existe";
        case 500:
            return "Error interno del servidor";
        default:
            return "Error desconocido";
    }
}

// FORMATEADORES DE VALORES
export const formatoMonedaDecimal = (number = 0) => {
    if (number === '0' || number === 0) {
        return ''
    }
    console.log("formatoMonedaDecimal", number)
    return Math.floor(number * 10000) / 10000;
}
export const formatoMoneda = (number = 0, decimals = 2, symbol = "$") => {
    console.log('formatoMoneda', number)

    if (number === '0' || number === 0) {
        return ''
    }

    const formattedValue = currency(number ?? 0, { separator: ',', precision: decimals, symbol: symbol }).format();
    return formattedValue;
}
export const formatoCantidad = (number = 0, decimals = 2) => {
    if (!number) {
        return `${'0'.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    }
    const factor = Math.pow(10, decimals);
    return (Math.floor(number * factor) / factor).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatoFecha = (fecha) => {
    if (!fecha) {
        return '';
    }
    return new Date(fecha).toLocaleDateString('es-ES');
}

// VALIDADORES
export const validarLongitud = (valor, minimo, maximo) => {
    return valor.length >= minimo && valor.length <= maximo;
}

export const validarEmail = (email) => {
    const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return regex.test(email);
}

// OBTENER VALORES ACTUALES 
export function obtenerHoraActual() {
    return new Date().toTimeString().slice(0, 8);
}

export function obtenerFechaActual() {
    return moment().format('YYYY-MM-DD');
}

export function obtenerFechaYHoraActual() {
    return moment().format('LLL');
}

export function formateadorDeFechas(fecha) {
    if (!fecha) {
        return '';
    }

    const date = new Date(fecha);

    if (isNaN(date)) return 'Fecha inválida';

    const pad = (num) => String(num).padStart(2, '0');

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());

    return `${year}-${month}-${day}`;
}

export const formateadorDeFechaYHora = (dateInput, format = 'YYYY-MM-DD HH:mm:ss') => {

    const date = new Date(dateInput);

    if (isNaN(date)) return '';

    const pad = (num) => String(num).padStart(2, '0');

    const tokens = {
        YYYY: date.getFullYear(),
        MM: pad(date.getMonth() + 1),
        DD: pad(date.getDate()),
        HH: pad(date.getHours()),
        mm: pad(date.getMinutes()),
        ss: pad(date.getSeconds()),
    };

    return format.replace(/YYYY|MM|DD|HH|mm|ss/g, (match) => tokens[match]);
};

export const formateadorDeFechaYHoraEspanol = (dateInput) => {
    if (!dateInput) {
        return ''
    }
    const fechaMoment = moment.utc(dateInput).tz(import.meta.env.VITE_APP_LOCALE_MOMENT_TIMEZONE);
    return fechaMoment.format('DD-MM-YYYY hh:mm:ss a');
};

export const formateadorDeFechaEspanol = (dateInput) => {
    if (!dateInput) {
        return ''
    }
    const fechaMoment = moment.utc(dateInput).tz(import.meta.env.VITE_APP_LOCALE_MOMENT_TIMEZONE);
    return fechaMoment.format('DD-MM-YYYY');
};

// Obtener ubicacion de ruta 
export function obtenerRutaUrlActual() {
    return window.location.pathname;
}

export const obtenerRutas = () => {
    const segmentos = window.location.pathname.split('/').slice(2);
    return segmentos.map((key, index) => {
        const ruta = `/${['bellon', ...segmentos.slice(0, index + 1)].join('/')}`;
        return { ruta, descripcion: key };
    });
};

// funciones para obtener nombre del usuario del localstorage.
export const obtenerNombreUsuarioLoggeado = () => {
    const datosUsuario = obtenerDatosDelLocalStorage(import.meta.env.VITE_APP_LOCALSTORAGE_NOMBRE);
    if (datosUsuario) {
        const { account } = datosUsuario
        return account.username
    }
}

export const tipoDocumento = (ruta) => {
    const mapping = {
        [import.meta.env.VITE_APP_BELLON_LLEGADAS]: 'LLE',
        [import.meta.env.VITE_APP_BELLON_HISTORICO_LLEGADAS]: 'LLE',
        [import.meta.env.VITE_APP_BELLON_LLEGADAS_FORMULARIO]: 'LLE',
        [import.meta.env.VITE_APP_BELLON_HISTORICO_LLEGADAS_FORMULARIO]: 'LLE',
        [import.meta.env.VITE_APP_BELLON_TRANSITOS]: 'TRA',
        [import.meta.env.VITE_APP_BELLON_HISTORICO_TRANSITOS]: 'TRA',
        [import.meta.env.VITE_APP_BELLON_TRANSITOS_FORMULARIO]: 'TRA',
        [import.meta.env.VITE_APP_BELLON_HISTORICO_TRANSITOS_FORMULARIO]: 'TRA',
        [import.meta.env.VITE_APP_BELLON_LIQUIDACIONES]: 'LIQ',
        [import.meta.env.VITE_APP_BELLON_HISTORICO_LIQUIDACIONES]: 'LIQ',
        [import.meta.env.VITE_APP_BELLON_LIQUIDACIONES_FORMULARIO]: 'LIQ',
        [import.meta.env.VITE_APP_BELLON_HISTORICO_LIQUIDACIONES_FORMULARIO]: 'LIQ',
        [import.meta.env.VITE_APP_BELLON_SOLICITUDES_NUEVAS]: 'CIN',
        [import.meta.env.VITE_APP_BELLON_SOLICITUDES_PENDIENTES]: 'CIN',
        [import.meta.env.VITE_APP_BELLON_SOLICITUDES_APROBADAS]: 'CIN',
        [import.meta.env.VITE_APP_BELLON_SOLICITUDES_RECHAZADAS]: 'CIN',
        [import.meta.env.VITE_APP_BELLON_SOLICITUDES_CONFIRMADAS]: 'CIN',
        [import.meta.env.VITE_APP_BELLON_SOLICITUDES_ENTREGADAS]: 'CIN',
        [import.meta.env.VITE_APP_BELLON_SOLICITUDES_TERMINADAS]: 'CIN',
    };
    return mapping[ruta] || ''; // Retorna el valor asociado o '' si no existe
}

export function quitarFormularioDeLaUrl(url) {
    // Encuentra el índice de "formulario" en la URL
    const indiceFormulario = url.indexOf('/formulario');

    // Si "formulario" existe en la URL, corta todo desde allí hacia adelante
    if (indiceFormulario !== -1) {
        return url.substring(0, indiceFormulario);
    }

    // Si no se encuentra "/formulario", retorna la URL original
    return url;
}