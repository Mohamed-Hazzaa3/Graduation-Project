/////////////
// GET

export async function getCabin(id) {
  try {
    const response = await fetch(
      `http://housing-sys.runasp.net/api/v1/rooms/${id}`
    );
    const result = await response.json();

    if (!result.succeeded || !result.data) {
      console.error(
        "Error fetching cabin:",
        result.errors || "Unexpected response"
      );
      return null;
    }

    return result.data;
  } catch (error) {
    console.error("Network error:", error);
    return null;
  }
}

export async function getCabins() {
  try {
    const response = await fetch(
      "http://housing-sys.runasp.net/api/v1/rooms/List"
    );
    const result = await response.json();

    if (!result.succeeded || !Array.isArray(result.data)) {
      console.error(
        "Error fetching cabins:",
        result.errors || "Unexpected response"
      );
      return [];
    }

    return result.data;
  } catch (error) {
    console.error("Network error:", error);
    return [];
  }
}
export async function getCountry() {
  try {
    const response = await fetch(
      "http://housing-sys.runasp.net/api/v1/countries/list"
    );
    const result = await response.json();
    if (!result.succeeded || !Array.isArray(result.data)) {
      console.error(
        "Error fetching countries:",
        result.errors || "Unexpected response"
      );
      return [];
    }
    return result.data;
  } catch (error) {
    console.error("Network error:", error);
    return [];
  }
}
export async function getGovernorates() {
  try {
    const res = await fetch(
      "http://housing-sys.runasp.net/api/v1/countries/50/governorates"
    );
    const result = await res.json();
    if (!result.succeeded || !Array.isArray(result.data)) {
      console.error(
        "Error fetching governorates:",
        result.errors || "Unexpected response"
      );
      return [];
    }
    return result.data;
  } catch (error) {
    console.error("Network error:", error);
    return [];
  }
}
export async function getCities(governorateId) {
  try {
    const res = await fetch(
      `http://housing-sys.runasp.net/api/v1/Governorates/${governorateId}/cities`
    );
    const result = await res.json();
    if (!result.succeeded || !Array.isArray(result.data)) {
      console.error(
        "Error fetching cities",
        result.errors || "Unexpected response"
      );
      return [];
    }
    return result.data;
    console.log("Response JSON:", result);
  } catch (error) {
    console.error("Network error:", error);
    return [];
  }
}
export async function getVillages(cityId) {
  try {
    const res = await fetch(
      `http://housing-sys.runasp.net/api/v1/cities/${cityId}/villages`
    );
    const result = await res.json();
    if (!result.succeeded || !Array.isArray(result.data)) {
      console.error(
        "Error fetching villages",
        result.errors || "Unexpected response"
      );
      return [];
    }
    return result.data;
  } catch (error) {
    console.error("Network error:", error);
    return [];
  }
}

export async function getSchools() {
  try {
    const res = await fetch(
      `http://housing-sys.runasp.net/api/v1/high-school/List`
    );
    const result = await res.json();
    if (!result.succeeded || !Array.isArray(result.data)) {
      console.error(
        "Error fetching Schools",
        result.error || "Unexpected response"
      );
      return [];
    }
    return result.data;
  } catch (error) {
    console.error("Network error:", error);
    return [];
  }
}

export async function getColleges() {
  try {
    const response = await fetch(
      "http://housing-sys.runasp.net/api/v1/colleges/List"
    );
    const result = await response.json();
    if (!result.succeeded || !Array.isArray(result.data)) {
      console.error(
        "Error fetching coolleges:",
        result.errors || "Unexpected response"
      );
      return [];
    }
    return result.data;
  } catch (error) {
    console.error("Network error:", error);
    return [];
  }
}
export async function getCollegesDepartments(collegeId) {
  try {
    const response = await fetch(
      `http://housing-sys.runasp.net/api/v1/colleges/departments/${collegeId}`
    );
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Network error:", error);
    return [];
  }
}

