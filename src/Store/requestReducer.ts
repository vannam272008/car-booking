const initState = {
    requestList: [],
    success: true,
}

const requestReducer = (state = initState, action: { type: any; payload: any }) => {
    switch (action.type) {
        case 'SET_REQUEST_LIST':
            return {
                ...state,
                requestList: action.payload,
                success: false
            }
        default:
            return state
    }
}

export default requestReducer