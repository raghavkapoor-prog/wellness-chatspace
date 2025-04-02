
import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ChatWindow from './ChatWindow';

const ChatButton = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };
  
  return (
    <>
      <Button
        onClick={toggleChat}
        variant="default"
        size="icon"
        className="fixed bottom-4 right-4 z-50 rounded-full h-12 w-12 shadow-lg bg-primary hover:bg-primary/90 transition-all"
        aria-label="Open fitness assistant"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
      
      <ChatWindow isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
};

export default ChatButton;
