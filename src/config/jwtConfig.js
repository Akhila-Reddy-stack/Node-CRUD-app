// JWT authentication to secure the api
module.exports = {
    secret: process.env.JWT_SECRET_KEY,
    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    issuer: "",
    audiance: "",
};
