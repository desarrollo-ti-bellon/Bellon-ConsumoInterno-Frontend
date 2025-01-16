import React, { Suspense } from 'react'
import { Col } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import Cargando from './Cargando'

export default function Cuerpo() {
    return (
        <Col style={{ position: "absolute", top: "75px", paddingBottom: 75 }}>
            <Suspense fallback={<Cargando />}>
                <Outlet />
            </Suspense>
        </Col>
    )
}
