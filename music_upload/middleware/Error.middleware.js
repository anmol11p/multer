export const errorMiddleware = (err, req, res, next) => {
  const status = err.status || 400;
  const errorMessage =
    typeof err === "string" ? err : err.message || "BackendError";
  return res.status(status).json({ err: errorMessage || err.message });
};
