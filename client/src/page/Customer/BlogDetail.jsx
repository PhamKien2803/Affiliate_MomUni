import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./BlogDetail.module.scss";
import axiosInstance from "../../helper/axiosInstance";

export default function BlogDetail() {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [toc, setToc] = useState([]);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [commenterName, setCommenterName] = useState("");
    const [userRating, setUserRating] = useState(0);
    const [ratingSubmitted, setRatingSubmitted] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const commentsPerPage = 5;

    useEffect(() => {
        const fetchBlogAndComments = async () => {
            try {
                const blogResponse = await axiosInstance.get(`/blog/${slug}`);

                const blog = blogResponse.data?.blog || blogResponse.data;

                setBlog(blog);

                const commentsResponse = await axiosInstance.get(
                    `/comment?blogId=${blog._id}`
                );

                setComments(commentsResponse.data?.comments || commentsResponse.data || []);

                if (blog.content) {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(blog.content, "text/html");
                    const headings = Array.from(doc.querySelectorAll("h2, h3")).map((h, index) => ({
                        id: `section-${index}`,
                        text: h.textContent,
                        level: h.tagName.toLowerCase(),
                    }));
                    setToc(headings);
                }

                setLoading(false);
            } catch (err) {
                console.error("Lỗi lấy dữ liệu:", err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchBlogAndComments();
    }, [slug]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim() || !commenterName.trim()) {
            alert("Vui lòng nhập cả tên và bình luận.");
            return;
        }

        const tempId = `temp-${Date.now()}`;
        const tempComment = {
            id: tempId,
            name: commenterName,
            content: newComment,
            createdAt: new Date().toISOString(),
        };
        console.log("Tạm thời thêm bình luận:", tempComment);
        setComments([tempComment, ...comments]); // Add to start for newest first
        setCurrentPage(1); // Show new comment on first page
        const submittedComment = newComment;
        const submittedName = commenterName;
        setNewComment("");
        setCommenterName("");

        try {
            const response = await axiosInstance.post(`/comment/user-comment`, {
                blogId: blog._id,
                content: submittedComment,
                name: submittedName,
            });

            const newCommentData = response.data;
            const updatedComment = {
                ...newCommentData,
                name: newCommentData.name || newCommentData.author || submittedName,
                content: newCommentData.content || newCommentData.text || newCommentData.body || submittedComment,
                createdAt: newCommentData.createdAt || tempComment.createdAt,
            };
            setComments((prevComments) =>
                prevComments.map((comment) =>
                    comment.id === tempId ? updatedComment : comment
                )
            );
            setBlog((prevBlog) => ({
                ...prevBlog,
                commentCount: (prevBlog.commentCount || 0) + 1,
            }));
        } catch (err) {
            console.error("Lỗi gửi bình luận:", err);
            setComments((prevComments) =>
                prevComments.filter((comment) => comment.id !== tempId)
            );
            alert("Không thể gửi bình luận. Vui lòng thử lại.");
        }
    };

    const handleRatingSubmit = async () => {
        if (userRating === 0 || ratingSubmitted) return;

        try {
            const response = await axiosInstance.post(`/rating/user-rating`, {
                blogId: blog._id,
                rating: userRating,
            });
            const data = response.data;
            setBlog({ ...blog, averageRating: data.averageRating || userRating });
            setRatingSubmitted(true);

        } catch (err) {
            console.error("Lỗi gửi đánh giá:", err);
            alert("Không thể gửi đánh giá. Vui lòng thử lại.");
        }
    };

    // Pagination logic
    const totalPages = Math.ceil(comments.length / commentsPerPage);
    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    if (loading) {
        return <div className={styles.blogDetailPage}>Đang tải bài viết...</div>;
    }

    if (error) {
        return (
            <div className={styles.blogDetailPage}>
                Lỗi: {error}
                <br />
                <Link to="/blog" className={styles.backLink}>
                    Quay lại danh sách bài viết
                </Link>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className={styles.blogDetailPage}>
                Không tìm thấy bài viết
                <br />
                <Link to="/blog" className={styles.backLink}>
                    Quay lại danh sách bài viết
                </Link>
            </div>
        );
    }

    const contentWithIds = blog.content
        ? blog.content.replace(
            /<(h2|h3)>(.*?)<\/\1>/g,
            (match, tag, text, offset, string) => {
                const index = Array.from(string.matchAll(/<(h2|h3)>/g)).findIndex(
                    (m) => m.index === match.indexOf(match)
                );
                return `<${tag} id="section-${index}">${text}</${tag}>`;
            }
        )
        : "Không có nội dung.";

    return (
        <div className={styles.blogDetailPage}>
            <div className={styles.breadcrumb}>
                <Link to="/" className={styles.homeLink}>
                    Trang chủ
                </Link>
                <span className={styles.breadcrumbSeparator}> / </span>
                <Link to="/blog" className={styles.blogLink}>
                    Blog
                </Link>
                <span className={styles.breadcrumbSeparator}> / </span>
                <span className={styles.currentPage}>{blog.title || "Không có tiêu đề"}</span>
            </div>

            <div className={styles.contentWrapper}>
                {toc.length > 0 && (
                    <div className={styles.toc}>
                        <h3>Mục lục</h3>
                        <ul>
                            {toc.map((item) => (
                                <li
                                    key={item.id}
                                    className={item.level === "h3" ? styles.subItem : ""}
                                >
                                    <a href={`#${item.id}`}>{item.text}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className={styles.content}>
                    <h1 className={styles.blogTitle}>{blog.title || "Không có tiêu đề"}</h1>
                    <div className={styles.meta}>
                        <span>
                            Đăng vào{" "}
                            {blog.createdAt
                                ? new Date(blog.createdAt).toLocaleDateString("vi-VN")
                                : "Ngày không xác định"}
                        </span>
                        <span> | {blog.viewCount || 0} lượt xem</span>
                        <span> | {blog.commentCount || comments.length} bình luận</span>
                        {blog.averageRating >= 0 && (
                            <span> | Điểm trung bình: {blog.averageRating || 0}/5</span>
                        )}
                    </div>

                    {blog.images && blog.images.length > 0 ? (
                        <div className={styles.imageGallery}>
                            {blog.images.map((image, index) => (
                                <img
                                    key={image._id || `image-${index}`}
                                    src={image.url || "https://via.placeholder.com/800x400?text=Hình+ảnh+không+tìm+thấy"}
                                    alt={image.caption || blog.title || "Hình ảnh bài viết"}
                                    className={styles.blogImage}
                                    onError={(e) => {
                                        console.error("Lỗi tải hình ảnh:", image.url);
                                        e.target.src = "https://via.placeholder.com/800x400?text=Hình+ảnh+không+tìm+thấy";
                                    }}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className={styles.noImage}>Không có hình ảnh</div>
                    )}

                    {blog.video && blog.video.url ? (
                        <div className={styles.videoContainer}>
                            <video controls className={styles.blogVideo}>
                                <source
                                    src={blog.video.url}
                                    type="video/mp4"
                                    onError={(e) => console.error("Lỗi tải video:", blog.video.url)}
                                />
                                Trình duyệt của bạn không hỗ trợ thẻ video.
                            </video>
                        </div>
                    ) : (
                        <div className={styles.noVideo}>Không có video</div>
                    )}

                    <div
                        className={styles.blogContent}
                        dangerouslySetInnerHTML={{ __html: contentWithIds }}
                    />

                    {blog.affiliateLinks && blog.affiliateLinks.length > 0 ? (
                        <div className={styles.affiliateSection}>
                            {blog.affiliateLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.url || link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.affiliateButton}
                                >
                                    {link.label || `Xem ưu đãi ${index + 1}`}
                                </a>
                            ))}
                        </div>
                    ) : (
                        <div className={styles.noAffiliate}>Không có ưu đãi liên kết</div>
                    )}

                    <div className={styles.ratingSection}>
                        <h3>Đánh giá bài viết này</h3>
                        <div className={styles.stars}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    className={`${styles.star} ${userRating >= star ? styles.active : ""}`}
                                    onClick={() => !ratingSubmitted && setUserRating(star)}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                        {ratingSubmitted ? (
                            <p>Cảm ơn bạn đã đánh giá!</p>
                        ) : (
                            <button
                                className={styles.submitRating}
                                onClick={handleRatingSubmit}
                                disabled={userRating === 0}
                            >
                                Gửi đánh giá
                            </button>
                        )}
                    </div>

                    <div className={styles.commentSection}>
                        <h3>Bình luận ({blog.commentCount || comments.length})</h3>
                        {comments.length > 0 ? (
                            <>
                                <ul className={styles.commentList}>
                                    {currentComments
                                        .filter((comment) => comment.name && comment.name.trim())
                                        .map((comment) => {
                                            return (
                                                <li key={comment._id} className={styles.commentItem}>
                                                    <div className={styles.commentHeader}>
                                                        <span className={styles.commentAuthor}>{comment.name}</span>
                                                        <span className={styles.commentDate}>
                                                            {comment.createdAt
                                                                ? new Date(comment.createdAt).toLocaleDateString("vi-VN")
                                                                : "Ngày không xác định"}
                                                        </span>
                                                    </div>
                                                    <p className={styles.commentContent}>
                                                        {comment.content || "Không có nội dung bình luận"}
                                                    </p>
                                                </li>
                                            );
                                        })}
                                </ul>
                                {totalPages > 1 && (
                                    <div className={styles.pagination}>
                                        <button
                                            className={`${styles.pageButton} ${currentPage === 1 ? styles.disabledButton : ""}`}
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1}
                                        >
                                            Trước
                                        </button>
                                        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                                            <button
                                                key={page}
                                                className={`${styles.pageButton} ${currentPage === page ? styles.activePage : ""}`}
                                                onClick={() => handlePageChange(page)}
                                            >
                                                {page}
                                            </button>
                                        ))}
                                        <button
                                            className={`${styles.pageButton} ${currentPage === totalPages ? styles.disabledButton : ""}`}
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                        >
                                            Sau
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <p className={styles.noComments}>Chưa có bình luận. Hãy là người đầu tiên bình luận!</p>
                        )}

                        <form onSubmit={handleCommentSubmit} className={styles.commentForm}>
                            <input
                                type="text"
                                value={commenterName}
                                onChange={(e) => setCommenterName(e.target.value)}
                                placeholder="Tên của bạn"
                                className={styles.nameInput}
                                required
                            />
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Viết bình luận của bạn tại đây..."
                                className={styles.commentInput}
                                required
                            />
                            <button type="submit" className={styles.submitComment}>
                                Gửi bình luận
                            </button>
                        </form>
                    </div>

                    {blog.tags && blog.tags.length > 0 ? (
                        <div className={styles.tags}>
                            <span>Thẻ: </span>
                            {blog.tags.map((tag, index) => (
                                <span key={index} className={styles.tag}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <div className={styles.noTags}>Không có thẻ</div>
                    )}
                </div>
            </div>
        </div>
    );
}