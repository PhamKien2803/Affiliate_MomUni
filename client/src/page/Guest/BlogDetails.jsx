import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Link as RouterLink, useParams } from "react-router-dom";

// MUI Components
import {
    createTheme, ThemeProvider, CssBaseline, AppBar, Toolbar, Typography,
    Button, Container, Box, Card, CardMedia, CardContent, Grid, Link,
    IconButton, Chip, TextField, MenuItem, Alert, Snackbar,
    Paper, Stack, Divider, useTheme, alpha, Pagination, Breadcrumbs,
    InputAdornment, List, ListItem, ListItemText, ListItemAvatar,
    Avatar, Rating // Thêm Rating
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

// MUI Icons
import {
    Menu as MenuIcon, ArrowForwardIos, FavoriteBorder,
    Restaurant, ChildCare, SelfImprovement, Psychology, LocalHospital,
    FamilyRestroom, Spa, School, Facebook, Instagram, Twitter,
    ChevronRight, Search as SearchIcon, AccessTime as TimeIcon,
    Visibility as ViewIcon, Person as PersonIcon, Category as CategoryIcon,
    CalendarToday as CalendarTodayIcon,
    Whatshot as TrendingIcon, NewReleases as NewIcon,
    FilterList as FilterListIcon, Send as SendIcon,
    Star as StarIcon,
    Comment as CommentIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// --- SETUP & THEME ---
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
        h1: { fontFamily: '"Lora", serif', fontWeight: 700, fontSize: '2.6rem', color: paletteConfig.text.primary, lineHeight: 1.3, marginBottom: '0.5em' },
        h2: { fontFamily: '"Lora", serif', fontWeight: 700, fontSize: '2rem', color: '#3E2723', marginTop: '1.8em', marginBottom: '0.8em' },
        h3: { fontFamily: '"Lora", serif', fontWeight: 600, fontSize: '1.6rem', color: '#4E342E', marginTop: '1.5em', marginBottom: '0.6em' },
        h4: { fontFamily: '"Lora", serif', fontWeight: 600, fontSize: '1.4rem', color: '#5D4037' },
        h5: { fontFamily: '"Lora", serif', fontWeight: 600, fontSize: '1.2rem', color: '#4E342E' },
        h6: { fontWeight: 700, fontSize: '1.1rem', color: paletteConfig.text.primary },
        subtitle1: { fontSize: '1rem', lineHeight: 1.6, fontWeight: 400, color: paletteConfig.text.secondary },
        body1: { fontSize: '1rem', lineHeight: 1.8, color: paletteConfig.text.primary },
        body2: { fontSize: '0.9rem', lineHeight: 1.6, color: paletteConfig.text.secondary },
        caption: { fontSize: '0.875rem', color: alpha(paletteConfig.text.secondary, 0.9) }
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
                    padding: '24px',
                }
            }
        },
        MuiTextField: {
            defaultProps: {
                variant: 'outlined',
                size: 'small',
            },
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: alpha(paletteConfig.primary.main, 0.03)
                    }
                }
            }
        }
    },
});

const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.1 } },
};
const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};
const MotionBox = motion(Box);
const MotionPaper = motion(Paper);

