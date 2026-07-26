import { useState, useEffect, useCallback } from "react";
import { profileApi } from "../api/profileApi";

/** Loads and mutates the single Profile document. */
export function useProfile() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await profileApi.get();
      setProfile(data.data || data);
    } catch (err) {
      setError(err?.response?.data?.message || "Couldn't load the base profile.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const updateProfile = useCallback(async (payload) => {
    const data = await profileApi.update(payload);
    setProfile(data.data || data);
    return data;
  }, []);

  const uploadImage = useCallback(async (file) => {
    const data = await profileApi.uploadImage(file);
    setProfile(data.data || data);
    return data;
  }, []);

  const deleteImage = useCallback(async () => {
    const data = await profileApi.deleteImage();
    setProfile(data.data || data);
    return data;
  }, []);

  const uploadResume = useCallback(async (file) => {
    const data = await profileApi.uploadResume(file);
    setProfile(data.data || data);
    return data;
  }, []);

  const deleteResume = useCallback(async () => {
    const data = await profileApi.deleteResume();
    setProfile(data.data || data);
    return data;
  }, []);

  return { profile, isLoading, error, refresh, updateProfile, uploadImage, deleteImage, uploadResume, deleteResume };
}
