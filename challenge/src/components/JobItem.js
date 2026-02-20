import { useState } from "react";
import { applyToJob } from "../api/client";

export function JobItem({ job, candidate }) {
  const [repoUrl, setRepoUrl] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  async function handleSubmit() {
    if (!repoUrl.trim()) {
      setError("Ingresá la URL de tu repositorio.");
      return;
    }
    setStatus("loading");
    setError(null);
    try {
      await applyToJob({
        uuid: candidate.uuid,
        jobId: job.id,
        candidateId: candidate.candidateId,
        repoUrl: repoUrl.trim(),
      });
      setStatus("success");
    } catch (err) {
      setError(err.message);
      setStatus("idle");
    }
  }

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{job.title}</h3>
      <div style={styles.row}>
        <input
          style={styles.input}
          type="url"
          placeholder="https://github.com/tu-usuario/tu-repo"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          disabled={status === "loading" || status === "success"}
        />
        <button
          style={{
            ...styles.button,
            ...(status === "success" ? styles.buttonSuccess : {}),
            ...(status === "loading" ? styles.buttonDisabled : {}),
          }}
          onClick={handleSubmit}
          disabled={status === "loading" || status === "success"}
        >
          {status === "loading" ? "Enviando..." : status === "success" ? "✓ Enviado" : "Submit"}
        </button>
      </div>
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    padding: "20px 24px",
    marginBottom: "16px",
    backgroundColor: "#fff",
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
  },
  title: {
    margin: "0 0 14px 0",
    fontSize: "16px",
    fontWeight: "600",
    color: "#1a202c",
  },
  row: {
    display: "flex",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "9px 12px",
    border: "1px solid #cbd5e0",
    borderRadius: "6px",
    fontSize: "14px",
    outline: "none",
  },
  button: {
    padding: "9px 20px",
    backgroundColor: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  buttonSuccess: {
    backgroundColor: "#22c55e",
    cursor: "default",
  },
  buttonDisabled: {
    backgroundColor: "#93c5fd",
    cursor: "not-allowed",
  },
  error: {
    marginTop: "10px",
    color: "#ef4444",
    fontSize: "13px",
  },
};