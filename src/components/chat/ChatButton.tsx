
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
        variant="outline"
        size="icon"
        className="rounded-full h-10 w-10 bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-all"
        aria-label="Open chat assistant"
      >
        <MessageCircle className="h-5 w-5" />
      </Button>
      
      <ChatWindow isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
};

export default ChatButton;
