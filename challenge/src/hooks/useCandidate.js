import { useState, useEffect } from "react";
import { fetchCandidate, fetchJobs } from "../api/client";

const CANDIDATE_EMAIL = "alejoretamal432@gmail.com";

export function useCandidate() {
  const [candidate, setCandidate] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const [candidateData, jobsData] = await Promise.all([
          fetchCandidate(CANDIDATE_EMAIL),
          fetchJobs(),
        ]);
        setCandidate(candidateData);
        setJobs(jobsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { candidate, jobs, loading, error };
}