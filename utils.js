const util = require('util');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.genHash = util.promisify(bcrypt.hash);
module.exports.checkPassword = util.promisify(bcrypt.compare);
module.exports.genJwtToken = util.promisify(jwt.sign);
module.exports.verifyToken = util.promisify(jwt.verify);
module.exports.jwtSecretKey = process.env.NYSL_SECRET_KEY;
