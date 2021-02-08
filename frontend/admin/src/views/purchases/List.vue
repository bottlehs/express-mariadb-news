<template>
  <div class="list">
    <b-container fluid>
      <!-- 검색 폼 -->
      <b-form inline @submit="onSubmit" @reset="onReset">
        <b-form-select
          class="mb-2 mr-sm-2 mb-sm-0"
          v-model="search.type"
          :options="searchTypeOptions"
          :value="null"
        ></b-form-select>
        <b-form-input
          class="mb-2 mr-sm-2 mb-sm-0"
          v-model="search.q"
          :placeholder="$t('input_search')"
        ></b-form-input>
        <b-button variant="primary" type="submit">{{
          $t("button_search")
        }}</b-button>
      </b-form>

      <!-- 검색 결과 -->
      <b-table
        striped
        hover
        responsive
        :busy="wait"
        :items="items"
        :fields="fields"
      >
        <template #table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
        </template>
        <template #cell(actions)="row">
          <b-link :to="{ name: 'PurchasesId', params: { id: row.item.id } }">
            <b-icon-search></b-icon-search>
          </b-link>
          <b-link
            :to="{ name: 'PurchasesEditId', params: { id: row.item.id } }"
          >
            <b-icon-pencil></b-icon-pencil>
          </b-link>
        </template>
      </b-table>

      <!-- 페이징 -->
      <b-row>
        <b-col lg="6">
          <div
            align="left"
            v-html="
              $t('showing_currentPage_to_pagesize_of_totalitems_entries', {
                currentPage: $n(currentPage),
                pageSize: $n(pageSize),
                totalItems: $n(totalItems)
              })
            "
          ></div>
        </b-col>
        <b-col lg="6">
          <b-pagination-nav
            :link-gen="linkGen"
            :number-of-pages="totalPages"
            v-model="currentPage"
            align="right"
            @page-click="pageLink"
          ></b-pagination-nav>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

/**
 * service
 */
import PurchasesService from "@/services/purchases.service.js";

