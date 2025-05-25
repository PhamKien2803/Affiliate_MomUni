import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Blog.module.scss";

export default function Blog() {
  // -------- State for Blog Data, Loading, and Error --------
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // -------- Fetch Blog Data from API --------
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/blog");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBlogPosts(data.blogs || []); // Assuming API returns { blogs: [...] }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // -------- Pagination State + Logic --------
  const postsPerPage = 6;
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  // Derive the posts to show on the current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Generate a list of “page indicators” (numbers and possibly ellipsis)
  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 6) {
      // If 6 or fewer pages, list them all
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // More than 6 pages: show [1, 2, '…', totalPages-1, totalPages]
      pages.push(1, 2, "…", totalPages - 1, totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  // Handlers for clicking a page number or arrows
  const handlePageClick = (num) => {
    if (num === "…") return; // ignore ellipsis
    setCurrentPage(num);
  };
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // -------- Sidebar Data --------
  // Recent Blogs: Sort by createdAt (newest first), limit to 4
  const recentBlogs = [...blogPosts]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  // Trending Blogs: Sort by viewCount (highest first), limit to 4
  const trendingBlogs = [...blogPosts]
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, 4);

  // -------- Render Loading, Error, or Content --------
  if (loading) {
    return <div className={styles.blogPage}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.blogPage}>Error: {error}</div>;
  }

  return (
    <div className={styles.blogPage}>
      {/* —— “Home” Link —— */}
      <div className={styles.breadcrumb}>
        <Link to="/" className={styles.homeLink}>
          Home
        </Link>
      </div>

      {/* —— Filter / Category Pills —— */}
      {/* <div className={styles.filterSection}>
        <ul className={styles.filterList}>
          <li className={styles.filterItem}>
            <a href="#">All</a>
          </li>
          <li className={styles.filterItem}>
            <a href="#">Skincare</a>
          </li>
          <li className={styles.filterItem}>
            <a href="#">Wellness</a>
          </li>
          <li className={styles.filterItem}>
            <a href="#">Makeup</a>
          </li>
          <li className={styles.filterItem}>
            <a href="#">Lifestyle</a>
          </li>
        </ul>
      </div> */}

      <div className={styles.mainContent}>
        {/* —— Main Content (Left: Posts + Pagination, Right: Sidebar) —— */}
        <div className={styles.content}>
          {/* === Left Column: Blog Posts & Pagination === */}
          <div className={styles.leftColumn}>
            {/* Blog Posts Grid */}
            <div className={styles.blogGrid}>
              {currentPosts.map((post) => (
                <Link
                  key={post._id}
                  to={`/blog/${post.slug}`}
                  className={styles.blogCard}
                >
                  {post.images && post.images.length > 0 ? (
                    <img
                      src={post.images[0].url}
                      alt={post.title}
                      className={styles.blogImage}
                    />
                  ) : (
                    <div className={styles.noImage}>No Image</div>
                  )}
                  <h2 className={styles.blogTitle}>{post.title}</h2>
                </Link>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className={styles.pagination}>
              {/* Page Numbers & Ellipsis */}
              <div className={styles.pageNumbers}>
                {pageNumbers.map((num, idx) => (
                  <React.Fragment key={idx}>
                    {num === "…" ? (
                      <span className={styles.ellipsis}>…</span>
                    ) : (
                      <button
                        className={`
                          ${styles.pageNumber} 
                          ${currentPage === num ? styles.active : ""}
                        `}
                        onClick={() => handlePageClick(num)}
                      >
                        {num}
                      </button>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Left/Right Arrows */}
              <div className={styles.arrows}>
                <button
                  className={styles.arrow}
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                >
                  ←
                </button>
                <button
                  className={styles.arrow}
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                >
                  →
                </button>
              </div>
            </div>
          </div>

          {/* === Right Column: Sidebar === */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarSection}>
              <h3>Recent Blogs</h3>
              <ul className={styles.sidebarList}>
                {recentBlogs.map((blog) => (
                  <li key={blog._id}>
                    <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.sidebarSection}>
              <h3>Trending Blogs</h3>
              <ul className={styles.sidebarList}>
                {trendingBlogs.map((blog) => (
                  <li key={blog._id}>
                    <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}