<template>
  <div class="edit">
    <div v-if="wait && id" class="d-flex justify-content-center mb-3">
      <b-spinner label="Loading..."></b-spinner>
    </div>
    <div v-else>
      <ValidationObserver v-slot="{ invalid }">
        <b-form @submit.prevent="onSubmit" @reset="onReset">
          <ValidationProvider
            ref="validationFormPostsId"
            :name="$t('comments_posts_id')"
            rules="required"
            v-slot="{ errors }"
          >
            <label>
              {{ $t("comments_posts_id") }}
              <input
                ref="formPostsId"
                type="text"
                v-model="form.postsId"
                :placeholder="$t('comments_posts_id')"
              />
              {{ errors[0] }}
            </label>
          </ValidationProvider>
          <ValidationProvider
            ref="validationFormUsersId"
            :name="$t('comments_users_id')"
            rules="required"
            v-slot="{ errors }"
          >
            <label>
              {{ $t("comments_users_id") }}
              <input
                ref="formUsersId"
                type="text"
                v-model="form.usersId"
                :placeholder="$t('comments_users_id')"
              />
              {{ errors[0] }}
            </label>
          </ValidationProvider>
          <ValidationProvider
            ref="validationFormParent"
            :name="$t('comments_parent')"
            rules="required"
            v-slot="{ errors }"
          >
            <label>
              {{ $t("comments_parent") }}
              <input
                ref="formParent"
                type="text"
                v-model="form.parent"
                :placeholder="$t('comments_parent')"
              />
              {{ errors[0] }}
            </label>
          </ValidationProvider>
          <ValidationProvider
            ref="validationFormContent"
            :name="$t('comments_content')"
            rules="required"
            v-slot="{ errors }"
          >
            <label>
              {{ $t("comments_content") }}
              <input
                ref="formContent"
                type="text"
                v-model="form.content"
                :placeholder="$t('comments_content')"
              />
              {{ errors[0] }}
            </label>
          </ValidationProvider>
          <ValidationProvider
            ref="validationFormType"
            :name="$t('comments_type')"
            rules="required"
            v-slot="{ errors }"
          >
            <label>
              {{ $t("comments_type") }}
              <input
                ref="formType"
                type="text"
                v-model="form.type"
                :placeholder="$t('comments_type')"
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
import CommentsService from "@/services/comments.service.js";

export default {
  name: "CommentsEdit",
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
       * formWait : 폼전송
       * formAction : 폼 액션
       * form : 폼
       */

      id: 0,
      wait: false,
      formWait: false,
      formAction: "",
      form: {
        /**
         * postsId: posts id (후보키)
         * usersId: users id (후보키)
         * parent: comments id (대댓글 부모키)
         * content: 내용
         * type: 유형
         */
        postsId: "",
        usersId: "",
        parent: "",
        content: "",
        type: ""
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
        postsId: this.form.postsId,
        usersId: this.form.usersId,
        parent: this.form.parent,
        content: this.form.content,
        type: this.form.type
      };

      if (this.id) {
        // 수정
        CommentsService.modify(this.id, params).then(
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
        CommentsService.add(params).then(
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

        CommentsService.remove(this.id).then(
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
      CommentsService.findOne(this.id).then(
        response => {
          const { data } = response;
          this.item = data;

          // form
          if (Object.prototype.hasOwnProperty.call(data, "postsId")) {
            this.form.postsId = data.postsId;
          }
          if (Object.prototype.hasOwnProperty.call(data, "usersId")) {
            this.form.usersId = data.usersId;
          }
          if (Object.prototype.hasOwnProperty.call(data, "parent")) {
            this.form.parent = data.parent;
          }
          if (Object.prototype.hasOwnProperty.call(data, "content")) {
            this.form.content = data.content;
          }
          if (Object.prototype.hasOwnProperty.call(data, "type")) {
            this.form.type = data.type;
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
