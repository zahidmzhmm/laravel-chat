import {useEffect, useState} from "react";

export default function ChatMessages({messages, receiver, sender, update, setUpdate, messagesEndRef}) {

    const [allMessages, setAllMessages] = useState(messages);

    useEffect(() => {
        Echo.private(`messenger.${receiver.id}.${parseInt(sender.id)}`)
            .listen('MessageSent', (e) => {
                setAllMessages([...allMessages, e.message])
                messagesEndRef.current.scrollIntoView({behavior: 'smooth'});
            });
        Echo.private(`messenger.${parseInt(sender.id)}.${receiver.id}`)
            .listen('MessageSent', (e) => {
                setAllMessages([...allMessages, e.message])
                messagesEndRef.current.scrollIntoView({behavior: 'smooth'});
            });
    }, [])

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
