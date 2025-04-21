import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters")
    .required("Name is required"),
  age: Yup.number()
    .integer("Age must be an integer")
    .positive("Age must be a positive integer")
    .max(120, "Age must be at most 120")
    .required("Age is required"),
  gender: Yup.string()
    .min(1, "Gender is required")
    .transform((val) => val.toLowerCase()),
  lastLatitude: Yup.string().required("Latitude is required"),
  lastLongitude: Yup.string().required("Longitude is required"),
  inventory: Yup.array()
    .of(
      Yup.object({
        type: Yup.string().required(),
        quantity: Yup.number()
          .typeError("Quantity must be a number")
          .min(0, "Quantity cannot be negative")
          .required("Quantity is required"),
      })
    )
    .min(1, "At least one item is required"),
});

export default validationSchema;
