/**
 * Set HTTP-only cookies for tokens
 * @param {Object} res 
 * @param {String} accessToken 
 * @param {String} refreshToken 
 */
const setAuthCookies = (res, accessToken, refreshToken) => {
    res.cookie("accessToken", accessToken, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production", 
        sameSite: "strict", 
        maxAge: 24 * 60 * 60 * 1000, 
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, 
    });
};

module.exports = { setAuthCookies };