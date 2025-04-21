import axios from "axios";
import { SurvivorInput, SurvivorReport } from "../types/survivor.interface";
const API = import.meta.env.API || "http://localhost:4000/api";
export const createSurvivor = async (survivor: SurvivorInput) => {
  try {
    const response = await axios.post(`${API}/survivor/`, survivor);
    return response.data;
  } catch (error) {
    console.error("Error creating survivor:", error);
    throw error;
  }
};

export const getAllSurvivors = async (): Promise<SurvivorReport[]> => {
  try {
    const response = await axios.get(`${API}/survivor/`);
    return response.data.payload.survivors;
  } catch (error) {
    console.error("Error fetching survivors:", error);
    throw error;
  }
};
