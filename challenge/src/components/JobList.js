import { JobItem } from "./JobItem";

export function JobList({ jobs, candidate }) {
  return (
    <div>
      {jobs.map((job) => (
        <JobItem key={job.id} job={job} candidate={candidate} />
      ))}
    </div>
  );
}