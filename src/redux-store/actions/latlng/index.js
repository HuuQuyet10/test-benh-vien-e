import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyAer59wrsbcnw7kbl0UaHp6w8zv_u3ZanI");

// set response language. Defaults to english.
Geocode.setLanguage("en");

// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
Geocode.setRegion("es");

// Enable or disable logs. Its optional.
Geocode.enableDebug();


function updateData(data) {
    return (dispatch) => {
        dispatch({
            type: "LATLNG-UPDATE-DATA",
            data: data,
        });
    };
}

function getLatLon(address, latlngs = {}) {
    return (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            if (latlngs[address])
                resolve({
                    address: address,
                    location: latlngs[address]
                });
            else {
                let x = await Geocode.fromAddress(address).then(s => {
                    if (s && s.status === "OK") {
                        return s
                    }
                }).catch(e => { });
                resolve({
                    address,
                    location: x && x.results[0].geometry.location
                })
            }
        })
    }

}

function loadLocation(addresss = []) {
    return (dispatch, getState) => {
        let latlngs = getState().latlng.latlngs || {};

        Promise.all(addresss.map(item => dispatch(getLatLon(item, latlngs)))).then(values => {
            let obj = { ...latlngs }
            values.forEach(item => {
                obj[item.address] = item.location;
            });
            console.log(latlngs);
            dispatch(updateData({
                latlngs: obj
            }))
        });
    }
}

export default {
    loadLocation,
    updateData
}