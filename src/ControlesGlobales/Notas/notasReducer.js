import { EstadoInicialNotasModelo } from "./notasModelo"


export const notasReducer = (state = EstadoInicialNotasModelo, action) => {

    console.log(action)

    if (action.type === 'mostrarNotas') {
        return { ...state, mostrar: action.payload.mostrar }
    }

    if (action.type === 'mostrarFormularioNotas') {
        return { ...state, mostrarFormulario: action.payload.mostrarFormulario }
    }

    if (action.type === 'llenarNotas') {
        return { ...state, notas: action.payload.notas }
    }

    if (action.type === 'llenarComboUsuarios') {
        return { ...state, usuarios: action.payload.usuarios }
    }

    if (action.type === 'eliminarNota') {
        const actualizarNotas = state.notas.filter(nota => nota.id !== action.payload.id)
        return { ...state, notas: actualizarNotas }
    }

    if (action.type === 'agregarNota') {
        const index = state.notas.findIndex(nota => nota.id === action.payload.formulario.id);
        const copiaNotas = [...state.notas];
        
        if (index !== -1) {
            copiaNotas[index] = action.payload.formulario;
        } else {
            const nuevaNota = { ...action.payload.formulario, id: state.notas.length + 1 };
            copiaNotas.push(nuevaNota);
        }

        return { ...state, notas: copiaNotas };
    }

    if (action.type === 'actualizarFormulario') {
        return { ...state, formulario: { ...state.formulario, [action.payload.id]: action.payload.value } }
    }

    if (action.type === 'llenarFormulario') {
        return { ...state, formulario: action.payload.formulario }
    }

    if (action.type === 'limpiarFormulario') {
        return { ...state, formulario: { ...EstadoInicialNotasModelo.formulario } }
    }

    if (action.type === 'limpiarNotas') {
        return { ...EstadoInicialNotasModelo }
    }

    return state;
}