import createHttpError from "http-errors";
import isValidObjectId from "mongoose";


export const isValidId = (req, res, next) => {
  const { waterId } = req.params;
  if (!isValidObjectId(waterId)) {
    next(createHttpError(404, `${waterId} is not valid id`));
  }
  next();
};
