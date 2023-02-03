const initState = {
    themeId: 1,
}

export const themeReducer = (state = initState, action: changeThemeIdActionType): typeof initState => { // fix any
    switch (action.type) {
        // дописать
        case "SET_THEME_ID":
            return {
                ...state,
                themeId: action.id
            }
        default:
            return state
    }
}

type changeThemeIdActionType = {
    type: "SET_THEME_ID"
    id: number
}

export const changeThemeId = (id: number): changeThemeIdActionType => ({type: "SET_THEME_ID", id} as const) // fix any
