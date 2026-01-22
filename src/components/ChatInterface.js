import { useState, useRef, useEffect } from 'react';
import styles from './ChatInterface.module.css';

export default function ChatInterface({ activeArticle, onClose }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (activeArticle) {
            setMessages([{
                role: 'system',
                content: `I'm ready to discuss "${activeArticle.title}". What would you like to know?`
            }]);
        }
    }, [activeArticle]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setLoading(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMsg,
                    context: activeArticle ? JSON.stringify(activeArticle) : null
                })
            });
            const data = await res.json();
            setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'system', content: "Sorry, I encountered an error." }]);
        } finally {
            setLoading(false);
        }
    };

    if (!activeArticle && messages.length === 0) return null;

    return (
        <div className={`${styles.container} glass`}>
            <div className={styles.header}>
                <h3>AI Chat</h3>
                <button onClick={onClose} className={styles.closeBtn}>×</button>
            </div>

            {activeArticle && (
                <div className={styles.contextBar}>
                    Discussing: <span>{activeArticle.title}</span>
                </div>
            )}

            <div className={styles.messages}>
                {messages.map((msg, idx) => (
                    <div key={idx} className={`${styles.message} ${styles[msg.role]}`}>
                        {msg.content}
                    </div>
                ))}
                {loading && <div className={styles.loading}>Thinking...</div>}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className={styles.inputForm}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask a question..."
                    className={styles.input}
                />
                <button type="submit" disabled={loading} className={styles.sendBtn}>
                    Send
                </button>
            </form>
        </div>
    );
}
