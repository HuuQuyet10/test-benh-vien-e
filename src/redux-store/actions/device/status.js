import statusProvider from "@data-access/status-provider";


function updateData(data) {
    return (dispatch) => {
        dispatch({
            type: "DEVICE-STATUS-UPDATE-DATA",
            data: data,
        });
    };
}

function getAllStatus() {
    return (dispatch, getState) => {
        statusProvider
            .search(1, 9999)
            .then((s) => {
                if (s.code == 0) {
                    dispatch(updateData({
                        list_status: s.data
                    }));
                }
            })
            .catch((e) => { });
    }
}

export default {
    getAllStatus,
    updateData
}