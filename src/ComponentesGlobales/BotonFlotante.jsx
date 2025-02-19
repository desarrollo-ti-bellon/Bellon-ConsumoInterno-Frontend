import React from 'react';
import { Button } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { useSearchParams } from 'react-router-dom';
import { useNotas } from '../ControlesGlobales/Notas/useNotas';

export default function BotonFlotante() {

    const { state, dispatch } = useNotas();
    const [params] = useSearchParams();

    const mostrarNotas = () => {
        dispatch({ type: 'mostrarFormularioNotas', payload: { mostrarFormulario: false } })
        dispatch({ type: 'mostrarNotas', payload: { mostrar: !state.mostrar } })
    }

    return (
        <div style={{ position: 'fixed', right: 20, zIndex: 1050, bottom: 30, padding: 0 }}>
            <Button variant='primary' style={{ display: (params.get('modo') === 'vista' ? 'none' : 'block') }} className="rounded-circle" onClick={() => mostrarNotas()}>
                <Icon.JournalBookmarkFill />
            </Button>
        </div>
    )
}
