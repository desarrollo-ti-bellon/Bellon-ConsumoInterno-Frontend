import React, { useContext } from 'react';
import { Alert } from 'react-bootstrap';
import { AlertaContexto } from '../ControlesGlobales/Alertas/AlertaProveedor';

export default function Alertas() {
    const { state, dispatch } = useContext(AlertaContexto)

    if (!state.mostrar) {
        return;
    }

    return (
        <Alert style={{ position: "fixed", zIndex: 1060, top: 0, right: 10, marginTop: 10 }} onClose={() => dispatch({ type: 'limpiarAlerta' })} variant={state.tipo} dismissible>
            <Alert.Heading>Alerta!</Alert.Heading>
            <p>
                <div role="alert" dangerouslySetInnerHTML={{ __html: state.mensaje }} />
            </p>
        </Alert>
    )
}
