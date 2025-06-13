"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import { changePassword } from "../_lib/data-service";

const validationSchema = Yup.object({
  oldPassword: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
  confirmPassword: Yup.string().required("Required"),
});

function PasswordForm({ children, token }) {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const result = await changePassword(values, token.value);
        alert("Registration successful!");
        formik.resetForm();
      } catch (error) {
        alert("Registration failed: " + error.message);
      }
    },
  });

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <form
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      onSubmit={(e) => {
        e.preventDefault();
        formik.handleSubmit(e);
      }}
    >
      <div className="space-y-2">
        <label htmlFor="oldPassword">
          {mounted ? t("student.password.oldPassword") : "Loading..."}
        </label>
        <input
          type="password"
          name="oldPassword"
          id="oldPassword"
          onChange={formik.handleChange}
          value={formik.values.oldPassword}
          onBlur={formik.handleBlur}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
        {formik.errors.oldPassword && formik.touched.oldPassword && (
          <p className="text-red-500 text-xs">{formik.errors.oldPassword}</p>
        )}
      </div>
      <div className="space-y-2">
        <label htmlFor="password">
          {mounted ? t("student.password.newPassword") : "Loading..."}
        </label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          onBlur={formik.handleBlur}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
        {formik.errors.password && formik.touched.password && (
          <p className="text-red-500 text-xs">{formik.errors.password}</p>
        )}
      </div>
      <div className="space-y-2">
        <label htmlFor="confirmPassword">
          {mounted ? t("student.password.confirmPassword") : "Loading..."}
        </label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          onBlur={formik.handleBlur}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
        {formik.errors.confirmPassword && formik.touched.confirmPassword && (
          <p className="text-red-500 text-xs">
            {formik.errors.confirmPassword}
          </p>
        )}
      </div>

      <div className="flex justify-end items-center gap-6">
        <button
          type="submit"
          disabled={formik.isSubmitting}
          onClick={() => console.log("Button clicked!")}
          className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
        >
          {mounted ? t("student.password.button") : "Loading..."}
        </button>
      </div>
    </form>
  );
}

export default PasswordForm;
