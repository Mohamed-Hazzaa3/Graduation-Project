"use client";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  getCities,
  getCollegesDepartments,
  getVillages,
} from "../_lib/data-service";
import { createNewStudent } from "../_lib/data-service";
import * as Yup from "yup";

const validationSchema = Yup.object({
  RegistrationCode: Yup.string()
    .required("Payment code is required")
    .matches(/^[A-Za-z0-9]+$/, "Must contain only letters and numbers"),
  HighSchoolPercentage: Yup.number()
    .required("Required")
    .min(0)
    .max(100, "Percentage must be between 0 and 100"),
  IsMarried: Yup.boolean().required("Required"),
  HighSchoolId: Yup.number().required("Required"),
  CollageId: Yup.number().required("Required"),
  CollageDepartmentId: Yup.number().required("Required"),
  CountryId: Yup.number().required("Required"),
  CityId: Yup.number().required("Required"),
  GovernorateId: Yup.number().required("Required"),
  VillageId: Yup.number().required("Required"),
  GuardianFirstName: Yup.string().required("Required"),
  GuardianSecondName: Yup.string().required("Required"),
  GuardianThirdName: Yup.string().required("Required"),
  GuardianFourthName: Yup.string().required("Required"),
  GuardianJob: Yup.string().required("Required"),
  GuardianNationalId: Yup.string().required("Required"), //unique
  GuardianPhone: Yup.string().required("Required"),
  GuardianRelation: Yup.string().required("Required"),
  FirstName: Yup.string().required("Required"),
  SecondName: Yup.string().required("Required"),
  ThirdName: Yup.string().required("Required"),
  FourthName: Yup.string().required("Required"),
  NationalId: Yup.string().required("Required"), //unique
  Phone: Yup.string().required("Required"),
  BirthDate: Yup.date().required("Required"),
  Gender: Yup.number().required("Required"),
  Religion: Yup.number().required("Required"),
  HasSpecialNeeds: Yup.boolean().required("Required"),
  AcademicStudentCode: Yup.string().required("Required"), //unique
  AcademicYear: Yup.string().required("Required"),
  Email: Yup.string().email("Invalid email").required("Required"), //unique
  NationalIdImage: Yup.mixed().required("Required"),
  GuardianNationalIdImage: Yup.mixed().required("Required"),
  PersonalImage: Yup.mixed().required("Required"),
  WaterBill: Yup.mixed().required("Required"),
  ResidenceApplication: Yup.mixed().required("Required"),
});

