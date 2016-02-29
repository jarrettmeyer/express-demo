module.exports = [{
  email: 'admin@example.com',
  clearPassword: 'test',
  tokenIssuedAt: new Date(),
  admin: true,
  removed: false
}, {
  email: 'alice@example.com',
  clearPassword: 'test',
  tokenIssuedAt: new Date(),
  admin: false,
  removed: false
}, {
  email: 'betty@example.com',
  clearPassword: 'test',
  admin: false,
  removed: true,
  tokenIssuedAt: new Date()
}, {
  email: 'claire@example.com',
  clearPassword: 'test',
  tokenIssuedAt: new Date(),
  admin: false,
  removed: false
}, {
  email: 'dorothy@example.com',
  clearPassword: 'test',
  tokenIssuedAt: new Date(),
  admin: false,
  removed: false
}, {
  email: 'elizabeth@example.com',
  clearPassword: 'test',
  tokenIssuedAt: new Date(0),
  admin: false,
  removed: false
}];
