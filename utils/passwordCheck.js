const bcrypt = require("bcrypt");
const usersModel = require("../model/user");

const passwordCheck = async (email, password) => {
    const userData = await usersModel.findOne({ where: { email: email } });
    const compare = await bcrypt.compare(password, userData.password);
    return {userData, compare};
}

module.exports = passwordCheck;