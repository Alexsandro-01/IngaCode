const Errors = require('../errors/Errors');
const CollaboratorModel = require('../models/Collaborators.model');

async function getAllCollaboratorsOnDB() {
  try {
    const collaborators = await CollaboratorModel.find({
      where: { DeletedAt: null },
    });

    return collaborators;
  } catch (error) {
    Errors.InternalServerError();
  }
}

module.exports = getAllCollaboratorsOnDB;