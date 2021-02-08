const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  // List of files to be processes. You can also set globs './routes/*.js'
  apis: ["./app/routes/*.js", "./api/models/*.js"],
  swaggerDefinition: {
    securityDefinitions: {
      bearerToken: {
        description:
          "The authorization header is expected to contain the Bearer token (a JWT prefixed with 'Bearer ') of the user whose favourite resources we are acting on.",
        type: "apiKey",
        name: "Authorization",
        in: "header",
      },
    },

    contact: {
      email: "dataguru_kr@nextinnovation.kr",
    },
    basePath: "/",
    // Like the one described here: https://swagger.io/specification/#infoObject

    info: {
      description: "swagger doc",
      swagger: "2.0",
      title: "API",
      version: "1.0.0",
    },
    components: {
      res: {
        Created: {
          description: "생성 완료",
          schema: {
            $ref: "#/components/errorResult/Error",
          },
        },
        NoContent: {
          description: "성공-본문없음",
          schema: {
            $ref: "#/components/errorResult/Error",
          },
        },
        BadRequest: {
          description: "유효성 검증 오류",
          schema: {
            $ref: "#/components/errorResult/Error",
          },
        },
        Unauthorized: {
          description: "인증 필요",
          schema: {
            $ref: "#/components/errorResult/Error",
          },
        },
        NotFound: {
          description: "존재하지 않는 API",
          schema: {
            $ref: "#/components/errorResult/Error",
          },
        },
        Conflict: {
          description: "중복 데이터 발생",
          schema: {
            $ref: "#/components/errorResult/Error",
          },
        },
        InternalServerError: {
          description: "서버 오류",
          schema: {
            $ref: "#/components/errorResult/Error",
          },
        },
      },
      errorResult: {
        Error: {
          type: "object",
          properties: {
            errMsg: {
              type: "string",
              description: "에러 메시지 전달.",
            },
          },
        },
      },
    },
    schemes: ["http", "https"], // 가능한 통신 방식,
    // 모델 정의 (Temp 모델에서 사용되는 속성 정의)
    definitions: {
      Temp: {
        type: "object",
        properties: {
          id: {
            type: "string",
          },
          age: {
            type: "integer",
          },
          addr: {
            type: "string",
          },
        },
      },
    },
  },
};

const specs = swaggerJsdoc(options);
console.log(specs);
export default specs;
