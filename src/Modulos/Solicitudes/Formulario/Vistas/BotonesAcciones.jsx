import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { useSearchParams } from 'react-router-dom';
import { useModalAlerta } from '../../../../ControlesGlobales/ModalAlerta/useModalAlerta';
import { useModalConfirmacion } from '../../../../ControlesGlobales/ModalConfirmacion/useModalConfirmacion';
import { useNotas } from '../../../../ControlesGlobales/Notas/useNotas';
import { obtenerDatosDelLocalStorage } from '../../../../FuncionesGlobales';
import { useFormulario } from '../Controles/useFormulario';

export default function BotonesAcciones() {

    const { state, dispatch, guardar, actualizarFormulario, cambiarEstadoSolicitud, enviar } = useFormulario();
    const [estadoSolicitud, setEstadoSolicitud] = useState(null);
    const { dispatch: dispatchModalConfirmacion } = useModalConfirmacion();
    const { dispatch: dispatchModalAlerta } = useModalAlerta();
    const [condiciones, setCondiciones] = useState({ btnNuevo: false, btnEnviar: false, btnAprobar: false, btnRechazar: false, btnEntregar: false, btnRegistrar: false });
    const [bloquearBotonesAcciones, setBloquearBotonesAcciones] = useState(state.lineas.length == 0)
    const [permisosUsuarioLogueado, setPermisosUsuarioLogueado] = useState(null);
    const [params] = useSearchParams();

    // PARA CONTROLAR LAS NOTAS CUANDO SE VA A RECHAZAR LAS SOLICITUDES
    const [accion, setAccion] = useState('');
    const { state: stateNotas, dispatch: dispatchNotas } = useNotas();
    const [cantidadNotas, setCantidadNotas] = useState(0);

    useEffect(() => {

        // SETEANDO EL ESTADO DE SOLICITUD ACTUAL
        const estadoSolicitud = state.formulario.id_estado_solicitud ?? '';
        setEstadoSolicitud(estadoSolicitud.toString());

        // BUSCANDO LOS PERMISOS QUE TENGA EL USUARIO LOGUEADO
        const perfilUsuarioLogueado = obtenerDatosDelLocalStorage(import.meta.env.VITE_APP_LOCALSTORAGE_NOMBRE_PERFIL_USUARIO);
        if (perfilUsuarioLogueado) {
            setPermisosUsuarioLogueado(perfilUsuarioLogueado?.posicion);
        }

    }, [state.formulario]);

    useEffect(() => {

        // AQUI SE CONTROLAN QUE BOTONES SE VEN DEPENDIENDO EL MODULO DONDE ESTE Y LOS PERMISOS QUE TENGA LA POSICION DEL USUARIO
        if (!permisosUsuarioLogueado) {
            return;
        }

        // CONTROLANDO CONDICIONES PARA OCULTAR BOTONES DEPENDIENDO SI ESTAMOS EN MODO VISTA
        if (params.get('modo') === 'vista') {
            return;
        }

        // CONTROLANDO CONDICIONES PARA OCULTAR BOTONES DEPENDIENDO SI EL DOCUMENTO TIENE UN ESTADO DE SOLICITUD DIFERENTE
        if (state.formulario.id_estado_solicitud === estadoSolicitud) {
            return;
        }

        // CONTROLANDO CONDICIONES PARA OCULTAR BOTONES DEPENDIENDIENDO EL ESTADO DE LAS SOLICITUDES Y SI EL DOCUMENTO TIENE UN ID
        ocultarBotones();

    }, [estadoSolicitud, state.formulario.id_cabecera_solicitud]); // Actualizamos cuando cambien estos valores

    const ocultarBotones = () => {

        // CONTROLANDO CONDICIONES PARA OCULTAR BOTONES DEPENDIENDO EL ESTADO DE LAS SOLICITUDES 
        const tieneSolicitudValida = state.formulario.id_cabecera_solicitud !== null;
        const estadoPermiteEnvio = [import.meta.env.VITE_APP_ESTADO_SOLICITUD_NUEVA, import.meta.env.VITE_APP_ESTADO_SOLICITUD_RECHAZADA].includes(estadoSolicitud.toString());
        const estadoPermiteAprobacion = [import.meta.env.VITE_APP_ESTADO_SOLICITUD_PENDIENTE].includes(estadoSolicitud.toString());
        const estadoPermiteRechazo = [import.meta.env.VITE_APP_ESTADO_SOLICITUD_PENDIENTE, import.meta.env.VITE_APP_ESTADO_SOLICITUD_APROBADA, import.meta.env.VITE_APP_ESTADO_SOLICITUD_ENTREGADA].includes(estadoSolicitud.toString());
        const estadoPermiteEntrega = [import.meta.env.VITE_APP_ESTADO_SOLICITUD_APROBADA].includes(estadoSolicitud.toString());
        const estadoPermiteConfirmacion = [import.meta.env.VITE_APP_ESTADO_SOLICITUD_ENTREGADA].includes(estadoSolicitud.toString());
        const estadoPermiteTerminado = [import.meta.env.VITE_APP_ESTADO_SOLICITUD_CONFIRMADA].includes(estadoSolicitud.toString());

        // CONTROLANDO CONDICIONES PARA OCULTAR BOTONES DEPENDIENDO LA POSICION DEL USUARIO
        const posicionId = permisosUsuarioLogueado.posicion_id ?? null;
        const mostrarBtnEnviarXPosicion = [import.meta.env.VITE_APP_POSICION_SOLICITANTE, import.meta.env.VITE_APP_POSICION_ADMINISTRADOR];
        const mostrarBtnAprobarXPosicion = [import.meta.env.VITE_APP_POSICION_DIRECTOR, import.meta.env.VITE_APP_POSICION_GERENTE_AREA, import.meta.env.VITE_APP_POSICION_ADMINISTRADOR];
        const mostrarBtnRechazarXPosicion = [import.meta.env.VITE_APP_POSICION_SOLICITANTE, import.meta.env.VITE_APP_POSICION_DESPACHO, import.meta.env.VITE_APP_POSICION_DIRECTOR, import.meta.env.VITE_APP_POSICION_GERENTE_AREA, import.meta.env.VITE_APP_POSICION_ADMINISTRADOR];
        const mostrarBtnEntregarXPosicion = [import.meta.env.VITE_APP_POSICION_DESPACHO, import.meta.env.VITE_APP_POSICION_ADMINISTRADOR];
        const mostrarBtnConfirmarXPosicion = [import.meta.env.VITE_APP_POSICION_SOLICITANTE, import.meta.env.VITE_APP_POSICION_ADMINISTRADOR];
        const mostrarBtnTerminarXPosicion = [import.meta.env.VITE_APP_POSICION_ADMINISTRADOR, import.meta.env.VITE_APP_POSICION_DIRECTOR, import.meta.env.VITE_APP_POSICION_GERENTE_AREA, import.meta.env.VITE_APP_POSICION_DESPACHO, import.meta.env.VITE_APP_POSICION_SOLICITANTE, import.meta.env.VITE_APP_POSICION_ADMINISTRADOR];

        //CONDICIONES NECESARIAS 
        const noNostrarBtnRechazarSolicitanteAprobada = !(
            (
                estadoSolicitud === import.meta.env.VITE_APP_ESTADO_SOLICITUD_APROBADA ||
                estadoSolicitud === import.meta.env.VITE_APP_ESTADO_SOLICITUD_PENDIENTE
            ) &&
            posicionId.toString() === import.meta.env.VITE_APP_POSICION_SOLICITANTE
        )

        // ESTA ES LA CONFIGURACION DE LOS BOTONES USUANDO LAS CONDICIONES ANTERIORES
        const botonesCondiciones = {
            btnEnviar: tieneSolicitudValida && estadoPermiteEnvio && permisosUsuarioLogueado.enviar_solicitud && mostrarBtnEnviarXPosicion.includes(posicionId.toString()),
            btnAprobar: tieneSolicitudValida && estadoPermiteAprobacion && permisosUsuarioLogueado.aprobar_solicitud && mostrarBtnAprobarXPosicion.includes(posicionId.toString()),
            btnRechazar: tieneSolicitudValida && estadoPermiteRechazo && permisosUsuarioLogueado.rechazar_solicitud && mostrarBtnRechazarXPosicion.includes(posicionId.toString()) && noNostrarBtnRechazarSolicitanteAprobada,
            btnEntregar: tieneSolicitudValida && estadoPermiteEntrega && permisosUsuarioLogueado.entregar_solicitud && mostrarBtnEntregarXPosicion.includes(posicionId.toString()),
            btnConfirmar: tieneSolicitudValida && estadoPermiteConfirmacion && permisosUsuarioLogueado.confirmar_solicitud && mostrarBtnConfirmarXPosicion.includes(posicionId.toString()),
            btnTerminar: tieneSolicitudValida && estadoPermiteTerminado && permisosUsuarioLogueado.confirmar_solicitud && mostrarBtnTerminarXPosicion.includes(posicionId.toString())
        };

        setCondiciones(botonesCondiciones);
    }

    const ejecutarAcciones = (accion = '') => {

        const acciones = {
            nueva: import.meta.env.VITE_APP_ESTADO_SOLICITUD_NUEVA,
            enviar: import.meta.env.VITE_APP_ESTADO_SOLICITUD_PENDIENTE,
            aprobar: import.meta.env.VITE_APP_ESTADO_SOLICITUD_APROBADA,
            rechazar: import.meta.env.VITE_APP_ESTADO_SOLICITUD_RECHAZADA,
            entregar: import.meta.env.VITE_APP_ESTADO_SOLICITUD_ENTREGADA,
            confirmar: import.meta.env.VITE_APP_ESTADO_SOLICITUD_CONFIRMADA,
            terminada: import.meta.env.VITE_APP_ESTADO_SOLICITUD_TERMINADA,
        }

        if (acciones[accion]) {
            actualizarFormulario('id_estado_solicitud', acciones[accion]);
            enviar();
        } else {
            console.error(`Acción '${accion}' no válida.`);
        }

        cambiarEstadoSolicitud(true);
    }

    const hacerNota = () => {
        // console.log(parametros);
        const usuario = obtenerDatosDelLocalStorage(import.meta.env.VITE_APP_LOCALSTORAGE_NOMBRE);
        dispatchNotas({ type: "mostrarNotas", payload: { mostrar: true } });
        dispatchNotas({ type: 'mostrarFormularioNotas', payload: { mostrarFormulario: true } });
        dispatchNotas({ type: "actualizarFormulario", payload: { id: 'no_documento', value: state.formulario.no_documento } });
        dispatchNotas({ type: "actualizarFormulario", payload: { id: 'id_documento', value: state.formulario.id_cabecera_solicitud } });
        dispatchNotas({ type: "actualizarFormulario", payload: { id: 'usuario_destino', value: state.formulario.creado_por } });
        dispatchNotas({ type: "actualizarFormulario", payload: { id: 'creado_por', value: usuario.account.username } });
    };

    const confirmarAccion = (accionBoton) => {

        setAccion(accionBoton);
        
        if(accionBoton !== 'rechazar') {
            
            const usuarioAprobadorId = state.formulario.id_usuario_responsable;
            const clasificacionId = state.formulario.id_clasificacion;

            const validarUsuarioResponsable = state.comboUsuariosAprobadores.find(usuario => usuario.id_usuario_ci === usuarioAprobadorId)
            // const validarClasificacion = state.comboClasificaciones.find(clasificacion => clasificacion.id_clasificacion === clasificacionId);

            if (!state.formulario.comentario) {
                dispatchModalAlerta({ type: 'mostrarModalAlerta', payload: { mensaje: '<div style="font-size: 20px; font-weight: 600; text-align: center;">El comentario es obligatorio.</div>', mostrar: true, tamano: 'md' } })
                return;
            }

            if (state.formulario.comentario.length < 10) {
                dispatchModalAlerta({ type: 'mostrarModalAlerta', payload: { mensaje: '<div style="font-size: 20px; font-weight: 600; text-align: center;">Por favor, ingresa un comentario de al menos 10 carácteres.</div>', mostrar: true, tamano: 'md' } })
                return;
            }

            if (!validarUsuarioResponsable) {
                dispatchModalAlerta({ type: 'mostrarModalAlerta', payload: { mensaje: '<div style="font-size: 20px; font-weight: 600; text-align: center;">El usuario responsable podría estar inhabilitado. Por favor, comuníquese con el administrador o rechaze la solicitud.</div>', mostrar: true, tamano: 'md' } })
                return;
            }

            // if (!validarClasificacion) {
            //     dispatchModalAlerta({ type: 'mostrarModalAlerta', payload: { mensaje: '<div style="font-size: 20px; font-weight: 600; text-align: center;">La clasificación puede estar inhabilitado. Por favor, comuníquese con el administrador o rechaze la solicitud.</div>', mostrar: true, tamano: 'md' } })
            //     return;
            // }
    
            if (state.lineas.length === 0 || state.formulario.total === 0) {
                dispatchModalAlerta({ type: 'mostrarModalAlerta', payload: { mensaje: '<div style="font-size: 20px; font-weight: 600; text-align: center;">No hay productos disponibles para enviar, o los productos no tienen precio unitario definidos, por favor verifique.</div>', mostrar: true, tamano: 'sm' } })
                return;
            }
    
            if ((state.lineas.length > 0) && (state.formulario.total > state.limiteAprobacion)) {
                dispatchModalAlerta({ type: 'mostrarModalAlerta', payload: { mensaje: '<div style="font-size: 20px; font-weight: 600; text-align: center;">El total del consumo supera al limite que puede aprobar el usuario aprobador. Por favor delegue su solicitud a otra persona.</div>', mostrar: true, tamano: 'md' } })
                return;
            }

        }

        // MOSTRAR NOTAS CUANDO SE VA A RECHAZAR LAS SOLICITUDES
        if (accionBoton === 'rechazar') {
            dispatchModalConfirmacion({ type: 'mostrarModalConfirmacion', payload: { mostrar: true, mensaje: 'Antes de proceder con esta operación, por favor, deje una nota justificativa explicando los motivos.', funcionEjecutar: () => hacerNota() } })
            setCantidadNotas(stateNotas.notas.length);
            return;
        }

        dispatchModalConfirmacion({ type: 'mostrarModalConfirmacion', payload: { mostrar: true, mensaje: 'Desea usted realizar esta acción?', funcionEjecutar: () => ejecutarAcciones(accionBoton) } })
    }

    useEffect(() => {
        if (accion === 'rechazar') {
            if (!stateNotas.mostrarFormulario) {
                if (cantidadNotas !== stateNotas.length) {
                    ejecutarAcciones(accion);
                }
            }
        }
    }, [stateNotas.notas]);

    useEffect(() => {
        const bloquear = state.lineas.length === 0;
        setBloquearBotonesAcciones(bloquear);
    }, [state.lineas])

    useEffect(() => {
        setBloquearBotonesAcciones(state.estadoCambiado);
    }, [state])

    return (
        <div style={{ float: 'right' }}>
            {/* <Button disabled={bloquearBotonesAcciones} hidden={!condiciones.btnNuevo} onClick={() => confirmarAccion('nueva')} className="m-1"><Icon.Plus /> {' '}  Nueva Solicitud </Button> */}
            <Button disabled={bloquearBotonesAcciones} hidden={!condiciones.btnRechazar} onClick={() => confirmarAccion('rechazar')} className="m-1"><Icon.Ban /> {' '} Rechazar Solicitud </Button>
            <Button disabled={bloquearBotonesAcciones} hidden={!condiciones.btnEnviar} onClick={() => confirmarAccion('enviar')} className="m-1"><Icon.CardChecklist /> {' '}   Enviar Solicitud </Button>
            <Button disabled={bloquearBotonesAcciones} hidden={!condiciones.btnAprobar} onClick={() => confirmarAccion('aprobar')} className="m-1"><Icon.Check /> {' '} Aprobar Solicitud </Button>
            <Button disabled={bloquearBotonesAcciones} hidden={!condiciones.btnConfirmar} onClick={() => confirmarAccion('confirmar')} className="m-1"><Icon.CheckCircleFill /> {' '}   Confirmar Solicitud </Button>
            <Button disabled={bloquearBotonesAcciones} hidden={!condiciones.btnEntregar} onClick={() => confirmarAccion('entregar')} className="m-1"><Icon.Floppy2Fill /> {' '} Entregar </Button>
            {/* <Button disabled={bloquearBotonesAcciones} hidden={!condiciones.btnTerminar} onClick={() => confirmarAccion('terminada')} className="m-1"><Icon.Floppy2Fill /> {' '}   Registrar </Button> */}
        </div>
    );
}
