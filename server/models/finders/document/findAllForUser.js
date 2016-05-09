'use strict';


function findAllForUser(Document) {
  Document.findAllForUser = (userId) => {
    return Document.findAll({
      where: {
        $and: [
          {
            $or: [
              // Owner is the current user, or the document is published.
              { ownerId: userId },
              { published: true }
            ]
          },
          // Never include removed documents.
          { removed: false }
        ]
      }
    });
  };
}


module.exports = findAllForUser;
