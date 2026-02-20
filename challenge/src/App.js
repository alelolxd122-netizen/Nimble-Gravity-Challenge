import { useCandidate } from "./hooks/useCandidate";
import { JobList } from "./components/JobList";

export default function App() {
  const { candidate, jobs, loading, error } = useCandidate();

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.heading}>Posiciones Abiertas</h1>

        {loading && <p style={styles.muted}>Cargando posiciones...</p>}

        {error && (
          <div style={styles.errorBox}>
            <strong>Error:</strong> {error}
          </div>
        )}

        {!loading && !error && candidate && (
          <>
            <p style={styles.welcome}>
              seleccioná la posición y pegá tu repo para postularte.
            </p>
            <JobList jobs={jobs} candidate={candidate} />
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f8fafc",
    padding: "40px 16px",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  container: {
    maxWidth: "640px",
    margin: "0 auto",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: "8px",
  },
  welcome: {
    color: "#475569",
    fontSize: "14px",
    marginBottom: "24px",
  },
  muted: {
    color: "#94a3b8",
    fontSize: "14px",
  },
  errorBox: {
    backgroundColor: "#fef2f2",
    border: "1px solid #fca5a5",
    color: "#b91c1c",
    padding: "12px 16px",
    borderRadius: "8px",
    fontSize: "14px",
  },
};