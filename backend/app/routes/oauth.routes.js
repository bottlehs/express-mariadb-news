module.exports = (app) => {
  const passport = require("passport");
  const oauth = require("../controllers/oauth.controller.js");

  var router = require("express").Router();

  /**
   * @swagger
   * definitions:
   *   Oauth:
   *     type: object
   *     required:
   *       - email
   *       - password
   *     properties:
   *       email:
   *         type: string
   *       password:
   *         type: string
   *   ResOauth:
   *     type: object
   *     properties:
   *       token:
   *         type: string
   *       refreshToken:
   *         type: string
   */

  /**
   * @swagger
   * tags:
   *   name: Oauth
   *   description: 인증
   */

  /**
   * @swagger
   * /api/oauth/token:
   *   post:
   *     summary: AccessToken 발급
   *     description: AccessToken 발급
   *     tags: [Oauth]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: param
   *         description: param
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Oauth'
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           $ref: '#/definitions/ResOauth'
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

  router.post("/login", oauth.create);

  app.use("/api/oauth", router);
};
