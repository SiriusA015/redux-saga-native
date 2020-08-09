import Axios from 'axios';

export const getDataFromGivenUrl = (object: { url: string; callBack: (arg0: {}) => void; }) => {

    let response = {}

    Axios.get(object.url).then(res => {

        // success
        response = {
            payload: res?.data,
            error: undefined
        }

        object.callBack(response)
    })
        // catch error 
        .catch(err => {

            console.log('Error:', response)
            response = {
                payload: undefined,
                error: err
            }

            object.callBack(response)
            
        })
}