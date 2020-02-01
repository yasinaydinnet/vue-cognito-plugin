<template>
  <div>
    <PageHeader pageTitle="Unauthorized" />

    <p>Please use one of the methods below to login.</p>

    <div class="text-center">
      <CognitoLogo class="clickable" @click="redirectToLoginUrl()" />

      <br />

      <b-button variant="primary" @click="redirectToLoginUrl()">
        Login with Amazon Cognito
      </b-button>
    </div>
  </div>
</template>

<script>
import { redirectToLoginUrl } from "./service.js";
import CognitoLogo from "@/components/CognitoLogo.vue";
import PageHeader from "@/components/PageHeader.vue";

export default {
  components: {
    CognitoLogo,
    PageHeader
  },

  methods: {
    redirectToLoginUrl
  }
};
</script>

<style scoped>
img {
  cursor: pointer;
}
</style>
