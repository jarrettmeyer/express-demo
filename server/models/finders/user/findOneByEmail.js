'use strict';


function findOneByEmail(User) {
  User.findOneByEmail = (email) => {
    return User.findOne({
      where: { email: email } 
    });
  };
}


module.exports = findOneByEmail;
