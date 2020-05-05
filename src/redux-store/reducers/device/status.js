import constants from '@strings'
import clientUtils from '@utils/client-utils';

const reducer = (state = {
    list_name: []
}, action) => {
    let newState = { ...state }
    switch (action.type) {
        case 'DEVICE-STATUS-UPDATE-DATA':
            newState = { ...state, ...action.data || {} }
            return newState;
        default:
            return state
    }

}
export default reducer
