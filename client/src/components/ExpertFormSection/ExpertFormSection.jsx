// src/components/ExpertFormSection/ExpertFormSection.jsx
import { useState } from 'react';
import axios from 'axios';
import styles from './ExpertFormSection.module.scss';

export default function ExpertFormSection() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [statusMsg, setStatusMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMsg('');
    setIsSubmitting(true);

    try {
      await axios.post('http://localhost:9999/api/expert-form/create', {
        email,
        message,
      });
      setStatusMsg('Thank you! Your submission has been received.');
      setEmail('');
      setMessage('');
    } catch (err) {
      console.error(err);
      setStatusMsg('Oops! Something went wrong. Please try again.');
    }

    setIsSubmitting(false);
  };

  return (
    <section className={styles.wrapper}>
      {/* Left Illustration (optional) */}
      <div className={styles.illustrationLeft}>
        {/* If you have an SVG or image, you can replace the placeholder below */}
        <img
          src="/images/momandchild.jpg"
          alt="Hand Holding Note"
          className={styles.imgLeft}
        />
      </div>

      {/* Center Content (heading + form) */}
      <div className={styles.content}>
        <h2 className={styles.heading}>
          Have some thought in mind?<br />
          Let Us Know!
        </h2>


        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.field}>
            <span className={styles.label}>Email</span>
            <input
              type="email"
              className={styles.input}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Your Message</span>
            <textarea
              className={styles.textarea}
              placeholder="Share your thoughts…"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </label>

          <button
            type="submit"
            className={styles.button}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting…' : 'Submit'}
          </button>

          {statusMsg && <p className={styles.status}>{statusMsg}</p>}
        </form>

        {/* <p className={styles.linkText}>
          Click&nbsp;
          <a href="#reviews" className={styles.link}>
            here
          </a>
          &nbsp;to see what coffee lovers are saying about Your Dream Coffee!
        </p> */}
      </div>

      {/* Right Illustration (optional) */}
      <div className={styles.illustrationRight}>
        <img
          src="/images/milk2.jpg"
          alt="Coffee Cup with Heart"
          className={styles.imgRight}
        />
      </div>
    </section>
  );
}
