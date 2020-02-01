import nanoid from "nanoid";
import store from "@/store/index";

const _DOMAIN = "https://AWS_APPDOMAIN.auth.AWS_REGION.amazoncognito.com";
const _CLIENTID = "AWS_CLIENTID";
const _OPTIONS = "scope=openid profile&response_type=token&";
const _REDIRURL = `${window.location.origin}/callback`;

export const getLoginUrl = () => {
  const verification = nanoid();

  store.commit("AuthStore/setVerification", verification); // For CSRF

  const url = `${_DOMAIN}/login?${_OPTIONS}client_id=${_CLIENTID}&redirect_uri=${_REDIRURL}&state=${verification}`;

  return url;
};

export const redirectToLoginUrl = () => {
  window.location.href = getLoginUrl();
};

const jwtof = x => JSON.parse(window.atob(x.split(".")[1]));

export const checkAndReturnPayloadFromUrl = urlHash => {
  const accessToken = urlHash.match(/(?:access_token)=([^&]+)/)[1];
  const idToken = urlHash.match(/(?:id_token)=([^&]+)/)[1];
  const verification = urlHash.match(/(?:state)=([^&]+)/)[1];

  if (!accessToken && !idToken) {
    throw new Error("no_auth_info");
  }

  if (verification !== store.state.AuthStore.verification) {
    throw new Error("verification_failed");
  }

  if (jwtof(idToken).token_use !== "id") {
    throw new Error("resp_invalid_token");
  }

  return {
    accessToken,
    idToken,
    profile: jwtof(idToken),
    verification
  };
};
