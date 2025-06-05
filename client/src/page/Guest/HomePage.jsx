import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import {
    createTheme, ThemeProvider, CssBaseline, AppBar, Toolbar, Typography,
    Button, Container, Box, Card, CardMedia, CardContent, Grid, Link,
    IconButton, Chip, TextField, Alert, Snackbar,
    Paper, Stack, Divider, useTheme, alpha
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import {
    Menu as MenuIcon,
    ArrowForwardIos,
    FavoriteBorder,
    Restaurant,
    ChildCare,
    LocalHospital,
    Spa,
    School,
    Facebook,
    Instagram,
    Twitter,
    Send,
    ChevronRight
} from '@mui/icons-material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
const elegantTheme = createTheme({
    palette: {
        primary: { main: '#E5A3B3' }, // Hồng pastel chính
        secondary: { main: '#A0C4B8' }, // Xanh bạc hà phụ
        background: { default: '#FFF7F5', paper: '#FFFFFF' }, // Nền hồng rất nhạt
        text: { primary: '#5D4037', secondary: '#8D6E63' }, // Màu chữ nâu ấm
    },
    typography: {
        fontFamily: '"Nunito Sans", sans-serif',
        h1: { fontFamily: '"Lora", serif', fontWeight: 600, fontSize: '3.2rem' },
        h2: { fontFamily: '"Lora", serif', fontWeight: 600, fontSize: '3rem' },
        h3: { fontFamily: '"Lora", serif', fontWeight: 600, fontSize: '2.2rem' },
        h4: { fontFamily: '"Lora", serif', fontWeight: 600, fontSize: '1.8rem' },
        h5: { fontFamily: '"Lora", serif', fontWeight: 600, fontSize: '1.5rem' },
        h6: { fontWeight: 700 },
        subtitle1: { fontSize: '1.1rem', lineHeight: 1.7, fontWeight: 400 },
    },
    components: {
        MuiButton: { styleOverrides: { root: { borderRadius: 50, textTransform: 'none', fontWeight: 700, padding: '10px 25px' } } },
        MuiChip: { styleOverrides: { root: { borderRadius: 8, fontWeight: 700 } } }
    },
});

const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const MotionBox = motion(Box);
const blogPosts = [
    { id: 1, title: 'Bí quyết giúp bé ngủ ngon giấc', image: 'https://images.unsplash.com/photo-1546015720-693a131655f4?q=80&w=870', category: 'Giấc ngủ', excerpt: 'Khám phá những phương pháp khoa học và dịu dàng để bé yêu có giấc ngủ sâu và trọn vẹn mỗi đêm.', color: 'primary' },
    { id: 2, title: 'Dinh dưỡng vàng cho mẹ bầu', image: 'https://images.unsplash.com/photo-1555412654-72a34a520934?q=80&w=870', category: 'Dinh dưỡng', excerpt: 'Chế độ ăn uống cân bằng là nền tảng vững chắc cho sự phát triển của thai nhi và sức khỏe của mẹ.', color: 'secondary' },
    { id: 3, title: 'Hoạt động gắn kết tình cảm mẹ con', image: 'https://images.unsplash.com/photo-1476703893627-68b1ea3815a5?q=80&w=870', category: 'Phát triển', excerpt: 'Những trò chơi đơn giản nhưng ý nghĩa giúp tăng cường sự kết nối thiêng liêng giữa mẹ và con yêu.', color: 'success' },
    { id: 4, title: 'Yoga cho mẹ sau sinh: Lấy lại vóc dáng', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=920', category: 'Sức khỏe', excerpt: 'Các bài tập yoga nhẹ nhàng giúp phục hồi cơ thể, giảm căng thẳng và mang lại năng lượng tích cực.', color: 'warning' },
    { id: 5, title: 'Thực đơn ăn dặm cho bé 6 tháng', image: 'https://images.unsplash.com/photo-1565792911364-5431b34b5c46?q=80&w=870', category: 'Ăn dặm', excerpt: 'Hướng dẫn chi tiết cách chuẩn bị bữa ăn dặm đầu đời đầy đủ dinh dưỡng và hấp dẫn cho bé.', color: 'info' },
    { id: 6, title: 'Đối phó với khủng hoảng tuổi lên 2', image: 'https://images.unsplash.com/photo-1519682577862-22b62b24e493?q=80&w=870', category: 'Tâm lý', excerpt: 'Những bí quyết giúp cha mẹ thấu hiểu và đồng hành cùng con vượt qua giai đoạn phát triển quan trọng này.', color: 'error' },
];

// --- COMPONENTS ---

const PulsatingHeartsAnimation = ({
    size = 30,
    motherHeartChar = "💖",
    childHeartChar = "💗"
}) => {
    const canvasRef = useRef(null);
    const animationFrameId = useRef(null);
    const timeRef = useRef(0);
    const theme = useTheme();

    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        const canvasWidth = canvas.width / dpr;
        const canvasHeight = canvas.height / dpr;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        timeRef.current += 0.05;

        const motherBaseSize = size * 0.65;
        const motherPulseFactor = 1 + 0.08 * Math.sin(timeRef.current);
        const motherCurrentSize = motherBaseSize * motherPulseFactor;
        ctx.font = `${motherCurrentSize}px Arial`;
        ctx.fillStyle = theme.palette.primary.main;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(motherHeartChar, canvasWidth / 2, canvasHeight / 2);

        const childBaseSize = motherBaseSize * 0.5;
        const childPulseFactor = 1 + 0.1 * Math.sin(timeRef.current + 0.8);
        const childCurrentSize = childBaseSize * childPulseFactor;
        ctx.font = `${childCurrentSize}px Arial`;
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(childHeartChar, canvasWidth / 2, canvasHeight / 2 * 0.98);

        animationFrameId.current = requestAnimationFrame(animate);
    }, [size, motherHeartChar, childHeartChar, theme]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const dpr = window.devicePixelRatio || 1;

        canvas.style.width = `${size}px`;
        canvas.style.height = `${size}px`;
        canvas.width = size * dpr;
        canvas.height = size * dpr;

        const ctx = canvas.getContext('2d');
        ctx.scale(dpr, dpr);

        animationFrameId.current = requestAnimationFrame(animate);
        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [animate, size]);

    return <canvas ref={canvasRef} aria-label="Pulsating hearts animation" />;
};


