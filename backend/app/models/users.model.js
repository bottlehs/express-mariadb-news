module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define("users", {
    email: {
      /**
       * 이메일 */
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    password: {
      /**
       * 비밀번호 */
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    username: {
      /**
       * 회원이름 */
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    firstname: {
      /**
       * 이름 */
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    lastname: {
      /**
       * 성 */
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    languege: {
      /**
       * 언어 */
      type: Sequelize.STRING(20),
      allowNull: false,
      defaultValue: "ko",
    },
    country: {
      /**
       * 국가 */
      type: Sequelize.STRING(20),
      allowNull: false,
      defaultValue: "KO",
    },
    status: {
      /**
       * 상태
       * register:회원가입 */
      type: Sequelize.STRING(20),
      allowNull: false,
      defaultValue: "register",
    },
    role: {
      /**
       * 역할
       * USER:일반 회원
       * ADMIN:관리자 회원 */
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "USER",
    },
    ipAddress: {
      /**
       * 아이피주소 */
      type: Sequelize.STRING(100),
      allowNull: false,
    },
  });

  return user;
};
