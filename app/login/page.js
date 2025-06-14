"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

export default function LoginPage() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: async (values, { setErrors, setStatus }) => {
      try {
        const formData = new FormData();
        formData.append("UserName", values.email);
        formData.append("Password", values.password);

        const res = await fetch(
          "https://housing-sys.runasp.net/api/v1/authentication/sign-in",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await res.json();

        if (!res.ok) {
          setStatus("The email address or password is incorrect.");
        }

        document.cookie = `token=${data.data.accessToken}; path=/;`;
        document.cookie = `user=${data.data.refreshToken.userName}; path=/;`;

        router.push("/account");
      } catch (err) {
        setStatus(
          "The email address you entered isn't connected to an account. Find your account and log in."
        );
      }
    },
  });

  return (
    <>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium text-center">
        You Have to sign in
      </h1>
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-md mx-auto mt-10 bg-white shadow-md rounded-lg p-6 space-y-4"
      >
        {formik.status && (
          <div className="text-red-600 font-semibold">{formik.status}</div>
        )}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-primary-800"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-primary-800"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.password}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {formik.isSubmitting ? "Loading..." : "Login"}
        </button>
      </form>
    </>
  );
}
