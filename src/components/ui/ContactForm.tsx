'use client';

import { useState } from 'react';
import GlassCard from './GlassCard';
import NeonButton from './NeonButton';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Internship Opportunity',
    message: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      // Construct mailto link with form data
      const subject = encodeURIComponent(formData.subject);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
      );
      const mailto = `mailto:kavya.jain2024@nst.rishihood.edu.in?subject=${subject}&body=${body}`;

      // Open mail client
      window.open(mailto, '_blank');

      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        setFormData({ name: '', email: '', subject: 'Internship Opportunity', message: '' });
      }, 3000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const inputClasses =
    'w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-text-primary font-inter placeholder:text-text-primary/30 focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/20 transition-all';

  return (
    <GlassCard className="p-6 md:p-8 max-w-lg w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            required
            placeholder="Your Name"
            className={`${inputClasses} font-orbitron text-xs`}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <input
            type="email"
            required
            placeholder="your@email.com"
            className={inputClasses}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div>
          <select
            className={`${inputClasses} font-orbitron text-xs`}
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          >
            <option value="Internship Opportunity">Internship Opportunity</option>
            <option value="Collaboration">Collaboration</option>
            <option value="Freelance Project">Freelance Project</option>
            <option value="Just Saying Hi">Just Saying Hi</option>
          </select>
        </div>
        <div>
          <textarea
            rows={5}
            required
            placeholder="Describe your vision..."
            className={`${inputClasses} resize-none`}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />
        </div>
        <NeonButton
          type="submit"
          variant={status === 'error' ? 'orange' : 'cyan'}
          disabled={status === 'sending'}
          className={`w-full justify-center ${
            status === 'error' ? 'animate-[shake_0.5s_ease-in-out]' : ''
          }`}
        >
          {status === 'idle' && (
            <>
              <Send size={14} /> SEND MESSAGE →
            </>
          )}
          {status === 'sending' && 'TRANSMITTING...'}
          {status === 'success' && (
            <>
              <CheckCircle size={14} /> MESSAGE RECEIVED ✓
            </>
          )}
          {status === 'error' && (
            <>
              <AlertCircle size={14} /> RETRY ↺
            </>
          )}
        </NeonButton>
      </form>
    </GlassCard>
  );
}
