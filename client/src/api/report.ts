import axios from "axios";

const API = import.meta.env.API || "http://localhost:4000/api";

export const getInfectedPercentage = async () => {
  try {
    const response = await axios.get(`${API}/report/stats/infected`);
    return response.data;
  } catch (error) {
    console.error("Error fetching infected percentage:", error);
    throw error;
  }
};

export const getHealthyPercentage = async () => {
  try {
    const response = await axios.get(`${API}/report/stats/healthy`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching healthy percentage:", error);
    throw error;
  }
};

export const getAverageResources = async () => {
  try {
    const response = await axios.get(`${API}/report/stats/resources`);
    return response.data;
  } catch (error) {
    console.error("Error fetching average resources:", error);
    throw error;
  }
};

export const getLostPoints = async () => {
  try {
    const response = await axios.get(`${API}/report/stats/points-lost`);
    return response.data;
  } catch (error) {
    console.error("Error fetching lost points:", error);
    throw error;
  }
};

export const reportInfection = async (survivorId: string) => {
  try {
    const response = await axios.post(`${API}/report/${survivorId}`);
    return response.data;
  } catch (error) {
    console.error("Error reporting infection:", error);
    throw error;
  }
};
