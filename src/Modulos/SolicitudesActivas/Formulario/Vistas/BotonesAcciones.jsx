import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { useFormulario } from '../Controles/useFormulario';

export default function BotonesAcciones() {

    const { state, dispatch, guardar , obtenerIdEstadoSolicitudPorModulo } = useFormulario();
    const [estadoSolicitud, setEstadoSolicitud] = useState(null);
    const [condiciones, setCondiciones] = useState({ btnNuevo: false, btnEnviar: false, btnAprobar: false, btnRechazar: false, btnEntregar: false, btnRegistrar: false });

    useEffect(() => {
        const estado = obtenerIdEstadoSolicitudPorModulo();
        setEstadoSolicitud(estado);
    }, []);

    useEffect(() => {
        const botonesCondiciones = {
            btnNuevo: (['nueva'].includes(estadoSolicitud) && state.formulario.id_cabecera_solicitud === null),
            btnEnviar: (['nueva', 'rechazada'].includes(estadoSolicitud) && state.formulario.id_cabecera_solicitud !== null),
            btnAprobar: (['pendiente'].includes(estadoSolicitud) && state.formulario.id_cabecera_solicitud !== null),
            btnRechazar: (['confirmada', 'pendiente'].includes(estadoSolicitud) && state.formulario.id_cabecera_solicitud !== null),
            btnEntregar: (['entregada'].includes(estadoSolicitud) && state.formulario.id_cabecera_solicitud !== null),
            btnRegistrar: (['confirmada'].includes(estadoSolicitud) && state.formulario.id_cabecera_solicitud !== null),
            btnConfirmar: (['entregada'].includes(estadoSolicitud) && state.formulario.id_cabecera_solicitud !== null),
        };
        setCondiciones(botonesCondiciones);
    }, [estadoSolicitud, state.formulario.id_cabecera_solicitud]); // Actualizamos cuando cambien estos valores

    const ejecutarAcciones = () => {
        let estadoSolicitudId = obtenerIdEstadoSolicitudPorModulo();  // Usamos 'let' para permitir reasignación
        if (estadoSolicitudId !== null) {
            // dispatch({ type: 'actualizarFormulario', payload: { id: 'id_estado_solicitud', value: estadoSolicitudId } });
            guardar();
        }
        return estadoSolicitudId;
    }

    return (
        <div style={{ float: 'right' }}>
            <Button hidden={!condiciones.btnNuevo} onClick={() => ejecutarAcciones()} className="m-1"><Icon.Plus /> Nueva Solicitud </Button>
            <Button hidden={!condiciones.btnEnviar} onClick={() => ejecutarAcciones()} className="m-1"><Icon.CardChecklist /> Enviar Solicitud </Button>
            <Button hidden={!condiciones.btnAprobar} onClick={() => ejecutarAcciones()} className="m-1"><Icon.Check /> Aprobar Solicitud</Button>
            <Button hidden={!condiciones.btnRechazar} onClick={() => ejecutarAcciones()} className="m-1"><Icon.Ban /> Rechazar Solicitud</Button>
            <Button hidden={!condiciones.btnEntregar} onClick={() => ejecutarAcciones()} className="m-1"><Icon.Floppy2Fill /> Entregar</Button>
            <Button hidden={!condiciones.btnConfirmar} onClick={() => ejecutarAcciones()} className="m-1"><Icon.CheckCircleFill /> Confirmar Solicitud</Button>
            <Button hidden={!condiciones.btnRegistrar} onClick={() => ejecutarAcciones()} className="m-1"><Icon.Floppy2Fill /> Registrar</Button>
        </div>
    );
}
