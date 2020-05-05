import { combineReducers } from 'redux'
import auth from './auth'
import device_status from './device/status'
import device_name from './device/name'
import latlng from './latlng'

export default combineReducers({
	auth,
	device_status,
	device_name,
	latlng
})