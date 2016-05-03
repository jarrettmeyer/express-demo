function toDocumentJson(doc) {
  return {
    abstract: doc.abstract,
    id: doc.id,
    originalFilename: doc.originalFilename,
    ownerId: doc.ownerId,
    published: doc.published,
    title: doc.title,
    type: doc.type
  };
}

module.exports = toDocumentJson;
