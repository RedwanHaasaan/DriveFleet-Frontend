// utils/fetchCars.js

export const fetchCars = async ({
  search = "",
  filters = {},
}) => {
  try {
    const params = new URLSearchParams();

    // Search
    if (search) {
      params.set("search", search);
    }

    // Filters
    if (filters.location) {
      params.set("location", filters.location);
    }

    if (filters.minPrice) {
      params.set("minPrice", filters.minPrice);
    }

    if (filters.maxPrice) {
      params.set("maxPrice", filters.maxPrice);
    }

    if (filters.sortBy) {
      params.set("sortBy", filters.sortBy);
    }

    if (filters.sortOrder) {
      params.set("sortOrder", filters.sortOrder);
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/car?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch cars");
    }

    return await response.json();

  } catch (error) {
    console.log(error);

    throw error;
  }
};

export const fetchCarById = async (id) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/car/${id}`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch car details");
    }

    return data;
  } catch (error) {
    console.error("Error in fetchCarById utility:", error);
    throw error;
  }
};

export const fetchRecentCars = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/recentcar`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch recent cars");
    }

    return data;
  } catch (error) {
    console.error("Error in fetchRecentCars utility:", error);
    throw error;
  }
};