import Alertas from "../../ComponentesGlobales/Alertas";
import { InicioProveedor } from "./Controles/InicioProveedor";
import InicioVista from "./Vistas/InicioVista";

export default function Inicio() {
    return (
        <InicioProveedor>
            <Alertas />
            <InicioVista />
        </InicioProveedor>
    )
}
