<template>
  <div class="edit">
    <div v-if="wait && id" class="d-flex justify-content-center mb-3">
      <b-spinner label="Loading..."></b-spinner>
    </div>
    <div v-else>
      <ValidationObserver v-slot="{ invalid }">
        <b-form @submit.prevent="onSubmit" @reset="onReset">
          <ValidationProvider
            ref="validationFormName"
            :name="$t('categories_name')"
            rules="required"
            v-slot="{ errors }"
          >
            <label>
              {{ $t("categories_name") }}
              <input
                ref="formName"
                type="text"
                v-model="form.name"
                :placeholder="$t('categories_name')"
              />
              {{ errors[0] }}
            </label>
          </ValidationProvider>
          <ValidationProvider
            ref="validationFormBackgroundColor"
            :name="$t('categories_background_color')"
            rules="required"
            v-slot="{ errors }"
          >
            <label>
              {{ $t("categories_background_color") }}
              <input
                ref="formBackgroundColor"
                type="text"
                v-model="form.backgroundColor"
                :placeholder="$t('categories_background_color')"
              />
              {{ errors[0] }}
            </label>
          </ValidationProvider>
          <ValidationProvider
            ref="validationFormIcon"
            :name="$t('categories_icon')"
            rules="required"
            v-slot="{ errors }"
          >
            <label>
              {{ $t("categories_icon") }}
              <input
                ref="formIcon"
                type="text"
                v-model="form.icon"
                :placeholder="$t('categories_icon')"
              />
              {{ errors[0] }}
            </label>
          </ValidationProvider>
          <ValidationProvider
            ref="validationFormStatus"
            :name="$t('categories_status')"
            rules="required"
            v-slot="{ errors }"
          >
            <label>
              {{ $t("categories_status") }}
              <input
                ref="formStatus"
                type="text"
                v-model="form.status"
                :placeholder="$t('categories_status')"
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
import CategoriesService from "@/services/categories.service.js";

export default {
  name: "CategoriesEdit",
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
         * name: 카테고리명
         * backgroundColor: 카테고리 배경색(HEX)
         * icon: 카테고리 아이콘
         * status: 상태
         */
        name: "",
        backgroundColor: "",
        icon: "",
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
        name: this.form.name,
        backgroundColor: this.form.backgroundColor,
        icon: this.form.icon,
        status: this.form.status
      };

      if (this.id) {
        // 수정
        CategoriesService.modify(this.id, params).then(
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
        CategoriesService.add(params).then(
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

        CategoriesService.remove(this.id).then(
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
      CategoriesService.findOne(this.id).then(
        response => {
          const { data } = response;
          this.item = data;

          // form
          if (Object.prototype.hasOwnProperty.call(data, "name")) {
            this.form.name = data.name;
          }
          if (Object.prototype.hasOwnProperty.call(data, "backgroundColor")) {
            this.form.backgroundColor = data.backgroundColor;
          }
          if (Object.prototype.hasOwnProperty.call(data, "icon")) {
            this.form.icon = data.icon;
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
