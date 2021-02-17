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
            :name="$t('inquires_users_id')"
            rules="required"
            v-slot="{ errors }"
          >
            <label>
              {{ $t("inquires_users_id") }}
              <input
                ref="formUsersId"
                type="text"
                v-model="form.usersId"
                :placeholder="$t('inquires_users_id')"
              />
              {{ errors[0] }}
            </label>
          </ValidationProvider>
          <ValidationProvider
            ref="validationFormQuestion"
            :name="$t('inquires_question')"
            rules="required"
            v-slot="{ errors }"
          >
            <label>
              {{ $t("inquires_question") }}
              <input
                ref="formQuestion"
                type="text"
                v-model="form.question"
                :placeholder="$t('inquires_question')"
              />
              {{ errors[0] }}
            </label>
          </ValidationProvider>
          <ValidationProvider
            ref="validationFormAnswer"
            :name="$t('inquires_answer')"
            rules="required"
            v-slot="{ errors }"
          >
            <label>
              {{ $t("inquires_answer") }}
              <input
                ref="formAnswer"
                type="text"
                v-model="form.answer"
                :placeholder="$t('inquires_answer')"
              />
              {{ errors[0] }}
            </label>
          </ValidationProvider>
          <ValidationProvider
            ref="validationFormStatus"
            :name="$t('inquires_status')"
            rules="required"
            v-slot="{ errors }"
          >
            <label>
              {{ $t("inquires_status") }}
              <input
                ref="formStatus"
                type="text"
                v-model="form.status"
                :placeholder="$t('inquires_status')"
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
import InquiresService from "@/services/inquires.service.js";

export default {
  name: "InquiresEdit",
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
         * question: 질문
         * answer: 답변
         * status: 상태
         */
        usersId: "",
        question: "",
        answer: "",
        status: ""
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
        question: this.form.question,
        answer: this.form.answer,
        status: this.form.status
      };

      if (this.id) {
        // 수정
        InquiresService.modify(this.id, params).then(
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
        InquiresService.add(params).then(
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

        InquiresService.remove(this.id).then(
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
      InquiresService.findOne(this.id).then(
        response => {
          const { data } = response;
          this.item = data;

          // form
          if (Object.prototype.hasOwnProperty.call(data, "usersId")) {
            this.form.usersId = data.usersId;
          }
          if (Object.prototype.hasOwnProperty.call(data, "question")) {
            this.form.question = data.question;
          }
          if (Object.prototype.hasOwnProperty.call(data, "answer")) {
            this.form.answer = data.answer;
          }
          if (Object.prototype.hasOwnProperty.call(data, "status")) {
            this.form.status = data.status;
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
