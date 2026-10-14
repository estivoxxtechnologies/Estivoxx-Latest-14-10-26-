import { useState, type ChangeEvent, type FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { EMAILJS, PROJECT_TYPES, SITE } from '../config/site';

interface FormData { fullName: string; email: string; company: string; phone: string; projectType: string; message: string }
type Errors = Partial<Record<keyof FormData, string>>;

const initial: FormData = { fullName: '', email: '', company: '', phone: '', projectType: PROJECT_TYPES[0], message: '' };

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((d) => ({ ...d, [name]: value }));
    if (errors[name as keyof FormData]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const validate = () => {
    const er: Errors = {};
    if (!formData.fullName.trim()) er.fullName = 'Please enter your name.';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email.trim())) er.email = 'Please enter a valid email.';
    if (formData.phone.trim() && !/^[+\d][\d\s()-]{5,}$/.test(formData.phone.trim())) er.phone = 'Please enter a valid phone number.';
    if (formData.message.trim().length < 10) er.message = 'Please describe your project (at least 10 characters).';
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting || !validate()) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      await emailjs.send(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        {
          full_name: formData.fullName.trim(),
          email: formData.email.trim(),
          company: formData.company.trim() || 'Not Provided',
          phone: formData.phone.trim() || 'Not Provided',
          project_type: formData.projectType,
          message: formData.message.trim(),
          date: new Date().toLocaleString(),
        },
        EMAILJS.publicKey,
      );
      setIsSubmitted(true);
      setFormData(initial);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitError('Unable to send your inquiry right now. Please try again or contact us directly at ' + SITE.email + '.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="form-card success" role="status" aria-live="polite">
        <h3>Thank you. Your inquiry has been sent.</h3>
        <p>Our team will get back to you soon.</p>
        <button className="btn" type="button" onClick={() => setIsSubmitted(false)}>SEND ANOTHER</button>
      </div>
    );
  }

  const field = (k: keyof FormData) => ({ id: k, name: k, value: formData[k], onChange, 'aria-invalid': errors[k] ? true : undefined, 'aria-describedby': errors[k] ? `${k}-err` : undefined });
  const err = (k: keyof FormData) => errors[k] && <span className="err" id={`${k}-err`}>{errors[k]}</span>;

  return (
    <form className="form-card" onSubmit={handleSubmit} noValidate>
      <div className="row">
        <div><label htmlFor="fullName">Name</label><input {...field('fullName')} autoComplete="name" required />{err('fullName')}</div>
        <div><label htmlFor="email">Business email</label><input {...field('email')} type="email" autoComplete="email" required />{err('email')}</div>
      </div>
      <div className="row">
        <div><label htmlFor="company">Company</label><input {...field('company')} autoComplete="organization" /></div>
        <div><label htmlFor="phone">Phone (optional)</label><input {...field('phone')} type="tel" autoComplete="tel" />{err('phone')}</div>
      </div>
      <div><label htmlFor="projectType">Project type</label>
        <select {...field('projectType')}>{PROJECT_TYPES.map((t) => <option key={t}>{t}</option>)}</select></div>
      <div><label htmlFor="message">Project description</label><textarea {...field('message')} rows={3} required />{err('message')}</div>
      <button className="btn pri" type="submit" disabled={isSubmitting}>{isSubmitting ? 'SENDING…' : 'START A PROJECT'}</button>
      {submitError && <p className="err" role="alert">{submitError}</p>}
    </form>
  );
}
