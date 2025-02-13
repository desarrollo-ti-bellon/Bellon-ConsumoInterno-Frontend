import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Alertas from '../ComponentesGlobales/Alertas'
import Cabecera from '../ComponentesGlobales/Cabecera'
import CargandoInformacion from '../ComponentesGlobales/CargandoInformacion'
import Cuerpo from '../ComponentesGlobales/Cuerpo'
import MenuVertical from '../ComponentesGlobales/MenuVertical'
import ModalAlerta from '../ComponentesGlobales/ModalAlerta'
import ModalConfirmacion from '../ComponentesGlobales/ModalConfirmacion'
import PiePagina from '../ComponentesGlobales/PiePagina'
import AlertaProveedor from '../ControlesGlobales/Alertas/AlertaProveedor'
import { CargandoInformacionProveedor } from '../ControlesGlobales/CargandoInformacion/cargandoInformacionProveedor'
import { ControlGeneralProveedor } from '../ControlesGlobales/ControlGeneral/ControlGeneralProveedor'
import MenuVerticalProveedor from '../ControlesGlobales/MenuVertical/menuVerticalProvedor'
import { ModalAlertaProveedor } from '../ControlesGlobales/ModalAlerta/ModalAlertaProveedor'
import { ModalConfirmacionProveedor } from '../ControlesGlobales/ModalConfirmacion/ModalConfirmacionProveedor'
import { ModalErrorRedireccionProveedor } from '../ControlesGlobales/ModalErrorRedireccion/ModalErrorRedireccionProveedor'
import { NotasProveedor } from '../ControlesGlobales/Notas/NotasProveedor'
import { TiempoFueraProveedor } from '../ControlesGlobales/TiempoFuera/TiempoFueraProveedor'

export default function PantallaPrincipal() {
    return (
        <TiempoFueraProveedor>
            <ControlGeneralProveedor>
                <MenuVerticalProveedor>
                    <AlertaProveedor>
                        <ModalAlertaProveedor>
                            <CargandoInformacionProveedor>
                                <ModalConfirmacionProveedor>
                                    <ModalErrorRedireccionProveedor>
                                        <NotasProveedor>
                                            <Container fluid>
                                                <Row>
                                                    <Col>
                                                        {/* COMPONENTES GlOBALES */}
                                                        <Cabecera />
                                                        <CargandoInformacion />
                                                        <MenuVertical />
                                                        <Alertas />
                                                        <CargandoInformacion />
                                                        <ModalConfirmacion />
                                                        <ModalAlerta />
                                                        {/* ------------------- */}
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    {/* COMPONENTES GlOBALES */}
                                                    <Cuerpo />
                                                    {/* -------------------- */}
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        {/* COMPONENTES GlOBALES */}
                                                        <PiePagina />
                                                        {/* -------------------- */}
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </NotasProveedor>
                                    </ModalErrorRedireccionProveedor>
                                </ModalConfirmacionProveedor>
                            </CargandoInformacionProveedor>
                        </ModalAlertaProveedor>
                    </AlertaProveedor >
                </MenuVerticalProveedor>
            </ControlGeneralProveedor >
        </TiempoFueraProveedor>
    )
}
