const db = require("../models");
const Comment = db.comments;
const Op = db.Sequelize.Op;
const Pagination = require("../utils/pagination");

// Create and Save a new Comments
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
  
  if (!req.body.postsId) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  } else {
    // Posts ID 유무 체크
    const Post = db.posts;
    Post.findByPk(req.body.postsId)
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

  if (!req.body.content) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  if (!req.body.parent) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  } else {
    // Comments ID 유무 체크
    const Comment = db.comments;
    Comment.findByPk(req.body.parent)
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

  // Create a Comment
  const comment = {
    postsId: req.body.postsId,
    usersId: req.body.usersId ? req.body.usersId : req.user.id,
    content: req.body.content,
    parent: req.body.parent,
    ipAddress: req.headers["x-forwarded-for"] || req.connection.remoteAddress,
  };

  // Save Comment in the database
  Comment.create(comment)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Comment.",
      });
    });
};

// Retrieve all Comments from the database.
exports.findAll = (req, res) => {
  const { page, size, content, postsId } = req.query;
  var condition = {};
  if (content) {
    condition.content = { [Op.like]: `%${content}%` };
  }

  if (postsId) {
    condition.postsId = { [Op.eq]: `${postsId}` };
  }

  const { limit, offset } = Pagination.getPagination(page, size);

  Comment.findAndCountAll({ where: condition, limit: limit, offset: offset })
    .then((data) => {
      const response = Pagination.getPagingData(data, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Comments.",
      });
    });
};

// Find a single Comment with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Comment.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Comment with id=" + id,
      });
    });
};

// Update a Comment by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Comment.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        Comment.findByPk(id)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error retrieving Comment with id=" + id,
            });
          });
      } else {
        res.send({
          message: `Cannot update Comment with id=${id}. Maybe Comment was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Comment with id=" + id,
      });
    });
};

// Delete a Comment with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Comment.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Comment was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Comment with id=${id}. Maybe Comment was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Comment with id=" + id,
      });
    });
};

// Delete all Comments from the database.
exports.deleteAll = (req, res) => {
  Comment.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Comments were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all comments.",
      });
    });
};

// find all published Comment
exports.findAllPublished = (req, res) => {
  Comment.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving comments.",
      });
    });
};
