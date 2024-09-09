import { useState, useEffect } from "react";
import API from "./axios";

export const useAdminProfile = () => {
  const getAdminProfile = async () => {
    try {
      const response = await API.get("/admin/me");
      return response.data;
    } catch (error) {
      console.error("Error fetching admin profile:", error);
      throw error;
    }
  };
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const adminProfile = await getAdminProfile();
        setAdmin(adminProfile);
      } catch (error) {
        setError("Failed to fetch admin profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchAdminProfile();
  }, []);
  return { admin, loading, error };
};

// sign out
export const signOutAdmin = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

// users
export const useUsers = () => {
  const getUsers = async () => {
    try {
      const response = await API.get("/user/all");
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  };

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();
        setUsers(usersData);
      } catch (error) {
        setError("Failed to fetch Users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading, error };
};

// Enrolled
export const useEnrolled = () => {
  const getEnrolled = async () => {
    try {
      const response = await API.get("/enroll/all");
      return response.data;
    } catch (error) {
      console.error("Error fetching Enrolled:", error);
      throw error;
    }
  };

  const [enrolled, setEnrolled] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEnrolled = async () => {
      try {
        const enrolledData = await getEnrolled();
        setEnrolled(enrolledData);
      } catch (error) {
        setError("Failed to fetch Enrolled.");
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolled();
  }, []);

  return { enrolled, loading, error };
};

// Milestne
export const useMilestone = () => {
  const getMileStone = async () => {
    try {
      const response = await API.get("/milestone/milestones");
      return response.data;
    } catch (error) {
      console.error("Error fetching Milestone:", error);
      throw error;
    }
  };

  const [milestone, setMilestone] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMilestone = async () => {
      try {
        const milestoneData = await getMileStone();
        setMilestone(milestoneData);
      } catch (error) {
        setError("Failed to fetch milestone.");
      } finally {
        setLoading(false);
      }
    };

    fetchMilestone();
  }, []);

  return { milestone, loading, error };
};
