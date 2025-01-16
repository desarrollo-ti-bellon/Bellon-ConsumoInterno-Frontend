import React, { useContext } from 'react';
import { Alert } from 'react-bootstrap';
import { AlertaContexto } from '../ControlesGlobales/Alertas/AlertaProveedor';

export default function Alertas() {
    const { state, dispatch } = useContext(AlertaContexto)
    return (
        <Alert style={{ position: "fixed", zIndex: 1060, top: 0, right: 10, marginTop: 10 }} onClose={() => dispatch({ type: 'limpiarAlerta' })} variant={state.tipo} transition>
            <div role="alert" dangerouslySetInnerHTML={{ __html: state.mensaje }} />
        </Alert>
    )
}
