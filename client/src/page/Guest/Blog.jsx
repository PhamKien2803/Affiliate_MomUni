import React, { useState, useEffect, useMemo } from 'react';
import {
    createTheme, ThemeProvider, CssBaseline, Typography,
    Button, Container, Box, CardMedia, CardContent, Grid, Link,
    IconButton, Chip, TextField, MenuItem, Alert, Snackbar,
    Paper, Stack, Divider, useTheme, alpha, Pagination, Breadcrumbs,
    InputAdornment, Avatar, CardActionArea
} from '@mui/material';
import {
    Menu as MenuIcon,
    Facebook, Instagram, Twitter, Send,
    ChevronRight, Search as SearchIcon, AccessTime as TimeIcon,
    Visibility as ViewIcon, Person as PersonIcon, Category as CategoryIcon,
    CalendarToday as CalendarIcon, Whatshot as TrendingIcon, NewReleases as NewIcon,
    FilterList as FilterListIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay as SwiperAutoplay, Pagination as SwiperPagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
const paletteConfig = {
    primary: { main: '#E5A3B3', light: '#F8C8D4', dark: '#BF8A9B' },
    secondary: { main: '#A0C4B8', light: '#C0D8D0', dark: '#7FA99F' },
    background: { default: '#FFF7F5', paper: '#FFFFFF' },
    text: { primary: '#4A4A4A', secondary: '#757575', disabled: '#BDBDBD' },
};

const elegantTheme = createTheme({
    palette: paletteConfig,
    typography: {
        fontFamily: '"Nunito Sans", sans-serif',
        h1: { fontFamily: '"Lora", serif', fontWeight: 700, fontSize: '2.8rem', color: paletteConfig.text.primary },
        h2: { fontFamily: '"Lora", serif', fontWeight: 700, fontSize: '2.2rem', color: '#3E2723' },
        h3: { fontFamily: '"Lora", serif', fontWeight: 600, fontSize: '1.8rem', color: '#4E342E' },
        h4: { fontFamily: '"Lora", serif', fontWeight: 600, fontSize: '1.4rem', color: '#5D4037' },
        h5: { fontFamily: '"Lora", serif', fontWeight: 600, fontSize: '1.2rem', color: '#4E342E' },
        h6: { fontWeight: 700, fontSize: '1rem' },
        subtitle1: { fontSize: '1rem', lineHeight: 1.6, fontWeight: 400, color: paletteConfig.text.secondary },
        body1: { fontSize: '1rem', lineHeight: 1.7 },
        body2: { fontSize: '0.9rem', lineHeight: 1.6, color: paletteConfig.text.secondary },
        caption: { fontSize: '0.8rem', color: alpha(paletteConfig.text.primary, 0.8) }
    },
    components: {
        MuiButton: { styleOverrides: { root: { borderRadius: '8px', textTransform: 'none', fontWeight: 600, padding: '8px 22px', boxShadow: 'none' } } },
        MuiChip: { styleOverrides: { root: { borderRadius: '16px', fontWeight: 600, padding: '6px 12px', fontSize: '0.875rem' } } },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '16px',
                    boxShadow: '0 6px 18px rgba(0,0,0,0.07)',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-6px)',
                        boxShadow: `0 10px 25px ${alpha(paletteConfig.primary.main, 0.15)}`,
                    },
                }
            }
        },
        MuiPaginationItem: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    '&.Mui-selected': {
                        backgroundColor: paletteConfig.primary.main,
                        color: 'white',
                        '&:hover': {
                            backgroundColor: paletteConfig.primary.dark,
                        }
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: '16px',
                }
            }
        }
    },
});

const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const MotionBox = motion(Box);

