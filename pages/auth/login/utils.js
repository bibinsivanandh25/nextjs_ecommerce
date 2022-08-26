import { getSupplierDetailsById } from "services/supplier";
import { store } from "store";
import { storeUserInfo } from "store/userSlice";

const storeSupplierInfo = async (id) => {
  const { data, err } = await getSupplierDetailsById(id);
  if (!err) {
    const supplierDetails = {
      emailId: data.emailId,
      firstName: data.firstName,
      lastName: data.lastName,
      profileImageUrl: data.profileImageUrl,
      supplierId: data.supplierId,
    };
    store.dispatch(storeUserInfo(supplierDetails));
  }
};

export { storeSupplierInfo };
