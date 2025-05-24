import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Blog.module.scss";

export default function Blog() {
  // -------- Sample Data: 14 Placeholder Posts --------
  const samplePosts = Array.from({ length: 14 }, (_, i) => ({
    id: i + 1,
    title: `Blog Post ${i + 1}`,
  }));

  // -------- Pagination State + Logic --------
  const postsPerPage = 6;
  const totalPages = Math.ceil(samplePosts.length / postsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  // Derive the posts to show on the current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = samplePosts.slice(indexOfFirstPost, indexOfLastPost);

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

  return (
    <div className={styles.blogPage}>
      {/* —— “Home” Link —— */}
      <div className={styles.breadcrumb}>
        <Link to="/" className={styles.homeLink}>
          Home
        </Link>
      </div>

      {/* —— Filter / Category Pills —— */}
      <div className={styles.filterSection}>
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
      </div>
      <div className={styles.mainContent}>
        {/* —— Main Content (Left: Posts + Pagination, Right: Sidebar) —— */}
        <div className={styles.content}>
          {/* === Left Column: Blog Posts & Pagination === */}
          <div className={styles.leftColumn}>
            {/* Blog Posts Grid */}
            <div className={styles.blogGrid}>
              {currentPosts.map((post) => (
                <div key={post.id} className={styles.blogCard}>
                  {post.title}
                </div>
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
                <li>
                  <a href="#">Post Title One</a>
                </li>
                <li>
                  <a href="#">Post Title Two</a>
                </li>
                <li>
                  <a href="#">Post Title Three</a>
                </li>
                <li>
                  <a href="#">Post Title Four</a>
                </li>
              </ul>
            </div>
            <div className={styles.sidebarSection}>
              <h3>Trending Blogs</h3>
              <ul className={styles.sidebarList}>
                <li>
                  <a href="#">Trending Topic One</a>
                </li>
                <li>
                  <a href="#">Trending Topic Two</a>
                </li>
                <li>
                  <a href="#">Trending Topic Three</a>
                </li>
                <li>
                  <a href="#">Trending Topic Four</a>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
