import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const finance = axios.create({
  baseURL: "https://finance-mongo.onrender.com",
});

const setAuthHeader = (token) => {
  if (token) {
    finance.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete finance.defaults.headers.common.Authorization;
  }
};
const token = localStorage.getItem("token");
if (token) {
  setAuthHeader(token);
}

finance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      setAuthHeader(null);
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

axios.defaults.withCredentials = true;

export const registerUser = createAsyncThunk(
  "registerUser",
  async (credentials, thunkApi) => {
    try {
      const { data } = await finance.post("users/register", {
        email: credentials.email,
        password: credentials.password,
      });

      toast.success("Registration successful");
      const loginResponse = await thunkApi.dispatch(login(credentials));
      return data;
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error("Email is already in use. Please try another one.");
      }
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  "login",
  async (credentials, thunkApi) => {
    try {
      const { data } = await finance.post("users/login", credentials);
      toast.success("Login successful");
      setAuthHeader(data.data.accessToken);
      localStorage.setItem("token", data.data.accessToken);
      console.log(localStorage.getItem("token"));

      return data;
    } catch (error) {
      console.error("Login error details:", error.response?.data);

      if (error.response && error.response.status === 401) {
        toast.error("Email or password is incorrect.");
      } else {
        toast.error("Login failed. Please try again.");
      }

      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const currentUser = createAsyncThunk(
  "user/currentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await finance.get("users/current");

      if (response.status !== 200) {
        throw new Error("Failed to fetch user data");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const updateUser = createAsyncThunk(
  "updateUser",
  async (updateData, thunkApi) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      setAuthHeader(token);
      const { data } = await finance.patch("users/update", updateData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(`User updated ${data.data.name}`);
      await thunkApi.dispatch(currentUser());
      return data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to update user");
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const logout = createAsyncThunk("logout", async (_, thunkApi) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      await finance.post(
        "users/logout",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    }
    localStorage.removeItem("token");
    setAuthHeader(null);
    toast.success("Logout successful");
  } catch (error) {
    toast.error(error.message || "Logout failed");
    return thunkApi.rejectWithValue(error.message);
  }
});

export const refresh = createAsyncThunk("auth/refresh", async (_, thunkApi) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }
    const { data } = await aquaTrack.get("users/refresh", {
      headers: { Authorization: `Bearer ${token}` },
    });
    localStorage.setItem("token", data.accessToken);
    setAuthHeader(data.accessToken);
    console.log(`refresh${data}`);
    return data;
  } catch (error) {
    localStorage.removeItem("token");
    setAuthHeader(null);
    return thunkApi.rejectWithValue(error.message);
  }
});
