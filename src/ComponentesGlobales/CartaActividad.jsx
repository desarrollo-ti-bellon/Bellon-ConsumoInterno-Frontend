import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../ComponentesEstilos/CartaActividades.css'

const obtenerAnimacion = () => {
    const animaciones = ['', 'flippedX', 'flippedY'];
    let ramdom = Math.floor(Math.random() * 2) + 1;
    return animaciones[ramdom];
}

export default function CartaActividad({ actividad }) {

    const { titulo, cantidad, ruta, funcion } = actividad;

    const [voltearCartas, setVoltearCartas] = useState(false);
    const [animacion, setAnimacion] = useState('');

    useEffect(() => {
        console.log('hubo cambios')
        const tiempoFuera = setInterval(() => {
            setAnimacion(obtenerAnimacion);
            setVoltearCartas(!voltearCartas)
        }, 20000);
        return () => clearInterval(tiempoFuera);
    }, []);

    return (
        <Link to={ruta} style={{ textDecoration: 'none' }}>
            <Card
                className={`mb-4 rounded-1 shadow-sm text-center bg-card card card-flipped ${voltearCartas ? animacion : ''}`}
                style={{ width: "18rem", height: "10rem" }}
                onClick={() => funcion()}
            >
                <Card.Body>
                    <h3 className="my-0 fw-normal display-9 mb-2 text-white">{titulo}</h3>
                    <hr className="my-2" style={{ borderTop: "3px solid #fff" }} />
                    <h3 className="display-5 text-white"> {cantidad}</h3>
                </Card.Body>
            </Card>
        </Link>
    )
}
