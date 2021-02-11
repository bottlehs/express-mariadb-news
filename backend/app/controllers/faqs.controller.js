const db = require("../models");
const Faq = db.faqs;
const Op = db.Sequelize.Op;
const Pagination = require("../utils/pagination");

// Create and Save a new Faq
exports.create = (req, res, next) => {
  // Validate request
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

  // Create a Faq
  const faq = {
    question: req.body.question,
    answer: req.body.answer,
    ipAddress: req.headers["x-forwarded-for"] || req.connection.remoteAddress,
  };

  // Save Faq in the database
  Faq.create(faq)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Faq.",
      });
    });
};

// Retrieve all Faqs from the database.
exports.findAll = (req, res) => {
  const { page, size, question } = req.query;
  var condition = question
    ? { question: { [Op.like]: `%${question}%` } }
    : null;

  const { limit, offset } = Pagination.getPagination(page, size);

  Faq.findAndCountAll({ where: condition, limit: limit, offset: offset })
    .then((data) => {
      const response = Pagination.getPagingData(data, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving faqs.",
      });
    });
};

// Find a single Faq with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Faq.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Faq with id=" + id,
      });
    });
};

// Update a Faq by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Faq.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        Faq.findByPk(id)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error retrieving Faq with id=" + id,
            });
          });
      } else {
        res.send({
          message: `Cannot update Faq with id=${id}. Maybe Faq was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Faq with id=" + id,
      });
    });
};

// Delete a Faq with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Faq.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Faq was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Faq with id=${id}. Maybe Faq was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Faq with id=" + id,
      });
    });
};

// Delete all Faqs from the database.
exports.deleteAll = (req, res) => {
  Faq.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Faqs were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all faqs.",
      });
    });
};

// find all published Faq
exports.findAllPublished = (req, res) => {
  Faq.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving faqs.",
      });
    });
};
