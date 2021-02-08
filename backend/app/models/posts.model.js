module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("posts", {
    usersId: {
      /**
       * users id (후보키) */
      type: Sequelize.BIGINT(20),
      allowNull: false,
    },
    title: {
      /**
       * 제목 */
      type: Sequelize.TEXT,
      allowNull: false,
    },
    content: {
      /**
       * 내용 */
      type: Sequelize.TEXT,
      allowNull: false,
    },
    status: {
      /**
       * 상태
       * publish:공개
       * */
      type: Sequelize.STRING(20),
      allowNull: false,
      defaultValue: "publish",
    },
    commentsStatus: {
      /**
       * 댓글 상태
       * open:댓글입력가능 */
      type: Sequelize.STRING(20),
      allowNull: false,
      defaultValue: "open",
    },
    type: {
      /**
       * 유형
       * text:글 */
      type: Sequelize.STRING(20),
      allowNull: false,
      defaultValue: "text",
    },
    commentsCount: {
      /**
       * 댓글수 */
      type: Sequelize.BIGINT(20),
      allowNull: false,
      defaultValue: 0,
    },
    ipAddress: {
      /**
       * 아이피주소 */
      type: Sequelize.STRING(100),
      allowNull: false,
    },
  });

  return Post;
};
