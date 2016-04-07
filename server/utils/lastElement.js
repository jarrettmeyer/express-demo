'use strict';
/**
 * lastElement
 *
 *    Returns the last element of an array.
 */
function lastElement(array) {
  if (!array || !array.length) {
    return undefined;
  }
  return array[array.length - 1];
}

module.exports = lastElement;
