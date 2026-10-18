'use client';

import React, { useState } from 'react';
import { Mail, Copy, Check, Send, ArrowUp, Sparkles, AlertCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/SocialIcons';
import confetti from 'canvas-confetti';
import { profileData } from '@/data/portfolioData';
import { contactFormSchema } from '@/lib/validation';
import { TextScramble } from '@/components/ui/TextScramble';
import { TiltSpotlightCard } from '@/components/ui/TiltSpotlightCard';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website_url_hp: '', // Honeypot
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [serverMessage, setServerMessage] = useState('');

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profileData.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setServerMessage('');

    // Client-side Zod validation
    const result = contactFormSchema.safeParse({
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as string;
        fieldErrors[fieldName] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitSuccess(true);
        setServerMessage(data.message || 'Your inquiry was dispatched successfully!');
        setFormData({ name: '', email: '', subject: '', message: '', website_url_hp: '' });

        // Trigger celebratory confetti burst
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.8 },
            colors: ['#A7C7B5', '#D8B8A5', '#171717'],
          });
        } catch {
          // Ignore
        }
      } else {
        setServerMessage(data.message || 'Submission failed. Please email directly.');
      }
    } catch {
      setServerMessage('Network transmission error. Please email directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="contact"
      className="py-28 md:py-36 px-6 md:px-16 bg-[#F8F8F5] border-t border-[#E5E5E0] relative"
    >
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-[#E5E5E0] pb-6">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#777777] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#A7C7B5]" />
            <TextScramble text="06 / COMMUNICATION & NETWORKS" />
          </span>
          <span className="text-xs font-mono text-[#777777] uppercase tracking-wider">
            Let&apos;s Build Together
          </span>
        </div>

        {/* Big Editorial Invitation */}
        <div className="max-w-4xl space-y-4">
          <h2 className="clamp-headline-lg font-serif-editorial text-[#171717] tracking-tight">
            Have an idea worth building?
          </h2>
          <p className="text-xl md:text-2xl font-serif-editorial text-[#777777] italic">
            Let’s connect and turn it into something meaningful.
          </p>
        </div>

        {/* Dual Layout: Left Direct Channels, Right Validated Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Direct Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#777777] block">
                Primary Coordinates
              </span>

              {/* Email Card with 3D Spotlight and 1-Click Copy */}
              <TiltSpotlightCard
                spotlightColor="rgba(167, 199, 181, 0.25)"
                maxTilt={5}
                cursorText="EMAIL"
                className="rounded-2xl"
              >
                <div className="p-6 rounded-2xl bg-white border border-[#E5E5E0] shadow-sm space-y-3 group">
                  <div className="flex items-center justify-between text-xs font-mono text-[#777777]">
                    <span className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#A7C7B5]" />
                      Direct Email
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="flex items-center gap-1 text-[#171717] hover:text-[#A7C7B5] transition-colors focus:outline-none cursor-pointer"
                      aria-label="Copy email address"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600 font-medium">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <a
                    href={`mailto:${profileData.email}`}
                    className="text-lg md:text-xl font-medium text-[#171717] hover:underline block break-all font-sans"
                  >
                    {profileData.email}
                  </a>
                </div>
              </TiltSpotlightCard>

              {/* Verified Professional Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href={profileData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-2xl bg-white border border-[#E5E5E0] hover:border-[#171717] hover:shadow-md transition-all group flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <LinkedinIcon className="w-5 h-5 text-[#171717]" />
                    <div>
                      <span className="block text-xs font-mono text-[#777777] uppercase">
                        Network
                      </span>
                      <span className="text-sm font-semibold text-[#171717]">LinkedIn</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-[#777777] group-hover:translate-x-0.5 transition-transform">
                    &rarr;
                  </span>
                </a>

                <a
                  href={profileData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-2xl bg-white border border-[#E5E5E0] hover:border-[#171717] hover:shadow-md transition-all group flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <GithubIcon className="w-5 h-5 text-[#171717]" />
                    <div>
                      <span className="block text-xs font-mono text-[#777777] uppercase">
                        Repositories
                      </span>
                      <span className="text-sm font-semibold text-[#171717]">GitHub</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-[#777777] group-hover:translate-x-0.5 transition-transform">
                    &rarr;
                  </span>
                </a>
              </div>
            </div>

            {/* Academic Base Note */}
            <div className="p-6 rounded-2xl bg-white/70 border border-[#E5E5E0] space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#777777] block">
                Physical Location
              </span>
              <p className="text-sm text-[#171717] font-medium">{profileData.location}</p>
              <p className="text-xs text-[#777777]">
                Kalaignar Karunanidhi Institute of Technology (KIT) • ECE Department
              </p>
            </div>
          </div>

          {/* Validated Contact Form */}
          <div className="lg:col-span-7 p-8 md:p-10 rounded-3xl bg-white border border-[#E5E5E0] shadow-sm">
            <div className="mb-6 space-y-1">
              <h3 className="text-2xl font-serif-editorial text-[#171717]">
                Send a Direct Transmission
              </h3>
              <p className="text-xs font-sans text-[#777777]">
                Validated with strict schema constraints. All inquiries are securely processed.
              </p>
            </div>

            {submitSuccess ? (
              <div className="p-8 rounded-2xl bg-[#A7C7B5]/15 border border-[#A7C7B5]/40 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#A7C7B5] text-[#171717] flex items-center justify-center mx-auto">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-serif-editorial text-[#171717]">Transmission Received</h4>
                <p className="text-xs text-[#171717]/80 max-w-md mx-auto leading-relaxed">
                  {serverMessage}
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitSuccess(false)}
                  className="px-5 py-2 rounded-full bg-[#171717] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#2c2c2c] transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Honeypot field (hidden from real users, catches bots) */}
                <input
                  type="text"
                  name="website_url_hp"
                  value={formData.website_url_hp}
                  onChange={handleInputChange}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="block text-xs font-mono text-[#171717] uppercase tracking-wider">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Jane Doe"
                      className={`w-full px-4 py-3 rounded-xl bg-[#F8F8F5] border text-sm text-[#171717] placeholder:text-[#777777]/50 focus:outline-none focus:ring-2 focus:ring-[#171717] transition-all ${
                        errors.name ? 'border-red-500' : 'border-[#E5E5E0]'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-[11px] font-mono text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email field */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="block text-xs font-mono text-[#171717] uppercase tracking-wider">
                      Your Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="jane@company.com"
                      className={`w-full px-4 py-3 rounded-xl bg-[#F8F8F5] border text-sm text-[#171717] placeholder:text-[#777777]/50 focus:outline-none focus:ring-2 focus:ring-[#171717] transition-all ${
                        errors.email ? 'border-red-500' : 'border-[#E5E5E0]'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] font-mono text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject field */}
                <div className="space-y-1.5">
                  <label htmlFor="subject" className="block text-xs font-mono text-[#171717] uppercase tracking-wider">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Project Collaboration / Academic Inquiry"
                    className={`w-full px-4 py-3 rounded-xl bg-[#F8F8F5] border text-sm text-[#171717] placeholder:text-[#777777]/50 focus:outline-none focus:ring-2 focus:ring-[#171717] transition-all ${
                      errors.subject ? 'border-red-500' : 'border-[#E5E5E0]'
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-[11px] font-mono text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message field */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="block text-xs font-mono text-[#171717] uppercase tracking-wider">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Briefly describe your idea, query, or technical proposition..."
                    className={`w-full px-4 py-3 rounded-xl bg-[#F8F8F5] border text-sm text-[#171717] placeholder:text-[#777777]/50 focus:outline-none focus:ring-2 focus:ring-[#171717] transition-all resize-none ${
                      errors.message ? 'border-red-500' : 'border-[#E5E5E0]'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-[11px] font-mono text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Server Error Message if any */}
                {serverMessage && !submitSuccess && (
                  <p className="text-xs font-mono text-red-600 p-3 rounded-lg bg-red-50 border border-red-200">
                    {serverMessage}
                  </p>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-[#171717] hover:bg-[#2c2c2c] text-[#F8F8F5] font-medium text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-2 transition-colors disabled:opacity-50 cursor-pointer shadow-sm"
                >
                  {isSubmitting ? (
                    <span>Transmitting...</span>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send className="w-3.5 h-3.5 text-[#A7C7B5]" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer & Back to Top */}
        <div className="pt-16 border-t border-[#E5E5E0] flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono text-[#777777]">
          <div>
            <span className="text-[#171717] font-semibold">{profileData.name}</span>
            <span className="mx-2">•</span>
            <span>ECE Class of 2029</span>
            <span className="mx-2">•</span>
            <span>Kalaignar Karunanidhi Institute of Technology</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-[#171717] hover:text-[#A7C7B5] transition-colors focus:outline-none"
              aria-label="Scroll back to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
