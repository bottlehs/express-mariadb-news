module.exports = (app) => {
  const passport = require("passport");
  const categories = require("../controllers/categories.controller.js");

  var router = require("express").Router();

  /**
   * @swagger
   * definitions:
   *   Category:
   *     type: object
   *     required:
   *       - name
   *       - backgroundColor
   *       - icon
   *     properties:
   *       name:
   *         type: string
   *       backgroundColor:
   *         type: string
   *       icon:
   *         type: string
   *   ResCategory:
   *     type: object
   *     properties:
   *       id:
   *         type: number
   *       name:
   *         type: string
   *       backgroundColor:
   *         type: string
   *       icon:
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
   *   name: Category
   *   description: 카테고리
   */

  /**
   * @swagger
   * /api/categories:
   *   post:
   *     security:
   *       - bearerToken: []
   *     summary: 카테고리 등록
   *     description: 카테고리 등록
   *     tags: [Category]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: param
   *         description: param
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Category'
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           $ref: '#/definitions/ResCategory'
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
    categories.create
  );

  /**
   * @swagger
   * /api/categories:
   *   get:
   *     summary: 카테고리 전체 조회
   *     description: 카테고리 전체 조회
   *     tags: [Category]
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
   *             $ref: '#/definitions/ResCategory'
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
  router.get("/", categories.findAll);

  /**
   * @swagger
   * /api/categories/{id}:
   *   get:
   *     summary: 카테고리 단건 조회
   *     description: 카테고리 단건 조회
   *     tags: [Category]
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
   *           $ref: '#/definitions/ResCategory'
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
  router.get("/:id", categories.findOne);

  /**
   * @swagger
   * /api/categories/{id}:
   *   put:
   *     security:
   *       - bearerToken: []
   *     summary: 카테고리 수정
   *     description: 카테고리 수정
   *     tags: [Category]
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
   *           $ref: '#/definitions/Category'
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           $ref: '#/definitions/ResCategory'
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
    categories.update
  );

  /**
   * @swagger
   * /api/categories/{id}:
   *   delete:
   *     security:
   *       - bearerToken: []
   *     summary: 카테고리 삭제
   *     description: 카테고리 삭제
   *     tags: [Category]
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
    categories.delete
  );

  /**
   * @swagger
   * /api/categories:
   *   delete:
   *     security:
   *       - bearerToken: []
   *     summary: 카테고리 전체 삭제
   *     description: 카테고리 전체 삭제
   *     tags: [Category]
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
    categories.deleteAll
  );

  app.use("/api/categories", router);
};
