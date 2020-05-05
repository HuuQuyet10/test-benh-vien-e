import nameDeviceProvider from "@data-access/commercial-name-provider";


function updateData(data) {
    return (dispatch) => {
        dispatch({
            type: "DEVICE-NAME-UPDATE-DATA",
            data: data,
        });
    };
}

function getAllName() {
    return (dispatch, getState) => {
        nameDeviceProvider
            .search(1, 9999)
            .then((s) => {
                if (s.code == 0) {
                    dispatch(updateData({
                        list_name: s.data
                    }));
                }
            })
            .catch((e) => { });
    }
}

export default {
    getAllName,
    updateData
}