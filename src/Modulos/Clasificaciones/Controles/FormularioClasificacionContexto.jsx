import { createContext, useEffect, useReducer } from "react"
import { useLocation } from "react-router-dom"
import { useAlerta } from "../../../ControlesGlobales/Alertas/useAlerta"
import { useCargandoInformacion } from "../../../ControlesGlobales/CargandoInformacion/useCargandoInformacion"
import { EstadoInicialClasificacionFormulario } from "../Modelos/EstadoInicialClasificacionFormulario"
import { formularioClasificacionReducer } from "./formularioClasificacionReducer"

export const FormularioClasificacionContexto = createContext(null)

export const FormularioClasificacionProveedor = ({ children }) => {

    const [state, dispatch] = useReducer(formularioClasificacionReducer, EstadoInicialClasificacionFormulario)

    const { dispatch: dispatchAlerta } = useAlerta();
    const { dispatch: dispatchCargandoInformacion } = useCargandoInformacion();
    const formData = useLocation();

    const cargarDatosIniciales = async () => {
        dispatchCargandoInformacion({ action: 'mostrarCargandoInformacion' })
        dispatchCargandoInformacion({ action: 'limpiarCargandoInformacion' })
    }

    const guardar = async () => {
        console.log('guardar', state.formulario)
        dispatchCargandoInformacion({ type: 'mostrarCargandoInformacion' })
        // enviarDatos('Solicitud', state.formulario)
        //     .then((res) => {
        //         let json = res.data;
        //         dispatch({ type: 'llenarFormulario', payload: { formulario: json } })
        //         dispatch({ type: 'llenarLineas', payload: { lineas: json.lineas } })
        //         dispatch({ type: 'actualizarUltimaActualizacionDeRegistro', payload: { ultimaActualizacionDeRegistro: obtenerFechaYHoraActual() } })
        //         dispatchAlerta({ action: 'mostrarAlerta', payload: { mostrar: true, mensaje: 'se realizó correctamente', tipo: 'success' } })
        //     })
        //     .catch((err) => {
        //         dispatchAlerta({ action: 'mostrarAlerta', payload: { mostrar: true, mensaje: 'hubo un error =>' + err, tipo: 'warning' } })
        //     })
        //     .finally(() => {
        //         dispatchCargandoInformacion({ type: 'limpiarCargandoInformacion' })
        //     })
    }

    useEffect(() => {
        if (state.validadoFormulario) {
            guardar();
        }
    }, [state.validadoFormulario])

    return (
        <FormularioClasificacionContexto.Provider value={{ state, dispatch, guardar }}>
            {children}
        </FormularioClasificacionContexto.Provider>
    )
} 