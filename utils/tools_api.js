
class UtilsApi {
    #request; #response; #next;

    constructor(req, res, next) {
        this.#request = req;
        this.#response = res;
        this.#next = next;
    }

    #interfaceErrorResponse(errorType, customeMessage = null){
        switch (errorType) {
            // error params
            case 1:
                return {
                    status_code: 200,
                    error_key: 'error_param',
                    message: 'Ketentuan Path Param / Query Param  untuk Pemanggilan API tidak sesuai'
                }
                // internal server error
            case 2:
                return {
                    status_code: 200,
                    error_key: 'error_internal_server',
                    message: customeMessage
                }
            case 3:
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

    ok200(data = null, message){
        console.info(this.#request.TAG,'RESP200',JSON.stringify(data));
        if(data === null){
            return this.#response.status(200).json({ status: 1, message })
        }else{
            return this.#response.status(200).json({ status: 1, data, message })
        }
    }

    nok200(type, customeMessage = null){
        console.info(customeMessage)
        const { status_code, error_key, message } = this.#interfaceErrorResponse(type, customeMessage);
        console.info(this.#request.TAG,'RESP200',JSON.stringify(`${type} = ${error_key} = ${message}`));
        return this.#response.status(status_code).json({ status: -1, error_key, message })
    }

    err422(message){
        return this.#response.status(422).json({ message })
    }

    requireParams(param, expects, callback_ok, callback_nok){
        let complete = true;
        expects.forEach(function(row){
            if(typeof param[row]==="undefined" || param[row] === null || param[row]===""){
                complete = false;
                return;
            }
        });
        if(complete) return callback_ok();
        else if(typeof callback_nok!=='undefined'){
            callback_nok()
        }else{
            this.err422('Parameter tidak lengkap');
        }
    }
}

module.exports = UtilsApi;