const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const handleNavigateToBlog = () => {
        navigate('/blog');
    };
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <AppBar position="sticky" elevation={scrolled ? 4 : 0} sx={{ backgroundColor: scrolled ? 'rgba(255, 247, 245, 0.9)' : 'transparent', backdropFilter: scrolled ? 'blur(10px)' : 'none', transition: 'background-color 0.3s ease, box-shadow 0.3s ease', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexGrow: 1, pl: { xs: 1, md: 0 } }}>
                        <PulsatingHeartsAnimation size={28} />
                        <Typography variant="h6" component="div" sx={{ fontFamily: '"Lora", serif', color: 'text.primary' }}>
                            MomUni
                        </Typography>
                    </Box>

                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
                        <Button variant="text" sx={{ color: 'text.primary' }}>Trang Chủ</Button>
                        <Button variant="text" sx={{ color: 'text.primary' }} onClick={handleNavigateToBlog}>
                            Blog
                        </Button>
                        <Button variant="text" sx={{ color: 'text.primary' }}>Chủ đề</Button>
                        <Button variant="contained" color="primary">Liên hệ</Button>
                    </Box>
                    <IconButton sx={{ display: { xs: 'flex', md: 'none' }, color: 'text.primary', pr: { xs: 1, md: 0 } }}><MenuIcon /></IconButton>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

