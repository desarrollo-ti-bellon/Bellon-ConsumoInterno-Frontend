import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { obtenerRutas } from "../FuncionesGlobales";

export default function ListadoLinks() {

    const urls = obtenerRutas();
    const [params] = useSearchParams();

    return (
        <>
            <Breadcrumb style={{ display: (params.get('modo') === 'vista' ? 'none' : 'block') }}>
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
