const bcrypt = require("bcryptjs");
const Users = require("../../model/users.model");
const { createAccessToken, createRefreshToken } = require("../../utils/jwt");
const { sendOTPEmail } = require("../../utils/emailsOTP");
const { setAuthCookies } = require("../../utils/cookieUtils")


// API: /api/auth/register
exports.registerAccount = async (req, res) => {
    try {
        const { email, username, password } =
            req.body;

        if (!email || !username || !password) {
            return res
                .status(400)
                .json({ message: "Please enter complete information!" });
        }

        const existingUser = await Users.findOne({
            $or: [{ email }, { username }],
        });

        if (existingUser) {
            return res.status(400).json({
                message:
                    existingUser.email === email
                        ? "Email already exists"
                        : "Username already exists",
            });
        }
        try {
            const newAccount = new Users({
                email,
                username,
                password,
            });
            await newAccount.save();

            return res.status(201).json({
                message: "Register successfully!",
                account: newAccount,
            });
        } catch (error) {
            if (error.name === "ValidationError") {
                const validationErrors = Object.values(error.errors).map(
                    (err) => err.message
                );
                return res
                    .status(400)
                    .json({ message: "Validation error", errors: validationErrors });
            }

            return res.status(500).json({
                message: "Account creation failed",
                error: error.message,
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Error while registering",
            error: error.message,
        });
    }
};


//API: /api/auth/login
exports.loginAccount = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res
                .status(400)
                .json({ message: "Please enter complete information !" });
        }

        const user = await Users.findOne({ username });
        if (!user) {
            return res.status(404).json({
                message: "Account not created !!",
            });
        }
        console.log(user);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res
                .status(401)
                .json({ message: "Username or password is incorrect!!" });
        }

        const accessToken = createAccessToken({ id: user._id, role: user.role });
        const refreshToken = createRefreshToken();

        await Users.findByIdAndUpdate(
            user._id,
            { re_token: refreshToken },
            { new: true }
        );

        setAuthCookies(res, accessToken, refreshToken);
        return res.status(200).json({
            message: "Login successfully",
            accessToken: accessToken,
            re_token: refreshToken,
        });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Error while logging in", error: error.message });
    }
};


//API: /api/auth/admin-profile
exports.getAdminProfile = async (req, res) => {
    try {
        if (!req.account || !req.account.id) {
            return res.status(400).json({ message: "ID not found from token" });
        }
        const userId = req.account.id;
        if (req.account.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }
        const admin = await Users.findById(userId).select("email username role");
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        return res.json({
            message: "Admin profile retrieved successfully",
            profile: admin,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error retrieving admin profile",
            error: error.message,
        });
    }
};

//API: /api/auth/logout
exports.logOutAccount = async (req, res) => {
    try {
        const { re_token } = req.body;
        if (!re_token)
            return res
                .status(400)
                .json({ message: "You are not logged in or the token is invalid" });

        const tokenDoc = await Users.findOne({ re_token });
        if (!tokenDoc)
            return res.status(400).json({ message: "Token is invalid or expired" });
        await Users.deleteOne({ _id: tokenDoc._id });
        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Error while logging out", error: error.message });
    }
};

//API: /api/auth/forgot-password
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email)
            return res.status(400).json({ message: "Please enter email !!" });
        const user = await Users.findOne({ email });
        if (!user) return res.status(404).json({ message: "Email does not exist" });

        const otp = Math.floor(100000 + Math.random() * 900000);
        const hashedOtp = await bcrypt.hash(otp.toString(), 10);
        const otpExpiration = new Date(Date.now() + 5 + 60 * 1000);

        await Users.updateOne(
            { _id: user._id },
            { otp: hashedOtp, otpExpiration }
        );
        await sendOTPEmail(email, otp);
        return res.json({ message: "OTP has been sent to your email" });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Error while sending OTP", error: error.message });
    }
};

//API: /api/auth/verify-otp
exports.verifyOTP = async (req, res) => {
    try {
        const { otp } = req.body;
        if (!otp) return res.status(400).json({ message: "Please enter OTP" });
        const users = await Users.find({ otp: { $ne: null } });

        if (!users || users.length === 0) {
            return res.status(400).json({ message: "OTP is incorrect or expired" });
        }
        let matchedUser = null;
        for (const user of users) {
            if (user.otpExpiration && new Date() < user.otpExpiration) {
                const isMatch = await bcrypt.compare(otp.toString(), user.otp);
                if (isMatch) {
                    matchedUser = user;
                    break;
                }
            }
        }
        if (!matchedUser) {
            return res.status(400).json({ message: "OTP is incorrect or expired" });
        }
        await Users.updateOne(
            { _id: matchedUser._id },
            { otp: null, otpExpiration: null }
        );
        return res.json({ message: "Valid OTP, please enter new password" });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Error while verifying OTP", error: error.message });
    }
};

//API: /api/auth/reset-password
exports.resetPassword = async (req, res) => {
    try {
        const { email, newPassword, confirmPassword } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required!" });
        }
        if (!newPassword || !confirmPassword) {
            return res
                .status(400)
                .json({ message: "Please enter complete information" });
        }
        if (newPassword !== confirmPassword) {
            return res
                .status(400)
                .json({ message: "Confirmed password does not match" });
        }
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Account not found" });
        }
        // user.password = await bcrypt.hash(newPassword, 10);
        user.password = newPassword;
        user.otp = null;
        await user.save();
        return res.json({ message: "Password changed successfully!" });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Error changing password", error: error.message });
    }
};

//API: /api/auth/refresh-token
exports.refreshToken = async (req, res) => {
    try {
        const headerCheck = req.get("x-api-key");
        if (headerCheck !== "refreshTokenCheck") {
            return res.status(403).json({ message: "Access denied" });
        }

        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(400).json({ message: "Refresh token is required" });
        }

        const userToken = await Users.findOne({
            re_token: refreshToken,
        }).populate("user");
        if (!userToken) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }

        const decoded = verifyToken(refreshToken);
        if (!decoded) {
            return res
                .status(403)
                .json({ message: "Refresh token is invalid or expired" });
        }

        const accessToken = createAccessToken({
            id: userToken.user._id,
            role: userToken.user.role,
        });
        setAuthCookies(res, accessToken, refreshToken);
        return res.status(200).json({
            message: "Token refreshed successfully",
            accessToken,
            refreshToken,
        });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Server error", error: error.message });
    }
};

//API: /api/auth/change-password
exports.changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return res
                .status(400)
                .json({ message: "Please provide both old and new passwords" });
        }
        const user = await Users.findById(req.account.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect old password" });
        }
        const isSamePassword = await bcrypt.compare(newPassword, user.password);
        if (isSamePassword) {
            return res
                .status(400)
                .json({
                    message: "New password cannot be the same as the old password",
                });
        }
        user.password = newPassword;
        await user.save();
        return res.json({ message: "Password changed successfully" });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Error changing password", error: error.message });
    }
};