// =================================================================
// DỮ LIỆU TĨNH (STATIC DATA)
// =================================================================
const staticBlog = {
    _id: "6658b1f7d4b2e8a15b3c6f4a",
    slug: "kham-pha-ve-dep-mien-tay-song-nuoc",
    title: "Khám Phá Vẻ Đẹp Tiềm Ẩn của Miền Tây Sông Nước Cho Mẹ và Bé",
    content: `
        <p>Chào các mẹ, hôm nay MomUni sẽ cùng các mẹ và bé yêu khám phá một hành trình đầy màu sắc đến với miền Tây sông nước. Đây không chỉ là một chuyến đi, mà còn là cơ hội để cả gia đình mình cùng nhau tạo nên những kỷ niệm đáng nhớ.</p>
        <img src="https://images.unsplash.com/photo-1506740717032-0818e79510e8?q=80&w=1200&auto=format&fit=crop" alt="Mẹ và bé ngắm cảnh sông nước miền Tây" />
        <h2>1. Vì sao nên chọn Miền Tây cho chuyến đi cùng bé?</h2>
        <p>Miền Tây với không khí trong lành, cảnh quan thiên nhiên xanh mát và nhịp sống chậm rãi là điểm đến lý tưởng cho các gia đình có con nhỏ. Bé sẽ được hòa mình vào thiên nhiên, khám phá những điều mới lạ và học hỏi về văn hóa độc đáo của vùng đất này.</p>
        <ul>
            <li><strong>Không khí trong lành:</strong> Tốt cho hệ hô hấp và sức khỏe của bé.</li>
            <li><strong>Trải nghiệm thực tế:</strong> Bé được thấy tận mắt vườn cây trái, ghe thuyền, chợ nổi.</li>
            <li><strong>Ẩm thực phong phú:</strong> Nhiều món ăn ngon, dễ tiêu hóa phù hợp với trẻ nhỏ.</li>
        </ul>
        <h2>2. Chuẩn bị gì khi đưa bé đi Miền Tây?</h2>
        <p>Để chuyến đi được trọn vẹn, mẹ cần chuẩn bị kỹ lưỡng một vài thứ sau:</p>
        <h3>2.1. Đồ dùng cá nhân cho bé</h3>
        <p>Quần áo thoải mái, mũ rộng vành, kem chống nắng, thuốc men cơ bản (hạ sốt, tiêu hóa), đồ chơi yêu thích của bé.</p>
        <img src="https://images.unsplash.com/photo-1593538136582-45450f3840a1?q=80&w=1200" alt="Chuẩn bị đồ cho bé đi chơi" />
        <h3>2.2. Lịch trình phù hợp</h3>
        <p>Không nên chọn lịch trình quá dày đặc. Ưu tiên các điểm đến gần gũi thiên nhiên, có không gian cho bé vui chơi. Các khu du lịch sinh thái, vườn cây ăn trái là lựa chọn tuyệt vời.</p>
        <h2>3. Gợi ý điểm đến thú vị cho gia đình có bé</h2>
        <ul>
            <li><strong>Làng nổi Tân Lập (Long An):</strong> Con đường xuyên rừng tràm cổ tích, chèo thuyền ngắm cảnh.</li>
            <li><strong>Vườn trái cây Cái Mơn (Bến Tre):</strong> Bé được tự tay hái và thưởng thức trái cây tươi ngon.</li>
            <li><strong>Khu du lịch Mỹ Khánh (Cần Thơ):</strong> Nhiều trò chơi dân gian, xem đua heo, xiếc khỉ.</li>
        </ul>
        <p>Hy vọng những chia sẻ này sẽ giúp các mẹ có một chuyến đi miền Tây thật vui và ý nghĩa cùng bé yêu!</p>
    `,
    createdAt: "2025-06-02T10:00:00Z",
    viewCount: 1560,
    commentCount: 0, // Sẽ cập nhật từ staticComments
    averageRating: 4.2,
    author: "BTV MomUni",
    authorImage: "https://randomuser.me/api/portraits/women/8.jpg",
    images: [{
        url: "https://images.unsplash.com/photo-1506740717032-0818e79510e8?q=80&w=1200&auto=format&fit=crop",
        caption: "Mẹ và bé khám phá miền Tây"
    }],
    tags: ["Du Lịch Gia Đình", "Miền Tây", "Mẹ và Bé", "Trải Nghiệm", "Kinh Nghiệm Du Lịch"],
};

