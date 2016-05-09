function findAllForDocument(ActivityLog) {
  ActivityLog.findAllForDocument = (docId) => {
    return ActivityLog.findAll({
      where: {
        refType: 'document',
        refId: docId
      }
    });
  };
}

module.exports = findAllForDocument;
