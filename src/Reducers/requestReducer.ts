import { setTab, setStatus } from "../Actions/requestAction";


type RequestState = {
    tab: string | null
    status: string | null
}

type RequestAction = ReturnType<typeof setTab | typeof setStatus>;

const initState: RequestState = {
    tab: '',
    status: ''
}

export const requestReducer = (state = initState, action: RequestAction): RequestState => {
    switch (action.type) {
        case 'SET_TAB':
            return {
                ...state,
                tab: action.payload
            }
        case 'SET_STATUS':
            return {
                ...state,
                status: action.payload
            }
        default:
            return state;
    }
}

