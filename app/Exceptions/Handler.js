"use strict";

const BaseExceptionHandler = use("BaseExceptionHandler");

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
    /**
     * Handle exception thrown during the HTTP lifecycle
     *
     * @method handle
     *
     * @param  {Object} error
     * @param  {Object} options.request
     * @param  {Object} options.response
     *
     * @return {void}
     */
    async handle(error, { request, response }) {
        response.status(error.status);
        let responseValue;
        switch (error.code || error.name) {
            
            case 'E_MISSING_DATABASE_ROW':
                responseValue = {
                    data: null
                }
                break;

            case 'E_VALIDATION_FAILED':
				responseValue = error.messages
				break;
            
            case 'HttpException':
                response.status(404)
			default:
			case 'E_JWT_TOKEN_EXPIRED':
			case "E_INVALID_JWT_TOKEN":
				responseValue = {
					errors: [
                        {
                            status: error.status,
                            code: error.code,
                            detail: error.message
                        }
                    ]
				};
        }
		if(error.code !== undefined || error.name !== undefined)
			response.send(responseValue);
		else
			return super.handle(...arguments)
    }

    /**
     * Report exception for logging or debugging.
     *
     * @method report
     *
     * @param  {Object} error
     * @param  {Object} options.request
     *
     * @return {void}
     */
    async report(error, { request }) {}
}

module.exports = ExceptionHandler;
