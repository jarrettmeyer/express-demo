function toOwnerJson(user) {
  return {
    displayName: user.displayName,
    email: user.email,
    id: user.id
  };
}

module.exports = toOwnerJson;
