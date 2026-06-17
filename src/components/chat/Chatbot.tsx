'use client';

import { useChat } from 'ai/react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, User, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useEffect, useRef } from 'react';

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Chatbot({ isOpen, onClose }: ChatbotProps) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />

          {/* Chat Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed z-[101] inset-4 md:inset-auto md:bottom-6 md:right-6 md:w-[450px] md:h-[600px] flex flex-col rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,245,255,0.2)] border border-neon-cyan/30"
          >
            {/* Background Images */}
            <div 
              className="absolute inset-0 z-0 bg-cover bg-center"
              style={{ backgroundImage: 'url(/bg/neon-3d-cybermonday-celebration-template.jpg)' }}
            />
            
            {/* Dark Overlay for readability without blurring the image */}
            <div className="absolute inset-0 z-0 bg-black/85 md:bg-black/80" />

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/40 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-neon-cyan/20 flex items-center justify-center border border-neon-cyan/50">
                  <Bot className="w-5 h-5 text-neon-cyan" />
                </div>
                <div>
                  <h3 className="font-orbitron font-bold text-text-primary tracking-wide text-sm">KAVYA_AI</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] text-text-primary/60 uppercase tracking-wider">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors text-text-primary/70 hover:text-text-primary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="relative z-10 flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-3 opacity-70">
                  <Bot className="w-12 h-12 text-neon-cyan mb-2 opacity-50" />
                  <p className="font-orbitron text-sm tracking-wide text-text-primary">
                    INITIALIZING CONNECTION...
                  </p>
                  <p className="text-xs text-text-primary/70 max-w-[250px]">
                    Ask me anything about Kavya&apos;s projects, skills, or experience.
                  </p>
                </div>
              )}

              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex items-start gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
                    m.role === 'user' 
                      ? 'bg-purple-500/20 border-purple-500/50' 
                      : 'bg-neon-cyan/20 border-neon-cyan/50'
                  }`}>
                    {m.role === 'user' ? <User className="w-4 h-4 text-purple-400" /> : <Bot className="w-4 h-4 text-neon-cyan" />}
                  </div>
                  
                  <div className={`px-4 py-3 rounded-2xl max-w-[85%] text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-purple-500/20 text-text-primary border border-purple-500/30 rounded-tr-sm'
                      : 'bg-black/60 backdrop-blur-md text-text-primary/90 border border-white/10 rounded-tl-sm'
                  }`}>
                    {m.role === 'user' ? (
                      <p>{m.content}</p>
                    ) : (
                      <div className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10 prose-ul:list-disc prose-ul:pl-4 prose-li:my-1 prose-h3:font-orbitron prose-h3:text-neon-cyan prose-h3:text-lg prose-h3:mt-5 prose-h3:mb-2 prose-h2:font-orbitron prose-h2:text-neon-cyan prose-h2:text-xl prose-h2:mt-6 prose-h2:mb-3 prose-strong:text-white prose-strong:font-bold text-text-primary/90">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {m.content}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-neon-cyan/20 flex items-center justify-center border border-neon-cyan/50 shrink-0">
                    <Bot className="w-4 h-4 text-neon-cyan" />
                  </div>
                  <div className="px-4 py-2.5 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 rounded-tl-sm flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-neon-cyan" />
                    <span className="text-xs text-text-primary/60">Processing...</span>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="relative z-10 p-3 bg-black/60 backdrop-blur-xl border-t border-white/10">
              <form onSubmit={handleSubmit} className="flex items-center gap-2 relative">
                <input
                  type="text"
                  value={input || ''}
                  onChange={handleInputChange}
                  placeholder="Ask a question..."
                  disabled={isLoading}
                  autoFocus
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-primary/40 focus:outline-none focus:border-neon-cyan/50 focus:bg-white/10 transition-all disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input?.trim()}
                  className="w-11 h-11 flex items-center justify-center rounded-xl bg-neon-cyan/20 text-neon-cyan hover:bg-neon-cyan hover:text-black border border-neon-cyan/50 transition-all disabled:opacity-50 disabled:hover:bg-neon-cyan/20 disabled:hover:text-neon-cyan"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
