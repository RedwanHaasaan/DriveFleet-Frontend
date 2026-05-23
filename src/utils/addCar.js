// utils/addCar.js

import { apiFetch } from "./api";

export const addCar = async (carData) => {
  try {
    const response = await apiFetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/car/add-car`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(carData),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to add car");
    }

    return data;
  } catch (error) {
    console.error("Error in addCar utility:", error);
    throw error;
  }
};