const FallingPetalsJS = () => {
    const canvasRef = useRef(null);
    const petalsArray = useRef([]);
    const animationFrameId = useRef(null);
    const petalEmojis = ["🌸", "💮", "💖"];

    const createPetal = (canvas) => {
        const size = Math.random() * 10 + 8;
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * -canvas.height * 0.5,
            size: size,
            speedY: Math.random() * 0.5 + 0.5,
            speedX: Math.random() * 0.5 - 0.25,
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 2 - 1,
            character: petalEmojis[Math.floor(Math.random() * petalEmojis.length)],
            opacity: Math.random() * 0.5 + 0.5,
        };
    };

    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const currentWidth = canvas.offsetWidth;
        const currentHeight = canvas.offsetHeight;

        if (currentWidth > 0 && currentHeight > 0) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            petalsArray.current.forEach((petal, index) => {
                petal.y += petal.speedY;
                petal.x += petal.speedX;
                petal.rotation += petal.rotationSpeed;

                ctx.save();
                ctx.translate(petal.x * (canvas.width / currentWidth), petal.y * (canvas.height / currentHeight) + petal.size / 2);
                ctx.rotate((petal.rotation * Math.PI) / 180);
                ctx.globalAlpha = petal.opacity;
                ctx.font = `${petal.size}px Arial`;
                ctx.fillText(petal.character, -petal.size / 2, petal.size / 2);
                ctx.restore();

                if (petal.y * (canvas.height / currentHeight) > currentHeight + petal.size) {
                    petalsArray.current[index] = createPetal({ width: currentWidth, height: currentHeight });
                    petalsArray.current[index].y = -petal.size - Math.random() * 20;
                }
                if (petal.x * (canvas.width / currentWidth) > currentWidth + petal.size) petal.x = -petal.size / (canvas.width / currentWidth);
                if (petal.x * (canvas.width / currentWidth) < -petal.size) petal.x = (currentWidth + petal.size) / (canvas.width / currentWidth);
            });
        }
        animationFrameId.current = requestAnimationFrame(animate);
    }, []);


    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        let timer;

        const setCanvasDimensions = () => {
            const dpr = window.devicePixelRatio || 1;
            const newWidth = canvas.offsetWidth;
            const newHeight = canvas.offsetHeight;

            if (canvas.width !== newWidth * dpr || canvas.height !== newHeight * dpr) {
                canvas.width = newWidth * dpr;
                canvas.height = newHeight * dpr;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.scale(dpr, dpr);
                }
            }

            if (petalsArray.current.length === 0 && newWidth > 0 && newHeight > 0) {
                const numberOfPetals = 25;
                for (let i = 0; i < numberOfPetals; i++) {
                    petalsArray.current.push(createPetal({ width: newWidth, height: newHeight }));
                }
            }
        };

        const startAnimation = () => {
            if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
            animationFrameId.current = requestAnimationFrame(animate);
        }

        setCanvasDimensions();
        timer = setTimeout(startAnimation, 100);

        window.addEventListener('resize', setCanvasDimensions);

        return () => {
            window.removeEventListener('resize', setCanvasDimensions);
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
            clearTimeout(timer);
        };
    }, [animate]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
            }}
        />
    );
};

const TypewriterText = ({ text, variant, component = "div", sx, charDelay = 0.05, initialDelay = 0, color = "text.primary" }) => {
    const characters = Array.from(text);

    const containerVariants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: initialDelay,
                staggerChildren: charDelay,
            },
        },
    };

    const charVariants = {
        hidden: { opacity: 0, y: "50%" },
        visible: {
            opacity: 1,
            y: "0%",
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
    };

    return (
        <Typography variant={variant} component={component} sx={sx} color={color}>
            <motion.span
                style={{ display: 'inline-block', overflow: 'hidden' }}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                aria-label={text}
            >
                {characters.map((char, index) => (
                    <motion.span
                        key={`${char}-${index}`}
                        variants={charVariants}
                        style={{ display: 'inline-block', willChange: 'opacity, transform' }}
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                ))}
            </motion.span>
        </Typography>
    );
};

