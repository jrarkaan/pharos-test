
class UtilsApi {
    #request; #response;

    constructor(req, res) {
        this.#request = req;
        this.#response = res;
    }

    #interfaceErrorResponse(errorType, customeMessage = null){
        switch (errorType) {
            // error params
            case 1 && customeMessage === null:
                return {
                    status_code: 200,
                    error_key: 'error_param',
                    message: 'Ketentuan Path Param / Query Param  untuk Pemanggilan API tidak sesuai'
                }
                // internal server error
            case 2 && customeMessage !== null :
                return {
                    status_code: 200,
                    error_key: 'error_internal_server',
                    message: customeMessage
                }
            case 3 && customeMessage === null :
                return {
                    status_code: 200,
                    error_key: 'error_id_not_found',
                    message: 'Error ID yang di supply tidak ada di database'
                }
            default :
                return {
                    status_code: 404,
                    error_key: 'error_request',
                    message: 'Upps! data tidak ditemukan'
                }
        }
    }

    ok200(data, message){
        console.info(req.TAG,'RESP200',JSON.stringify(data));
        return this.#response.status(200).json({ status: 1, data, message })
    }

    nok200(type, customeMessage){
        const { status_code, error_key, message } = this.#interfaceErrorResponse(type, customeMessage);
        console.info(req.TAG,'RESP200',JSON.stringify(`${type} = ${error_key} = ${message}`));
        return this.#response.status(status_code).json({ status: -1, error_key, message })
    }
}

module.exports = UtilsApi;
