<template>
  <div class="edit">
    <div v-if="wait && id" class="d-flex justify-content-center mb-3">
      <b-spinner label="Loading..."></b-spinner>
    </div>
    <div v-else>
      <ValidationObserver v-slot="{ invalid }">
        <b-form @submit.prevent="onSubmit" @reset="onReset">
          <ValidationProvider
            ref="validationFormUsersId"
            :name="$t('posts_users_id')"
            rules="required|email"
            v-slot="{ errors }"
          >
            <label>
              {{ $t("posts_users_id") }}
              <input
                ref="formUsersId"
                type="text"
                v-model="form.usersId"
                :placeholder="$t('posts_users_id')"
              />
              {{ errors[0] }}
            </label>
          </ValidationProvider>
          <ValidationProvider
            ref="validationFormTitle"
            :name="$t('posts_title')"
            rules="required"
            v-slot="{ errors }"
          >
            <label>
              {{ $t("posts_title") }}
              <input
                ref="formTitle"
                type="text"
                v-model="form.title"
                :placeholder="$t('posts_title')"
              />
              {{ errors[0] }}
            </label>
          </ValidationProvider>
          <ValidationProvider
            ref="validationFormContent"
            :name="$t('posts_content')"
            rules="required"
            v-slot="{ errors }"
          >
            <label>
              {{ $t("posts_content") }}
              <input
                ref="formContent"
                type="text"
                v-model="form.content"
                :placeholder="$t('posts_content')"
              />
              {{ errors[0] }}
            </label>
          </ValidationProvider>
          <ValidationProvider
            ref="validationFormStatus"
            :name="$t('posts_status')"
            rules="required"
            v-slot="{ errors }"
          >
            <label>
              {{ $t("posts_status") }}
              <input
                ref="formStatus"
                type="text"
                v-model="form.status"
                :placeholder="$t('posts_status')"
              />
              {{ errors[0] }}
            </label>
          </ValidationProvider>
          <ValidationProvider
            ref="validationFormCommentsStatus"
            :name="$t('posts_comments_status')"
            rules="required"
            v-slot="{ errors }"
          >
            <label>
              {{ $t("posts_comments_status") }}
              <input
                ref="formCommentsStatus"
                type="text"
                v-model="form.commentsStatus"
                :placeholder="$t('posts_comments_status')"
              />
              {{ errors[0] }}
            </label>
          </ValidationProvider>
          <ValidationProvider
            ref="validationFormType"
            :name="$t('posts_type')"
            rules="required"
            v-slot="{ errors }"
          >
            <label>
              {{ $t("posts_type") }}
              <input
                ref="formType"
                type="text"
                v-model="form.type"
                :placeholder="$t('posts_type')"
              />
              {{ errors[0] }}
            </label>
          </ValidationProvider>
          <ValidationProvider
            ref="validationFormCommentsCount"
            :name="$t('posts_comments_count')"
            rules="required"
            v-slot="{ errors }"
          >
            <label>
              {{ $t("posts_comments_count") }}
              <input
                ref="formCommentsCount"
                type="text"
                v-model="form.commentsCount"
                :placeholder="$t('posts_comments_count')"
              />
              {{ errors[0] }}
            </label>
          </ValidationProvider>

          <b-button type="submit" :disabled="invalid || formWait">
            <b-spinner
              v-if="formWait && formAction == 'onSubmit'"
              small
            ></b-spinner
            >{{ id ? $t("modify") : $t("add") }}
          </b-button>
          <b-button type="reset" :disabled="formWait">{{
            $t("cancel")
          }}</b-button>
          <b-button
            v-if="id"
            type="button"
            @click.prevent.stop="remove"
            :disabled="formWait"
          >
            <b-spinner
              v-if="formWait && formAction == 'remove'"
              small
            ></b-spinner
            >{{ $t("remove") }}
          </b-button>
        </b-form>
      </ValidationObserver>
    </div>
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
       * formAction : 폼 액션
       * form : 폼
       */

      id: 0,
      wait: false,
      formWait: false,
      formAction: "",
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
    async onSubmit(evt) {
      evt.preventDefault();

      this.formWait = true;
      this.formAction = "onSubmit";

      let params = {
        usersId: this.form.usersId,
        title: this.form.title,
        content: this.form.content,
        status: this.form.status,
        commentsStatus: this.form.commentsStatus,
        type: this.form.type,
        commentsCount: this.form.commentsCount
      };

      if (this.id) {
        // 수정
        PostsService.modify(this.id, params).then(
          response => {
            const { data } = response;
            this.item = data;

            alert(this.$t("successful"));
            this.$router.go(-1);

            this.formWait = false;
          },
          error => {
            alert(this.$t("failure"));
            console.log(error);
          }
        );
      } else {
        // 등록
        PostsService.add(params).then(
          response => {
            const { data } = response;
            this.item = data;

            alert(this.$t("successful"));
            this.$router.go(-1);

            this.formWait = false;
          },
          error => {
            if (
              Object.prototype.hasOwnProperty.call(response.data, "message")
            ) {
              alert(response.data.message);
            } else {
              alert(this.$t("failure"));
            }
            console.log(error);
          }
        );
      }
    },
    onReset(evt) {
      evt.preventDefault();

      this.$router.go(-1);
    },
    remove() {
      if (confirm(this.$t("remove_text"))) {
        this.formWait = true;
        this.formAction = "remove";

        PostsService.remove(this.id).then(
          response => {
            const { data } = response;
            this.item = data;

            alert(this.$t("successful"));
            this.$router.go(-1);

            this.formWait = false;
          },
          error => {
            alert(this.$t("failure"));
            console.log(error);
          }
        );
      }
    },
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
