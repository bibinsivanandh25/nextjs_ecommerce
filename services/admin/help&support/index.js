import serviceUtil from "services/utils";

const getAllTicketsBasedOnUserType = (pageNumber, reqObj) => {
  const pageSize = 50;
  return serviceUtil
    .post(
      `help-and-support/admin/user-ticket/${pageNumber}/${pageSize}`,
      reqObj
    )
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const getAllFilterDataByUserType = (userType) => {
  return serviceUtil
    .get(`/help-and-support/admin/ticket-filter?userType=${userType}`)
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const getSuplierList = () => {
  return serviceUtil
    .get(`users/supplier/help-support/drop-down`)
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const getCustomerList = () => {
  return serviceUtil
    .get(`users/customer/help-support/drop-down`)
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

// help-and-support/ticket

const helpandSupportTicket = (payload) => {
  return serviceUtil
    .post(`help-and-support/ticket`, payload)
    .then((res) => {
      return res;
    })
    .catch((err) => ({ err }));
};

const getMediaUrl = (payload) => {
  return serviceUtil
    .put(`products/media/help-support`, payload, {
      headers: { "content-type": "multipart/form-data" },
    })
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const helpandSupportDeleteTicket = (id) => {
  // help-and-support/admin/ticket?ticketId=1
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

const helpandSupportCloseTicket = (id) => {
  // help-and-support/admin/ticket?ticketId=1
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

const helpandSupportGetTicketById = (id) => {
  // help-and-support/admin/ticket?ticketId=1
  return serviceUtil
    .get(`help-and-support/user/ticket?ticketId=${id}`)
    .then((res) => {
      const { data } = res;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
export {
  getAllTicketsBasedOnUserType,
  getAllFilterDataByUserType,
  getSuplierList,
  getCustomerList,
  helpandSupportTicket,
  getMediaUrl,
  helpandSupportCloseTicket,
  helpandSupportDeleteTicket,
  helpandSupportGetTicketById,
};
