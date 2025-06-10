"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createIssue } from "../_lib/data-service";

const validationSchema = Yup.object({
  Description: Yup.string().required("Required"),
  IssueTypeId: Yup.number().required("Required"),
});

function UpdateProfileForm({ children, issueTypes, token }) {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  const formik = useFormik({
    initialValues: {
      Description: "",
      IssueTypeId: 0,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const result = await createIssue(values, token.value);
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
        <label htmlFor="IssueTypeId">
          {mounted ? t("student.profile.form.issueType") : "Loading..."}
        </label>
        <select
          id="IssueTypeId"
          name="IssueTypeId"
          onChange={(e) =>
            formik.setFieldValue("IssueTypeId", Number(e.target.value))
          }
          value={formik.values.IssueTypeId}
          onBlur={formik.handleBlur}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        >
          {issueTypes.map((issueType) => (
            <option key={issueType.issueTypeId} value={issueType.issueTypeId}>
              {issueType.typeName}
            </option>
          ))}
        </select>
        {formik.errors.IssueTypeId && formik.touched.IssueTypeId && (
          <p className="text-red-500 text-xs">{formik.errors.IssueTypeId}</p>
        )}
      </div>
      <div className="space-y-2">
        <label htmlFor="Description">
          {mounted ? t("student.profile.form.issue") : "Loading..."}
        </label>
        <textarea
          id="Description"
          name="Description"
          onChange={formik.handleChange}
          value={formik.values.Description}
          onBlur={formik.handleBlur}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
        {formik.errors.Description && formik.touched.Description && (
          <p className="text-red-500 text-xs">{formik.errors.Description}</p>
        )}
      </div>
      <div className="flex justify-end items-center gap-6">
        <button
          type="submit"
          disabled={formik.isSubmitting}
          onClick={() => console.log("Button clicked!")}
          className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
        >
          {mounted ? t("student.profile.form.button") : "Loading..."}
        </button>
      </div>

      {/* <div className="flex justify-end items-center gap-6">
        <SubmitButton pendingLabel="Updating...">
          {mounted ? t("student.profile.form.button") : "Loading..."}
        </SubmitButton>
      </div> */}
    </form>
  );
}

export default UpdateProfileForm;
