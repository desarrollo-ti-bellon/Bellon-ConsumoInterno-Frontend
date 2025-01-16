export const menuVerticalReducer = (state = estadoInicialMenuVertical, action) => {
    if (action.type === 'mostrarMenuVertical') {
        return { ...state, mostrar: action.payload.estado }
    }
    return state;
}