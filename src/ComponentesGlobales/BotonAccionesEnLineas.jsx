import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';

export default function BotonAccionesEnLineas({ contexto, parametros }) {

    if (!contexto) {
        return;
    }

    const { guardarLinea, revertirLinea } = useContext(contexto)
    return (
        <>
            <Button className='m-1' size='sm' title="Guardar línea" variant='primary' onClick={() => guardarLinea(parametros)}><Icon.Floppy2Fill /></Button>
            <Button className='m-1' size='sm' title="Revertir línea" variant='warning' onClick={() => revertirLinea(parametros)}><Icon.ArrowCounterclockwise /></Button>
        </>
    )

}
