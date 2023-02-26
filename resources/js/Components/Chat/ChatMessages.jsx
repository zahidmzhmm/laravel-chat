export default function ChatMessages({messages, auth}) {
    return (
        <>
            {messages.map((item, index) =>
                <div key={index}
                     className={`receive-chat relative flex ${parseInt(auth.user.id) !== parseInt(item.sender_id) ? 'justify-start' : 'justify-end'}`}>
                    <div
                        className={`mb-2 max-w-[80%] rounded px-5 py-2 text-sm text-white  ${parseInt(auth.user.id) !== parseInt(item.sender_id) ? 'bg-violet-400' : 'bg-violet-200'}`}>
                        <i className="fa fa-caret-up absolute -top-2 text-violet-400"></i>
                        <p>{item.message}</p>
                    </div>
                </div>
            )}
        </>
    )
}
