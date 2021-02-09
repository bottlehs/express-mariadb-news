module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define("categories", {
    name: {
      /**
       * 카테고리명 */
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    backgroundColor: {
      /**
       * 카테고리 배경색(HEX) */
      type: Sequelize.STRING(10),
      allowNull: false,
    },
    icon: {
      /**
       * 카테고리 아이콘 */
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    status: {
      /**
       * 상태
       * publish : 공개 */
      type: Sequelize.STRING(20),
      allowNull: false,
      defaultValue: "publish",
    },
    ipAddress: {
      /**
       * 아이피주소 */
      type: Sequelize.STRING(100),
      allowNull: false,
    },
  });

  return Category;
};
