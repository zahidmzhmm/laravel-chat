import ChatInput from '@/Components/Chat/ChatInput';
import ChatMessages from '@/Components/Chat/ChatMessages';
import ChatSidebar from '@/Components/Chat/ChatSidebar';
import ChatUserInfoHeader from '@/Components/Chat/ChatUserInfoHeader';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {useEffect, useRef, useState} from "react";

export default function Index(props) {

    const [update, setUpdate] = useState(false);
    const messagesEndRef = useRef(null);

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
        >
            <div className="">
                <div className="messanger overflow-hidden p-4" style={{height: "93.5vh"}}>
                    <div className="flex">
                        <div className="basis-2/6 border-r border-slate-100 bg-white pt-3">
                            <ChatSidebar recentMessages={props.recentMessages}/>
                        </div>

                        <div className="basis-4/6">
                            {props.messages.length > 0 && parseInt(props.receiver) !== 0
                                ?
                                <>
                                    <ChatUserInfoHeader receiver={props.receiver}/>
                                    <div className="messanger mt-4">
                                        <div className="px-4 overflow-x-hidden overflow-y-scroll"
                                             style={{height: "75vh"}}>
                                            <ChatMessages messages={props.messages}
                                                          setUpdate={setUpdate}
                                                          update={update}
                                                          sender={props.auth.user}
                                                          receiver={props.receiver}
                                                          messagesEndRef={messagesEndRef}
                                            />
                                            <div ref={messagesEndRef}/>
                                        </div>
                                        <ChatInput receiver={props.receiver} sender={props.auth.user}/>
                                    </div>
                                </>
                                :
                                <div className="flex justify-center items-center bg-slate-100 h-screen">
                                    <p className="font-bold text-3xl text-gray-500">
                                        Please select a User to start chatting...
                                    </p>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
