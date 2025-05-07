const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const CryptoJS = require("crypto-js");
dotenv.config();

const decryptData = (encryptedData) => {
    try {
        const key = CryptoJS.enc.Hex.parse(process.env.ENCRYPTION_KEY);
        const [ivHex, encryptedText] = encryptedData.split(":");

        const iv = CryptoJS.enc.Hex.parse(ivHex);
        const decrypted = CryptoJS.AES.decrypt(encryptedText, key, { iv });

        return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
    } catch (error) {
        console.error("Lỗi giải mã dữ liệu:", error.message);
        return null;
    }
};

module.exports = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        console.log("Authorization Header:", authorizationHeader);

        if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Bạn chưa đăng nhập" });
        }

        const token = authorizationHeader?.split(" ")[1];
        console.log("Token:", token);

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                console.log("Lỗi token:", err.message);
                return res.status(403).json({ message: "Token không hợp lệ hoặc đã hết hạn" });
            }

            console.log("Decoded trước giải mã:", decoded);
            const decryptedData = decryptData(decoded.data);
            console.log("Decoded sau giải mã:", decryptedData);

            if (!decryptedData || !decryptedData.id || !mongoose.Types.ObjectId.isValid(decryptedData.id)) {
                console.log("ID không hợp lệ:", decryptedData?.id);
                return res.status(400).json({ message: "Token không chứa ID hợp lệ" });
            }

            req.account = { id: decryptedData.id, role: decryptedData.role };
            next();
        });
    } catch (error) {
        console.log("Lỗi trong middleware:", error.message);
        return res.status(401).json({ message: "Lỗi xác thực", error: error.message });
    }
};
