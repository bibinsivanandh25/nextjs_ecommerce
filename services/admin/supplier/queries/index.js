import serviceUtil from "services/utils";

const getQueriesData = (page, payload) => {
  return serviceUtil
    .post(`/help-and-support/admin/supplier/query/${page}/50`, payload)
    .then((res) => {
      const { data } = res && res;
      return { data };
    })
    .catch((err) => ({ err }));
};
const deleteQueries = (id) => {
  return serviceUtil
    .deleteById(`help-and-support/admin/ticket?ticketId=${id}`)
    .then((res) => {
      const { data } = res;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
const CloseQueries = (id) => {
  return serviceUtil
    .put(`help-and-support/admin/ticket?ticketId=${id}`)
    .then((res) => {
      const { data } = res;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
const saveQueriesMedia = (payload) => {
  return serviceUtil
    .put(`products/media/help-support`, payload, {
      header: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const replyqueries = (payload) => {
  return serviceUtil
    .put(`help-and-support/ticket-reply`, payload)
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
export {
  getQueriesData,
  deleteQueries,
  CloseQueries,
  saveQueriesMedia,
  replyqueries,
};
