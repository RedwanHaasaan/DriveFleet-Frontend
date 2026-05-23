// utils/booking.js

export const createBooking = async (bookingData) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/booking`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to create booking");
    }

    return data;
  } catch (error) {
    console.error("Error in createBooking utility:", error);
    throw error;
  }
};

export const fetchMyBookings = async (userId) => {
  try {
    if (!userId) return [];
    
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/booking/my-bookings?userId=${userId}`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch bookings");
    }

    return data;
  } catch (error) {
    console.error("Error in fetchMyBookings utility:", error);
    throw error;
  }
};

export const updateBooking = async (bookingId, dates) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/booking/${bookingId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dates),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update booking");
    }

    return data;
  } catch (error) {
    console.error("Error in updateBooking utility:", error);
    throw error;
  }
};

export const cancelBooking = async (bookingId) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/booking/${bookingId}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to cancel booking");
    }

    return data;
  } catch (error) {
    console.error("Error in cancelBooking utility:", error);
    throw error;
  }
};
