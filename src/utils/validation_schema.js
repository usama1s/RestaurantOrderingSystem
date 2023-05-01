import * as Yup from "yup";
export const validation_schema_form = Yup.object({
  email: Yup.string()
    .email("Please provide a valid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required."),
});

export const validation_schema_food_items = Yup.object({
  title: Yup.string().required("Title is required."),
  description: Yup.string().required("Description is required."),
  price: Yup.number("Price is required and must be a positive number.")
    .required("Price is required and must be a positive number.")
    .positive("Price is required and must be a positive number."),
  category: Yup.string().required("Select a category"),
});
export const validation_schema_food_categories = Yup.object({
  title: Yup.string().required("Title is required."),
});
