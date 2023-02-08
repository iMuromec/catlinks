import useSWR from "swr";

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((response) => response.json());

export default function useUser() {
  const { data, mutate, error } = useSWR("/api/user", fetcher);

  const unauthorized = data && data.message === "Unauthorized";
  const loading = !data && !error;
  const loggedOut = error && error.status === 403;
  return {
    loading,
    unauthorized,
    loggedOut,
    user: data,
    mutate,
  };
}
