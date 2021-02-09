
const db = require("../models");
const Inquire = db.inquires;
const Op = db.Sequelize.Op;
const Pagination = require("../utils/pagination");

// Create and Save a new Inquire
exports.create = (req, res, next) => {
  // Validate request
  if (req.body.usersId) {
    // Users ID 유무 체크
    const User = db.users;
    User.findByPk(req.body.usersId)
      .then((data) => {
        if (!data) {
          res.status(400).send({
            message: "Content can not be empty!",
          });
          return;
        }
      })
      .catch((err) => {
        res.status(400).send({
          message: "Content can not be empty!",
        });
        return;
      });
  }

  if (!req.body.question) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  if (!req.body.answer) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Inquire
  const inquire = {
    usersId: req.body.usersId ? req.body.usersId : req.user.id,
    question: req.body.question,
    answer: req.body.answer,
    ipAddress: req.headers["x-forwarded-for"] || req.connection.remoteAddress,
  };

  // Save Inquire in the database
  Inquire.create(inquire)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Inquire.",
      });
    });
};

// Retrieve all Inquires from the database.
exports.findAll = (req, res) => {
  const { page, size, question } = req.query;
  var condition = question
    ? { question: { [Op.like]: `%${question}%` } }
    : null;

  const { limit, offset } = Pagination.getPagination(page, size);

  Inquire.findAndCountAll({ where: condition, limit: limit, offset: offset })
    .then((data) => {
      const response = Pagination.getPagingData(data, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving inquires.",
      });
    });
};

// Find a single Inquire with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Inquire.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Inquire with id=" + id,
      });
    });
};

// Update a Inquire by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Inquire.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        Inquire.findByPk(id)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error retrieving Inquire with id=" + id,
            });
          });
      } else {
        res.send({
          message: `Cannot update Inquire with id=${id}. Maybe Inquire was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Inquire with id=" + id,
      });
    });
};

// Delete a Inquire with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Inquire.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Inquire was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Inquire with id=${id}. Maybe Inquire was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Inquire with id=" + id,
      });
    });
};

// Delete all Inquires from the database.
exports.deleteAll = (req, res) => {
  Inquire.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Inquires were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all inquires.",
      });
    });
};

// find all published Inquire
exports.findAllPublished = (req, res) => {
  Inquire.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving inquires.",
      });
    });
};