const staticComments = [
    { _id: 'cmt1', name: 'Mẹ Bỉm Sữa', content: 'Bài viết hay quá, mình đang định cho bé nhà mình đi chơi miền Tây. Cảm ơn MomUni!', createdAt: '2025-06-02T11:30:00Z', avatar: 'https://randomuser.me/api/portraits/women/10.jpg' },
    { _id: 'cmt2', name: 'Ba Của Tít', content: 'Thông tin rất hữu ích, đặc biệt là phần chuẩn bị đồ cho bé. Like mạnh!', createdAt: '2025-06-02T14:15:00Z', avatar: 'https://randomuser.me/api/portraits/men/10.jpg' },
    { _id: 'cmt3', name: 'Gia Đình Nhỏ', content: 'Nhìn ảnh chợ nổi thích quá, chắc chắn sẽ đưa các con đi trải nghiệm.', createdAt: '2025-06-03T09:00:00Z', avatar: 'https://randomuser.me/api/portraits/women/11.jpg' },
];


// --- COMPONENTS ---
const PulsatingHeartsAnimation = ({ size = 30, motherHeartChar = "💖", childHeartChar = "💗" }) => { /* ... Giữ nguyên ... */ };

// --- ✨ BLOG PAGE FOOTER (Không có Form) ✨ ---
const BlogPageFooter = () => {
    const theme = useTheme();
    return (
        <Box component="footer" sx={{
            backgroundColor: theme.palette.primary.dark, // Sử dụng màu tối hơn của primary
            color: 'white',
            py: { xs: 5, md: 7 },
            mt: 8,
            borderTopLeftRadius: { xs: '20px', md: '30px' },
            borderTopRightRadius: { xs: '20px', md: '30px' },
            boxShadow: '0 -10px 25px rgba(0,0,0,0.15)',
        }}>
            <Container maxWidth="lg">
                <Grid container spacing={4} justifyContent="space-between" alignItems="flex-start">
                    <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                            <PulsatingHeartsAnimation size={36} motherHeartChar="🤍" childHeartChar={theme.palette.secondary.light} />
                            <Typography variant="h4" sx={{ fontFamily: '"Lora", serif', color: 'white' }}>MomUni</Typography>
                        </Stack>
                        <Typography variant="body2" sx={{ color: alpha(theme.palette.common.white, 0.85), pr: { md: 3 }, lineHeight: 1.7 }}>
                            Đồng hành cùng mẹ trên mọi nẻo đường, chia sẻ kiến thức, lan tỏa yêu thương.
                        </Typography>
                    </Grid>

                    <Grid item xs={6} sm={3} md={2.5}>
                        <Typography variant="h6" sx={{ mb: 2, color: 'white', fontWeight: 600 }}>Khám Phá</Typography>
                        <Stack spacing={1.2}>
                            <Link href="/blog" color="inherit" underline="hover" sx={{ opacity: 0.85, '&:hover': { opacity: 1, color: theme.palette.secondary.light } }}>Blog</Link>
                            <Link href="/chu-de" color="inherit" underline="hover" sx={{ opacity: 0.85, '&:hover': { opacity: 1, color: theme.palette.secondary.light } }}>Chủ Đề</Link>
                            <Link href="/hoi-dap" color="inherit" underline="hover" sx={{ opacity: 0.85, '&:hover': { opacity: 1, color: theme.palette.secondary.light } }}>Hỏi Đáp</Link>
                            <Link href="/cong-dong" color="inherit" underline="hover" sx={{ opacity: 0.85, '&:hover': { opacity: 1, color: theme.palette.secondary.light } }}>Cộng Đồng</Link>
                        </Stack>
                    </Grid>
                    <Grid item xs={6} sm={3} md={2.5}>
                        <Typography variant="h6" sx={{ mb: 2, color: 'white', fontWeight: 600 }}>Về MomUni</Typography>
                        <Stack spacing={1.2}>
                            <Link href="/about" color="inherit" underline="hover" sx={{ opacity: 0.85, '&:hover': { opacity: 1, color: theme.palette.secondary.light } }}>Giới Thiệu</Link>
                            <Link href="/contact" color="inherit" underline="hover" sx={{ opacity: 0.85, '&:hover': { opacity: 1, color: theme.palette.secondary.light } }}>Liên Hệ</Link>
                            <Link href="/dieu-khoan" color="inherit" underline="hover" sx={{ opacity: 0.85, '&:hover': { opacity: 1, color: theme.palette.secondary.light } }}>Điều Khoản</Link>
                            <Link href="/bao-mat" color="inherit" underline="hover" sx={{ opacity: 0.85, '&:hover': { opacity: 1, color: theme.palette.secondary.light } }}>Bảo Mật</Link>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" sx={{ mb: 2, color: 'white', fontWeight: 600 }}>Kết nối với chúng tôi</Typography>
                        <Stack direction="row" spacing={1.5}>
                            <IconButton href="#" aria-label="Facebook" sx={{ color: 'white', bgcolor: alpha(theme.palette.common.white, 0.1), '&:hover': { bgcolor: alpha(theme.palette.common.white, 0.25), transform: 'translateY(-2px)' } }}><Facebook /></IconButton>
                            <IconButton href="#" aria-label="Instagram" sx={{ color: 'white', bgcolor: alpha(theme.palette.common.white, 0.1), '&:hover': { bgcolor: alpha(theme.palette.common.white, 0.25), transform: 'translateY(-2px)' } }}><Instagram /></IconButton>
                            <IconButton href="#" aria-label="Twitter" sx={{ color: 'white', bgcolor: alpha(theme.palette.common.white, 0.1), '&:hover': { bgcolor: alpha(theme.palette.common.white, 0.25), transform: 'translateY(-2px)' } }}><Twitter /></IconButton>
                        </Stack>
                    </Grid>
                </Grid>
                <Divider sx={{ my: 4, borderColor: alpha(theme.palette.common.white, 0.25) }} />
                <Typography variant="body2" sx={{ color: alpha(theme.palette.common.white, 0.85) }} align="center">
                    © {new Date().getFullYear()} MomUni. With love and care for every mom and baby.
                </Typography>
            </Container>
        </Box>
    );
};


