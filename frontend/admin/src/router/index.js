import Vue from "vue";
import VueRouter from "vue-router";

// layout
import MainLayout from "../layout/MainLayout.vue";
import OauthLayout from "../layout/OauthLayout.vue";

import Jwt from "@/common/jwt";

let title = "ecommerce";

Vue.use(VueRouter);

const requireOauth = () => (from, to, next) => {
  if (Jwt.getAccessToken()) {
    return next();
  } else {
    /**
     * 로그인 화면으로 이동
     */
    next("/login");
  }
};

const requireNoOauth = () => (from, to, next) => {
  if (Jwt.getAccessToken()) {
    /**
     * 대시보드 화면으로 이동
     */
    next("/");
  } else {
    return next();
  }
};

const routes = [
  /**
   * OauthLayout
   */
  {
    path: "/login",
    redirect: "Login",
    component: OauthLayout,
    children: [
      /**
       * Dashboard
       */

      {
        path: "/login",
        name: "Login",
        meta: {
          title: title + " - login",
          breadcrumb: [{ name: "", link: "" }]
        },
        component: () => import("../views/oauth/Login.vue"),
        beforeEnter: requireNoOauth()
      }
    ]
  },
  /**
   * MainLayout
   */
  {
    path: "/",
    redirect: "Dashboard",
    component: MainLayout,
    children: [
      /**
       * Dashboard
       */

      {
        path: "/",
        name: "Dashboard",
        meta: {
          title: title + " - dashboard",
          breadcrumb: [{ name: "", link: "" }]
        },
        component: () => import("../views/dashboard/View.vue"),
        beforeEnter: requireOauth()
      },
      /**
       * Users
       * /users : 다건 리스트 조회
       * /users/edit : 단건 추가
       * /users/:id : 단건 조회
       * /users/edit/:id : 단건 수정
       */

      {
        path: "/users",
        name: "Users",
        meta: {
          title: title + " - users",
          breadcrumb: [{ name: "", link: "" }]
        },
        component: () => import("../views/users/List.vue"),
        beforeEnter: requireOauth()
      },
      {
        path: "/users/edit",
        name: "UsersEdit",
        meta: {
          title: title + " - users id",
          breadcrumb: [{ name: "", link: "" }]
        },
        component: () => import("../views/users/Edit.vue"),
        beforeEnter: requireOauth()
      },
      {
        path: "/users/:id",
        name: "UsersId",
        meta: {
          title: title + " - users id",
          breadcrumb: [{ name: "", link: "" }]
        },
        component: () => import("../views/users/View.vue"),
        beforeEnter: requireOauth()
      },
      {
        path: "/users/edit/:id",
        name: "UsersEditId",
        meta: {
          title: title + " - users id",
          breadcrumb: [{ name: "", link: "" }]
        },
        component: () => import("../views/users/Edit.vue"),
        beforeEnter: requireOauth()
      },
      /**
       * Purchases
       * /purchases : 다건 리스트 조회
       * /purchases/edit : 단건 추가
       * /purchases/:id : 단건 조회
       * /purchases/edit/:id : 단건 수정
       */

      {
        path: "/purchases",
        name: "Purchases",
        meta: {
          title: title + " - purchases",
          breadcrumb: [{ name: "", link: "" }]
        },
        component: () => import("../views/purchases/List.vue"),
        beforeEnter: requireOauth()
      },
      {
        path: "/purchases/edit",
        name: "PurchasesEdit",
        meta: {
          title: title + " - purchases id",
          breadcrumb: [{ name: "", link: "" }]
        },
        component: () => import("../views/purchases/Edit.vue"),
        beforeEnter: requireOauth()
      },
      {
        path: "/purchases/:id",
        name: "PurchasesId",
        meta: {
          title: title + " - purchases id",
          breadcrumb: [{ name: "", link: "" }]
        },
        component: () => import("../views/purchases/View.vue"),
        beforeEnter: requireOauth()
      },
      {
        path: "/purchases/edit/:id",
        name: "PurchasesEditId",
        meta: {
          title: title + " - purchases id",
          breadcrumb: [{ name: "", link: "" }]
        },
        component: () => import("../views/purchases/Edit.vue"),
        beforeEnter: requireOauth()
      },
      /**
       * Products
       * /products : 다건 리스트 조회
       * /products/edit : 단건 추가
       * /products/:id : 단건 조회
       * /products/edit/:id : 단건 수정
       */

      {
        path: "/products",
        name: "Products",
        meta: {
          title: title + " - products",
          breadcrumb: [{ name: "", link: "" }]
        },
        component: () => import("../views/products/List.vue"),
        beforeEnter: requireOauth()
      },
      {
        path: "/products/edit",
        name: "ProductsEdit",
        meta: {
          title: title + " - products id",
          breadcrumb: [{ name: "", link: "" }]
        },
        component: () => import("../views/products/Edit.vue"),
        beforeEnter: requireOauth()
      },
      {
        path: "/products/:id",
        name: "ProductsId",
        meta: {
          title: title + " - products id",
          breadcrumb: [{ name: "", link: "" }]
        },
        component: () => import("../views/products/View.vue"),
        beforeEnter: requireOauth()
      },
      {
        path: "/products/edit/:id",
        name: "ProductsEditId",
        meta: {
          title: title + " - products id",
          breadcrumb: [{ name: "", link: "" }]
        },
        component: () => import("../views/products/Edit.vue"),
        beforeEnter: requireOauth()
      },
      /**
       * Posts
       * /posts : 다건 리스트 조회
       * /posts/edit : 단건 추가
       * /posts/:id : 단건 조회
       * /posts/edit/:id : 단건 수정
       */

      {
        path: "/posts",
        name: "Posts",
        meta: {
          title: title + " - posts",
          breadcrumb: [{ name: "", link: "" }]
        },
        component: () => import("../views/posts/List.vue"),
        beforeEnter: requireOauth()
      },
      {
        path: "/posts/edit",
        name: "PostsEdit",
        meta: {
          title: title + " - posts id",
          breadcrumb: [{ name: "", link: "" }]
        },
        component: () => import("../views/posts/Edit.vue"),
        beforeEnter: requireOauth()
      },
      {
        path: "/posts/:id",
        name: "PostsId",
        meta: {
          title: title + " - posts id",
          breadcrumb: [{ name: "", link: "" }]
        },
        component: () => import("../views/posts/View.vue"),
        beforeEnter: requireOauth()
      },
      {
        path: "/posts/edit/:id",
        name: "PostsEditId",
        meta: {
          title: title + " - posts id",
          breadcrumb: [{ name: "", link: "" }]
        },
        component: () => import("../views/posts/Edit.vue"),
        beforeEnter: requireOauth()
      },
      /**
       * Inquires
       * /inquires : 다건 리스트 조회
       * /inquires/edit : 단건 추가
       * /inquires/:id : 단건 조회
       * /inquires/edit/:id : 단건 수정
       */

      {
        path: "/inquires",
        name: "Inquires",
        meta: {
          title: title + " - inquires",
          breadcrumb: [{ name: "", link: "" }]
        },
        component: () => import("../views/inquires/List.vue"),
        beforeEnter: requireOauth()
      },
      {
        path: "/inquires/edit",
        name: "InquiresEdit",
        meta: {
          title: title + " - inquires id",
          breadcrumb: [{ name: "", link: "" }]
        },
        component: () => import("../views/inquires/Edit.vue"),
        beforeEnter: requireOauth()
      },
      {
        path: "/inquires/:id",
        name: "InquiresId",
        meta: {
          title: title + " - inquires id",
          breadcrumb: [{ name: "", link: "" }]
        },
        component: () => import("../views/inquires/View.vue"),
        beforeEnter: requireOauth()
      },
      {
        path: "/inquires/edit/:id",
        name: "InquiresEditId",
        meta: {
          title: title + " - inquires id",
          breadcrumb: [{ name: "", link: "" }]
        },
        component: () => import("../views/inquires/Edit.vue"),
        beforeEnter: requireOauth()
      },
      /**
       * Faqs
       * /faqs : 다건 리스트 조회
       * /faqs/edit : 단건 추가
       * /faqs/:id : 단건 조회
       * /faqs/edit/:id : 단건 수정
       */

      {
        path: "/faqs",
        name: "Faqs",
        meta: {
          title: title + " - faqs",
          breadcrumb: [{ name: "", link: "" }]
        },
        component: () => import("../views/faqs/List.vue"),
        beforeEnter: requireOauth()
      },
      {
        path: "/faqs/edit",
        name: "FaqsEdit",
        meta: {
          title: title + " - faqs id",
          breadcrumb: [{ name: "", link: "" }]
        },
        component: () => import("../views/faqs/Edit.vue"),
        beforeEnter: requireOauth()
      },
      {
        path: "/faqs/:id",
        name: "FaqsId",
        meta: {
          title: title + " - faqs id",
          breadcrumb: [{ name: "", link: "" }]
        },
        component: () => import("../views/faqs/View.vue"),
        beforeEnter: requireOauth()
      },
      {
        path: "/faqs/edit/:id",
        name: "FaqsEditId",
        meta: {
          title: title + " - faqs id",
          breadcrumb: [{ name: "", link: "" }]
        },
        component: () => import("../views/faqs/Edit.vue"),
        beforeEnter: requireOauth()
      },
      /**
       * Deliveries
       * /deliveries : 다건 리스트 조회
       * /deliveries/edit : 단건 추가
       * /deliveries/:id : 단건 조회
       * /deliveries/edit/:id : 단건 수정
       */

      {
        path: "/deliveries",
        name: "Deliveries",
        meta: {
          title: title + " - deliveries",
          breadcrumb: [{ name: "", link: "" }]
        },
        component: () => import("../views/deliveries/List.vue"),
        beforeEnter: requireOauth()
      },
      {
        path: "/deliveries/edit",
        name: "DeliveriesEdit",
        meta: {
          title: title + " - deliveries id",
          breadcrumb: [{ name: "", link: "" }]
        },
        component: () => import("../views/deliveries/Edit.vue"),
        beforeEnter: requireOauth()
      },
      {
        path: "/deliveries/:id",
        name: "DeliveriesId",
        meta: {
          title: title + " - deliveries id",
          breadcrumb: [{ name: "", link: "" }]
        },
        component: () => import("../views/deliveries/View.vue")
      },
      {
        path: "/deliveries/edit/:id",
        name: "DeliveriesEditId",
        meta: {
          title: title + " - deliveries id",
          breadcrumb: [{ name: "", link: "" }]
        },
        component: () => import("../views/deliveries/Edit.vue"),
        beforeEnter: requireOauth()
      },
      /**
       * Comments
       * /comments : 다건 리스트 조회
       * /comments/edit : 단건 추가
       * /comments/:id : 단건 조회
       * /comments/edit/:id : 단건 수정
       */

      {
        path: "/comments",
        name: "Comments",
        meta: {
          title: title + " - comments",
          breadcrumb: [{ name: "", link: "" }]
        },
        component: () => import("../views/comments/List.vue"),
        beforeEnter: requireOauth()
      },
      {
        path: "/comments/edit",
        name: "CommentsEdit",
        meta: {
          title: title + " - comments id",
          breadcrumb: [{ name: "", link: "" }]
        },
        component: () => import("../views/comments/Edit.vue"),
        beforeEnter: requireOauth()
      },
      {
        path: "/comments/:id",
        name: "CommentsId",
        meta: {
          title: title + " - comments id",
          breadcrumb: [{ name: "", link: "" }]
        },
        component: () => import("../views/comments/View.vue"),
        beforeEnter: requireOauth()
      },
      {
        path: "/comments/edit/:id",
        name: "CommentsEditId",
        meta: {
          title: title + " - comments id",
          breadcrumb: [{ name: "", link: "" }]
        },
        component: () => import("../views/comments/Edit.vue"),
        beforeEnter: requireOauth()
      },
      /**
       * Carts
       * /carts : 다건 리스트 조회
       * /carts/edit : 단건 추가
       * /carts/:id : 단건 조회
       * /carts/edit/:id : 단건 수정
       */

      {
        path: "/carts",
        name: "Carts",
        meta: {
          title: title + " - carts",
          breadcrumb: [{ name: "", link: "" }]
        },
        component: () => import("../views/carts/List.vue"),
        beforeEnter: requireOauth()
      },
      {
        path: "/carts/edit",
        name: "CartsEdit",
        meta: {
          title: title + " - carts id",
          breadcrumb: [{ name: "", link: "" }]
        },
        component: () => import("../views/carts/Edit.vue"),
        beforeEnter: requireOauth()
      },
      {
        path: "/carts/:id",
        name: "CartsId",
        meta: {
          title: title + " - carts id",
          breadcrumb: [{ name: "", link: "" }]
        },
        component: () => import("../views/carts/View.vue"),
        beforeEnter: requireOauth()
      },
      {
        path: "/carts/edit/:id",
        name: "CartsEditId",
        meta: {
          title: title + " - carts id",
          breadcrumb: [{ name: "", link: "" }]
        },
        component: () => import("../views/carts/Edit.vue"),
        beforeEnter: requireOauth()
      },
      /**
       * Addresses
       * /addresses : 다건 리스트 조회
       * /addresses/edit : 단건 추가
       * /addresses/:id : 단건 조회
       * /addresses/edit/:id : 단건 수정
       */

      {
        path: "/addresses",
        name: "Addresses",
        meta: {
          title: title + " - addresses",
          breadcrumb: [{ name: "", link: "" }]
        },
        component: () => import("../views/addresses/List.vue"),
        beforeEnter: requireOauth()
      },
      {
        path: "/addresses/edit",
        name: "AddressesEdit",
        meta: {
          title: title + " - addresses id",
          breadcrumb: [{ name: "", link: "" }]
        },
        component: () => import("../views/addresses/Edit.vue"),
        beforeEnter: requireOauth()
      },
      {
        path: "/addresses/:id",
        name: "AddressesId",
        meta: {
          title: title + " - addresses id",
          breadcrumb: [{ name: "", link: "" }]
        },
        component: () => import("../views/addresses/View.vue"),
        beforeEnter: requireOauth()
      },
      {
        path: "/addresses/edit/:id",
        name: "AddressesEditId",
        meta: {
          title: title + " - addresses id",
          breadcrumb: [{ name: "", link: "" }]
        },
        component: () => import("../views/addresses/Edit.vue"),
        beforeEnter: requireOauth()
      }
    ]
  },
  {
    path: "*",
    component: () => import("../views/error/404.vue")
  }
];

const router = new VueRouter({
  linkActiveClass: "",
  linkExactActiveClass: "on",
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
