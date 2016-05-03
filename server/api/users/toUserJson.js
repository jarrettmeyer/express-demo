function toUserJson(user) {
  return {
    admin: user.admin,
    displayName: user.displayName,
    email: user.email,
    id: user.id,
    removed: user.removed,
    tokenIssuedAt: user.tokenIssuedAt
  };
}

module.exports = toUserJson;
