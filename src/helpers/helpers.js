var { v4: uuidv4 } = require("uuid");

var helpers = {
  /**
   * Generate unique id using UUID v4 standard.
   *
   * @returns Unique id using UUID v4 standard.
   */
  generateUniqueId: () => {
    return uuidv4();
  },
  /**
   * Generate API Respose JSON using parameters provided
   *
   * @param {Object} res Response Object
   * @param {Object} req Request Object
   * @param {string} msg Message|Error or Message or Error. (general message, success message or error message. If want to send both message & error, use pipe separeted string.). Default is empty string.
   * @param {number} code HTTP Status Code. Default is 400.
   * @param {string[]} data Response Payload. Default is empty array.
   *
   * @returns {string} API Respose in JSON format
   */
  generateApiResponse: async function (
    res,
    req,
    msg = "",
    code = 400,
    result = []
  ) {
    var message = "";
    var error = "";
    var requestToken = null;

    if (msg === "" || msg.split("|").length <= 1) {
      message = msg;
      error = msg;
    } else {
      const messages = msg.split("|");
      message = messages[0];
      error = messages[1];
    }

    if (code === 200) {
      message = msg;
      error = "";
    }

    if (req != null && typeof req.query.request_token != "undefined") {
      requestToken = req.query.request_token;
    } else if (req != null && typeof req.body.request_token != "undefined") {
      requestToken = req.body.request_token;
    }
    // eslint-disable-next-line no-return-await
    return await res
      .status(code)
      .json({ request_token: requestToken, code, message, error, result });
  },
  logMessage: (msg = "Task completed successfully.") => {
    // eslint-disable-next-line no-console
    console.log(
      "\n----------------\nMessage Start\n----------------\nTimestamp: " +
        new Date(),
      "\n\n",
      msg,
      "\n----------------\nMessage End\n----------------\n"
    );
  },
};

module.exports = helpers;
