import {useEffect, useState} from "react";

export default function ChatMessages({messages, receiver, sender, update, setUpdate, messagesEndRef}) {

    const [allMessages, setAllMessages] = useState(messages);
    const [count, setCount] = useState(messages.length)

    useEffect(() => {
        Echo.private(`messenger.${receiver.id}.${parseInt(sender.id)}`)
            .listen('MessageSent', (e) => {
                if (count === allMessages.length) {
                    setAllMessages((prevData) => [...prevData, e.message]); // append new data to existing data
                }
            });
    }, [count])

    return (
        <>
            {allMessages.map((item, index) =>
                <div key={index}
                     className={`receive-chat relative flex ${parseInt(sender.id) === parseInt(item.sender_id) ? 'justify-start' : 'justify-end'}`}>
                    <div
                        className={`mb-2 max-w-[80%] rounded px-5 py-2 text-sm text-white  ${parseInt(sender.id) === parseInt(item.sender_id) ? 'bg-violet-400' : 'bg-violet-200'}`}>
                        <i className="fa fa-caret-up absolute -top-2 text-violet-400"></i>
                        <p>{item.message}</p>
                    </div>
                </div>
            )}
        </>
    )
}
