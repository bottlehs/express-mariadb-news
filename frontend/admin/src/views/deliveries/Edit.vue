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
import DeliveriesService from "@/services/deliveries.service.js";

export default {
  name: "DeliveriesEdit",
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
       * form : 폼
       */

      id: 0,
      item: {},
      wait: false,
      formWait: false,
      form: {
        /**
         * usersId: users id (후보키)
         * purchasesId: purchases id (후보키)
         * name: 주문자 이름
         * email: 주문자 Email
         * tel: 주문자 연락처
         * country: 주문자 국가
         * address: 주문자 주소
         * detailAddress: 주문자 상세 주소
         * postcode: 주문자 우편번호
         * courier: 배송택배사
         * trackingNumber: 운송장번호
         * memo: 주문자 메모
         * status: 상태
         */
        usersId: "",
        purchasesId: "",
        name: "",
        email: "",
        tel: "",
        country: "",
        address: "",
        detailAddress: "",
        postcode: "",
        courier: "",
        trackingNumber: "",
        memo: "",
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
    findOne() {
      this.wait = true;
      DeliveriesService.findOne(this.id).then(
        response => {
          const { data } = response;
          this.item = data;

          // form
          if (Object.prototype.hasOwnProperty.call(data, "usersId")) {
            this.form.usersId = data.usersId;
          }
          if (Object.prototype.hasOwnProperty.call(data, "purchasesId")) {
            this.form.purchasesId = data.purchasesId;
          }
          if (Object.prototype.hasOwnProperty.call(data, "name")) {
            this.form.name = data.name;
          }
          if (Object.prototype.hasOwnProperty.call(data, "email")) {
            this.form.email = data.email;
          }
          if (Object.prototype.hasOwnProperty.call(data, "tel")) {
            this.form.tel = data.tel;
          }
          if (Object.prototype.hasOwnProperty.call(data, "country")) {
            this.form.country = data.country;
          }
          if (Object.prototype.hasOwnProperty.call(data, "address")) {
            this.form.address = data.address;
          }
          if (Object.prototype.hasOwnProperty.call(data, "detailAddress")) {
            this.form.detailAddress = data.detailAddress;
          }
          if (Object.prototype.hasOwnProperty.call(data, "postcode")) {
            this.form.postcode = data.postcode;
          }
          if (Object.prototype.hasOwnProperty.call(data, "courier")) {
            this.form.courier = data.courier;
          }
          if (Object.prototype.hasOwnProperty.call(data, "trackingNumber")) {
            this.form.trackingNumber = data.trackingNumber;
          }
          if (Object.prototype.hasOwnProperty.call(data, "memo")) {
            this.form.memo = data.memo;
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