export async function getEvents() {
  try {
    const res = await fetch(
      `http://housing-sys.runasp.net/api/v1/event/coming`
    );
    const result = await res.json();
    if (!result.succeeded || !Array.isArray(result.data)) {
      console.error(
        "Error fetching Events",
        result.error || "Unexpected response"
      );
      return [];
    }
    return result.data;
  } catch (error) {
    console.error("Network error:", error);
    return [];
  }
}
export async function getIssueType() {
  try {
    const res = await fetch(
      `http://housing-sys.runasp.net/api/v1/issuetypes/list`
    );
    const result = await res.json();
    if (!result.succeeded || !Array.isArray(result.data)) {
      console.error(
        "Error fetching IssueTypes",
        result.error || "Unexpected response"
      );
      return [];
    }
    return result.data;
  } catch (error) {
    console.error("Network error:", error);
    return [];
  }
}
//send Data ......................................................

export const createNewStudent = async (data, roomId) => {
  try {
    const formData = new FormData();

    const fileFields = [
      "nationalIdImage",
      "guardianNationalIdImage",
      "personalImage",
      "waterBill",
      "residenceApplication",
    ];

    Object.entries(data).forEach(([key, value]) => {
      if (fileFields.includes(key)) {
        if (value instanceof File) {
          formData.append(key, value);
        }
      } else if (
        (key === "CollageId" ||
          key === "CollageDepartmentId" ||
          key === "VillageId") &&
        (value === 0 || value === "0")
      ) {
        return;
      } else if (typeof value === "boolean" || typeof value === "number") {
        formData.append(key, value.toString());
      } else {
        formData.append(key, value ?? "");
      }
    });

    formData.append("FavRoomId", roomId);
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    const response = await fetch(
      "http://housing-sys.runasp.net/api/v1/new-student/create",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response from server:", errorData);
      throw new Error(errorData?.message || "Submission failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Network error", error);
    throw error;
  }
};
export const createOldStudent = async (data, roomId) => {
  try {
    const formData = new FormData();

    const fileFields = [
      "nationalIdImage",
      "guardianNationalIdImage",
      "personalImage",
      "waterBill",
      "residenceApplication",
    ];

    const requiredStringFields = [
      "registrationCode",
      "guardianFirstName",
      "guardianSecondName",
      "guardianThirdName",
      "guardianFourthName",
      "guardianJob",
      "guardianNationalId",
      "guardianPhone",
      "guardianRelation",
      "firstName",
      "secondName",
      "thirdName",
      "fourthName",
      "nationalId",
      "phone",
      "academicStudentCode",
      "academicYear",
      "email",
    ];

    const invalidIfZeroFields = [
      "collageId",
      "collageDepartmentId",
      "villageId",
    ];

    Object.entries(data).forEach(([key, value]) => {
      if (fileFields.includes(key)) {
        if (value instanceof File) {
          formData.append(key, value);
        } else {
          console.warn(`⚠️ Missing file for ${key}`);
        }
      } else if (invalidIfZeroFields.includes(key)) {
        if (value !== 0 && value !== "0") {
          formData.append(key, value);
        } else {
          console.warn(`⚠️ Invalid value for ${key}`);
        }
      } else if (typeof value === "boolean" || typeof value === "number") {
        formData.append(key, value.toString());
      } else if (requiredStringFields.includes(key)) {
        if (typeof value === "string" && value.trim() !== "") {
          formData.append(key, value.trim());
        } else {
          console.warn(`⚠️ Missing or invalid string value for ${key}`);
        }
      } else if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    formData.append("FavRoomId", roomId);
    const response = await fetch(
      "http://housing-sys.runasp.net/api/v1/old-student/create",
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();

    if (!response.ok || !result.succeeded) {
      console.error("❌ Error response from server:", result);
      throw new Error(result?.message || "Submission failed");
    }

    return result;
  } catch (error) {
    console.error("❗ Network error:", error);
    throw error;
  }
};

export const createIssue = async (data, token) => {
  try {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    console.log(token);
    const res = await fetch(
      "http://housing-sys.runasp.net/api/v1/issue/create",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    const result = await res.json();

    if (!res.ok || !result.succeeded) {
      console.error("❌ Error response from server:", result);
      throw new Error(result?.message || "Submission failed");
    }

    return result;
  } catch (error) {
    console.error("❗ Network error:", error);
    throw error;
  }
};
