import { useState, useEffect, useCallback } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
    Container,
    Box,
    Typography,
    CircularProgress,
    Paper,
    Chip,
    Stack,
    Divider,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Button,
} from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import {
    CalendarToday as CalendarIcon,
    Person as PersonIcon,
    Label as TagIcon,
    Link as LinkIcon,
    ErrorOutline as ErrorIcon,
    Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';
import axiosInstance from '../../helper/axiosInstance';
import { toast } from 'react-toastify';

const getYouTubeEmbedUrl = (url) => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = (match && match[2].length === 11) ? match[2] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
};

const slugify = (text) => {
    if (!text) return '';
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
};

const BlogDetailPage = () => {
    const theme = useTheme();
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBlog = useCallback(async () => {
        if (!id) return;
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.get(`/admin/blog/${id}`);
            if (response.data && response.data.blog) {
                setBlog(response.data.blog);
            } else {
                setError('Bài viết không tồn tại.');
                toast.error('Bài viết không tồn tại.');
            }
        } catch (err) {
            console.error('Failed to fetch blog:', err);
            setError(err.response?.data?.message || 'Không thể tải nội dung bài viết.');
            toast.error(err.response?.data?.message || 'Không thể tải nội dung bài viết.');
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        console.log("id:", id);
        fetchBlog();
    }, [fetchBlog]);

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            return format(new Date(dateString), 'dd/MM/yyyy');
        } catch (e) {
            return 'Ngày không hợp lệ';
        }
    };

    if (loading) {
        return (
            <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
                <CircularProgress size={60} />
                <Typography sx={{ mt: 2 }}>Đang tải bài viết...</Typography>
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
                <ErrorIcon sx={{ fontSize: 60, color: 'error.main', mb: 2 }} />
                <Typography variant="h5" color="error" gutterBottom>
                    Lỗi
                </Typography>
                <Typography>{error}</Typography>
                <Button component={RouterLink} to="/" variant="outlined" sx={{ mt: 3 }}>
                    Về trang chủ
                </Button>
            </Container>
        );
    }

    if (!blog) {
        return (
            <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
                <Typography>Không tìm thấy bài viết.</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 5 } }}>
            <Paper elevation={0} sx={{ p: { xs: 2, sm: 3, md: 4 }, borderRadius: '12px', bgcolor: 'background.paper' }}>
                <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', lineHeight: 1.2 }}>
                    {blog.title}
                </Typography>

                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3, color: 'text.secondary', flexWrap: 'wrap' }}>
                    {blog.authorId && (
                        <Stack direction="row" alignItems="center" spacing={0.5}>
                            <PersonIcon fontSize="small" />
                            <Typography variant="subtitle2">{blog.authorId}</Typography>
                        </Stack>
                    )}
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                        <CalendarIcon fontSize="small" />
                        <Typography variant="subtitle2">{formatDate(blog.createdAt)}</Typography>
                    </Stack>
                    {blog.viewCount > 0 && (
                        <Stack direction="row" alignItems="center" spacing={0.5}>
                            <VisibilityIcon fontSize="small" />
                            <Typography variant="subtitle2">{blog.viewCount} lượt xem</Typography>
                        </Stack>
                    )}
                </Stack>

                {blog.media && blog.media[0] && (
                    <Box sx={{ mb: 3, borderRadius: '8px', overflow: 'hidden', maxHeight: { xs: 300, sm: 400, md: 500 } }}>
                        <img
                            src={blog.media[0].url}
                            alt={blog.media[0].caption || blog.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        {blog.media[0].caption && (
                            <Typography variant="caption" display="block" sx={{ textAlign: 'center', p: 1, bgcolor: alpha(theme.palette.common.black, 0.03) }}>
                                {blog.media[0].caption}
                            </Typography>
                        )}
                    </Box>
                )}

                <Box
                    className="blog-content"
                    sx={{
                        mt: 3, mb: 4, color: 'text.primary', lineHeight: 1.75, fontSize: '1.1rem',
                        '& h1': { ...theme.typography.h4, fontWeight: 'bold', mt: 4, mb: 2 },
                        '& h2': { ...theme.typography.h5, fontWeight: 'bold', mt: 3.5, mb: 1.5 },
                        '& h3': { ...theme.typography.h6, fontWeight: 'bold', mt: 3, mb: 1 },
                        '& p': { mb: 2 },
                        '& a': { color: 'primary.main', textDecoration: 'underline' },
                        '& img': { maxWidth: '100%', height: 'auto', borderRadius: '8px', my: 2, display: 'block', marginLeft: 'auto', marginRight: 'auto' },
                        '& ul, & ol': { pl: 3, mb: 2 },
                        '& li': { mb: 0.5 },
                        '& blockquote': { borderLeft: `4px solid ${theme.palette.primary.main}`, pl: 2, ml: 0, my: 2, fontStyle: 'italic', color: 'text.secondary' },
                        '& pre': { backgroundColor: alpha(theme.palette.text.primary, 0.05), padding: theme.spacing(2), borderRadius: '8px', overflowX: 'auto', my: 2 }
                    }}
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                {blog.tags && blog.tags.length > 0 && (
                    <Box sx={{ my: 4 }}>
                        <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                            <TagIcon color="action" />
                            <Typography variant="h6" component="span" sx={{ fontWeight: 'bold' }}>Tags:</Typography>
                        </Stack>
                        <Stack direction="row" spacing={1} flexWrap="wrap">
                            {blog.tags.map((tag) => (
                                <Chip key={tag} label={tag} component="a" href={`/tags/${slugify(tag)}`} clickable variant="outlined" size="small" />
                            ))}
                        </Stack>
                    </Box>
                )}

                {blog.affiliateLinks && blog.affiliateLinks.length > 0 && (
                    <Box sx={{ my: 4 }}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Sản phẩm liên kết</Typography>
                        <Grid container spacing={2}>
                            {blog.affiliateLinks.map((link, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', borderRadius: '8px', boxShadow: theme.shadows[1] }}>
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Typography gutterBottom variant="subtitle1" component="div" fontWeight="medium">
                                                {link.label || 'Sản phẩm liên kết'}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Lượt click: {link.clickCount || 0}
                                            </Typography>
                                        </CardContent>
                                        <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                                            <Button
                                                size="small"
                                                variant="contained"
                                                color="primary"
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer nofollow"
                                                startIcon={<LinkIcon />}
                                            >
                                                Xem sản phẩm
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}

                <Divider sx={{ my: 4 }} />
            </Paper>
        </Container>
    );
};

export default BlogDetailPage;
