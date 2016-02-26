module.exports = (request, method, url) => {
  return request()[method](url)
    .expect(401);
};
