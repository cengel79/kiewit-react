import * as apiUtils from "./apiUtils";
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export async function getCourses() {
  try {
    const response = await apiUtils.fetchGet(BASE_URL + "courses/");

    return response;
  } catch (error) {
    throw error;
  }
}

export async function deleteCourse(courseId) {
  try {
    const response = await apiUtils.fetchDelete(
      BASE_URL + "courses/",
      courseId
    );

    return response;
  } catch (error) {
    throw error;
  }
}
