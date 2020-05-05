import constants from '@strings'
import clientUtils from '@utils/client-utils';

const reducer = (state = {
    list_status: []
}, action) => {
    let newState = { ...state }
    switch (action.type) {
        case 'DEVICE-NAME-UPDATE-DATA':
            newState = { ...state, ...action.data || {} }
            return newState;
        default:
            return state
    }

}
export default reducer
