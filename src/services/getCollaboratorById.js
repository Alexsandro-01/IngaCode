const Errors = require('../errors/Errors');
const CollaboratorModel = require('../models/Collaborators.model');

async function getCollaboratorById(id) {
  try {
    const user = await CollaboratorModel.findOne({
      $and: [
        { _id: id },
        { DeletedAt: null },
      ],
    });

    return user;
  } catch (error) {
    Errors.InternalServerError();
  }
}

module.exports = getCollaboratorById;