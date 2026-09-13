import { useState } from 'react';
import { submitContact } from '../services/api.js';
import { profile } from '../data/portfolioData.js';
import './Contact.css';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialForm = { name: '', email: '', subject: '', message: '' };

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Name is required.';
  if (!form.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_REGEX.test(form.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!form.subject.trim()) errors.subject = 'Subject is required.';
  if (!form.message.trim()) errors.message = 'Message is required.';
  return errors;
}

function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // never reload the page

    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setStatus('loading');
    setStatusMessage('');

    try {
      await submitContact(form);
      setStatus('success');
      setStatusMessage("Thanks for reaching out! I'll get back to you soon.");
      setForm(initialForm);
    } catch (error) {
      setStatus('error');
      setStatusMessage(
        error?.message || 'Something went wrong while sending your message. Please try again.'
      );
    }
  };

  return (
    <section id="contact" className="section section-alt" aria-labelledby="contact-heading">
      <div className="container">
        <div className="section-header">
          <p className="section-eyebrow">Let&apos;s connect</p>
          <h2 id="contact-heading" className="section-title">
            Contact Me
          </h2>
          <p className="section-subtitle">
            Have a question or want to collaborate? Send a message, or reach me directly at{' '}
            <a href={`mailto:${profile.email}`}>{profile.email}</a>.
          </p>
        </div>

        <form className="contact-form card" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              className={errors.name ? 'form-error-input' : ''}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <span id="name-error" className="form-error-text" role="alert">
                {errors.name}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className={errors.email ? 'form-error-input' : ''}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <span id="email-error" className="form-error-text" role="alert">
                {errors.email}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              id="subject"
              name="subject"
              type="text"
              value={form.subject}
              onChange={handleChange}
              className={errors.subject ? 'form-error-input' : ''}
              aria-invalid={Boolean(errors.subject)}
              aria-describedby={errors.subject ? 'subject-error' : undefined}
            />
            {errors.subject && (
              <span id="subject-error" className="form-error-text" role="alert">
                {errors.subject}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              className={errors.message ? 'form-error-input' : ''}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'message-error' : undefined}
            />
            {errors.message && (
              <span id="message-error" className="form-error-text" role="alert">
                {errors.message}
              </span>
            )}
          </div>

          {status === 'success' && (
            <p className="form-status form-status-success" role="status">
              {statusMessage}
            </p>
          )}
          {status === 'error' && (
            <p className="form-status form-status-error" role="alert">
              {statusMessage}
            </p>
          )}

          <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>
            {status === 'loading' ? 'Sending…' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
