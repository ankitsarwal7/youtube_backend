// const asyncHandler = (requestHandler) = {
//     (req, res, next) => {
//         Promise.resolve(requestHandler (req, res , next)).catch((err) => next(err))
//     }
// }
// export {asyncHandler}


 
const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (err) {
        const statusCode = err.statusCode || 500; // Use valid HTTP status code
        res.status(statusCode).json({
            success: false,
            message: err.message || "Internal Server Error"
        });
    }
};

export { asyncHandler };
