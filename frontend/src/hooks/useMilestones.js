import { useState, useEffect, useCallback } from "react";
import { milestonesApi } from "../api/milestonesApi";

/** Loads and mutates the Milestones collection. */
export function useMilestones() {
  const [milestones, setMilestones] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await milestonesApi.list();
      setMilestones(data.data || data);
    } catch (err) {
      setError(err?.response?.data?.message || "Couldn't load the trail markers.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const createMilestone = useCallback(async (payload) => {
    const data = await milestonesApi.create(payload);
    await refresh();
    return data;
  }, [refresh]);

  const updateMilestone = useCallback(async (id, payload) => {
    const data = await milestonesApi.update(id, payload);
    await refresh();
    return data;
  }, [refresh]);

  const removeMilestone = useCallback(async (id) => {
    await milestonesApi.remove(id);
    setMilestones((prev) => prev.filter((m) => m._id !== id));
  }, []);

  return { milestones, isLoading, error, refresh, createMilestone, updateMilestone, removeMilestone };
}
