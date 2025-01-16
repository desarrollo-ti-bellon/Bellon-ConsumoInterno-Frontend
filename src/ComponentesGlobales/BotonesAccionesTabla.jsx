import React from "react";
import { Button } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

export default function BotonesAccionesTabla({ contexto }) {
    console.log(contexto);
    
 if (!contexto) {
       return;
 }

  const { ver, editar, eliminar } = contexto;

  return (
    <div>
      {ver && (
        <Button
          title="Ver línea"
          variant="info"
          style={{ marginLeft: 2 }}
          onClick={() => ver()}
        >
          {" "}
          <Icon.Eye size={15} />{" "}
        </Button>
      )}
      {editar && (
        <Button
          title="Editar línea"
          variant="warning"
          style={{ marginLeft: 2 }}
          onClick={() => editar()}
        >
          {" "}
          <Icon.Pencil size={15} />{" "}
        </Button>
      )}
      {eliminar && (
        <Button
          title="Eliminar línea"
          variant="outline-primary"
          style={{ marginLeft: 2 }}
          onClick={() => eliminar()}
        >
          {" "}
          <Icon.Trash size={15} />{" "}
        </Button>
      )}
    </div>
  );
}