export default function BlogDetailMUI() {
    const theme = useTheme();
    const { slug } = useParams();

    const [blog, setBlog] = useState(null);
    const [comments, setComments] = useState([]);
    const [toc, setToc] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [newComment, setNewComment] = useState("");
    const [commenterName, setCommenterName] = useState("");
    const [isSubmittingComment, setIsSubmittingComment] = useState(false);

    const [userRating, setUserRating] = useState(0);
    const [currentBlogRating, setCurrentBlogRating] = useState(0);
    const [ratingSubmitted, setRatingSubmitted] = useState(false);

    const [commentPage, setCommentPage] = useState(1);
    const commentsPerPage = 3;

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            const fetchedBlog = { ...staticBlog, averageRating: staticBlog.averageRating || 0, commentCount: staticComments.length };
            setBlog(fetchedBlog);
            setCurrentBlogRating(fetchedBlog.averageRating);
            setComments(staticComments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));

            if (fetchedBlog.content) {
                const parser = new DOMParser();
                const doc = parser.parseFromString(fetchedBlog.content, "text/html");
                const headings = Array.from(doc.querySelectorAll("h2, h3")).map((h, index) => {
                    const id = `section-${h.tagName.toLowerCase()}-${index}`;
                    h.setAttribute('id', id);
                    return {
                        id: id,
                        text: h.textContent?.trim() || "Mục không tên",
                        level: h.tagName.toLowerCase(),
                    };
                });
                setToc(headings);
                setBlog(prev => ({ ...prev, contentWithIds: doc.body.innerHTML }));
            } else {
                setBlog(prev => ({ ...prev, contentWithIds: "<p>Không có nội dung.</p>" }));
            }
            setLoading(false);
        }, 1000);
    }, [slug]);


    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim() || !commenterName.trim()) {
            // Replace alert with Snackbar
            // alert("Vui lòng nhập cả tên và bình luận."); 
            return;
        }
        setIsSubmittingComment(true);
        const tempId = `temp-${Date.now()}`;
        const tempComment = {
            _id: tempId, name: commenterName, content: newComment, createdAt: new Date().toISOString(), avatar: 'https://i.pravatar.cc/40?u=' + commenterName
        };
        setComments([tempComment, ...comments]);
        setCommentPage(1);
        setNewComment("");
        setCommenterName("");

        await new Promise(resolve => setTimeout(resolve, 1000));
        const savedComment = { ...tempComment, _id: `real-${Date.now()}` };
        setComments(prev => prev.map(c => c._id === tempId ? savedComment : c));
        setBlog(prev => ({ ...prev, commentCount: (prev.commentCount || 0) + 1 }));
        setIsSubmittingComment(false);
        // Show success Snackbar
    };

    const handleRatingSubmit = async () => {
        if (userRating === 0 || ratingSubmitted) return;
        setRatingSubmitted(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        const newAverageRating = ((currentBlogRating * (blog.viewCount || 1)) + userRating) / ((blog.viewCount || 1) + 1);
        setCurrentBlogRating(parseFloat(newAverageRating.toFixed(1)));
        setBlog(prev => ({ ...prev, averageRating: parseFloat(newAverageRating.toFixed(1)) }));
        // Show success Snackbar
    };

    const totalCommentPages = Math.ceil(comments.length / commentsPerPage);
    const currentDisplayComments = comments.slice((commentPage - 1) * commentsPerPage, commentPage * commentsPerPage);

    if (loading) return <Container sx={{ py: 5, textAlign: 'center' }}><Typography variant="h5">Đang tải bài viết...</Typography></Container>;
    if (error || !blog) return <Container sx={{ py: 5, textAlign: 'center' }}><Alert severity="error">{error || "Không tìm thấy bài viết."}</Alert></Container>;

    return (
        <ThemeProvider theme={elegantTheme}>
            <CssBaseline />
            {/* Header không được render ở đây, giả sử nó là layout chung */}
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3, fontSize: '0.9rem' }}>
                    <Link component={RouterLink} underline="hover" color="inherit" to="/">Trang chủ</Link>
                    <Link component={RouterLink} underline="hover" color="inherit" to="/blog">Blog</Link>
                    <Typography color="text.primary" sx={{ fontWeight: 500 }}>{blog.title || "Chi tiết bài viết"}</Typography>
                </Breadcrumbs>

                <Grid container spacing={5}> {/* Tăng spacing giữa main content và sidebar */}
                    {/* Main Content Column */}
                    <Grid item xs={12} md={8}>
                        <MotionPaper
                            elevation={0} // Bỏ elevation mặc định của Paper, dùng border
                            sx={{ border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`, p: { xs: 2.5, md: 4 } }}
                            variants={sectionVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <Typography variant="h1" component="h1" gutterBottom>
                                {blog.title}
                            </Typography>

                            <Stack direction="row" spacing={1.5} sx={{ my: 3, color: 'text.secondary', alignItems: 'center', flexWrap: 'wrap' }}>
                                <Stack direction="row" alignItems="center" spacing={0.5}><Avatar src={blog.authorImage} sx={{ width: 28, height: 28, fontSize: '0.8rem' }}>{blog.author?.[0]}</Avatar> <Typography variant="caption" sx={{ fontWeight: 600 }}>{blog.author}</Typography></Stack>
                                <Stack direction="row" alignItems="center" spacing={0.5}><CalendarTodayIcon sx={{ fontSize: '1rem' }} /> <Typography variant="caption">{new Date(blog.createdAt).toLocaleDateString("vi-VN", { day: '2-digit', month: '2-digit', year: 'numeric' })}</Typography></Stack>
                                {/* <Stack direction="row" alignItems="center" spacing={0.5}><VisibilityIcon sx={{ fontSize: '1rem' }} /> <Typography variant="caption">{blog.viewCount || 0} lượt xem</Typography></Stack> */}
                                <Stack direction="row" alignItems="center" spacing={0.5}><CommentIcon sx={{ fontSize: '1rem' }} /> <Typography variant="caption">{comments.length} bình luận</Typography></Stack>
                                <Stack direction="row" alignItems="center" spacing={0.5}><StarIcon sx={{ fontSize: '1.1rem', color: 'warning.main' }} /> <Typography variant="caption" sx={{ fontWeight: 500 }}>{currentBlogRating.toFixed(1)}/5</Typography></Stack>
                            </Stack>

                            {blog.images && blog.images.length > 0 && (
                                <Box sx={{ mb: 3, borderRadius: '12px', overflow: 'hidden', boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.15)}` }}>
                                    <CardMedia component="img" image={blog.images[0].url} alt={blog.images[0].caption || blog.title} sx={{ width: '100%', maxHeight: '550px', objectFit: 'cover' }} />
                                </Box>
                            )}

                            <Box className="blog-post-content" dangerouslySetInnerHTML={{ __html: blog.contentWithIds || blog.content || "" }} sx={{
                                '& h2': { ...elegantTheme.typography.h2, color: elegantTheme.palette.primary.dark },
                                '& h3': { ...elegantTheme.typography.h3, color: alpha(elegantTheme.palette.text.primary, 0.85) },
                                '& p': { ...elegantTheme.typography.body1, mb: 2 },
                                '& a': { color: 'secondary.main', textDecoration: 'underline', '&:hover': { color: 'secondary.dark' } },
                                '& img': { maxWidth: '100%', height: 'auto', borderRadius: '12px', display: 'block', my: 3, boxShadow: 3 },
                                '& ul, & ol': { pl: 3, my: 2 }, '& li': { mb: 1, lineHeight: 1.7, color: 'text.secondary' },
                                '& strong': { fontWeight: 600, color: 'text.primary' }
                            }} />

                            {blog.tags && blog.tags.length > 0 && (
                                <Box sx={{ mt: 4, mb: 3 }}>
                                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>Thẻ:</Typography>
                                    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                                        {blog.tags.map((tag, index) => (
                                            <Chip key={index} label={tag} component="a" href={`/blog/tag/${tag.toLowerCase()}`} clickable variant="outlined" size="medium" sx={{ borderColor: alpha(theme.palette.primary.main, 0.5), color: theme.palette.primary.dark, '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.05) } }} />
                                        ))}
                                    </Stack>
                                </Box>
                            )}
                            <Divider sx={{ my: 4, borderColor: alpha(theme.palette.primary.main, 0.2) }} />

                            <MotionBox variants={itemVariants} sx={{ textAlign: 'center', p: { xs: 2, md: 3 }, backgroundColor: alpha(theme.palette.primary.light, 0.15), borderRadius: '12px' }}>
                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>Bạn thấy bài viết này thế nào?</Typography>
                                <Rating
                                    name="blog-post-rating"
                                    value={userRating}
                                    onChange={(event, newValue) => { if (!ratingSubmitted) setUserRating(newValue); }}
                                    readOnly={ratingSubmitted}
                                    size="large"
                                    emptyIcon={<StarIcon style={{ opacity: 0.4 }} fontSize="inherit" />}
                                    sx={{ mb: 2, '& .MuiRating-iconFilled': { color: '#FFB400' } }} // Màu vàng cho sao
                                />
                                {ratingSubmitted ? (
                                    <Typography color="success.main" variant="subtitle1" sx={{ fontWeight: 600 }}>Cảm ơn bạn đã đánh giá!</Typography>
                                ) : (
                                    <Button variant="contained" onClick={handleRatingSubmit} disabled={userRating === 0 || ratingSubmitted} size="medium" sx={{ fontWeight: 600 }}>
                                        Gửi đánh giá
                                    </Button>
                                )}
                            </MotionBox>
                        </MotionPaper>

                        {/* Comment Section */}
                        <MotionPaper elevation={0} sx={{ mt: 4, border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}` }} variants={sectionVariants}>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`, pb: 2, mb: 2 }}>
                                <CommentIcon sx={{ verticalAlign: 'middle', mr: 1, color: 'primary.main' }} />Bình luận ({comments.length})
                            </Typography>
                            <Box component="form" onSubmit={handleCommentSubmit} sx={{ my: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField fullWidth label="Tên của bạn" name="commenterName" value={commenterName} onChange={(e) => setCommenterName(e.target.value)} required />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField fullWidth label="Viết bình luận..." name="newComment" value={newComment} onChange={(e) => setNewComment(e.target.value)} required multiline rows={3} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <LoadingButton type="submit" loading={isSubmittingComment} variant="contained" endIcon={<SendIcon />} size="medium" sx={{ fontWeight: 600 }}>
                                            Gửi bình luận
                                        </LoadingButton>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Divider sx={{ mb: 2.5 }} />
                            {currentDisplayComments.length > 0 ? (
                                <List sx={{ width: '100%', bgcolor: 'background.paper', p: 0 }}>
                                    {currentDisplayComments.map((comment, index) => (
                                        <React.Fragment key={comment._id || `comment-${index}`}>
                                            <ListItem alignItems="flex-start" sx={{ px: 0, py: 1.5 }}>
                                                <ListItemAvatar sx={{ minWidth: 50 }}>
                                                    <Avatar src={comment.avatar || undefined} sx={{ bgcolor: 'primary.light', color: 'primary.dark' }}>{comment.name ? comment.name.charAt(0).toUpperCase() : 'A'}</Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={<Typography sx={{ fontWeight: 'bold', color: 'text.primary', mb: 0.3 }}>{comment.name || "Ẩn danh"}</Typography>}
                                                    secondary={
                                                        <>
                                                            <Typography sx={{ display: 'block', whiteSpace: 'pre-wrap', wordBreak: 'break-word', color: 'text.primary', fontSize: '0.95rem' }} component="span" variant="body2">
                                                                {comment.content || "..."}
                                                            </Typography>
                                                            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                                                                {new Date(comment.createdAt).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                            </Typography>
                                                        </>
                                                    }
                                                />
                                            </ListItem>
                                            {index < currentDisplayComments.length - 1 && <Divider variant="inset" component="li" />}
                                        </React.Fragment>
                                    ))}
                                </List>
                            ) : (
                                <Alert severity="info" sx={{ mt: 2, justifyContent: 'center' }}>Chưa có bình luận. Hãy là người đầu tiên!</Alert>
                            )}
                            {totalCommentPages > 1 && (
                                <Stack sx={{ mt: 3, alignItems: 'center' }}>
                                    <Pagination count={totalCommentPages} page={commentPage} onChange={(e, val) => setCommentPage(val)} color="primary" />
                                </Stack>
                            )}
                        </MotionPaper>
                    </Grid>

                    {/* Right Sidebar (TOC) */}
                    <Grid item xs={12} md={4}>
                        <MotionBox sx={{ position: 'sticky', top: '88px' }} variants={sectionVariants} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
                            {toc.length > 0 && (
                                <Paper elevation={2} sx={{ p: 2.5, border: `1px solid ${alpha(theme.palette.secondary.main, 0.3)}`, backgroundColor: alpha(theme.palette.secondary.light, 0.1) }}>
                                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'secondary.dark', borderBottom: `2px solid ${theme.palette.secondary.main}`, pb: 1, mb: 1.5 }}>Mục lục bài viết</Typography>
                                    <List dense component="nav" sx={{ maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}>
                                        {toc.map((item) => (
                                            <ListItem key={item.id} disablePadding sx={{ '&:hover': { bgcolor: alpha(theme.palette.secondary.main, 0.1), borderRadius: '4px' } }}>
                                                <Link href={`#${item.id}`} underline="none" sx={{ color: item.level === 'h3' ? 'text.secondary' : 'text.primary', width: '100%', py: 0.7, pl: item.level === 'h3' ? 2.5 : 0.5, display: 'block', fontWeight: item.level === 'h2' ? 500 : 400, fontSize: item.level === 'h2' ? '0.95rem' : '0.85rem', transition: 'color 0.2s', '&:hover': { color: 'secondary.dark' } }}>
                                                    {item.text}
                                                </Link>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Paper>
                            )}
                        </MotionBox>
                    </Grid>
                </Grid>
            </Container>
            {/* <BlogPageFooter /> */}
        </ThemeProvider>
    );
}

