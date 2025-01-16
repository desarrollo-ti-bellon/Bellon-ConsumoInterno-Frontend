import { createContext, useEffect, useReducer, useRef } from 'react'
import { alertaReducer } from './AlertaReducer'
import { EstadoInicialAlerta } from './AlertaModelo'

export const AlertaContexto = createContext(null)

export default function AlertaProveedor({ children }) {

    const [state, dispatch] = useReducer(alertaReducer, EstadoInicialAlerta)
    const tiempoFuera = useRef(null)

    useEffect(() => {
        if (tiempoFuera.current) {
            clearTimeout(tiempoFuera.current);
        }
        tiempoFuera.current = setTimeout(() => {
            dispatch({ type: 'mostrarAlerta', payload: { mostrar: false, mensaje: '', tipo: '' } })
        }, 2000);
    }, [])

    useEffect(() => {
        if (tiempoFuera.current) {
            clearTimeout(tiempoFuera.current);
        }
        tiempoFuera.current = setTimeout(() => {
            dispatch({ type: 'limpiarAlerta' })
        }, 3000);
    }, [state.mostrar])

    return (
        <AlertaContexto.Provider value={{ state, dispatch }}>
            {children}
        </AlertaContexto.Provider>
    )
}
