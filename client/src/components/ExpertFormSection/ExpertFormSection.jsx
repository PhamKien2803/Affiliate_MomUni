// src/components/ExpertFormSection/ExpertFormSection.jsx
import { useState } from 'react';
import styles from './ExpertFormSection.module.scss';
import axiosInstance from "../../helper/axiosInstance";

export default function ExpertFormSection() {
  // 1. Bổ sung các state còn thiếu để khớp với API
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [topic, setTopic] = useState('');
  const [question, setQuestion] = useState('');

  const [statusMsg, setStatusMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMsg('');
    setIsSubmitting(true);

    try {
      await axiosInstance.post('/expert-form/create', {
        name,
        email,
        phone,
        question,
        topic,
      });

      setStatusMsg('Cảm ơn bạn! Câu hỏi của bạn đã được gửi thành công.');
      setName('');
      setEmail('');
      setPhone('');
      setTopic('');
      setQuestion('');

    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.message || 'Oops! Đã có lỗi xảy ra. Vui lòng thử lại.';
      setStatusMsg(errorMessage);
    }

    setIsSubmitting(false);
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.illustrationLeft}>
        <img
          src="/images/momandchild.jpg"
          alt="Hand Holding Note"
          className={styles.imgLeft}
        />
      </div>

      <div className={styles.content}>
        <h2 className={styles.heading}>
          Có câu hỏi cho chuyên gia?<br />
          Hãy cho chúng tôi biết!
        </h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.field}>
            <span className={styles.label}>Tên của bạn</span>
            <input
              type="text"
              className={styles.input}
              placeholder="Nguyễn Văn A"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

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
            <span className={styles.label}>Số điện thoại</span>
            <input
              type="tel"
              className={styles.input}
              placeholder="0123 456 789"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Chủ đề câu hỏi</span>
            <select
              className={styles.input}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
            >
              <option value="">-- Chọn một chủ đề --</option>
              <option value="Dinh dưỡng">Dinh dưỡng</option>
              <option value="Sức khỏe">Sức khỏe</option>
              <option value="Phát triển của bé">Phát triển của bé</option>
              <option value="Tâm lý">Tâm lý</option>
              <option value="Chủ đề khác">Chủ đề khác</option>
            </select>
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Câu hỏi của bạn</span>
            <textarea
              className={styles.textarea}
              placeholder="Nhập nội dung câu hỏi của bạn tại đây..."
              rows={4}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
          </label>

          <button
            type="submit"
            className={styles.button}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Đang gửi…' : 'Gửi câu hỏi'}
          </button>

          {statusMsg && <p className={styles.status}>{statusMsg}</p>}
        </form>
      </div>

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