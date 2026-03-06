import * as Yup from "yup";

const swapSchema = Yup.object().shape({
  from: Yup.string().required("From currency is required"),
  to: Yup.string().required("To currency is required"),
  amount: Yup.number()
    .min(1)
    .positive("Must be a positive number")
    .required("Enter a positive number"),
});
export default swapSchema;
