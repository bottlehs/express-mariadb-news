module.exports = (app) => {
  const passport = require("passport");
  const posts = require("../controllers/posts.controller.js");

  var router = require("express").Router();

  /**
   * @swagger
   * definitions:
   *   Post:
   *     type: object
   *     required:
   *       - title
   *       - content
   *     properties:
   *       title:
   *         type: string
   *       content:
   *         type: string
   *   ResPost:
   *     type: object
   *     properties:
   *       id:
   *         type: number
   *       usersId:
   *         type: number
   *       title:
   *         type: string
   *       content:
   *         type: string
   *       status:
   *         type: string
   *       comments_status:
   *         type: string
   *       commentsCount:
   *         type: number
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
   *   name: Post
   *   description: 게시물
   */

  /**
   * @swagger
   * /api/posts:
   *   post:
   *     security:
   *       - bearerToken: []
   *     summary: 게시물 등록
   *     description: 게시물 등록
   *     tags: [Post]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: param
   *         description: param
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Post'
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           $ref: '#/definitions/ResPost'
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
    posts.create
  );

  /**
   * @swagger
   * /api/posts:
   *   get:
   *     summary: 게시물 전체 조회
   *     description: 게시물 전체 조회
   *     tags: [Post]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: title
   *         description: title
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
   *             $ref: '#/definitions/ResPost'
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
  router.get("/", posts.findAll);

  /**
   * @swagger
   * /api/posts/{id}:
   *   get:
   *     summary: 게시물 단건 조회
   *     description: 게시물 단건 조회
   *     tags: [Post]
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
   *           $ref: '#/definitions/ResPost'
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
  router.get("/:id", posts.findOne);

  /**
   * @swagger
   * /api/posts/{id}:
   *   put:
   *     security:
   *       - bearerToken: []
   *     summary: 게시물 수정
   *     description: 게시물 수정
   *     tags: [Post]
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
   *           $ref: '#/definitions/Post'
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           $ref: '#/definitions/ResPost'
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
    posts.update
  );

  /**
   * @swagger
   * /api/posts/{id}:
   *   delete:
   *     security:
   *       - bearerToken: []
   *     summary: 게시물 삭제
   *     description: 게시물 삭제
   *     tags: [Post]
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
    posts.delete
  );

  /**
   * @swagger
   * /api/posts:
   *   delete:
   *     security:
   *       - bearerToken: []
   *     summary: 게시물 전체 삭제
   *     description: 게시물 전체 삭제
   *     tags: [Post]
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
    posts.deleteAll
  );

  app.use("/api/posts", router);
};
