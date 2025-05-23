import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
  Stack,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import MuiCard from "@mui/material/Card";
import { useNavigate } from "react-router-dom";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axiosInstance from "../../helper/axiosInstance";
import { getUserFromToken } from "../../helper/authHelper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const pastelPinkPalette = {
  primary: "#F48FB1",
  primaryDarker: "#F06292",
  secondary: "#FFC1D6",
  backgroundLight: "#FFF3F5",
  cardBackground: "#FFFFFF",
  textDark: "#333333",
  textLight: "#555555",
  textOnPrimary: "#FFFFFF",
  boxShadow: "rgba(244, 143, 177, 0.35)",
};

const StyledCard = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2.5),
  boxShadow: `0px 10px 30px ${pastelPinkPalette.boxShadow}`,
  borderRadius: "20px",
  backgroundColor: pastelPinkPalette.cardBackground,
  color: pastelPinkPalette.textDark,
  [theme.breakpoints.up("sm")]: {
    width: "430px",
  },
}));

const StyledTextField = styled(TextField)(() => ({
  "& label": {
    color: pastelPinkPalette.textLight,
  },
  "& label.Mui-focused": {
    color: pastelPinkPalette.primary,
  },
  "& .MuiInputBase-input": {
    color: pastelPinkPalette.textDark,
    borderRadius: "12px",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    "& fieldset": {
      borderColor: pastelPinkPalette.secondary,
    },
    "&:hover fieldset": {
      borderColor: pastelPinkPalette.primary,
    },
    "&.Mui-focused fieldset": {
      borderColor: pastelPinkPalette.primary,
      borderWidth: "2px",
    },
  },
}));

const LoginAdminPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.post("/auth/login", {
        username,
        password,
      });

      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.re_token);

      const userData = getUserFromToken();

      if (userData) {
        if (userData.role === "admin") {
          toast.success(
            `Chào mừng Admin ${userData.name || userData.username}! 🎉`
          );
          navigate("/admin-dashboard");
        } else {
          toast.error(
            "Truy cập bị từ chối. Bạn không có quyền Admin. 🚫"
          );
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        }
      } else {
        toast.error("Dữ liệu người dùng không hợp lệ! ❌");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Đăng nhập thất bại! Vui lòng thử lại. ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: pastelPinkPalette.backgroundLight,
        padding: 2,
      }}
    >
      <StyledCard>
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <AdminPanelSettingsIcon
            sx={{
              fontSize: "3.5rem",
              color: pastelPinkPalette.primary,
              mb: 1,
            }}
          />
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: pastelPinkPalette.primary,
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            MomUni Admin
          </Typography>
          <Typography variant="body2" sx={{ color: pastelPinkPalette.textLight }}>
            Đăng nhập để quản lý hệ thống
          </Typography>
        </Box>

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Stack spacing={2.5}>
            <StyledTextField
              label="Tên đăng nhập"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              required
              autoFocus
            />

            <StyledTextField
              label="Mật khẩu"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? (
                        <VisibilityOff
                          sx={{ color: pastelPinkPalette.primary }}
                        />
                      ) : (
                        <Visibility
                          sx={{ color: pastelPinkPalette.primary }}
                        />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mt: 1 }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      color: pastelPinkPalette.secondary,
                      "&.Mui-checked": {
                        color: pastelPinkPalette.primary,
                      },
                    }}
                  />
                }
                label={
                  <Typography sx={{ color: pastelPinkPalette.textLight, fontSize: '0.9rem' }}>
                    Ghi nhớ tôi
                  </Typography>
                }
              />
              <Typography
                onClick={() => navigate("/forgot-password")}
                sx={{
                  color: pastelPinkPalette.primary,
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  "&:hover": {
                    textDecoration: "underline",
                    color: pastelPinkPalette.primaryDarker,
                  },
                }}
              >
                Quên mật khẩu?
              </Typography>
            </Stack>
          </Stack>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              mt: 3,
              py: 1.5,
              borderRadius: "12px",
              backgroundColor: pastelPinkPalette.primary,
              color: pastelPinkPalette.textOnPrimary,
              fontWeight: "bold",
              fontSize: "1rem",
              boxShadow: `0 4px 15px ${alpha(pastelPinkPalette.primary, 0.4)}`,
              "&:hover": {
                backgroundColor: pastelPinkPalette.primaryDarker,
                boxShadow: `0 6px 20px ${alpha(pastelPinkPalette.primaryDarker, 0.5)}`,
              },
              "&.Mui-disabled": {
                backgroundColor: alpha(pastelPinkPalette.primary, 0.5),
                color: alpha(pastelPinkPalette.textOnPrimary, 0.7),
              }
            }}
          >
            {loading ? <CircularProgress size={24} sx={{ color: pastelPinkPalette.textOnPrimary }} /> : "Đăng Nhập"}
          </Button>
        </form>
      </StyledCard>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />
    </Box>
  );
};

export default LoginAdminPage;