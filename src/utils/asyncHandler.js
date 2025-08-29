
// Promise based async Handler wrapper function
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next))
    .catch((err) => next(err));
  };
};

export default asyncHandler;





// this is the asyncHandler using try catch part, same can be done using the
// promises also (as coded above) both are professional approach any one can be used

//  step:1 const asyncHandler = () => {};
// step:2 const asyncHandler = (func) => {};
// step:3 const asyncHandler = (func) => {
//          () => {};
//      };
// step:4 const asyncHandler = (func) = > async () => {};

// const asyncHandler  = (fxn) = async(req,res,next) => {
//     try {
//         await fxn(req,res,next);
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success:false,
//             message:error.message
//         });  
        
//     }
// }