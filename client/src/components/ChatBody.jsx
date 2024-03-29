import  { useNavigate } from 'react-router-dom';

const ChatBody = ({messages, typingStatus, lastMessageRef}) => {
    const navigate = useNavigate();

    const handleLeaveChat = () => {
        localStorage.removeItem('userName');
        navigate('/landing')
        window.location.reload();
    };

    return (
        <div>
            <header className =  "chat__mainHeader ">
                <button className = "leaveChat__btn rounded" onClick = {handleLeaveChat}> Leave Chat </button>
            </header>

            {/* This shows messages sent from you */}
            <div className = "message__container">
                { messages.map(message => (
                message.name === localStorage.getItem('userName') ? (
                    <div className = "message__chats" key = {message.id}>
                        <p className = "sender__name"> You</p>
                        <div className = "message__sender">
                            <p>{message.text}</p>
                        </div>
                    </div>
                ) : (
                    // This shows messages received by you
                    <div className="message__chats">
                        <p className = "otherSender_name">{message.name}</p>
                        <div className="message__recipient">
                            <p>{message.text}</p>
                        </div>
                    </div>
                    )
                ))}
            
            {/* This is triggered when a user is typing */}
            <div className="message__status">
                <p>{typingStatus}</p>
            </div>
            <div ref={lastMessageRef} />
            </div>
        </div>
    )

}

export default ChatBody;