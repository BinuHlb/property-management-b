'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Minimize2, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

const BOT_RESPONSES: { [key: string]: string } = {
  greeting: "Hello! I'm here to help you with property inquiries, rental information, and general questions. How can I assist you today?",
  properties: "We have a wide selection of properties available for rent. You can browse by location, price range, property type, and more. Would you like me to help you find a specific type of property?",
  pricing: "Our rental prices vary based on location, property type, and amenities. Properties typically range from $1,000 to $10,000+ per month. Would you like to see properties in a specific price range?",
  location: "We have properties in multiple prime locations. You can filter by city, neighborhood, or use our map view to explore available properties. What area are you interested in?",
  contact: "You can reach our team by phone, email, or through this chat. For urgent matters, please call our 24/7 hotline. Would you like contact information for a specific agent?",
  viewing: "Property viewings can be scheduled through our website or by contacting an agent. Many properties also offer virtual tours. Would you like help scheduling a viewing?",
  application: "To apply for a property, you'll need to complete our online application form and provide necessary documents. I can guide you through the process or connect you with an agent.",
  default: "I understand you're looking for information. Let me help you with that. Could you provide a bit more detail about what you're looking for? I can assist with property searches, pricing, locations, viewings, applications, and general inquiries.",
};

const getBotResponse = (userMessage: string): string => {
  const lowerMessage = userMessage.toLowerCase();
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return BOT_RESPONSES.greeting;
  }
  if (lowerMessage.includes('property') || lowerMessage.includes('apartment') || lowerMessage.includes('house') || lowerMessage.includes('rent')) {
    return BOT_RESPONSES.properties;
  }
  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('expensive') || lowerMessage.includes('affordable')) {
    return BOT_RESPONSES.pricing;
  }
  if (lowerMessage.includes('location') || lowerMessage.includes('area') || lowerMessage.includes('city') || lowerMessage.includes('where')) {
    return BOT_RESPONSES.location;
  }
  if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('email') || lowerMessage.includes('reach')) {
    return BOT_RESPONSES.contact;
  }
  if (lowerMessage.includes('viewing') || lowerMessage.includes('tour') || lowerMessage.includes('visit') || lowerMessage.includes('see')) {
    return BOT_RESPONSES.viewing;
  }
  if (lowerMessage.includes('apply') || lowerMessage.includes('application') || lowerMessage.includes('document')) {
    return BOT_RESPONSES.application;
  }
  
  return BOT_RESPONSES.default;
};

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI assistant. I can help you with property searches, rental information, pricing, and more. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    await new Promise((resolve) => setTimeout(resolve, 800));

    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: getBotResponse(userMessage.text),
      sender: 'bot',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botResponse]);
    setIsTyping(false);
  };

  const quickActions = [
    { text: 'Show me properties', query: 'Show me available properties' },
    { text: 'Price range', query: 'What are the price ranges?' },
    { text: 'Schedule viewing', query: 'How do I schedule a viewing?' },
    { text: 'Contact agent', query: 'How can I contact an agent?' },
  ];

  const handleQuickAction = (query: string) => {
    setInputValue(query);
    setTimeout(() => {
      const form = document.querySelector('form');
      if (form) {
        const event = new Event('submit', { bubbles: true, cancelable: true });
        form.dispatchEvent(event);
      }
    }, 100);
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0, rotate: -180 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0, rotate: 180 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-[9999] w-16 h-16 rounded-full bg-momentum-ocean-blue text-white shadow-xl hover:bg-momentum-ocean-blue/90 transition-all group hover:scale-110 relative overflow-hidden flex items-center justify-center"
            aria-label="Open chat"
            style={{ position: 'fixed' }}
          >
            {/* Decorative geometric shapes */}
            <div className="absolute top-1 right-1 w-3 h-3 bg-momentum-crayola-yellow rounded-sm rotate-45 opacity-80"></div>
            <div className="absolute bottom-1 left-1 w-2 h-2 bg-momentum-diamond-blue rounded-full opacity-80"></div>
            <Bot className="w-7 h-7 relative z-10" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-momentum-powder-pink rounded-full animate-pulse shadow-md"></span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`fixed bottom-6 right-6 z-[9999] ${
              isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
            } transition-all duration-300`}
            style={{ position: 'fixed' }}
          >
            <Card className="w-full h-full flex flex-col border border-momentum-pale-violet/30 shadow-2xl bg-white rounded-momentum overflow-hidden relative">
              {/* Decorative geometric shapes in background */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-momentum-powder-pink/20 rounded-full blur-sm"></div>
              <div className="absolute bottom-20 left-4 w-6 h-6 bg-momentum-crayola-yellow/20 rounded-sm rotate-45 blur-sm"></div>
              <div className="absolute top-1/2 right-8 w-4 h-4 bg-momentum-diamond-blue/30 rounded-full blur-sm"></div>
              
              {/* Header */}
              <div className="bg-momentum-ocean-blue p-4 flex items-center justify-between relative overflow-hidden">
                {/* Decorative shapes in header */}
                <div className="absolute top-2 right-2 w-12 h-12 bg-momentum-powder-pink/10 rounded-full blur-md"></div>
                <div className="absolute bottom-2 left-2 w-8 h-8 bg-momentum-crayola-yellow/10 rounded-full blur-md"></div>
                
                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-momentum-pale-violet flex items-center justify-center shadow-md border-2 border-white/30">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm">AI Assistant</h3>
                    <p className="text-momentum-diamond-blue text-xs font-medium">24/7 Customer Support</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 relative z-10">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="h-8 w-8 text-white hover:bg-white/20 rounded-full"
                  >
                    {isMinimized ? (
                      <Maximize2 className="w-4 h-4" />
                    ) : (
                      <Minimize2 className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="h-8 w-8 text-white hover:bg-white/20 rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {!isMinimized && (
                <>
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-background/30 to-white relative">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex gap-3 ${
                          message.sender === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        {message.sender === 'bot' && (
                          <div className="w-8 h-8 rounded-full bg-momentum-pale-violet flex items-center justify-center flex-shrink-0 shadow-sm border border-momentum-pale-violet/50">
                            <Bot className="w-4 h-4 text-white" />
                          </div>
                        )}
                        <div
                          className={`max-w-[75%] rounded-momentum px-4 py-2.5 shadow-sm ${
                            message.sender === 'user'
                              ? 'bg-momentum-ocean-blue text-white'
                              : 'bg-white border-2 border-momentum-pale-violet/40 text-foreground'
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{message.text}</p>
                          <span className="text-xs opacity-70 mt-1 block">
                            {message.timestamp.toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                        {message.sender === 'user' && (
                          <div className="w-8 h-8 rounded-full bg-momentum-ocean-blue flex items-center justify-center flex-shrink-0 shadow-sm border border-momentum-ocean-blue/50">
                            <User className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </motion.div>
                    ))}
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex gap-3 justify-start"
                      >
                        <div className="w-8 h-8 rounded-full bg-momentum-pale-violet flex items-center justify-center">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-white border-2 border-momentum-pale-violet/40 rounded-momentum rounded-tl-none px-4 py-3 shadow-sm">
                          <div className="flex gap-1.5">
                            <span className="w-2.5 h-2.5 bg-momentum-ocean-blue rounded-full animate-bounce"></span>
                            <span className="w-2.5 h-2.5 bg-momentum-powder-pink rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                            <span className="w-2.5 h-2.5 bg-momentum-crayola-yellow rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Quick Actions */}
                  {messages.length === 1 && (
                    <div className="px-4 pb-3 border-t border-momentum-pale-violet/30 bg-gradient-to-b from-white to-momentum-pale-violet/5">
                      <p className="text-xs font-medium text-momentum-ocean-blue mb-2.5 px-2 uppercase tracking-wider">Quick actions:</p>
                      <div className="flex flex-wrap gap-2">
                        {quickActions.map((action, index) => {
                          const colors = [
                            'bg-momentum-pale-violet/20 text-momentum-ocean-blue border-momentum-pale-violet/40 hover:bg-momentum-pale-violet/30',
                            'bg-momentum-powder-pink/20 text-momentum-ocean-blue border-momentum-powder-pink/40 hover:bg-momentum-powder-pink/30',
                            'bg-momentum-crayola-yellow/30 text-momentum-ocean-blue border-momentum-crayola-yellow/50 hover:bg-momentum-crayola-yellow/40',
                            'bg-momentum-diamond-blue/20 text-momentum-ocean-blue border-momentum-diamond-blue/40 hover:bg-momentum-diamond-blue/30',
                          ];
                          return (
                            <button
                              key={action.text}
                              onClick={() => handleQuickAction(action.query)}
                              className={`px-3.5 py-2 text-xs font-medium rounded-full transition-all shadow-sm hover:shadow-md ${colors[index % colors.length]}`}
                            >
                              {action.text}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Input */}
                  <form onSubmit={handleSendMessage} className="p-4 border-t border-momentum-pale-violet/30 bg-white relative">
                    {/* Decorative shape */}
                    <div className="absolute top-0 left-1/4 w-2 h-2 bg-momentum-powder-pink/30 rounded-full blur-sm"></div>
                    <div className="flex gap-2">
                      <Input
                        ref={inputRef}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 border-momentum-pale-violet/30 focus:border-momentum-ocean-blue focus:ring-2 focus:ring-momentum-ocean-blue/20 rounded-momentum"
                        disabled={isTyping}
                      />
                      <Button
                        type="submit"
                        disabled={!inputValue.trim() || isTyping}
                        className="bg-momentum-ocean-blue text-white hover:bg-momentum-ocean-blue/90 px-4 rounded-momentum shadow-md hover:shadow-lg transition-all"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </form>
                </>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
