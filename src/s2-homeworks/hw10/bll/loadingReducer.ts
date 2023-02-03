const initState = {
    isLoading: false
}

// reducer
export const loadingReducer = (state = initState, action: LoadingActionType): typeof initState => { // fix any
    switch (action.type) {
        // пишет студент  // need to fix
        case "CHANGE_LOADING":
            return {
                ...state,
                isLoading: action.isLoading
            }

        default:
            return state
    }
}
// types

type LoadingActionType = {
    type: "CHANGE_LOADING"
    isLoading: boolean
}
// action
export const loadingAC = (isLoading: boolean): LoadingActionType => ({
    type: "CHANGE_LOADING",
    isLoading,
} as const)
