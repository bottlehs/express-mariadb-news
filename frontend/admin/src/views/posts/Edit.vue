<template>
  <div class="edit">
    <div v-if="wait && id" class="d-flex justify-content-center mb-3">
      <b-spinner label="Loading..."></b-spinner>
    </div>
    <div v-else></div>
  </div>
</template>

<script>
/**
 * vuex
 */
import { mapGetters } from "vuex";

/**
 * service
 */
import PostsService from "@/services/posts.service.js";

export default {
  name: "PostsEdit",
  components: {
    /**
     * components
     */
  },
  data() {
    /**
     * data
     */
    return {
      /**
       * id : 단건 식별자
       * item : 응답 데이터
       * wait : 로딩
       * formWait : 폼 로딩
       * form : 폼
       */

      id: 0,
      wait: false,
      formWait: false,
      form: {
        /**
         * usersId: users id (후보키)
         * title: 제목
         * content: 내용
         * status: 상태
         * commentsStatus: 댓글 상태
         * type: 유형
         * commentsCount: 댓글수
         */
        usersId: "",
        title: "",
        content: "",
        status: "",
        commentsStatus: "",
        type: "",
        commentsCount: ""
      },
      item: {}
    };
  },
  created() {
    /**
     * created
     */
    if (
      Object.prototype.hasOwnProperty.call(
        this.$router.currentRoute.params,
        "id"
      )
    ) {
      this.id = this.$router.currentRoute.params.id;
      this.findOne();
    }
  },
  mounted() {
    /**
     * mounted
     */
  },
  computed: {
    /**
     * computed
     */
    ...mapGetters(["isAuthenticated"])
  },
  destroyed() {
    /**
     * destroyed
     */
  },
  methods: {
    /**
     * methods
     */
    findOne() {
      this.wait = true;
      PostsService.findOne(this.id).then(
        response => {
          const { data } = response;
          this.item = data;

          // form
          if (Object.prototype.hasOwnProperty.call(data, "usersId")) {
            this.form.usersId = data.usersId;
          }
          if (Object.prototype.hasOwnProperty.call(data, "title")) {
            this.form.title = data.title;
          }
          if (Object.prototype.hasOwnProperty.call(data, "content")) {
            this.form.content = data.content;
          }
          if (Object.prototype.hasOwnProperty.call(data, "status")) {
            this.form.status = data.status;
          }
          if (Object.prototype.hasOwnProperty.call(data, "commentsStatus")) {
            this.form.commentsStatus = data.commentsStatus;
          }
          if (Object.prototype.hasOwnProperty.call(data, "type")) {
            this.form.type = data.type;
          }
          if (Object.prototype.hasOwnProperty.call(data, "commentsCount")) {
            this.form.commentsCount = data.commentsCount;
          }

          this.wait = false;
        },
        error => {
          if (
            Object.prototype.hasOwnProperty.call(error.response.data, "message")
          ) {
            alert(response.data.message);
          }
          this.wait = false;
        }
      );
    }
  }
};
</script>

<style scoped></style>
