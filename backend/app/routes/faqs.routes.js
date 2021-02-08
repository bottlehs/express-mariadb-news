module.exports = (app) => {
  const passport = require("passport");
  const faqs = require("../controllers/faqs.controller.js");

  var router = require("express").Router();

  /**
   * @swagger
   * definitions:
   *   Faq:
   *     type: object
   *     required:
   *       - question
   *       - answer
   *     properties:
   *       question:
   *         type: string
   *       answer:
   *         type: string
   *   ResFaq:
   *     type: object
   *     properties:
   *       id:
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
   *   name: Faq
   *   description: 자주묻는질문
   */

  /**
   * @swagger
   * /api/faqs:
   *   post:
   *     security:
   *       - bearerToken: []
   *     summary: 자주묻는질문 등록
   *     description: 자주묻는질문 등록
   *     tags: [Faq]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: param
   *         description: param
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Faq'
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           $ref: '#/definitions/ResFaq'
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
    faqs.create
  );

  /**
   * @swagger
   * /api/faqs:
   *   get:
   *     summary: 자주묻는질문 전체 조회
   *     description: 자주묻는질문 전체 조회
   *     tags: [Faq]
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
   *             $ref: '#/definitions/ResFaq'
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
  router.get("/", faqs.findAll);

  /**
   * @swagger
   * /api/faqs/{id}:
   *   get:
   *     summary: 자주묻는질문 단건 조회
   *     description: 자주묻는질문 단건 조회
   *     tags: [Faq]
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
   *           $ref: '#/definitions/ResFaq'
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
  router.get("/:id", faqs.findOne);

  /**
   * @swagger
   * /api/faqs/{id}:
   *   put:
   *     security:
   *       - bearerToken: []
   *     summary: 자주묻는질문 수정
   *     description: 자주묻는질문 수정
   *     tags: [Faq]
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
   *           $ref: '#/definitions/Faq'
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           $ref: '#/definitions/ResFaq'
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
    faqs.update
  );

  /**
   * @swagger
   * /api/faqs/{id}:
   *   delete:
   *     security:
   *       - bearerToken: []
   *     summary: 자주묻는질문 삭제
   *     description: 자주묻는질문 삭제
   *     tags: [Faq]
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
    faqs.delete
  );

  /**
   * @swagger
   * /api/faqs:
   *   delete:
   *     security:
   *       - bearerToken: []
   *     summary: 자주묻는질문 전체 삭제
   *     description: 자주묻는질문 전체 삭제
   *     tags: [Faq]
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
    faqs.deleteAll
  );

  app.use("/api/faqs", router);
};
