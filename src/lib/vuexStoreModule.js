export default {
  namespaced: true,

  state: {
    profile: null,
    accessToken: null,
    verification: null,
    isAuthenticated: false
  },

  mutations: {
    setValues(state, { idToken = null, accessToken = null, profile = null }) {
      state.idToken = idToken;
      state.accessToken = accessToken;
      state.profile = profile;
      state.isAuthenticated = !!(idToken && accessToken);
    },
    setVerification: (state, verification) => {
      state.verification = verification;
    }
  }
};
