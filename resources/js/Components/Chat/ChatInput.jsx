import {useState} from "react";
import {useForm} from "@inertiajs/react";

export default function ChatInput({sender, receiver}) {


    const {data, setData, post, processing, errors, reset} = useForm({
        message: '',
        sender_id: sender.id,
        receiver_id: receiver.id,
    });

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const formsubmithandler = (e) => {
        e.preventDefault();
        if (data.message === "") {
            return;
        }
        post(route('chat.store'));
        setData("message", "");
    }

    return (
        <form onSubmit={(e) => formsubmithandler(e)} className="fixed flex bottom-0 w-full bg-white pl-4">
            <textarea style={{width: "55vw"}}
                      value={data.message}
                      name="message"
                      onChange={handleOnChange}
                      className="h-16 overflow-y-auto bg-white pt-3 font-light border-0 hover:border-0 focus:border-0 focus:ring-0 !shadow-none focus:!outline-none"
                      placeholder="Write a message"></textarea>
            <div className="flex flex-col justify-center content-center text-center align-middle">
                <button type="submit" style={{width: "5rem"}}
                        className="bg-blue-500 hover:bg-blue-700 ml-2 text-white m-auto font-bold py-2 px-4 rounded">Send
                </button>
            </div>
        </form>
    )
}
