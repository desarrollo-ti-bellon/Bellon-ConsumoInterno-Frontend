import { useContext, useEffect } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { cargandoInformacionContexto } from "../ControlesGlobales/CargandoInformacion/cargandoInformacionProveedor";

export default function CargandoInformacion() {

    const { state, dispatch } = useContext(cargandoInformacionContexto);

    useEffect(() => {
        if (!state.mostrar) {
            return;
        }
    })

    return (
        <Modal
            size="2xs"
            show={state.mostrar}
            onHide={() => dispatch({ type: "limpiarCargandoInformacion" })}
            centered
            keyboard={false}
            backdrop="static"
        >
            <Modal.Body
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Spinner
                    className="text-primary"
                    style={{ width: "3rem", height: "3rem" }}
                    role="status"
                />
            </Modal.Body>
        </Modal>
    );
}
