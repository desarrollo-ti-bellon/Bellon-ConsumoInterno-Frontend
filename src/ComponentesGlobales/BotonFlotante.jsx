import React from 'react';
import { Button } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { useNotas } from '../ControlesGlobales/Notas/useNotas';

export default function BotonFlotante() {

    const { state, dispatch } = useNotas();

    const mostrarNotas = () => {
        dispatch({ type: 'mostrarFormularioNotas', payload: { mostrarFormulario: false } })
        dispatch({ type: 'mostrarNotas', payload: { mostrar: !state.mostrar } })
    }

    return (
        <div style={{ position: 'fixed', right: 20, zIndex: 1050, bottom: 30, padding: 0 }}>
            <Button variant='primary' className="rounded-circle" onClick={() => mostrarNotas()}>
                <Icon.JournalBookmarkFill />
            </Button>
        </div>
    )
}
