<!-- HelloJest.vue -->

<template>
  <div>
    {{ reversedMsg }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "Test coverage"
    };
  },
  computed: {
    reversedMsg() {
      return this.reverseString(this.msg);
    }
  },
  methods: {
    reverseString(str) {
      return str
        .split("")
        .reverse()
        .join("");
    }
  }
};
</script>
