module.exports = (app) => {
  const passport = require("passport");
  const comments = require("../controllers/comments.controller.js");

  var router = require("express").Router();

  /**
   * @swagger
   * definitions:
   *   Comment:
   *     type: object
   *     required:
   *       - postsId
   *       - content
   *       - parent
   *     properties:
   *       postsId:
   *         type: number
   *       content:
   *         type: string
   *       parent:
   *         type: number
   *   ResComment:
   *     type: object
   *     properties:
   *       id:
   *         type: number
   *       postsId:
   *         type: number
   *       usersId:
   *         type: number
   *       parent:
   *         type: number
   *       content:
   *         type: string
   *       type:
   *         type: string
   *       ipAddress:
   *         type: string
   *       createdAt:
   *         type: string
   *       updateAt:
   *         type: string
   */

  /**
   * @swagger
   * tags:
   *   name: Comment
   *   description: 댓글
   */

  /**
   * @swagger
   * /api/comments:
   *   post:
   *     security:
   *       - bearerToken: []
   *     summary: 댓글 등록
   *     description: 댓글 등록
   *     tags: [Comment]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: param
   *         description: param
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Comment'
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           $ref: '#/definitions/ResComment'
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
    comments.create
  );

  /**
   * @swagger
   * /api/comments:
   *   get:
   *     summary: 댓글 전체 조회
   *     description: 댓글 전체 조회
   *     tags: [Comment]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: content
   *         description: content
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
   *             $ref: '#/definitions/ResComment'
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
  router.get("/", comments.findAll);

  /**
   * @swagger
   * /api/comments/{id}:
   *   get:
   *     summary: 댓글 단건 조회
   *     description: 댓글 단건 조회
   *     tags: [Comment]
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
   *           $ref: '#/definitions/ResComment'
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
  router.get("/:id", comments.findOne);

  /**
   * @swagger
   * /api/comments/{id}:
   *   put:
   *     security:
   *       - bearerToken: []
   *     summary: 댓글 수정
   *     description: 댓글 수정
   *     tags: [Comment]
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
   *           $ref: '#/definitions/Comment'
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           $ref: '#/definitions/ResComment'
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
    comments.update
  );

  /**
   * @swagger
   * /api/comments/{id}:
   *   delete:
   *     security:
   *       - bearerToken: []
   *     summary: 댓글 삭제
   *     description: 댓글 삭제
   *     tags: [Comment]
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
    comments.delete
  );

  /**
   * @swagger
   * /api/comments:
   *   delete:
   *     security:
   *       - bearerToken: []
   *     summary: 댓글 전체 삭제
   *     description: 댓글 전체 삭제
   *     tags: [Comment]
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
    comments.deleteAll
  );

  app.use("/api/comments", router);
};
