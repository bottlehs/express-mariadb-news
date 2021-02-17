<template>
  <div class="edit">
    <div v-if="wait && id" class="d-flex justify-content-center mb-3">
      <b-spinner label="Loading..."></b-spinner>
    </div>
    <div v-else>
      <ValidationObserver v-slot="{ invalid }">
        <b-form @submit.prevent="onSubmit" @reset="onReset">
          <ValidationProvider
            ref="validationFormEmail"
            :name="$t('user_email')"
            rules="required|email"
            v-slot="{ errors }"
          >
            <label>
              {{ $t("user_email") }}
              <input
                ref="formEmail"
                type="text"
                v-model="form.email"
                :placeholder="$t('user_email')"
              />
              {{ errors[0] }}
            </label>
          </ValidationProvider>
          <ValidationProvider
            ref="validationFormPassword"
            :name="$t('users_password')"
            rules="required"
            v-slot="{ errors }"
          >
            <label>
              {{ $t("users_password") }}
              <input
                ref="formPassword"
                type="password"
                v-model="form.password"
                :placeholder="$t('users_password')"
              />
              {{ errors[0] }}
            </label>
          </ValidationProvider>

          <ValidationProvider
            ref="validationFormFirstname"
            :name="$t('users_firstname')"
            rules="required"
            v-slot="{ errors }"
          >
            <label>
              {{ $t("users_firstname") }}
              <input
                ref="formFirstname"
                type="text"
                v-model="form.firstname"
                :placeholder="$t('users_firstname')"
              />
              {{ errors[0] }}
            </label>
          </ValidationProvider>
          <ValidationProvider
            ref="validationFormLastname"
            :name="$t('users_lastname')"
            rules="required"
            v-slot="{ errors }"
          >
            <label>
              {{ $t("users_lastname") }}
              <input
                ref="formLastname"
                type="text"
                v-model="form.lastname"
                :placeholder="$t('users_lastname')"
              />
              {{ errors[0] }}
            </label>
          </ValidationProvider>
          <ValidationProvider
            ref="validationFormUsername"
            :name="$t('users_username')"
            rules="required"
            v-slot="{ errors }"
          >
            <label>
              {{ $t("users_username") }}
              <input
                ref="formUsername"
                type="text"
                v-model="form.username"
                :placeholder="$t('users_username')"
              />
              {{ errors[0] }}
            </label>
          </ValidationProvider>
          <ValidationProvider
            ref="validationFormLanguege"
            :name="$t('users_languege')"
            rules="required"
            v-slot="{ errors }"
          >
            <label>
              {{ $t("users_languege") }}
              <input
                ref="formLanguege"
                type="text"
                v-model="form.languege"
                :placeholder="$t('users_languege')"
              />
              {{ errors[0] }}
            </label>
          </ValidationProvider>
          <ValidationProvider
            ref="validationFormCountry"
            :name="$t('users_country')"
            rules="required"
            v-slot="{ errors }"
          >
            <label>
              {{ $t("users_country") }}
              <input
                ref="formCountry"
                type="text"
                v-model="form.country"
                :placeholder="$t('users_country')"
              />
              {{ errors[0] }}
            </label>
          </ValidationProvider>
          <ValidationProvider
            ref="validationFormStatus"
            :name="$t('users_status')"
            rules="required"
            v-slot="{ errors }"
          >
            <label>
              {{ $t("users_status") }}
              <input
                ref="formStatus"
                type="text"
                v-model="form.status"
                :placeholder="$t('users_status')"
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
import UsersService from "@/services/users.service.js";

export default {
  name: "PurchasesEdit",
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
      item: {},
      wait: false,
      formWait: false,
      formAction: "",
      form: {
        /**
         * email : 이메일
         * password : 비밀번호
         * firstname : 이름
         * lastname : 성
         * username : 회원이름
         * languege : 언어
         * country : 국가
         * status : 상태
         */
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        username: "",
        languege: "",
        country: "",
        status: ""
      }
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
        email: this.form.email,
        password: this.form.password,
        firstname: this.form.firstname,
        lastname: this.form.lastname,
        username: this.form.username,
        languege: this.form.languege,
        country: this.form.country,
        status: this.form.status
      };

      if (this.id) {
        // 수정
        UsersService.modify(this.id, params).then(
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
        UsersService.add(params).then(
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

        UsersService.remove(this.id).then(
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
      UsersService.findOne(this.id).then(
        response => {
          const { data } = response;
          this.item = data;

          // form
          if (Object.prototype.hasOwnProperty.call(data, "email")) {
            this.form.email = data.email;
          }
          if (Object.prototype.hasOwnProperty.call(data, "password")) {
            this.form.password = data.password;
          }
          if (Object.prototype.hasOwnProperty.call(data, "firstname")) {
            this.form.firstname = data.firstname;
          }
          if (Object.prototype.hasOwnProperty.call(data, "lastname")) {
            this.form.lastname = data.lastname;
          }
          if (Object.prototype.hasOwnProperty.call(data, "username")) {
            this.form.username = data.username;
          }
          if (Object.prototype.hasOwnProperty.call(data, "languege")) {
            this.form.languege = data.languege;
          }
          if (Object.prototype.hasOwnProperty.call(data, "country")) {
            this.form.country = data.country;
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
