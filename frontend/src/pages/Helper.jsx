import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';

// IMPORT CSS
import '../styling/helper.css';

// IMPORT ICON
import { ChatIcon, CloseIcon, RobotIcon, SendIcon } from '../components/icons/ChatIcons';

function Helper() {
    const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    
    const [validModel, setValidModel] = useState(null);
    
    const [messages, setMessages] = useState([
        { role: 'model', text: "Hi! I'm Tearista AI. Ask me anything about fruits!" }
    ]);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // 1. AUTO-DETECT
    useEffect(() => {
        const checkKeyAndGetModel = async () => {
            if (!API_KEY) {
                setMessages(prev => [...prev, { role: 'model', text: 'API KEY Not found' }]);
                return;
            }

            try {
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
                const data = await response.json();

                if (!response.ok || !data.models) {
                    toast.error('API Key Error');
                    return;
                }

                const aiModel = data.models.find(model => 
                    model.supportedGenerationMethods?.includes('generateContent') &&
                    (model.name.includes('flash') || model.name.includes('pro'))
                );

                if (aiModel) {
                    setValidModel(aiModel.name);
                }
            } catch (error) {
                console.error('Connection Error:', error);
            }
        };

        checkKeyAndGetModel();
    }, [API_KEY]);

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        
        if (!validModel) {
            toast.error('Connecting to AI...');
            return;
        }

        const userMessage = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        const currentInput = input;
        setInput('');
        setLoading(true);

        try {
            const url = `https://generativelanguage.googleapis.com/v1beta/${validModel}:generateContent?key=${API_KEY}`;
            
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: currentInput }] }]
                })
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.error?.message || 'Error');

            const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text;
            
            if (aiText) {
                setMessages(prev => [...prev, { role: 'model', text: aiText }]);
            } else {
                throw new Error('AI Not Responded.');
            }

        } catch (error) {
            setMessages(prev => [...prev, { role: 'model', text: `⚠️ Error: ${error.message}` }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='helper-widget-container'>
            <button 
                className={`helper-toggle-btn ${isOpen ? 'open' : ''}`} 
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <CloseIcon /> : <ChatIcon />}
            </button>

            <div className={`helper-modal ${isOpen ? 'show' : ''}`}>
                <div className='helper-header'>
                    <div className='helper-header-title'>
                        <RobotIcon />
                        <span>Tearista Assistant</span>
                    </div>
                    <button onClick={() => setIsOpen(false)} className='helper-close-btn'>
                        <CloseIcon />
                    </button>
                </div>

                <div className='helper-body'>
                    {messages.map((msg, index) => (
                        <div key={index} className={`helper-msg ${msg.role === 'user' ? 'user' : 'ai'}`}>
                            <div className='helper-bubble'>
                                <ReactMarkdown>{msg.text}</ReactMarkdown>
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className='helper-msg ai'>
                            <div className='helper-bubble typing'>Thinking...</div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSend} className='helper-footer'>
                    <input
                        type='text'
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={validModel ? 'Type a message...' : 'Connecting...'}
                        disabled={loading || !validModel}
                    />
                    <button type='submit' disabled={!input.trim() || loading || !validModel}>
                        <SendIcon />
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Helper;