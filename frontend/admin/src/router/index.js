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
       * Categories
       * /categories : 다건 리스트 조회
       * /categories/edit : 단건 추가
       * /categories/:id : 단건 조회
       * /categories/edit/:id : 단건 수정
       */

      {
        path: "/categories",
        name: "Categories",
        meta: {
          title: title + " - categories",
          breadcrumb: [{ name: "", link: "" }]
        },
        component: () => import("../views/categories/List.vue"),
        beforeEnter: requireOauth()
      },
      {
        path: "/categories/edit",
        name: "CategoriesEdit",
        meta: {
          title: title + " - categories id",
          breadcrumb: [{ name: "", link: "" }]
        },
        component: () => import("../views/categories/Edit.vue"),
        beforeEnter: requireOauth()
      },
      {
        path: "/categories/:id",
        name: "CategoriesId",
        meta: {
          title: title + " - categories id",
          breadcrumb: [{ name: "", link: "" }]
        },
        component: () => import("../views/categories/View.vue"),
        beforeEnter: requireOauth()
      },
      {
        path: "/categories/edit/:id",
        name: "CategoriesEditId",
        meta: {
          title: title + " - categories id",
          breadcrumb: [{ name: "", link: "" }]
        },
        component: () => import("../views/categories/Edit.vue"),
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
