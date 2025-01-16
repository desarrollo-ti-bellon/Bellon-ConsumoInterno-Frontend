import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { obtenerRutas } from "../FuncionesGlobales";

export default function ListadoLinks() {

    const urls = obtenerRutas();

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item
                    href="/bellon"
                    className="mt-2 mb-2 display-10 text-capitalize fw-medium"
                >
                    inicio
                </Breadcrumb.Item>
                {urls?.map((url) => (
                    <Breadcrumb.Item
                        key={url.descripcion}
                        href={url.ruta}
                        className="mt-2 mb-2 display-10 text-capitalize fw-medium"
                    >
                        {url.descripcion}
                    </Breadcrumb.Item>
                ))}
            </Breadcrumb>
        </>
    );
}
