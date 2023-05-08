
/**
 * @typedef {Object} ResponseContent
 * @property {boolean} success - Response success status
 * @property {number} code - Response code
 * @property {string} message - Response message
 * @property {Object} data - Response data
 * @property {Array<Object>} res - Express response object
 */

/**
 * @global
 * @param {ResponseContent} responseContent
 * @param {Object} res - Express response object
 * @returns {Object} Express response object
 * @description Sends a response to the client
 * @example
 * apiResponse({
 *    success: true,
 *    code: 200,
 *    message: 'API is working',
 *    data: { foo: 'bar' }
 * }, res);
 */
function apiResponse({success, code, message, data}, res) {
    res.json({
        success,
        code,
        message,
        data
    });
}

module.exports = apiResponse;