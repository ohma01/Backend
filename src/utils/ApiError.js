// In order to make our api respone more structured, node gives us error classes
// which we can extends and make use of it 

class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ) {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.success = false;
        this.errors = errors;
        
        // Use the provided stack trace if available, otherwise generate a new one (excluding this constructor from the trace)
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export { ApiError }