const initialBlogPosts = [
    { _id: '1', slug: 'bi-quyet-giup-be-ngu-ngon', title: 'Bí Quyết Vàng Giúp Bé Yêu Ngủ Ngon Giấc Mỗi Đêm', images: [{ url: 'https://images.unsplash.com/photo-1546015720-693a131655f4?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }], category: 'Giấc Ngủ', author: 'Chuyên gia Nhi Khoa', authorImage: 'https://randomuser.me/api/portraits/women/1.jpg', createdAt: '2025-06-01T10:00:00Z', viewCount: 1250, excerpt: 'Giấc ngủ đủ và sâu rất quan trọng cho sự phát triển toàn diện của trẻ. Bài viết này sẽ chia sẻ những bí quyết đã được kiểm chứng...', tags: ['ngủ ngon', 'trẻ sơ sinh', 'mẹo cho mẹ'] },
    { _id: '2', slug: 'dinh-duong-cho-me-bau', title: 'Thực Đơn Dinh Dưỡng Hoàn Hảo Cho Mẹ Bầu Từng Tam Cá Nguyệt', images: [{ url: 'https://images.unsplash.com/photo-1555412654-72a34a520934?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }], category: 'Dinh Dưỡng Mẹ', author: 'BS. An Nhiên', authorImage: 'https://randomuser.me/api/portraits/women/2.jpg', createdAt: '2025-05-29T14:30:00Z', viewCount: 2100, excerpt: 'Chế độ ăn uống khoa học không chỉ giúp mẹ khỏe mạnh mà còn là nền tảng cho sự phát triển tối ưu của thai nhi.', tags: ['mang thai', 'dinh dưỡng', 'sức khỏe mẹ'] },
    { _id: '3', slug: 'gan-ket-me-con', title: '10 Hoạt Động Đơn Giản Giúp Tăng Cường Gắn Kết Tình Cảm Mẹ Con', images: [{ url: 'https://images.unsplash.com/photo-1476703893627-68b1ea3815a5?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }], category: 'Phát Triển Cảm Xúc', author: 'Tạp chí MomUni', authorImage: 'https://randomuser.me/api/portraits/lego/1.jpg', createdAt: '2025-05-28T09:15:00Z', viewCount: 1800, excerpt: 'Tình mẫu tử là thiêng liêng. Hãy cùng khám phá những cách đơn giản để vun đắp sợi dây kết nối vô hình này mỗi ngày.', tags: ['tình cảm', 'gia đình', 'kỹ năng mềm'] },
    { _id: '4', slug: 'yoga-sau-sinh', title: 'Yoga Phục Hồi Sau Sinh: Lấy Lại Vóc Dáng Và Năng Lượng', images: [{ url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }], category: 'Sức Khỏe Mẹ', author: 'HLV Yoga An An', authorImage: 'https://randomuser.me/api/portraits/women/3.jpg', createdAt: '2025-05-26T11:00:00Z', viewCount: 980, excerpt: 'Các bài tập yoga nhẹ nhàng không chỉ giúp mẹ nhanh chóng phục hồi sức khỏe, cải thiện vóc dáng mà còn mang lại sự thư thái cho tâm hồn.', tags: ['yoga', 'sau sinh', 'vóc dáng'] },
    { _id: '5', slug: 'an-dam-cho-be', title: 'Cẩm Nang Ăn Dặm Cho Bé Từ A Đến Z (6-12 Tháng)', images: [{ url: 'https://images.unsplash.com/photo-1565792911364-5431b34b5c46?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }], category: 'Ăn Dặm', author: 'Chuyên gia Dinh Dưỡng Nhi', authorImage: 'https://randomuser.me/api/portraits/men/1.jpg', createdAt: '2025-05-24T16:00:00Z', viewCount: 3200, excerpt: 'Ăn dặm là một cột mốc quan trọng. Bài viết cung cấp thông tin chi tiết về các phương pháp, thực đơn và lưu ý khi cho bé ăn dặm.', tags: ['ăn dặm', 'thực đơn', 'dinh dưỡng bé'] },
    { _id: '6', slug: 'khung-hoang-tuoi-len-2', title: 'Vượt Qua "Khủng Hoảng Tuổi Lên 2": Bí Quyết Cho Cha Mẹ', images: [{ url: 'https://images.unsplash.com/photo-1519682577862-22b62b24e493?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }], category: 'Tâm Lý Trẻ', author: 'ThS. Ánh Nguyệt', authorImage: 'https://randomuser.me/api/portraits/women/4.jpg', createdAt: '2025-05-22T08:00:00Z', viewCount: 1500, excerpt: 'Tuổi lên 2 đầy thách thức nhưng cũng thật đáng yêu. Hiểu đúng để đồng hành cùng con vượt qua giai đoạn này một cách nhẹ nhàng.', tags: ['khủng hoảng', 'dạy con', 'tâm lý'] },
    { _id: '7', slug: 'cham-soc-tre-so-sinh', title: 'Những Điều Cần Biết Khi Chăm Sóc Trẻ Sơ Sinh Tại Nhà', images: [{ url: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd434?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }], category: 'Chăm Sóc Bé', author: 'Điều dưỡng Nhi Khoa', authorImage: 'https://randomuser.me/api/portraits/women/5.jpg', createdAt: '2025-05-20T09:00:00Z', viewCount: 850, excerpt: 'Hướng dẫn chi tiết từ A-Z về cách tắm, cho bé bú, theo dõi sức khỏe và tạo môi trường an toàn cho trẻ sơ sinh.', tags: ['trẻ sơ sinh', 'chăm sóc', 'an toàn'] },
    { _id: '8', slug: 'tro-choi-phat-trien-tri-nao', title: 'Top 5 Trò Chơi Kích Thích Phát Triển Trí Não Cho Bé 0-1 Tuổi', images: [{ url: 'https://images.unsplash.com/photo-1516642304010-380907006699?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }], category: 'Phát Triển Trí Tuệ', author: 'Cô Giáo Mầm Non', authorImage: 'https://randomuser.me/api/portraits/women/6.jpg', createdAt: '2025-05-18T13:00:00Z', viewCount: 1100, excerpt: 'Chơi mà học, học mà chơi! Khám phá những trò chơi đơn giản giúp bé phát triển tư duy, nhận thức và các giác quan.', tags: ['trò chơi', 'trí não', 'giáo dục sớm'] },
];

const allCategories = ["Tất cả", ...new Set(initialBlogPosts.map(post => post.category).sort())];

// --- COMPONENTS ---

const BlogCard = ({ post, small = false }) => {
    const theme = useTheme();
    const cardLink = `/blog/${post.slug}`;

    return (
        <MotionBox
            component={CardActionArea}
            href={cardLink}
            variants={sectionVariants}
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                textDecoration: 'none',
                backgroundColor: 'background.paper',
                '&:hover .blog-card-media': {
                    transform: 'scale(1.05)',
                },
            }}
        >
            <Box sx={{
                overflow: 'hidden', position: 'relative',
                pt: small ? '75%' : '56.25%',
                borderRadius: '12px 12px 0 0'
            }}>
                <CardMedia
                    component="img"
                    className="blog-card-media"
                    sx={{
                        position: 'absolute',
                        top: 0, left: 0,
                        width: '100%', height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    }}
                    image={post.images && post.images.length > 0 ? post.images[0].url : 'https://placehold.co/600x400/E5A3B3/FFF7F5?text=MomUni'}
                    alt={post.title}
                />
                <Chip
                    label={post.category}
                    size="small"
                    sx={{
                        position: 'absolute',
                        top: small ? 8 : 12,
                        left: small ? 8 : 12,
                        backgroundColor: alpha(theme.palette.primary.main, 0.85),
                        color: 'white',
                        fontWeight: 600,
                        backdropFilter: 'blur(2px)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        fontSize: small ? '0.65rem' : '0.7rem'
                    }}
                />
            </Box>
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: small ? 1.5 : 2 }}>
                <Typography
                    variant={small ? "body1" : "h6"}
                    component="h2"
                    gutterBottom={!small}
                    sx={{
                        color: 'text.primary',
                        fontWeight: 600,
                        fontSize: small ? '0.95rem' : '1.1rem',
                        display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: small ? 2 : 3,
                        overflow: 'hidden', textOverflow: 'ellipsis',
                        minHeight: small ? '2.4em' : '3.9em',
                        lineHeight: 1.3,
                        mb: small ? 0.5 : 1
                    }}
                >
                    {post.title}
                </Typography>
                {!small && ( // Ẩn excerpt và thông tin tác giả khi small=true
                    <>
                        <Typography variant="body2" color="text.secondary" sx={{
                            mb: 1.5,
                            display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3,
                            overflow: 'hidden', textOverflow: 'ellipsis',
                            minHeight: '4.2em'
                        }}>
                            {post.excerpt}
                        </Typography>
                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 'auto', pt: 1, color: 'text.secondary' }}>
                            <Avatar src={post.authorImage || undefined} sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>{post.author?.[0]}</Avatar>
                            <Typography variant="caption" sx={{ fontWeight: 500 }}>{post.author}</Typography>
                            <Divider orientation="vertical" flexItem sx={{ height: 12, alignSelf: 'center' }} />
                            <Typography variant="caption">{new Date(post.createdAt).toLocaleDateString('vi-VN')}</Typography>
                        </Stack>
                    </>
                )}
            </CardContent>
        </MotionBox>
    );
};

const SidebarSection = ({ title, icon, children }) => (
    <Paper elevation={0} sx={{ p: 2.5, borderRadius: '16px', mb: 3, border: `1px solid ${alpha(elegantTheme.palette.primary.main, 0.15)}`, backgroundColor: alpha(elegantTheme.palette.background.paper, 0.8) }}>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            {icon && React.cloneElement(icon, { sx: { color: 'primary.main', fontSize: '1.6rem' } })}
            <Typography variant="h5" sx={{ color: 'text.primary', fontWeight: 600 }}>{title}</Typography>
        </Stack>
        {children}
    </Paper>
);

const BlogPageFooter = () => {
    const theme = useTheme();

    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: theme.palette.secondary.main,
                color: 'white',
                pt: 8,
                pb: 6,
                mt: 10,
                position: 'relative'
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '100px',
                    background: `linear-gradient(to bottom, ${theme.palette.background.default}, ${theme.palette.secondary.main})`,
                    zIndex: 0
                }}
            />

            <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
                <Grid container spacing={4} justifyContent="center" textAlign="center">
                    <Grid item xs={12}>
                        <Typography
                            variant="h5"
                            sx={{
                                fontFamily: '"Lora", serif',
                                mb: 2,
                                color: 'white',
                                fontWeight: 700,
                            }}
                        >
                            MomUni
                        </Typography>
                        <Stack
                            direction="row"
                            spacing={{ xs: 2, sm: 4 }}
                            justifyContent="center"
                            sx={{ mb: 3 }}
                        >
                            <Link href="#" color="inherit" underline="hover" sx={{ fontWeight: 500 }}>Blog</Link>
                            <Link href="#" color="inherit" underline="hover" sx={{ fontWeight: 500 }}>Về chúng tôi</Link>
                            <Link href="#" color="inherit" underline="hover" sx={{ fontWeight: 500 }}>Điều khoản</Link>
                            <Link href="#" color="inherit" underline="hover" sx={{ fontWeight: 500 }}>Liên hệ</Link>
                        </Stack>
                        <Stack direction="row" spacing={1.5} justifyContent="center">
                            <IconButton href="#" aria-label="Facebook" sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>
                                <Facebook />
                            </IconButton>
                            <IconButton href="#" aria-label="Instagram" sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>
                                <Instagram />
                            </IconButton>
                            <IconButton href="#" aria-label="Twitter" sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>
                                <Twitter />
                            </IconButton>
                        </Stack>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.2)' }} />

                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }} align="center">
                    © {new Date().getFullYear()} MomUni. All rights reserved. Made with ❤️ for parents.
                </Typography>
            </Container>
        </Box>
    );
};


export default function BlogPageEvaStyle() {
    const theme = useTheme();
    const [blogPostsData, setBlogPostsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Tất cả");

    const postsPerPage = 6;

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setBlogPostsData(initialBlogPosts);
            setLoading(false);
        }, 500);
    }, []);

    const filteredAndSortedPosts = useMemo(() => {
        return blogPostsData
            .filter(post =>
                selectedCategory === "Tất cả" || post.category === selectedCategory
            )
            .filter(post =>
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
            )
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }, [blogPostsData, selectedCategory, searchQuery]);

    const totalPages = Math.ceil(filteredAndSortedPosts.length / postsPerPage);
    const currentDisplayPosts = filteredAndSortedPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

    const latestPostsForCarousel = useMemo(() => [...initialBlogPosts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)), []);


    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}><Typography variant="h5">Đang tải trang Blog...</Typography></Box>;
    if (error) return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}><Typography color="error">Lỗi tải dữ liệu: {error}</Typography></Box>;

    return (
        <ThemeProvider theme={elegantTheme}>
            <CssBaseline />
            <Container maxWidth="xl" sx={{ mt: 4, mb: 0 }}> {/* Đã thay đổi maxWidth="lg" thành "xl" */}
                <MotionBox initial="hidden" animate="visible" variants={sectionVariants}>
                    <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2, fontSize: '0.9rem' }}>
                        <Link underline="hover" color="inherit" href="/">Trang chủ</Link>
                        <Typography color="text.primary">Blog</Typography>
                    </Breadcrumbs>
                    <Typography variant="h1" gutterBottom align="center" sx={{ mb: 5 }}>
                        MomUni Blog
                    </Typography>
                </MotionBox>
                <MotionBox
                    component={Paper}
                    elevation={0}
                    variants={sectionVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.1 }}
                    sx={{
                        p: 2,
                        mb: 5,
                        borderRadius: '16px',
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
                        backgroundColor: alpha(theme.palette.background.paper, 0.8),
                        backdropFilter: 'blur(5px)'
                    }}
                >
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} md={5} lg={6}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                placeholder="Tìm kiếm bài viết..."
                                value={searchQuery}
                                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon color="action" />
                                        </InputAdornment>
                                    ),
                                    sx: { borderRadius: '12px', backgroundColor: alpha(theme.palette.common.white, 0.5) }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={7} lg={6}>
                            <TextField
                                select
                                fullWidth
                                size="small"
                                value={selectedCategory}
                                onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '12px',
                                        backgroundColor: alpha(theme.palette.common.white, 0.5)
                                    },
                                    '& .MuiSelect-select': {
                                        display: 'flex',
                                        alignItems: 'center',
                                    }
                                }}
                                SelectProps={{
                                    MenuProps: {
                                        sx: {
                                            '& .MuiPaper-root': {
                                                borderRadius: '12px',
                                                mt: 1
                                            }
                                        }
                                    }
                                }}
                            >
                                {allCategories.map((category) => (
                                    <MenuItem key={category} value={category}>
                                        {category === "Tất cả" && <FilterListIcon sx={{ mr: 1, fontSize: '1.2rem', color: 'text.secondary' }} />}
                                        {category}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                </MotionBox>

                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <MotionBox initial="hidden" animate="visible" variants={sectionVariants} transition={{ delay: 0.1 }}>
                            <Typography variant="h2" gutterBottom sx={{ mb: 3 }}>
                                Tất cả bài viết
                            </Typography>
                            <Grid container spacing={3}>
                                {currentDisplayPosts.length > 0 ? (
                                    currentDisplayPosts.map((post) => (
                                        <Grid item xs={12} sm={6} key={post._id}>
                                            <BlogCard post={post} small={true} />
                                        </Grid>
                                    ))
                                ) : (
                                    <Grid item xs={12}>
                                        <Paper sx={{ p: 4, textAlign: 'center', mt: 2, backgroundColor: alpha(theme.palette.background.default, 0.7) }}>
                                            <Typography variant="h6">Không tìm thấy bài viết nào.</Typography>
                                            <Typography color="text.secondary">Vui lòng thử lại với từ khóa hoặc danh mục khác.</Typography>
                                        </Paper>
                                    </Grid>
                                )}
                            </Grid>

                            {totalPages > 1 && (
                                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5, mb: 3 }}>
                                    <Pagination
                                        count={totalPages}
                                        page={currentPage}
                                        onChange={(event, value) => setCurrentPage(value)}
                                        color="primary"
                                        size="large"
                                        showFirstButton showLastButton
                                    />
                                </Box>
                            )}
                        </MotionBox>
                    </Grid>


                </Grid>

                {latestPostsForCarousel.length > 0 && (
                    <MotionBox sx={{ py: 6, mt: 6 }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants} transition={{ delay: 0.3 }}>
                        <Typography variant="h2" align="left" gutterBottom sx={{ mb: 4, pl: 1 }}>
                            Có thể bạn quan tâm
                        </Typography>
                        <Swiper
                            modules={[Navigation, SwiperPagination, SwiperAutoplay]}
                            spaceBetween={24}
                            slidesPerView={1}
                            loop={true}
                            autoplay={{
                                delay: 4000,
                                disableOnInteraction: false,
                            }}
                            pagination={{ clickable: true, el: '.swiper-pagination-latest-posts' }}
                            navigation={true}
                            breakpoints={{
                                600: { slidesPerView: 2, spaceBetween: 20 },
                                900: { slidesPerView: 3, spaceBetween: 24 },
                                1200: { slidesPerView: 4, spaceBetween: 24 },
                                1536: { slidesPerView: 5, spaceBetween: 24 },
                            }}
                            style={{ paddingBottom: '60px', paddingTop: '10px' }}
                        >
                            {latestPostsForCarousel.map((post) => (
                                <SwiperSlide key={`carousel-${post._id}`} style={{ height: 'auto' }}>
                                    <BlogCard post={post} small={false} />
                                </SwiperSlide>
                            ))}
                            <div className="swiper-pagination-latest-posts" style={{ textAlign: 'center', marginTop: '25px', position: 'relative', bottom: 'auto' }}></div>
                        </Swiper>
                    </MotionBox>
                )}
            </Container>
            <BlogPageFooter />
        </ThemeProvider>
    );
}