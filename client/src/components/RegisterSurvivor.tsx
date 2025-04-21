import { Formik, Field, Form, ErrorMessage } from "formik";
import { SurvivorInput } from "../types/survivor.interface";
import { createSurvivor } from "../api/survivor";
import validationSchema from "../schemas/validation.schema";
import Swal from "sweetalert2";

const initialSurvivor: SurvivorInput = {
  name: "",
  age: 0,
  gender: "female",
  lastLatitude: "",
  lastLongitude: "",
  inventory: [
    { type: "WATER", quantity: 0 },
    { type: "FOOD", quantity: 0 },
    { type: "AMMUNITION", quantity: 0 },
    { type: "MEDICATION", quantity: 0 },
  ],
};

export const RegisterSurvivor = () => {
  const handleSubmit = async (values: SurvivorInput) => {
    try {
      const response = await createSurvivor(values);
      if (response.error) {
        Swal.fire({
          title: "Error!",
          text: `${response.error}`,
          icon: "error",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Success!",
          text: "Survivor created successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    } catch (error: any) {
      Swal.fire({
        title: "Error!",
        text: `Error creating survivor. \n ${error.message || "Unknown error"}`,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <Formik
        initialValues={initialSurvivor}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values);
          resetForm();
        }}>
        {({ values, setFieldValue }) => (
          <Form className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-lg font-medium text-gray-700">
                Name
              </label>
              <Field
                name="name"
                placeholder="Enter survivor's name"
                className="w-full border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="age"
                className="block text-lg font-medium text-gray-700">
                Age
              </label>
              <Field
                name="age"
                type="number"
                placeholder="Enter survivor's age"
                className="w-full border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <ErrorMessage
                name="age"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="gender"
                className="block text-lg font-medium text-gray-700">
                Gender
              </label>
              <Field
                as="select"
                name="gender"
                className="w-full border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </Field>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="lastLatitude"
                className="block text-lg font-medium text-gray-700">
                Latitude
              </label>
              <Field
                name="lastLatitude"
                placeholder="Enter latitude"
                className="w-full border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <ErrorMessage
                name="lastLatitude"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="lastLongitude"
                className="block text-lg font-medium text-gray-700">
                Longitude
              </label>
              <Field
                name="lastLongitude"
                placeholder="Enter longitude"
                className="w-full border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <ErrorMessage
                name="lastLongitude"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-700">Inventory</h3>
              {values.inventory.map((item, index) => (
                <div key={item.type} className="flex items-center space-x-4">
                  <label className="w-32 capitalize text-lg text-gray-600">
                    {item.type.toLowerCase()}
                  </label>
                  <Field
                    type="number"
                    min={0}
                    name={`inventory[${index}].quantity`}
                    className="w-20 border p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={item.quantity}
                    onChange={(e: any) => {
                      setFieldValue(
                        `inventory[${index}].quantity`,
                        Number(e.target.value)
                      );
                    }}
                  />
                  <ErrorMessage
                    name={`inventory[${index}].quantity`}
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-green-500 text-white text-xl rounded-lg hover:bg-green-600 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500">
              Register Survivor
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