export default {
  name: "PurchasesList",
  components: {
    /**
     * components
     */
  },
  data() {
    return {
      /**
       * search : 검색 데이터
       * searchTypeOptions : 검색 항목
       * fields : 검색결과 페이지 리스트 필드
       * items : 응답 리스트 데이터
       * page : 검색결과 페이지 데이터
       * wait : 로딩
       * totalItems : 전체 데이터수
       * totalPages : 전체 페이지수
       * currentPage : 현제 페이지
       * pageSize: 페이지 요청 데이터수
       */
      wait: false,
      search: {
        /**
         * type : 검색항목
         * q : 검색어
         */
        type: "",
        q: ""
      },
      searchTypeOptions: [],
      fields: [
        {
          /**
           * users id (후보키) */
          key: "usersId",
          label: this.$t("purchases_users_id")
        },
        {
          /**
           * carts id (후보키) */
          key: "cartsId",
          label: this.$t("purchases_carts_id")
        },
        {
          /**
           * products id (후보키) */
          key: "productsId",
          label: this.$t("purchases_products_id")
        },
        {
          /**
           * productsOptions id (후보키) */
          key: "productsOptionsId",
          label: this.$t("purchases_products_options_id")
        },
        {
          /**
           * 서드파티 거래 고유 번호 */
          key: "thirdPartyUid",
          label: this.$t("purchases_third_party_uid")
        },
        {
          /**
           * 가맹점에서 생성/관리하는 고유 주문번호 */
          key: "merchantUid",
          label: this.$t("purchases_merchant_uid")
        },
        {
          /**
           * 결제수단 */
          key: "method",
          label: this.$t("purchases_method")
        },
        {
          /**
           * 결제금액	*/
          key: "amount",
          label: this.$t("purchases_amount")
        },
        {
          /**
           * 결제승인/시도된 PG사 */
          key: "pgProvider",
          label: this.$t("purchases_pg_provider")
        },
        {
          /**
           * PG사 거래고유번호 */
          key: "pgId",
          label: this.$t("purchases_pg_id")
        },
        {
          /**
           * 주문자 이름 */
          key: "name",
          label: this.$t("purchases_name"),
          isSearch: true
        },
        {
          /**
           * 주문자 Email */
          key: "email",
          label: this.$t("purchases_email"),
          isSearch: true
        },
        {
          /**
           * 주문자 연락처 */
          key: "tel",
          label: this.$t("purchases_tel")
        },
        {
          /**
           * 주문자 국가 */
          key: "country",
          label: this.$t("purchases_country")
        },
        {
          /**
           * 주문자 주소 */
          key: "address",
          label: this.$t("purchases_address")
        },
        {
          /**
           * 주문자 상세 주소 */
          key: "detailAddress",
          label: this.$t("purchases_detail_address")
        },
        {
          /**
           * 주문자 우편번호 */
          key: "postcode",
          label: this.$t("purchases_postcode")
        },
        {
          /**
           * 가맹점 임의 지정 데이터 */
          key: "customData",
          label: this.$t("purchases_custom_data")
        },
        {
          /**
           * 결제승인시각 */
          key: "purchasesAt",
          label: this.$t("purchases_purchases_at")
        },
        {
          /**
           * PG사에서 발행되는 거래 매출전표 URL */
          key: "receiptUrl",
          label: this.$t("purchases_receipt_url")
        },
        {
          /**
           * 카드사 승인번호 */
          key: "applyNumber",
          label: this.$t("purchases_apply_number")
        },
        {
          /**
           * 가상계좌 입금계좌번호 */
          key: "vbankNumber",
          label: this.$t("purchases_vbank_number")
        },
        {
          /**
           * 가상계좌 은행명 */
          key: "vbankName",
          label: this.$t("purchases_vbank_name")
        },
        {
          /**
           * 가상계좌 예금주 */
          key: "vbankHolder",
          label: this.$t("purchases_vbank_holder")
        },
        {
          /**
           * 가상계좌 입금기한 */
          key: "vbankDate",
          label: this.$t("purchases_vbank_date")
        },
        {
          /**
           * 주문자 메모 */
          key: "memo",
          label: this.$t("purchases_memo")
        },
        {
          /**
           * 상태 */
          key: "status",
          label: this.$t("purchases_status")
        },
        {
          /**
           * Action
           */
          key: "actions",
          label: "Actions"
        }
      ],
      items: [],
      totalItems: 0,
      totalPages: 0,
      currentPage: 1,
      pageSize: 10
    };
  },
  created() {
    /**
     * created
     */
    if (
      Object.prototype.hasOwnProperty.call(
        this.$router.currentRoute.query,
        "page"
      )
    ) {
      this.currentPage = this.$router.currentRoute.query.page;
    }

    if (
      Object.prototype.hasOwnProperty.call(
        this.$router.currentRoute.query,
        "type"
      ) &&
      Object.prototype.hasOwnProperty.call(this.$router.currentRoute.query, "q")
    ) {
      this.search.type = this.$router.currentRoute.query.type;
      this.search.q = this.$router.currentRoute.query.q;
    }

    this.findAll();
  },
  mounted() {
    /**
     * mounted
     */
    let type = "";
    this.fields.forEach(row => {
      if (row.isSearch) {
        this.searchTypeOptions.push({
          text: row.label,
          value: row.key
        });

        if (this.search.type == row.key) {
          type = row.key;
        }
      }
    });

    if (type) {
      this.search.type = type;
    } else {
      this.search.type = this.searchTypeOptions[0].value;
    }
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

      this.findAll();
    },
    onReset(evt) {
      evt.preventDefault();

      this.search.q = "";
    },
    findAll() {
      this.wait = true;

      const params = {
        page: this.currentPage,
        size: this.pageSize
      };

      if (this.search.q && this.search.type) {
        params[this.search.type] = this.search.q;
      }

      PurchasesService.findAll(params).then(
        response => {
          const { data } = response;
          this.totalItems = data.totalItems;
          this.totalPages = data.totalPages;
          this.items = data.items;
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
    },
    pageLink(button, page) {
      this.currentPage = page;
      this.findAll();
    },
    linkGen(pageNum) {
      const query = {};
      if (this.search.q && this.search.type) {
        query.type = this.search.type;
        query.q = this.search.q;
      }

      query.page = pageNum;

      return {
        path: "/purchases/",
        query: query
      };
    }
  }
};
</script>

<style scoped></style>
