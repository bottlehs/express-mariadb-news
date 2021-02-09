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
          <b-link :to="{ name: 'FaqsId', params: { id: row.item.id } }">
            <b-icon-search></b-icon-search>
          </b-link>
          <b-link :to="{ name: 'FaqsEditId', params: { id: row.item.id } }">
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
import FaqsService from "@/services/faqs.service.js";

export default {
  name: "FaqsList",
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
           * 질문 */
          key: "question",
          label: this.$t("faqs_question"),
          isSearch: true
        },
        {
          /**
           * 답변 */
          key: "answer",
          label: this.$t("faqs_answer"),
          isSearch: true
        },
        {
          /**
           * 상태 */
          key: "status",
          label: this.$t("faqs_status")
        },
        {
          /**
           * 생성날자
           */
          key: "createdAt",
          label: this.$t("faqs_created_at")
        },
        {
          /**
           * 수정날짜
           */
          key: "updatedAt",
          label: this.$t("faqs_updated_at")
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

      FaqsService.findAll(params).then(
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
        path: "/faqs/",
        query: query
      };
    }
  }
};
</script>

<style scoped></style>
