export const getTokens = (state) => {
  return {
    orgId: state.orgData.organizations[0].org_id,
    xsrf: state.orgData.xsrf || "",
  };
};

export const getSingleContact = (state, id) => state.contacts[id] || {};
