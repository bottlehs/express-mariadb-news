module.exports = (app) => {
  const passport = require("passport");
  const inquires = require("../controllers/inquires.controller.js");

  var router = require("express").Router();

  /**
   * @swagger
   * definitions:
   *   Inquire:
   *     type: object
   *     required:
   *       - question
   *       - answer
   *     properties:
   *       question:
   *         type: string
   *       answer:
   *         type: string
   *   ResInquire:
   *     type: object
   *     properties:
   *       id:
   *         type: number
   *       usersId:
   *         type: number
   *       question:
   *         type: string
   *       answer:
   *         type: string
   *       status:
   *         type: string
   *       createdAt:
   *         type: string
   *       updateAt:
   *         type: string
   */

  /**
   * @swagger
   * tags:
   *   name: Inquire
   *   description: 문의하기
   */

  /**
   * @swagger
   * /api/inquires:
   *   post:
   *     security:
   *       - bearerToken: []
   *     summary: 문의하기 등록
   *     description: 문의하기 등록
   *     tags: [Inquire]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: param
   *         description: param
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Inquire'
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           $ref: '#/definitions/ResInquire'
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

  router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    inquires.create
  );

  /**
   * @swagger
   * /api/inquires:
   *   get:
   *     summary: 문의하기 전체 조회
   *     description: 문의하기 전체 조회
   *     tags: [Inquire]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: question
   *         description: question
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
   *             $ref: '#/definitions/ResInquire'
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
  router.get("/", inquires.findAll);

  /**
   * @swagger
   * /api/inquires/{id}:
   *   get:
   *     summary: 문의하기 단건 조회
   *     description: 문의하기 단건 조회
   *     tags: [Inquire]
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
   *           $ref: '#/definitions/ResInquire'
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
  router.get("/:id", inquires.findOne);

  /**
   * @swagger
   * /api/inquires/{id}:
   *   put:
   *     security:
   *       - bearerToken: []
   *     summary: 문의하기 수정
   *     description: 문의하기 수정
   *     tags: [Inquire]
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
   *           $ref: '#/definitions/Inquire'
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           $ref: '#/definitions/ResInquire'
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
    inquires.update
  );

  /**
   * @swagger
   * /api/inquires/{id}:
   *   delete:
   *     security:
   *       - bearerToken: []
   *     summary: 문의하기 삭제
   *     description: 문의하기 삭제
   *     tags: [Inquire]
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
    inquires.delete
  );

  /**
   * @swagger
   * /api/inquires:
   *   delete:
   *     security:
   *       - bearerToken: []
   *     summary: 문의하기 전체 삭제
   *     description: 문의하기 전체 삭제
   *     tags: [Inquire]
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
  router.delete(
    "/",
    passport.authenticate("jwt", { session: false }),
    inquires.deleteAll
  );

  app.use("/api/inquires", router);
};
