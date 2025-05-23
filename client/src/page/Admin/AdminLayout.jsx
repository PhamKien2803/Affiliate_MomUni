import { useState, useEffect, useMemo } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  CssBaseline,
  Badge,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import { Link, useNavigate, Outlet, useLocation } from "react-router-dom";
import {
  Menu as MenuIcon,
  Logout,
  Person,
  Brightness4,
  Brightness7,
  Apartment as MomUniIcon,
  NotificationsNone as NotificationsIcon,
  DeleteOutline as DeleteIcon,
  Done as MarkReadIcon,
  ErrorOutline,
} from "@mui/icons-material";
import { ThemeProvider, createTheme, alpha } from "@mui/material/styles";
import menuItems from "./menuItems";
import axiosInstance from "../../helper/axiosInstance";
import { toast } from "react-toastify";
const drawerWidth = 260;

const getAppTheme = (mode) => {
  const lightPalette = {
    primary: { main: "#F48FB1", contrastText: "#333333" },
    secondary: { main: "#FFC1D6", contrastText: "#333333" },
    background: { default: "#FFF3F5", paper: "#FFFFFF" },
    text: { primary: "#333333", secondary: "#555555" },
    action: { active: "#F48FB1", hover: alpha("#F48FB1", 0.08) },
    divider: alpha("#333333", 0.12),
  };

  const darkPalette = {
    primary: { main: "#F48FB1", contrastText: "#ffffff" },
    secondary: { main: "#FFA8B8", contrastText: "#333333" },
    background: { default: "#28232A", paper: "#3A333D" },
    text: { primary: "#F5F5F5", secondary: "#B0AAB3" },
    action: { active: "#F48FB1", hover: alpha("#F48FB1", 0.1) },
    divider: alpha("#F5F5F5", 0.12),
  };

  return createTheme({
    palette: {
      mode,
      ...(mode === "light" ? lightPalette : darkPalette),
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h6: { fontWeight: 600, },
      caption: { fontSize: '0.75rem', }
    },
    components: {
      MuiAppBar: { styleOverrides: { root: { boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.05)", }, }, },
      MuiDrawer: { styleOverrides: { paper: { borderRightWidth: mode === 'light' ? '1px' : '0px', }, }, },
      MuiPaper: { styleOverrides: { root: { backgroundImage: 'none', } } }
    },
  });
};


const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userAnchorEl, setUserAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });
  const [notifications, setNotifications] = useState([]);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [loadingNotifications, setLoadingNotifications] = useState(false);

  const unreadCount = useMemo(() => {
    return notifications.filter(n => !n.isRead).length;
  }, [notifications]);


  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const theme = useMemo(() => getAppTheme(darkMode ? "dark" : "light"), [darkMode]);

  const fetchNotifications = async () => {
    setLoadingNotifications(true);
    try {
      const response = await axiosInstance.get("/notification");
      setNotifications(response.data || []);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
      toast.error("Không thể tải thông báo.");
      setNotifications([]);
    } finally {
      setLoadingNotifications(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleUserMenu = (event) => setUserAnchorEl(event.currentTarget);
  const handleUserMenuClose = () => setUserAnchorEl(null);

  const handleNotificationMenuOpen = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };
  const handleNotificationMenuClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
    } catch (error) {
      console.error("Logout API call failed:", error);
    } finally {
      localStorage.removeItem("currentUser");
      localStorage.removeItem("theme");
      navigate("/login");
    }
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      await axiosInstance.patch(`/notification/read/${notificationId}`);
      setNotifications(prev =>
        prev.map(n => (n._id === notificationId ? { ...n, isRead: true } : n))
      );
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
      toast.error("Lỗi khi đánh dấu đã đọc.");
    }
  };

  const handleDeleteNotification = async (notificationId) => {
    try {
      await axiosInstance.delete(`/notification/${notificationId}`);
      setNotifications(prev => prev.filter(n => n._id !== notificationId));
      toast.success("Đã xóa thông báo.");
    } catch (error) {
      console.error("Failed to delete notification:", error);
      toast.error("Lỗi khi xóa thông báo.");
    }
  };

  const drawerContent = (
    <>
      <Box sx={{ p: 2, textAlign: "center", display: 'flex', alignItems: 'center', justifyContent: 'center', height: 64, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <MomUniIcon sx={{ color: theme.palette.primary.main, fontSize: '2rem', mr: 1 }} />
        <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
          MomUni Admin
        </Typography>
      </Box>
      <List sx={{ p: 1 }}>
        {menuItems.map(({ text, icon, path }) => {
          const isActive = location.pathname === path || (path !== '/admin-dashboard' && location.pathname.startsWith(path) && path !== '/admin-dashboard/');
          let itemTextColor, itemIconColor, itemBgColor;
          let hoverTextColor, hoverIconColor, hoverBgColor;

          if (isActive) {
            itemBgColor = theme.palette.primary.main;
            itemTextColor = theme.palette.primary.contrastText;
            itemIconColor = theme.palette.primary.contrastText;
          } else {
            itemBgColor = "transparent";
            itemTextColor = theme.palette.text.secondary;
            itemIconColor = theme.palette.text.secondary;
          }
          hoverBgColor = alpha(theme.palette.primary.main, isActive ? 0.2 : 0.12);
          if (theme.palette.mode === 'light') {
            hoverTextColor = theme.palette.text.primary;
            hoverIconColor = theme.palette.text.primary;
          } else {
            hoverTextColor = theme.palette.primary.main;
            hoverIconColor = theme.palette.primary.main;
          }
          return (
            <ListItemButton
              key={text} component={Link} to={path} selected={isActive}
              sx={{
                margin: theme.spacing(0.5, 0), borderRadius: "8px", color: itemTextColor, backgroundColor: itemBgColor,
                transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out',
                "& .MuiListItemIcon-root": { color: itemIconColor, minWidth: "40px", transition: 'color 0.2s ease-in-out', },
                "&:hover": { backgroundColor: hoverBgColor, color: hoverTextColor, ".MuiListItemIcon-root": { color: hoverIconColor, }, },
              }}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          );
        })}
      </List>
    </>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
        <Drawer variant="temporary" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }}
          sx={{ display: { xs: "block", sm: "none" }, "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth, bgcolor: "background.paper", }, }}
        > {drawerContent} </Drawer>
        <Drawer variant="permanent" open
          sx={{ display: { xs: "none", sm: "block" }, width: drawerWidth, flexShrink: 0, "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box", bgcolor: "background.paper", color: "text.primary", borderRightColor: 'divider', }, }}
        > {drawerContent} </Drawer>

        <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: { xs: 2, sm: 3 }, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
          <AppBar position="sticky"
            sx={{ bgcolor: "background.paper", color: "text.primary", borderRadius: "12px", mb: 3, top: { xs: theme.spacing(1), sm: theme.spacing(2) }, width: 'auto', boxShadow: theme.shadows[2] }}
          >
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: "none" } }} >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "text.primary", display: { xs: 'none', sm: 'block' } }}>
                  MomUni Admin Dashboard
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Tooltip title={darkMode ? "Chế độ sáng" : "Chế độ tối"}>
                  <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
                    {darkMode ? <Brightness7 /> : <Brightness4 />}
                  </IconButton>
                </Tooltip>

                {/* Notification Bell */}
                <Tooltip title="Thông báo">
                  <IconButton onClick={handleNotificationMenuOpen} color="inherit">
                    <Badge badgeContent={unreadCount} color="error" max={99}>
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={notificationAnchorEl}
                  open={Boolean(notificationAnchorEl)}
                  onClose={handleNotificationMenuClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible', filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
                      mt: 1.5, bgcolor: 'background.paper', width: 360, maxHeight: 400,
                      '&:before': { content: '""', display: 'block', position: 'absolute', top: 0, right: 14, width: 10, height: 10, bgcolor: 'background.paper', transform: 'translateY(-50%) rotate(45deg)', zIndex: 0, },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${theme.palette.divider}` }}>
                    <Typography variant="subtitle1" fontWeight="bold">Thông báo</Typography>
                  </Box>
                  {loadingNotifications ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 3 }}>
                      <CircularProgress size={24} />
                    </Box>
                  ) : notifications.length === 0 ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 3, textAlign: 'center' }}>
                      <ErrorOutline sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
                      <Typography variant="body2" color="text.secondary">Không có thông báo mới.</Typography>
                    </Box>
                  ) : (
                    notifications.map((notification) => (
                      <MenuItem
                        key={notification._id}
                        onClick={() => {
                        }}
                        sx={{
                          py: 1.5, px: 2, display: 'flex', alignItems: 'flex-start', gap: 1.5,
                          bgcolor: !notification.isRead ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                          borderBottom: `1px solid ${theme.palette.divider}`,
                          '&:last-child': { borderBottom: 'none' },
                          '&:hover': { bgcolor: alpha(theme.palette.action.hover, 0.1) }
                        }}
                      >
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: !notification.isRead ? 'bold' : 'normal', whiteSpace: 'normal' }}>
                            {notification.message || "Nội dung thông báo không có."}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {new Date(notification.createdAt).toLocaleString()}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, alignItems: 'center' }}>
                          {!notification.isRead && (
                            <Tooltip title="Đánh dấu đã đọc">
                              <IconButton size="small" onClick={(e) => { e.stopPropagation(); handleMarkAsRead(notification._id); }}>
                                <MarkReadIcon fontSize="small" sx={{ color: theme.palette.success ? theme.palette.success.main : 'green' }} />
                              </IconButton>
                            </Tooltip>
                          )}
                          <Tooltip title="Xóa thông báo">
                            <IconButton size="small" onClick={(e) => { e.stopPropagation(); handleDeleteNotification(notification._id); }}>
                              <DeleteIcon fontSize="small" sx={{ color: theme.palette.error ? theme.palette.error.main : 'red' }} />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </MenuItem>
                    ))
                  )}
                </Menu>

                {/* User Profile Menu (remains the same) */}
                <IconButton onClick={handleUserMenu} color="inherit">
                  <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.main', color: 'primary.contrastText' }}>A</Avatar>
                </IconButton>
                <Menu
                  anchorEl={userAnchorEl} open={Boolean(userAnchorEl)} onClose={handleUserMenuClose}
                  PaperProps={{ elevation: 0, sx: { overflow: 'visible', filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))', mt: 1.5, bgcolor: 'background.paper', '& .MuiAvatar-root': { width: 32, height: 32, ml: -0.5, mr: 1, }, '&:before': { content: '""', display: 'block', position: 'absolute', top: 0, right: 14, width: 10, height: 10, bgcolor: 'background.paper', transform: 'translateY(-50%) rotate(45deg)', zIndex: 0, }, }, }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem onClick={handleUserMenuClose} component={Link} to="/admin-dashboard/profile">
                    <Person sx={{ mr: 1.5, color: 'text.secondary' }} /> <Typography sx={{ color: 'text.primary' }}>Hồ sơ</Typography>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem onClick={handleLogout}>
                    <Logout sx={{ mr: 1.5, color: 'text.secondary' }} /> <Typography sx={{ color: 'text.primary' }}>Đăng xuất</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </Toolbar>
            {/* <StatisticsPage /> */}
          </AppBar>
          <Outlet />
          <Box sx={{ display: { xs: 'none', sm: 'block' }, position: 'fixed', bottom: 0, left: 0, right: 0, bgcolor: theme.palette.background.paper, p: 2, textAlign: 'center', borderTop: `1px solid ${theme.palette.divider}` }}>
            <Typography variant="caption" color="text.secondary">
              © {new Date().getFullYear()} MomUni. All rights reserved.
            </Typography>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AdminLayout;
