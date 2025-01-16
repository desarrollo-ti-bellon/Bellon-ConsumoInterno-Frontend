import { createContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { autoAcceso, obtenerDatosDelLocalStorage } from "../../../FuncionesGlobales";
import { estadoInicialAcceso } from "../Modelos/accesoModelo";
import { accesoReducer } from "./AccesoReducer";

export const AccesoContexto = createContext(null)

export const AccesoProveedor = ({ children }) => {

    const [state, dispatch] = useReducer(accesoReducer, estadoInicialAcceso)
    const navigate = useNavigate();

    useEffect(() => {
        const verificarDatosAcceso = obtenerDatosDelLocalStorage(import.meta.env.VITE_APP_LOCALSTORAGE_NOMBRE);
        if (verificarDatosAcceso) {
            const datosLocalStorage = verificarDatosAcceso;
            console.log(datosLocalStorage);
            dispatch({
                type: 'ponerValores', payload: {
                    token: datosLocalStorage.accessToken,
                    nombre: datosLocalStorage.account.name,
                    nombreUsuario: datosLocalStorage.account.username
                }
            })
        }
    }, []);

    useEffect(() => {
        if (state.token) {
            setTimeout(() => {
                navigate(import.meta.env.VITE_APP_BELLON_INICIO)
            }, 1500);
        } else {
            navigate(import.meta.env.VITE_APP_ACCESO)
        }
    }, [state.token])

    const enviar = () => {
        autoAcceso();
    }

    return (
        <AccesoContexto.Provider value={{ state, dispatch, enviar }}>
            {children}
        </AccesoContexto.Provider>
    )
}