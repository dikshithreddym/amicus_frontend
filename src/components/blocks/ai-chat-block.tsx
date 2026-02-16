'use client';

import { useState } from 'react';
import type { Block } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, Send } from 'lucide-react';

interface AiChatBlockProps {
  block: Block;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export function AiChatBlock({ block }: AiChatBlockProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };
    setMessages([...messages, newMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'This is a simulated AI response. Connect to backend API for actual responses.',
        },
      ]);
    }, 1000);
  };

  return (
    <div className="p-4 flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">AI Assistant</h3>
      </div>

      <div className="flex-1 overflow-auto space-y-3 mb-4">
        {messages.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Start a conversation with the AI assistant
          </p>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`p-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground ml-8'
                  : 'bg-muted mr-8'
              }`}
            >
              <p className="text-sm">{message.content}</p>
            </div>
          ))
        )}
      </div>

      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask a question..."
        />
        <Button onClick={handleSend} size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
