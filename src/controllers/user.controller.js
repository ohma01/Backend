import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"

const registerUser = asyncHandler(async (req, res) => {
    // steps involved in registring user
    // 1. get user details from the frontend
    // 2. validation - not empty
    // 3. check if user already exists via username and email BroadcastChannel
    // 4. check for image and avatar 
    // 5. upload them to cloudinary
    // 6. create user object and then create its enty in database
    // 7. check for user creation
    // 8. remove password and refresh token from the response received
    // 9. return response

    const { username, fullname, email, password } = req.body
    console.log(req.body);

    // Check if any of the required fields are empty
    if (
        // Use .some() to check if at least one field is an empty string after trimming spaces
        [fullname, email, username, password].some((field) => field?.trim() === "")
    ) {
        // If any field is empty, throw a custom API error with status code 400
        throw new ApiError(400, "All fields are required");
    }

    // Find a user in the database with either the same username or the same email
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists");
    }

    console.log(req.files);
      
    // Get the local file path of the uploaded avatar (if it exists)
    // const avatarLocalPath = req.files?.avatar[0]?.path;
    // Get the local file path of the uploaded coverImage (if it exists)
   
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;
    // (direct optional chaining) – might throw errors in some cases,
    // Updated and safer way of handling this
    let coverImageLocalPath;

    if (
        req.files &&                               // check if req.files exists
        Array.isArray(req.files.coverImage) &&     // ensure coverImage is an array
        req.files.coverImage.length > 0            // make sure at least one file exists
    ) {
        // safely access the first file’s path
        coverImageLocalPath = req.files.coverImage[0].path;
    }

     let avatarLocalPath;

    if (
        req.files &&                            // check if req.files exists
        Array.isArray(req.files.avatar) &&     // ensure avatar is an array
        req.files.avatar.length > 0           // make sure at least one file exists
    ) {
        // safely access the first file’s path
        avatarLocalPath = req.files.avatar[0].path;
    }


    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    if (!avatar) {
        throw new ApiError(400, "Avatar file is required");
    }

    // create user
    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase(),
    });

    // Fetch the newly created user from the database by their _id
    // .select("-password -refreshToken") → exclude sensitive fields from the result
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken "
    );

    if (!createdUser) {
        throw new ApiError(500, "something went wrong while registering the user");
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    );

})


export { registerUser, }