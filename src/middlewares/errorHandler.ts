import { ErrorRequestHandler } from "express";


const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err)
  console.log("NAME",err.name)
  if (err.type === "conflict") return res.status(409).send(err.message);
  if(err.type === "unauthorized") return res.status(401).send(err.message);
  if(err.message === "jwt expired") return res.status(401).send("token expired");
  if(err.type === "notFound") return res.status(404).send(err.message);
  if(err.name === "JsonWebTokenError") return res.status(401).send("jwt malformed");
  res.status(500).send("Internal server error");
  next(err);
};
export default errorHandler;