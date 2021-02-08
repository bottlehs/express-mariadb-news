module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comments", {
    postsId: {
      /**
       * posts id (후보키) */
      type: Sequelize.BIGINT(20),
      allowNull: false,
    },
    usersId: {
      /**
       * users id (후보키) */
      type: Sequelize.BIGINT(20),
      allowNull: false,
    },
    parent: {
      /**
       * comments id (대댓글 부모키) */
      type: Sequelize.BIGINT(20),
      allowNull: false,
    },
    content: {
      /**
       * 내용 */
      type: Sequelize.TEXT,
      allowNull: false,
    },
    type: {
      /**
       * 유형
       * text:글 */
      type: Sequelize.STRING(20),
      allowNull: false,
      defaultValue: "text",
    },
    ipAddress: {
      /**
       * 아이피주소 */
      type: Sequelize.STRING(100),
      allowNull: false,
    },
  });

  return Comment;
};
