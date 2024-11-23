import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
    try {
        await schema.validateAsync(req.body, {
            abortEarly: false,
        });
        next();
    } catch (err) {
        const error = createHttpError(400, 'Contact is not valid', {
            message: err.message,
        });
        next(error);
    }
};
