import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { useFormulario } from '../Controles/useFormulario';
import { useModalConfirmacion } from '../../../../ControlesGlobales/ModalConfirmacion/useModalConfirmacion';
import { useModalAlerta } from '../../../../ControlesGlobales/ModalAlerta/useModalAlerta';

export default function BotonesAcciones() {

    const { state, dispatch, guardar, actualizarFormulario, cambiarEstadoSolicitud, obtenerIdEstadoSolicitudPorModulo } = useFormulario();
    const [estadoSolicitud, setEstadoSolicitud] = useState(null);
    const { dispatch: dispatchModalConfirmacion } = useModalConfirmacion();
    const { dispatch: dispatchModalAlerta } = useModalAlerta();
    const [condiciones, setCondiciones] = useState({ btnNuevo: false, btnEnviar: false, btnAprobar: false, btnRechazar: false, btnEntregar: false, btnRegistrar: false });
    const [bloquearBotonesAcciones, setBloquearBotonesAcciones] = useState(state.lineas.length == 0)

    useEffect(() => {
        const estado = obtenerIdEstadoSolicitudPorModulo();
        setEstadoSolicitud(estado);
    }, []);

    useEffect(() => {
        const botonesCondiciones = {
            btnNuevo: (['nueva'].includes(estadoSolicitud) && state.formulario.id_cabecera_solicitud === null),
            btnEnviar: (['nueva', 'rechazada'].includes(estadoSolicitud) && state.formulario.id_cabecera_solicitud !== null),
            btnAprobar: (['pendiente'].includes(estadoSolicitud) && state.formulario.id_cabecera_solicitud !== null),
            btnRechazar: (['confirmada', 'pendiente', 'aprobada', 'entregada'].includes(estadoSolicitud) && state.formulario.id_cabecera_solicitud !== null),
            btnEntregar: (['aprobada'].includes(estadoSolicitud) && state.formulario.id_cabecera_solicitud !== null),
            btnRegistrar: (['confirmada'].includes(estadoSolicitud) && state.formulario.id_cabecera_solicitud !== null),
            btnConfirmar: (['entregada'].includes(estadoSolicitud) && state.formulario.id_cabecera_solicitud !== null),
        };
        setCondiciones(botonesCondiciones);
    }, [estadoSolicitud, state.formulario.id_cabecera_solicitud]); // Actualizamos cuando cambien estos valores

    const ejecutarAcciones = (accion = '') => {

        const acciones = {
            nueva: 1,
            enviar: 2,
            aprobar: 3,
            rechazar: 4,
            entregar: 5,
            confirmar: 6,
            registrar: 7,
        }

        if (acciones[accion]) {
            actualizarFormulario('id_estado_solicitud', acciones[accion]);
        } else {
            console.error(`Acción '${accion}' no válida.`);
        }

        cambiarEstadoSolicitud(true);
    }

    const confirmarAccion = (accion) => {
        if (state.lineas.length === 0 || state.formulario.total === 0) {
            dispatchModalAlerta({ type: 'mostrarModalAlerta', payload: { mensaje: 'No hay productos disponibles para enviar, por favor verifique.', mostrar: true, tamano: 'sm' } })
            return;
        }

        if ((state.lineas.length > 0) && (state.formulario.total > state.limiteAprobacion)) {
            dispatchModalAlerta({ type: 'mostrarModalAlerta', payload: { mensaje: '<div style="font-size: 20px; font-weight: 600; text-align: center;">El total del consumo supera al limite que puede aprobar el usuario aprobador. Por favor delegue su solicitud a otra persona.</b>', mostrar: true, tamano: 'md' } })
            return;
        }
        dispatchModalConfirmacion({ type: 'mostrarModalConfirmacion', payload: { mostrar: true, mensaje: 'Desea usted realizar esta acción?', funcionEjecutar: () => ejecutarAcciones(accion) } })
    }

    useEffect(() => {
        const bloquear = state.lineas.length === 0;
        setBloquearBotonesAcciones(bloquear);
    }, [state.lineas])

    return (
        <div style={{ float: 'right' }}>
            <Button disabled={bloquearBotonesAcciones} hidden={!condiciones.btnNuevo} onClick={() => confirmarAccion('nueva')} className="m-1"><Icon.Plus /> {' '}  Nueva Solicitud </Button>
            <Button disabled={bloquearBotonesAcciones} hidden={!condiciones.btnEnviar} onClick={() => confirmarAccion('enviar')} className="m-1"><Icon.CardChecklist /> {' '}   Enviar Solicitud </Button>
            <Button disabled={bloquearBotonesAcciones} hidden={!condiciones.btnAprobar} onClick={() => confirmarAccion('aprobar')} className="m-1"><Icon.Check /> {' '} Aprobar Solicitud </Button>
            <Button disabled={bloquearBotonesAcciones} hidden={!condiciones.btnRechazar} onClick={() => confirmarAccion('rechazar')} className="m-1"><Icon.Ban /> {' '} Rechazar Solicitud </Button>
            <Button disabled={bloquearBotonesAcciones} hidden={!condiciones.btnEntregar} onClick={() => confirmarAccion('entregar')} className="m-1"><Icon.Floppy2Fill /> {' '} Entregar </Button>
            <Button disabled={bloquearBotonesAcciones} hidden={!condiciones.btnConfirmar} onClick={() => confirmarAccion('confirmar')} className="m-1"><Icon.CheckCircleFill /> {' '}   Confirmar Solicitud </Button>
            <Button disabled={bloquearBotonesAcciones} hidden={!condiciones.btnRegistrar} onClick={() => confirmarAccion('registrar')} className="m-1"><Icon.Floppy2Fill /> {' '}   Registrar </Button>
        </div>
    );
}
