import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useControlGeneral } from './useControlGeneral'
import * as Icon from 'react-bootstrap-icons'
import { cerrarAcceso } from '../../FuncionesGlobales';

export default function ControlGeneralModal() {

    const { state, cerrarModal, cargarPerfilUsuarioLogueado } = useControlGeneral();

    return (
        <>
            <Modal
                show={state.mostrar}
                onHide={() => cerrarModal()}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header >
                    <Modal.Title><Icon.InfoCircle size={25} />Bellon S.A.S</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{ Border: '1px solid red', backgroundColor: '#f8d7da', color: '#721c24', padding: '15px', margin: '20px', borderRadius: '5px' }}>
                        <strong>¡Error!</strong>
                        Usted no está registrado en esta aplicación. Por favor, contacte con la persona a cargo de su área.
                        <br /><br />
                        <strong>Pida el acceso al administrador y dele al boton refrescar.</strong>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={() => {
                            cerrarAcceso();
                        }}>
                        Cerrar Sesión
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            cargarPerfilUsuarioLogueado('recargar');
                            cerrarModal();
                        }}>
                        Refrescar
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    )
}
