import { useState, useEffect, useCallback } from "react";
import { projectsApi } from "../api/projectsApi";

/** Loads and mutates the Projects collection. */
export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await projectsApi.list();
      setProjects(data.data || data);
    } catch (err) {
      setError(err?.response?.data?.message || "Couldn't load the arsenal.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const createProject = useCallback(async (payload) => {
    const data = await projectsApi.create(payload);
    await refresh();
    return data;
  }, [refresh]);

  const updateProject = useCallback(async (id, payload) => {
    const data = await projectsApi.update(id, payload);
    await refresh();
    return data;
  }, [refresh]);

  const removeProject = useCallback(async (id) => {
    await projectsApi.remove(id);
    setProjects((prev) => prev.filter((p) => p._id !== id));
  }, []);

  return { projects, isLoading, error, refresh, createProject, updateProject, removeProject };
}