function ReservationFormNew({
  cabin,
  country,
  governorates,
  schools,
  colleges,
}) {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [villages, setVillages] = useState([]);
  const [cities, setCities] = useState([]);
  const [collageDepartments, setCollageDepartments] = useState([]);
  const { maxCapacity, regularPrice, discount, roomId } = cabin;
  const formik = useFormik({
    initialValues: {
      RegistrationCode: "",
      HighSchoolPercentage: 0,
      IsMarried: false,
      HighSchoolId: 4,
      CollageId: 1,
      CollageDepartmentId: 1,
      CountryId: 50,
      GovernorateId: 5,
      CityId: 3,
      VillageId: 1,
      GuardianFirstName: "",
      GuardianSecondName: "",
      GuardianThirdName: "",
      GuardianFourthName: "",
      GuardianJob: "",
      GuardianNationalId: "",
      GuardianPhone: "",
      GuardianRelation: "",
      FirstName: "",
      SecondName: "",
      ThirdName: "",
      FourthName: "",
      NationalId: "",
      Phone: "",
      BirthDate: "",
      Gender: 0,
      Religion: 0,
      HasSpecialNeeds: false,
      AcademicStudentCode: "",
      AcademicYear: "",
      Email: "",
      NationalIdImage: null,
      GuardianNationalIdImage: null,
      PersonalImage: null,
      WaterBill: null,
      ResidenceApplication: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const result = await createNewStudent(values, roomId);
        alert("Registration successful!");
        formik.resetForm();
      } catch (error) {
        alert("Registration failed:" + error.message);
      }
    },
  });
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    const fetchCitiesAndVillages = async () => {
      const govId = formik.values.GovernorateId;
      const cityId = formik.values.CityId;

      if (typeof govId === "number" && govId > 0) {
        try {
          const citiesData = await getCities(govId);
          setCities(citiesData);
        } catch (error) {
          console.error("Error fetching cities:", error);
          setCities([]);
        }
      } else {
        setCities([]);
      }

      if (typeof cityId === "number" && cityId > 0) {
        try {
          const villagesData = await getVillages(cityId);
          setVillages(villagesData);
        } catch (error) {
          console.error("Error fetching villages:", error);
          setVillages([]);
        }
      } else {
        setVillages([]);
      }
    };

    fetchCitiesAndVillages();
  }, [formik.values.GovernorateId, formik.values.CityId]);

  useEffect(() => {
    const fetchCollageDepartments = async () => {
      if (formik.values.CollageId) {
        const data = await getCollegesDepartments(formik.values.CollageId);
        setCollageDepartments(data);
      } else {
        setCollageDepartments([]);
      }
    };
    fetchCollageDepartments();
  }, [formik.values.CollageId]);

  return (
    <div className="bg-primary-800 text-primary-300 px-16 py-8 ">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit(e);
        }}
        className="space-y-6  max-w-4xl mx-auto"
      >
        <div className="w-[618px] p-3 border bg-primary-200 text-primary-800 shadow-sm rounded-md">
          <label
            htmlFor="RegistrationCode"
            className="block text-sm font-medium"
          >
            {mounted ? t("room.form.pay") : "Loading..."}
          </label>
          <input
            id="RegistrationCode"
            name="RegistrationCode"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.RegistrationCode}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          {formik.errors.RegistrationCode &&
            formik.touched.RegistrationCode && (
              <p className="text-red-500 text-xs">
                {formik.errors.RegistrationCode}
              </p>
            )}
        </div>

        {/* Personal Information */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            {mounted ? t("room.form.personalInformation") : "Loading..."}
          </h2>
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex-1 min-w-[200px]">
              <label htmlFor="firstName" className="block text-sm font-medium">
                {mounted ? t("room.form.first") : "Loading..."}
              </label>
              <input
                id="FirstName"
                name="FirstName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.FirstName}
                className="w-full p-3 border bg-primary-200 text-primary-800 shadow-sm rounded-md"
              />
              {formik.errors.FirstName && formik.touched.FirstName && (
                <p className="text-red-500 text-xs">
                  {formik.errors.FirstName}
                </p>
              )}
            </div>

            <div className="flex-1 min-w-[200px]">
              <label htmlFor="SecondName" className="block text-sm font-medium">
                {mounted ? t("room.form.second") : "Loading..."}
              </label>
              <input
                id="SecondName"
                name="SecondName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.SecondName}
                className="w-full p-3 border bg-primary-200 text-primary-800 shadow-sm rounded-md"
              />
              {formik.errors.SecondName && formik.touched.SecondName && (
                <p className="text-red-500 text-xs">
                  {formik.errors.SecondName}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex-1 min-w-[200px]">
              <label htmlFor="ThirdName" className="block text-sm font-medium">
                {mounted ? t("room.form.third") : "Loading..."}
              </label>
              <input
                id="ThirdName"
                name="ThirdName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.ThirdName}
                className="w-full p-3 border bg-primary-200 text-primary-800 shadow-sm rounded-md"
              />
              {formik.errors.ThirdName && formik.touched.ThirdName && (
                <p className="text-red-500 text-xs">
                  {formik.errors.ThirdName}
                </p>
              )}
            </div>

            <div className="flex-1 min-w-[200px]">
              <label htmlFor="FourthName" className="block text-sm font-medium">
                {mounted ? t("room.form.fourth") : "Loading..."}
              </label>
              <input
                id="FourthName"
                name="FourthName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.FourthName}
                className="w-full p-3 border bg-primary-200 text-primary-800 shadow-sm rounded-md"
              />
              {formik.errors.FourthName && formik.touched.FourthName && (
                <p className="text-red-500 text-xs">
                  {formik.errors.FourthName}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="NationalId" className=" block text-sm font-medium">
              {mounted ? t("room.form.id") : "Loading..."}
            </label>
            <input
              id="NationalId"
              name="NationalId"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.NationalId}
              className="w-[618px] p-3 border bg-primary-200 text-primary-800 shadow-sm rounded-md"
            />
            {formik.errors.NationalId && formik.touched.NationalId && (
              <p className="text-red-500 text-xs">{formik.errors.NationalId}</p>
            )}
          </div>

          <div>
            <label htmlFor="Phone" className="block text-sm font-medium">
              {mounted ? t("room.form.phone") : "Loading..."}
            </label>
            <input
              id="Phone"
              name="Phone"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.Phone}
              className="w-[618px] p-3 border bg-primary-200 text-primary-800 shadow-sm rounded-md"
            />
            {formik.errors.Phone && formik.touched.Phone && (
              <p className="text-red-500 text-xs">{formik.errors.Phone}</p>
            )}
          </div>

          <div>
            <label htmlFor="BirthDate" className="block text-sm font-medium">
              {mounted ? t("room.form.birthDate") : "Loading..."}
            </label>
            <input
              id="BirthDate"
              name="BirthDate"
              type="date"
              onChange={formik.handleChange}
              value={formik.values.BirthDate}
              className="w-[618px] p-3 border bg-primary-200 text-primary-800 shadow-sm rounded-md"
            />
            {formik.errors.BirthDate && formik.touched.BirthDate && (
              <p className="text-red-500 text-xs">{formik.errors.BirthDate}</p>
            )}
          </div>

          <div>
            <label htmlFor="Email" className="block text-sm font-medium">
              {mounted ? t("room.form.email") : "Loading..."}
            </label>
            <input
              id="Email"
              name="Email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.Email}
              className="w-[618px] p-3 border bg-primary-200 text-primary-800 shadow-sm rounded-md"
            />
            {formik.errors.Email && formik.touched.Email && (
              <p className="text-red-500 text-xs">{formik.errors.Email}</p>
            )}
          </div>

          <div>
            <label htmlFor="Gender" className="block text-sm font-medium">
              {mounted ? t("room.form.gender") : "Loading..."}
            </label>
            <select
              id="Gender"
              name="Gender"
              onChange={(e) =>
                formik.setFieldValue("Gender", Number(e.target.value))
              }
              value={formik.values.Gender}
              className="w-[618px] p-3 border bg-primary-200 text-primary-800 shadow-sm rounded-md"
            >
              <option value={0}>
                {mounted ? t("choice.male") : "Loading..."}
              </option>
              <option value={1}>
                {mounted ? t("choice.female") : "Loading..."}
              </option>
            </select>
            {formik.errors.Gender && formik.touched.Gender && (
              <p className="text-red-500 text-xs">{formik.errors.Gender}</p>
            )}
          </div>
          <div>
            <label htmlFor="Religion" className="block text-sm font-medium">
              {mounted ? t("room.form.religion") : "Loading..."}
            </label>
            <select
              id="Religion"
              name="Religion"
              onChange={(e) =>
                formik.setFieldValue("Religion", Number(e.target.value))
              }
              value={formik.values.Religion}
              className="w-[618px] p-3 border bg-primary-200 text-primary-800 shadow-sm rounded-md"
            >
              <option value={0}>
                {mounted ? t("choice.muslim") : "Loading..."}
              </option>
              <option value={1}>
                {mounted ? t("choice.christian") : "Loading..."}
              </option>
              <option value={2}>
                {mounted ? t("choice.jewish") : "Loading..."}
              </option>
            </select>
            {formik.errors.Religion && formik.touched.Religion && (
              <p className="text-red-500 text-xs">{formik.errors.Religion}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="HasSpecialNeeds"
              className="block text-sm font-medium"
            >
              {mounted ? t("room.form.hasSpecialNeeds") : "Loading..."}
            </label>
            <select
              id="HasSpecialNeeds"
              name="HasSpecialNeeds"
              onChange={(e) =>
                formik.setFieldValue(
                  "HasSpecialNeeds",
                  e.target.value === "true"
                )
              }
              value={formik.values.HasSpecialNeeds.toString()}
              className="w-[618px] p-3 border bg-primary-200 text-primary-800 shadow-sm rounded-md"
            >
              <option value="true">
                {mounted ? t("choice.yes") : "Loading..."}
              </option>
              <option value="false">
                {mounted ? t("choice.no") : "Loading..."}
              </option>
            </select>
            {formik.errors.HasSpecialNeeds &&
              formik.touched.HasSpecialNeeds && (
                <p className="text-red-500 text-xs">
                  {formik.errors.HasSpecialNeeds}
                </p>
              )}
          </div>
          <div>
            <label htmlFor="IsMarried" className="block text-sm font-medium">
              {mounted ? t("room.form.isMarried") : "Loading..."}
            </label>
            <select
              id="IsMarried"
              name="IsMarried"
              onChange={(e) =>
                formik.setFieldValue("IsMarried", e.target.value === "true")
              }
              value={formik.values.IsMarried.toString()}
              className="w-[618px] p-3 border bg-primary-200 text-primary-800 shadow-sm rounded-md"
            >
              <option value="true">
                {mounted ? t("choice.yes") : "Loading..."}
              </option>
              <option value="false">
                {mounted ? t("choice.no") : "Loading..."}
              </option>
            </select>
            {formik.errors.IsMarried && formik.touched.IsMarried && (
              <p className="text-red-500 text-xs">{formik.errors.IsMarried}</p>
            )}
          </div>
        </div>

        {/* Guardian Information */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            {mounted ? t("room.form.guardianInformation") : "Loading..."}
          </h2>
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex-1 min-w-[200px]">
              <label
                htmlFor="GuardianFirstName"
                className="block text-sm font-medium"
              >
                {mounted ? t("room.form.guardianFirstName") : "Loading..."}
              </label>
              <input
                id="GuardianFirstName"
                name="GuardianFirstName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.GuardianFirstName}
                className="w-full p-3 border bg-primary-200 text-primary-800 shadow-sm rounded-md"
              />
              {formik.errors.GuardianFirstName &&
                formik.touched.GuardianFirstName && (
                  <p className="text-red-500 text-xs">
                    {formik.errors.GuardianFirstName}
                  </p>
                )}
            </div>
            <div className="flex-1 min-w-[200px]">
              <label
                htmlFor="GuardianSecondName"
                className="block text-sm font-medium"
              >
                {mounted ? t("room.form.guardianSecondName") : "Loading..."}
              </label>
              <input
                id="GuardianSecondName"
                name="GuardianSecondName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.GuardianSecondName}
                className="w-full p-3 border bg-primary-200 text-primary-800 shadow-sm rounded-md"
              />
              {formik.errors.GuardianSecondName &&
                formik.touched.GuardianSecondName && (
                  <p className="text-red-500 text-xs">
                    {formik.errors.GuardianSecondName}
                  </p>
                )}
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex-1 min-w-[200px]">
              <label
                htmlFor="GuardianThirdName"
                className="block text-sm font-medium"
              >
                {mounted ? t("room.form.guardianThirdName") : "Loading..."}
              </label>
              <input
                id="GuardianThirdName"
                name="GuardianThirdName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.GuardianThirdName}
                className="w-full p-3 border bg-primary-200 text-primary-800 shadow-sm rounded-md"
              />
              {formik.errors.GuardianThirdName &&
                formik.touched.GuardianThirdName && (
                  <p className="text-red-500 text-xs">
                    {formik.errors.GuardianThirdName}
                  </p>
                )}
            </div>
            <div className="flex-1 min-w-[200px]">
              <label
                htmlFor="GuardianFourthName"
                className="block text-sm font-medium"
              >
                {mounted ? t("room.form.guardianFourthName") : "Loading..."}
              </label>
              <input
                id="GuardianFourthName"
                name="GuardianFourthName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.GuardianFourthName}
                className="w-full p-3 border bg-primary-200 text-primary-800 shadow-sm rounded-md"
              />
              {formik.errors.GuardianFourthName &&
                formik.touched.GuardianFourthName && (
                  <p className="text-red-500 text-xs">
                    {formik.errors.GuardianFourthName}
                  </p>
                )}
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex-1 min-w-[200px]">
              <label
                htmlFor="GuardianRelation"
                className="block text-sm font-medium"
              >
                {mounted ? t("room.form.guardianRelation") : "Loading..."}
              </label>
              <input
                id="GuardianRelation"
                name="GuardianRelation"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.GuardianRelation}
                className="w-full p-3 border bg-primary-200 text-primary-800 shadow-sm rounded-md"
              />
              {formik.errors.GuardianRelation &&
                formik.touched.GuardianRelation && (
                  <p className="text-red-500 text-xs">
                    {formik.errors.GuardianRelation}
                  </p>
                )}
            </div>
            <div className="flex-1 min-w-[200px]">
              <label
                htmlFor="GuardianNationalId"
                className="block text-sm font-medium"
              >
                {mounted ? t("room.form.guardianNationalId") : "Loading..."}
              </label>
              <input
                id="GuardianNationalId"
                name="GuardianNationalId"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.GuardianNationalId}
                className="w-full p-3 border bg-primary-200 text-primary-800 shadow-sm rounded-md"
              />
              {formik.errors.GuardianNationalId &&
                formik.touched.GuardianNationalId && (
                  <p className="text-red-500 text-xs">
                    {formik.errors.GuardianNationalId}
                  </p>
                )}
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex-1 min-w-[200px]">
              <label
                htmlFor="GuardianJob"
                className="block text-sm font-medium"
              >
                {mounted ? t("room.form.guardianJob") : "Loading..."}
              </label>
              <input
                id="GuardianJob"
                name="GuardianJob"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.GuardianJob}
                className="w-full p-3 border bg-primary-200 text-primary-800 shadow-sm rounded-md"
              />
              {formik.errors.GuardianJob && formik.touched.GuardianJob && (
                <p className="text-red-500 text-xs">
                  {formik.errors.GuardianJob}
                </p>
              )}
            </div>
            <div className="flex-1 min-w-[200px]">
              <label
                htmlFor="GuardianPhone"
                className="block text-sm font-medium"
              >
                {mounted ? t("room.form.guardianPhone") : "Loading..."}
              </label>
              <input
                id="GuardianPhone"
                name="GuardianPhone"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.GuardianPhone}
                className="w-full p-3 border bg-primary-200 text-primary-800 shadow-sm rounded-md"
              />
              {formik.errors.GuardianPhone && formik.touched.GuardianPhone && (
                <p className="text-red-500 text-xs">
                  {formik.errors.GuardianPhone}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Academic Information */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            {mounted ? t("room.form.academicInformation") : "Loading..."}
          </h2>
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex-1 min-w-[200px]">
              <label htmlFor="CollageId" className="block text-sm font-medium">
                {mounted ? t("room.form.college") : "Loading..."}
              </label>
              <select
                id="CollageId"
                name="CollageId"
                onChange={(e) =>
                  formik.setFieldValue("CollageId", Number(e.target.value))
                }
                value={formik.values.CollageId}
                className="w-full p-3 border bg-primary-200 text-primary-800 shadow-sm rounded-md"
              >
                {colleges.map((college) => (
                  <option key={college.collegeId} value={college.collegeId}>
                    {college.name}
                  </option>
                ))}
              </select>
              {formik.errors.CollageId && formik.touched.CollageId && (
                <p className="text-red-500 text-xs">
                  {formik.errors.CollageId}
                </p>
              )}
            </div>

            <div className="flex-1 min-w-[200px]">
              <label
                htmlFor="CollageDepartmentId"
                className="block text-sm font-medium"
              >
                {mounted ? t("room.form.collegeDepartment") : "Loading..."}
              </label>
              <select
                id="CollageDepartmentId"
                name="CollageDepartmentId"
                onChange={(e) =>
                  formik.setFieldValue(
                    "CollageDepartmentId",
                    Number(e.target.value)
                  )
                }
                value={formik.values.CollageDepartmentId}
                className="w-full p-3 border bg-primary-200 text-primary-800 shadow-sm rounded-md"
              >
                {collageDepartments.map((collegeDepartment) => (
                  <option
                    key={collegeDepartment.collegeDepartmentId}
                    value={collegeDepartment.collegeDepartmentId}
                  >
                    {collegeDepartment.name}
                  </option>
                ))}
              </select>
              {formik.errors.CollageDepartmentId &&
                formik.touched.CollageDepartmentId && (
                  <p className="text-red-500 text-xs">
                    {formik.errors.CollageDepartmentId}
                  </p>
                )}
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex-1 min-w-[200px]">
              <label
                htmlFor="AcademicStudentCode"
                className="block text-sm font-medium"
              >
                {mounted ? t("room.form.academicStudentCode") : "Loading..."}
              </label>
              <input
                id="AcademicStudentCode"
                name="AcademicStudentCode"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.AcademicStudentCode}
                className="w-full p-3 border bg-primary-200 text-primary-800 shadow-sm rounded-md"
              />
              {formik.errors.AcademicStudentCode &&
                formik.touched.AcademicStudentCode && (
                  <p className="text-red-500 text-xs">
                    {formik.errors.AcademicStudentCode}
                  </p>
                )}
            </div>

            <div className="flex-1 min-w-[200px]">
              <label
                htmlFor="AcademicYear"
                className="block text-sm font-medium"
              >
                {mounted ? t("room.form.acadmicYear") : "Loading..."}
              </label>
              <input
                id="AcademicYear"
                name="AcademicYear"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.AcademicYear}
                className="w-full p-3 border bg-primary-200 text-primary-800 shadow-sm rounded-md"
              />
              {formik.errors.AcademicYear && formik.touched.AcademicYear && (
                <p className="text-red-500 text-xs">
                  {formik.errors.AcademicYear}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex-1 min-w-[200px]">
              <label
                htmlFor="HighSchoolId"
                className="block text-sm font-medium"
              >
                {mounted ? t("room.form.highSchool") : "Loading..."}
              </label>
              <select
                id="HighSchoolId"
                name="HighSchoolId"
                onChange={formik.handleChange}
                value={formik.values.HighSchoolId}
                className="w-full p-3 border bg-primary-200 text-primary-800 shadow-sm rounded-md"
              >
                {schools.map((school) => (
                  <option key={school.highSchoolId} value={school.highSchoolId}>
                    {school.name}
                  </option>
                ))}
              </select>
              {formik.errors.HighSchoolId && formik.touched.HighSchoolId && (
                <p className="text-red-500 text-xs">
                  {formik.errors.HighSchoolId}
                </p>
              )}
            </div>
            <div className="flex-1 min-w-[200px]">
              <label
                htmlFor="HighSchoolPercentage"
                className="block text-sm font-medium"
              >
                {mounted ? t("room.form.highSchoolPercentage") : "Loading..."}
              </label>
              <input
                id="HighSchoolPercentage"
                name="HighSchoolPercentage"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.HighSchoolPercentage}
                className="w-full p-3 border bg-primary-200 text-primary-800 shadow-sm rounded-md"
              />
              {formik.errors.HighSchoolPercentage &&
                formik.touched.HighSchoolPercentage && (
                  <p className="text-red-500 text-xs">
                    {formik.errors.HighSchoolPercentage}
                  </p>
                )}
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Location</h2>

          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex-1 min-w-[200px]">
              <label htmlFor="CountryId" className="block text-sm font-medium">
                {mounted ? t("room.form.country") : "Loading..."}
              </label>
              <select
                id="CountryId"
                name="CountryId"
                onChange={(e) =>
                  formik.setFieldValue("CountryId", Number(e.target.value))
                }
                value={formik.values.CountryId}
                className="w-full p-3 border bg-primary-200 text-primary-800 shadow-sm rounded-md"
              >
                {country.map((coun) => (
                  <option key={coun.countryId} value={coun.countryId}>
                    {coun.nameEn}
                  </option>
                ))}
              </select>
              {formik.errors.CountryId && formik.touched.CountryId && (
                <p className="text-red-500 text-xs">
                  {formik.errors.CountryId}
                </p>
              )}
            </div>
            {formik.values.CountryId === 50 && (
              <>
                <div className="flex-1 min-w-[200px]">
                  <label
                    htmlFor="GovernorateId"
                    className="block text-sm font-medium"
                  >
                    {mounted ? t("room.form.governorate") : "Loading..."}
                  </label>
                  <select
                    id="GovernorateId"
                    name="GovernorateId"
                    onChange={(e) =>
                      formik.setFieldValue(
                        "GovernorateId",
                        Number(e.target.value)
                      )
                    }
                    value={formik.values.GovernorateId}
                    className="w-full p-3 border bg-primary-200 text-primary-800 shadow-sm rounded-md"
                  >
                    {governorates.map((governorate) => (
                      <option
                        key={governorate.governorateId}
                        value={governorate.governorateId}
                      >
                        {governorate.nameEn}
                      </option>
                    ))}
                  </select>
                  {formik.errors.GovernorateId &&
                    formik.touched.GovernorateId && (
                      <p className="text-red-500 text-xs">
                        {formik.errors.GovernorateId}
                      </p>
                    )}
                </div>
                <div className="flex-1 min-w-[200px]">
                  <label htmlFor="CityId" className="block text-sm font-medium">
                    {mounted ? t("room.form.city") : "Loading..."}
                  </label>
                  <select
                    id="CityId"
                    name="CityId"
                    onChange={(e) =>
                      formik.setFieldValue("CityId", Number(e.target.value))
                    }
                    value={formik.values.CityId}
                    className="w-full p-3 border bg-primary-200 text-primary-800 shadow-sm rounded-md"
                  >
                    {cities.map((city) => (
                      <option key={city.cityId} value={city.cityId}>
                        {city.nameEn}
                      </option>
                    ))}
                  </select>
                  {formik.errors.CityId && formik.touched.CityId && (
                    <p className="text-red-500 text-xs">
                      {formik.errors.CityId}
                    </p>
                  )}
                </div>
                <div className="flex-1 min-w-[200px]">
                  <label
                    htmlFor="VillageId"
                    className="block text-sm font-medium"
                  >
                    {mounted ? t("room.form.village") : "Loading..."}
                  </label>
                  <select
                    id="VillageId"
                    name="VillageId"
                    onChange={(e) =>
                      formik.setFieldValue("VillageId", Number(e.target.value))
                    }
                    value={formik.values.VillageId}
                    className="w-full p-3 border bg-primary-200 text-primary-800 shadow-sm rounded-md"
                  >
                    {villages.map((village) => (
                      <option key={village.villageId} value={village.villageId}>
                        {village.nameEn}
                      </option>
                    ))}
                  </select>
                  {formik.errors.VillageId && formik.touched.VillageId && (
                    <p className="text-red-500 text-xs">
                      {formik.errors.VillageId}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Image Uploads */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            {" "}
            {mounted ? t("room.form.uploadDocuments") : "Loading..."}
          </h2>
          <div>
            <label
              htmlFor="NationalIdImage"
              className="block text-sm font-medium"
            >
              {mounted ? t("room.form.nationalIdImage") : "Loading..."}
            </label>
            <input
              id="NationalIdImage"
              name="NationalIdImage"
              type="file"
              onChange={(event) =>
                formik.setFieldValue(
                  "NationalIdImage",
                  event.currentTarget.files[0]
                )
              }
              className="w-[618px] p-3 border bg-primary-200 text-primary-800 shadow-sm rounded-md"
            />
            {formik.errors.NationalIdImage &&
              formik.touched.NationalIdImage && (
                <p className="text-red-500 text-xs">
                  {formik.errors.NationalIdImage}
                </p>
              )}
          </div>
          <div>
            <label
              htmlFor="GuardianNationalIdImage"
              className="block text-sm font-medium"
            >
              {mounted ? t("room.form.guardianNationalIdImage") : "Loading..."}
            </label>
            <input
              id="GuardianNationalIdImage"
              name="GuardianNationalIdImage"
              type="file"
              onChange={(event) =>
                formik.setFieldValue(
                  "GuardianNationalIdImage",
                  event.currentTarget.files[0]
                )
              }
              className="w-[618px] p-3 border bg-primary-200 text-primary-800 shadow-sm rounded-md"
            />
            {formik.errors.GuardianNationalIdImage &&
              formik.touched.GuardianNationalIdImage && (
                <p className="text-red-500 text-xs">
                  {formik.errors.GuardianNationalIdImage}
                </p>
              )}
          </div>
          <div>
            <label
              htmlFor="PersonalImage"
              className="block text-sm font-medium"
            >
              {mounted ? t("room.form.personalImage") : "Loading..."}
            </label>
            <input
              id="PersonalImage"
              name="PersonalImage"
              type="file"
              onChange={(event) =>
                formik.setFieldValue(
                  "PersonalImage",
                  event.currentTarget.files[0]
                )
              }
              className="w-[618px] p-3 border bg-primary-200 text-primary-800 shadow-sm rounded-md"
            />
            {formik.errors.PersonalImage && formik.touched.PersonalImage && (
              <p className="text-red-500 text-xs">
                {formik.errors.PersonalImage}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="WaterBill" className="block text-sm font-medium">
              {mounted ? t("room.form.waterBill") : "Loading..."}
            </label>
            <input
              id="WaterBill"
              name="WaterBill"
              type="file"
              onChange={(event) =>
                formik.setFieldValue("WaterBill", event.currentTarget.files[0])
              }
              className="w-[618px] p-3 border bg-primary-200 text-primary-800 shadow-sm rounded-md"
            />
            {formik.errors.WaterBill && formik.touched.WaterBill && (
              <p className="text-red-500 text-xs">{formik.errors.WaterBill}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="ResidenceApplication"
              className="block text-sm font-medium"
            >
              {mounted ? t("room.form.residenceApplication") : "Loading..."}
            </label>
            <input
              id="ResidenceApplication"
              name="ResidenceApplication"
              type="file"
              onChange={(event) =>
                formik.setFieldValue(
                  "ResidenceApplication",
                  event.currentTarget.files[0]
                )
              }
              className="w-[618px] p-3 border bg-primary-200 text-primary-800 shadow-sm rounded-md"
            />
            {formik.errors.ResidenceApplication &&
              formik.touched.ResidenceApplication && (
                <p className="text-red-500 text-xs">
                  {formik.errors.ResidenceApplication}
                </p>
              )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={formik.isSubmitting}
            onClick={() => console.log("Button clicked!")}
            className="px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
          >
            {!mounted || formik.isSubmitting
              ? "Loading..."
              : t("room.form.button")}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReservationFormNew;