const HeroSection = () => {
    const heroMessages = [
        { title: "MomUni: Chào Đón Điều Kỳ Diệu.", subtitle: "Cùng bạn khám phá hành trình làm mẹ, từ những bỡ ngỡ đầu tiên đến niềm hạnh phúc vô bờ." },
        { title: "Kiến Thức Vàng Cho Mẹ Thông Thái.", subtitle: "Nơi mỗi câu hỏi được giải đáp, mỗi lo lắng được sẻ chia, giúp mẹ tự tin hơn mỗi ngày." },
        { title: "Yêu Thương Chắp Cánh Ước Mơ Con.", subtitle: "Đồng hành cùng sự phát triển của bé yêu, từ những bước chân đầu đời đến khám phá thế giới." },
        { title: "MomUni: Cộng Đồng Của Những Trái Tim.", subtitle: "Kết nối, học hỏi và lan tỏa niềm vui làm mẹ trong một không gian ấm áp và thấu hiểu." }
    ];
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % heroMessages.length);
        }, 7000);

        return () => clearInterval(intervalId);
    }, [heroMessages.length]);

    const currentMessage = heroMessages[currentMessageIndex];

    return (
        <Box sx={{ position: 'relative', overflow: 'hidden', pt: { xs: 6, md: 10 }, pb: { xs: 6, md: 12 }, minHeight: '80vh', display: 'flex', alignItems: 'center', textAlign: { xs: 'center', md: 'left' } }}>
            <FallingPetalsJS />
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <Grid container justifyContent="center" alignItems="center">
                    <Grid item xs={12} md={10} lg={8}>
                        <Stack spacing={3} alignItems={{ xs: 'center', md: 'flex-start' }}>
                            <TypewriterText
                                key={`title-${currentMessageIndex}`}
                                text={currentMessage.title}
                                variant="h1"
                                component="h1"
                                initialDelay={0.1}
                                charDelay={0.05}
                            />
                            <TypewriterText
                                key={`subtitle-${currentMessageIndex}`}
                                text={currentMessage.subtitle}
                                variant="subtitle1"
                                component="p"
                                color="text.secondary"
                                sx={{ my: 1, maxWidth: '600px' }}
                                initialDelay={currentMessage.title.length * 0.05 + 0.3}
                                charDelay={0.02}
                            />
                            <motion.div
                                key={`button-${currentMessageIndex}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: currentMessage.title.length * 0.05 + currentMessage.subtitle.length * 0.02 + 0.5 }}
                            >
                                <Button variant="contained" color="primary" size="large" endIcon={<FavoriteBorder />}>
                                    Khám Phá Ngay
                                </Button>
                            </motion.div>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

// --- ✨ FEATURES SECTION UPDATED ✨ ---
const FeaturesSection = () => {
    const theme = useTheme();
    const featuresData = [
        { icon: <Restaurant />, title: "Dinh dưỡng", description: "Công thức cho mẹ và bé." },
        { icon: <ChildCare />, title: "Phát triển", description: "Cột mốc quan trọng." },
        { icon: <LocalHospital />, title: "Sức khỏe & Bệnh", description: "Phòng và trị bệnh." },
        { icon: <Spa />, title: "Làm đẹp & Yoga", description: "Rạng rỡ mỗi ngày." },
        { icon: <School />, title: "Giáo dục sớm", description: "Nền tảng tương lai." },
    ];

    const FeatureCard = ({ icon, title, description }) => (
        <MotionBox
            component={Paper}
            elevation={2}
            sx={{
                p: 3,
                textAlign: 'center',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: '16px',
                border: '1px solid',
                borderColor: alpha(theme.palette.primary.main, 0.2),
                transition: 'all 0.3s ease-in-out',
                cursor: 'pointer',
                '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0px 16px 32px ${alpha(theme.palette.primary.main, 0.25)}`,
                    borderColor: theme.palette.primary.main,
                },
                '&:hover .feature-icon-wrapper': {
                    transform: 'scale(1.15)',
                    bgcolor: alpha(theme.palette.primary.main, 0.15),
                }
            }}
        >
            <Box>
                <Box
                    className="feature-icon-wrapper"
                    sx={{
                        width: 72,
                        height: 72,
                        borderRadius: '50%',
                        bgcolor: alpha(theme.palette.primary.main, 0.08),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2.5,
                        transition: 'transform 0.3s ease-in-out, background-color 0.3s ease-in-out',
                    }}
                >
                    {React.cloneElement(icon, { sx: { fontSize: 36, color: 'primary.main' } })}
                </Box>
                <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 600, color: 'text.primary', mb: 0.5 }}>
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ minHeight: '2.5em' }}>
                    {description}
                </Typography>
            </Box>
            <Link
                href="#"
                variant="body2"
                sx={{
                    mt: 2,
                    display: 'flex',
                    alignItems: 'center',
                    color: 'primary.main',
                    fontWeight: 600,
                    textDecoration: 'none',
                    opacity: 0,
                    transition: 'opacity 0.3s ease-in-out',
                    '.MuiPaper-root:hover &': {
                        opacity: 1,
                    }
                }}
            >
                Xem thêm <ChevronRight sx={{ fontSize: '1.1rem', ml: 0.5 }} />
            </Link>
        </MotionBox>
    );

    return (
        <MotionBox sx={{ py: 10, backgroundColor: theme.palette.background.default }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
            <Container maxWidth="lg">
                <Typography variant="h3" align="center" color="text.primary" gutterBottom>
                    Khám phá mọi khía cạnh
                </Typography>
                <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 8, fontWeight: 400, maxWidth: '600px', margin: 'auto auto 64px auto' }}>
                    Những chủ đề được quan tâm nhất, giúp mẹ tự tin và vững vàng trên mọi chặng đường.
                </Typography>
                <Grid container spacing={3.5} justifyContent="center">
                    {featuresData.map((feature, index) => (
                        <Grid item xs={6} sm={4} md={3} key={index}>
                            <FeatureCard {...feature} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </MotionBox>
    );
};


const BlogSection = () => {
    return (
        <MotionBox sx={{ py: 10, overflow: 'hidden' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
            <Container maxWidth="lg">
                <Typography variant="h3" align="center" gutterBottom sx={{ mb: 8 }}>
                    Từ Blog của MomUni
                </Typography>
                <Swiper
                    modules={[Pagination, Navigation, Autoplay]}
                    grabCursor={true}
                    loop={true}
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                    }}
                    pagination={{ clickable: true }}
                    navigation={true}
                    slidesPerView={1}
                    spaceBetween={20}
                    breakpoints={{
                        600: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        900: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                    }}
                    style={{ paddingBottom: '50px', paddingTop: '10px' }}
                >
                    {blogPosts.map((post) => (
                        <SwiperSlide key={post.id} style={{ height: 'auto' }}>
                            <Card sx={{
                                width: '100%',
                                height: '100%',
                                borderRadius: '16px',
                                display: 'flex',
                                flexDirection: 'column',
                                overflow: 'hidden',
                                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: (theme) => `0px 12px 24px ${alpha(theme.palette.primary.main, 0.25)}`,
                                },
                                '&:hover .blog-card-media': {
                                    transform: 'scale(1.08)',
                                }
                            }}>
                                <Box sx={{ overflow: 'hidden', height: 200 }}>
                                    <CardMedia
                                        component="img"
                                        className="blog-card-media"
                                        sx={{
                                            height: '100%',
                                            width: '100%',
                                            objectFit: 'cover',
                                            transition: 'transform 0.4s ease-in-out',
                                        }}
                                        image={post.image}
                                        alt={post.title}
                                    />
                                </Box>
                                <CardContent sx={{
                                    flexGrow: 1,
                                    p: 2.5,
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}>
                                    <Chip label={post.category} color={post.color || "primary"} size="small" sx={{ mb: 1.5, alignSelf: 'flex-start', opacity: 0.9 }} />
                                    <Typography variant="h6" component="div" sx={{
                                        mb: 1,
                                        fontSize: '1.1rem',
                                        lineHeight: 1.4,
                                        fontWeight: 600,
                                        color: 'text.primary',
                                        display: '-webkit-box',
                                        WebkitBoxOrient: 'vertical',
                                        WebkitLineClamp: 2,
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        minHeight: '2.8em'
                                    }}>
                                        {post.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{
                                        mb: 2,
                                        flexGrow: 1,
                                        display: '-webkit-box',
                                        WebkitBoxOrient: 'vertical',
                                        WebkitLineClamp: 3,
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        minHeight: '4.5em'
                                    }}>
                                        {post.excerpt || "Khám phá những thông tin hữu ích và cập nhật mới nhất về chủ đề này..."}
                                    </Typography>
                                    <Button
                                        size="small"
                                        variant="text"
                                        color="primary"
                                        endIcon={<ArrowForwardIos sx={{ fontSize: '0.8rem' }} />}
                                        sx={{ mt: 'auto', alignSelf: 'flex-start', fontWeight: 600, '&:hover': { bgcolor: 'transparent' } }}
                                    >
                                        Đọc thêm
                                    </Button>
                                </CardContent>
                            </Card>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Container>
        </MotionBox>
    );
};

const FooterWithForm = () => {
    const [formData, setFormData] = useState({ name: '', email: '', question: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const handleInputChange = (e) => { setFormData(prev => ({ ...prev, [e.target.name]: e.target.value })); };
    const handleCloseSnackbar = () => { setSnackbar(prev => ({ ...prev, open: false })); };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            setSnackbar({ open: true, message: 'Cảm ơn bạn! Chúng tôi sẽ sớm liên hệ.', severity: 'success' });
            setFormData({ name: '', email: '', question: '' });
        } catch (err) {
            setSnackbar({ open: true, message: 'Oops! Có lỗi xảy ra.', severity: 'error' });
        }
        setIsSubmitting(false);
    };

    return (
        <Box component="footer" sx={{ backgroundColor: 'secondary.main', color: 'white', pt: 12, pb: 6, mt: 10, position: 'relative' }}>
            <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100px', background: `linear-gradient(to bottom, ${elegantTheme.palette.background.default}, ${elegantTheme.palette.secondary.main})`, zIndex: 0 }} />
            <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
                <Paper elevation={8} sx={{ p: { xs: 3, sm: 5 }, borderRadius: 4, mb: 8, mt: -24 }}>
                    <Typography variant="h3" component="h2" align="center" color="text.primary" gutterBottom>Kết nối với MomUni</Typography>
                    <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>Có bất kỳ câu hỏi hay góp ý nào? Hãy cho chúng tôi biết nhé!</Typography>
                    <Box component="form" onSubmit={handleSubmit}>
                        <Stack spacing={2.5}>
                            <Grid container spacing={2.5}>
                                <Grid item xs={12} sm={6}><TextField fullWidth label="Tên của bạn" name="name" value={formData.name} onChange={handleInputChange} required /></Grid>
                                <Grid item xs={12} sm={6}><TextField fullWidth label="Email" type="email" name="email" value={formData.email} onChange={handleInputChange} required /></Grid>
                            </Grid>
                            <TextField fullWidth label="Lời nhắn của bạn" name="question" value={formData.question} onChange={handleInputChange} required multiline rows={4} />
                            <LoadingButton type="submit" loading={isSubmitting} endIcon={<Send />} variant="contained" color="primary" size="large" sx={{ mt: 1 }}>Gửi Lời Nhắn</LoadingButton>
                        </Stack>
                    </Box>
                </Paper>
                <Grid container spacing={4} justifyContent="center" textAlign="center">
                    <Grid item xs={12}>
                        <Typography variant="h5" sx={{ fontFamily: '"Lora", serif', mb: 2, color: 'white' }}>MomUni</Typography>
                        <Stack direction="row" spacing={3} justifyContent="center" sx={{ mb: 3 }}>
                            <Link href="#" color="inherit" underline="hover">Blog</Link>
                            <Link href="#" color="inherit" underline="hover">Về chúng tôi</Link>
                            <Link href="#" color="inherit" underline="hover">Điều khoản</Link>
                        </Stack>
                        <Stack direction="row" spacing={1} justifyContent="center">
                            <IconButton href="#" aria-label="Facebook" sx={{ color: 'white' }}><Facebook /></IconButton>
                            <IconButton href="#" aria-label="Instagram" sx={{ color: 'white' }}><Instagram /></IconButton>
                            <IconButton href="#" aria-label="Twitter" sx={{ color: 'white' }}><Twitter /></IconButton>
                        </Stack>
                    </Grid>
                </Grid>
                <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.2)' }} />
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }} align="center">© {new Date().getFullYear()} MomUni. All rights reserved.</Typography>
            </Container>
            <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>{snackbar.message}</Alert>
            </Snackbar>
        </Box>
    );
};

export default function HomePage2() {
    return (
        <ThemeProvider theme={elegantTheme}>
            <CssBaseline />
            <Header />
            <main>
                <HeroSection />
                <FeaturesSection />
                <BlogSection />
            </main>
            <FooterWithForm />
        </ThemeProvider>
    );
}
