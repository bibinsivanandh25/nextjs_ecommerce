import StaffForm from "components/forms/supplier/staff";
import { useRouter } from "next/router";

const AddStaff = () => {
  const router = useRouter();
  return (
    <StaffForm
      handlebackClick={() => {
        router.back();
      }}
    />
  );
};
export default AddStaff;
