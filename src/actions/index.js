import Request from "../Request/Request";

export const getMeta = () => ({
  types: ["META_REQUEST", "META_SUCCESS", "META_FAILURE"],
  callAPI: () => {
    return Request(
      "https://api.goschedule.io/public/api/v1/portal/services/list"
    )
      .post()
      .then((res) => {
        console.log("sss", res);
        return "success";
      })
      .catch((err) => {
        console.log("failed");
        return "failed";
      });
  },
});
