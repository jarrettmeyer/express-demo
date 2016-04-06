/**
 * getRoot
 *
 *    Returns the expected result for queries sent to /.
 */
function getRoot(request, response) {
  response.status(200).json({
    message: 'Welcome!'
  });
}
module.exports = getRoot;
