'use strict';


function findAllPublished(Document) {
  Document.findAllPublished = () => {
    return Document.findAll({
      where: {
        $and: [
          { published: true },
          { removed: false }
        ]
      }
    });
  };
}


module.exports = findAllPublished;
