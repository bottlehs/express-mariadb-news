module.exports = (app) => {
  const passport = require("passport");
  const users = require("../controllers/users.controller.js");

  var router = require("express").Router();

  /**
   * @swagger
   * definitions:
   *   User:
   *     type: object
   *     required:
   *       - email
   *       - password
   *       - username
   *       - firstname
   *       - lastname
   *       - languege
   *       - country
   *     properties:
   *       email:
   *         type: string
   *       password:
   *         type: string
   *       username:
   *         type: string
   *       firstname:
   *         type: string
   *       lastname:
   *         type: string
   *       languege:
   *         type: string
   *       country:
   *         type: string
   *   ResUser:
   *     type: object
   *     properties:
   *       id:
   *         type: number
   *       email:
   *         type: string
   *       username:
   *         type: string
   *       firstname:
   *         type: string
   *       lastname:
   *         type: string
   *       languege:
   *         type: string
   *       country:
   *         type: string
   *       createdAt:
   *         type: string
   *       updateAt:
   *         type: string
   */

  /**
   * @swagger
   * tags:
   *   name: User
   *   description: 회원
   */

  /**
   * @swagger
   * /api/users:
   *   post:
   *     summary: 회원 등록
   *     description: 회원 등록
   *     tags: [User]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: param
   *         description: param
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/User'
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           $ref: '#/definitions/ResUser'
   *       201:
   *         $ref: '#/components/res/Created'
   *       204:
   *         $ref: '#/components/res/NoContent'
   *       400:
   *         $ref: '#/components/res/BadRequest'
   *       401:
   *         $ref: '#/components/res/Unauthorized'
   *       404:
   *         $ref: '#/components/res/NotFound'
   *       409:
   *         $ref: '#/components/res/Conflict'
   *       500:
   *         $ref: '#/components/res/InternalServerError'
   */

  router.post("/", users.create);

  /**
   * @swagger
   * /api/users:
   *   get:
   *     summary: 회원 전체 조회
   *     description: 회원 전체 조회
   *     tags: [User]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: email
   *         description: email
   *         in: query
   *       - name: page
   *         description: page
   *         in: query
   *       - name: size
   *         description: size
   *         in: query
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/ResUser'
   *       201:
   *         $ref: '#/components/res/Created'
   *       204:
   *         $ref: '#/components/res/NoContent'
   *       400:
   *         $ref: '#/components/res/BadRequest'
   *       401:
   *         $ref: '#/components/res/Unauthorized'
   *       404:
   *         $ref: '#/components/res/NotFound'
   *       409:
   *         $ref: '#/components/res/Conflict'
   *       500:
   *         $ref: '#/components/res/InternalServerError'
   */
  router.get("/", users.findAll);

  /**
   * @swagger
   * /api/users/{id}:
   *   get:
   *     summary: 회원 단건 조회
   *     description: 회원 단건 조회
   *     tags: [User]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: ID
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           $ref: '#/definitions/ResUser'
   *       201:
   *         $ref: '#/components/res/Created'
   *       204:
   *         $ref: '#/components/res/NoContent'
   *       400:
   *         $ref: '#/components/res/BadRequest'
   *       401:
   *         $ref: '#/components/res/Unauthorized'
   *       404:
   *         $ref: '#/components/res/NotFound'
   *       409:
   *         $ref: '#/components/res/Conflict'
   *       500:
   *         $ref: '#/components/res/InternalServerError'
   */
  router.get("/:id", users.findOne);

  /**
   * @swagger
   * /api/users/{id}:
   *   put:
   *     security:
   *       - bearerToken: []
   *     summary: 회원 수정
   *     description: 회원 수정
   *     tags: [User]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: ID
   *         schema:
   *           type: integer
   *       - name: param
   *         description: param
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/User'
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           $ref: '#/definitions/ResUser'
   *       201:
   *         $ref: '#/components/res/Created'
   *       204:
   *         $ref: '#/components/res/NoContent'
   *       400:
   *         $ref: '#/components/res/BadRequest'
   *       401:
   *         $ref: '#/components/res/Unauthorized'
   *       404:
   *         $ref: '#/components/res/NotFound'
   *       409:
   *         $ref: '#/components/res/Conflict'
   *       500:
   *         $ref: '#/components/res/InternalServerError'
   */
  router.put(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    users.update
  );

  /**
   * @swagger
   * /api/users/{id}:
   *   delete:
   *     security:
   *       - bearerToken: []
   *     summary: 회원 삭제
   *     description: 회원 삭제
   *     tags: [User]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: ID
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: OK
   *       201:
   *         $ref: '#/components/res/Created'
   *       204:
   *         $ref: '#/components/res/NoContent'
   *       400:
   *         $ref: '#/components/res/BadRequest'
   *       401:
   *         $ref: '#/components/res/Unauthorized'
   *       404:
   *         $ref: '#/components/res/NotFound'
   *       409:
   *         $ref: '#/components/res/Conflict'
   *       500:
   *         $ref: '#/components/res/InternalServerError'
   */
  router.delete(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    users.delete
  );

  /**
   * @swagger
   * /api/users:
   *   delete:
   *     security:
   *       - bearerToken: []
   *     summary: 회원 전체 삭제
   *     description: 회원 전체 삭제
   *     tags: [User]
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: OK
   *       201:
   *         $ref: '#/components/res/Created'
   *       204:
   *         $ref: '#/components/res/NoContent'
   *       400:
   *         $ref: '#/components/res/BadRequest'
   *       401:
   *         $ref: '#/components/res/Unauthorized'
   *       404:
   *         $ref: '#/components/res/NotFound'
   *       409:
   *         $ref: '#/components/res/Conflict'
   *       500:
   *         $ref: '#/components/res/InternalServerError'
   */
  router.delete("/", users.deleteAll);

  app.use("/api/users", router);
};
