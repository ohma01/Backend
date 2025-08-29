// just like errors , in order to make our response more structural
// we have to create our ApiRespone class , node doesn't provide such thing

class ApiResponse {
    constructor(
        statusCode,
        data,
        message = "Success"
    ){
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        // usually less than 400 status code indicates request was successful or redirected
        this.success = statusCode < 400
    }
}

export {ApiResponse};