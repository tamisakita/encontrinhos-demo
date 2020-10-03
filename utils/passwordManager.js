const bcrypt = require('bcryptjs');

const saltRounds = 10;

const generateEncryptedPassword = async password => {
  const salt = await bcrypt.genSalt(saltRounds);

  const encryptedPassword = bcrypt.hashSync(password, salt);

  return encryptedPassword;
};

// eslint-disable-next-line max-len
const verifyPassword = (password, encryptedPassword) => bcrypt.compareSync(password, encryptedPassword);

module.exports = {
  generateEncryptedPassword,
  verifyPassword,
};
