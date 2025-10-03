import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

export default function ChatBot() {
  useEffect(() => {
    try {
      createChat({
        webhookUrl: 'https://prince5252.app.n8n.cloud/webhook/13e126da-a9f8-468b-b2f1-e8347f511182/chat',
        initialMessages: [
          "I'm Prince, your AI assistant. I can help you with web development, MERN stack projects, AI/ML, or any technical questions you have. Ask me anything, and I'll provide clear, detailed answers with examples if needed."
        ],
        i18n: {
          en: {
            title: 'Chat with Prince',
            subtitle: 'AI Assistant for Web Development',
            footer: '',
            getStarted: 'Get Started',
            inputPlaceholder: 'Type your message...',
            closeButtonTooltip: 'Close chat'
          }
        },
        theme: {
          chatWindow: {
            width: '380px',
            height: '500px',
            backgroundColor: 'hsl(240, 10%, 3.9%)',
            borderColor: 'hsl(45, 100%, 65%)',
            borderWidth: '1px',
            borderRadius: '12px',
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: '9999',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3), 0 0 20px hsla(45, 100%, 65%, 0.2)'
          },
          header: {
            backgroundColor: 'hsl(240, 10%, 3.9%)',
            color: 'hsl(0, 0%, 98%)',
            borderColor: 'hsl(45, 100%, 65%)'
          },
          input: {
            backgroundColor: 'hsl(240, 3.7%, 15.9%)',
            color: 'hsl(0, 0%, 98%)',
            borderColor: 'hsl(45, 100%, 65%)'
          },
          launcher: {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: '9998',
            backgroundColor: 'hsl(45, 100%, 65%)',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2), 0 0 10px hsla(45, 100%, 65%, 0.3)'
          }
        }
      });
    } catch (error) {
      console.warn('ChatBot failed to initialize:', error);
    }
  }, []);

  return null;
}