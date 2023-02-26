<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Message;
use App\Repository\ChatRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ChatController extends Controller
{

    public function __construct(private ChatRepository $chat)
    {
        $this->chat = $chat;

    }

    public function index(Request $request)
    {
        $messages = !empty($request->receiver_id) ? $this->chat->getUserMessages($request->user()->id, $request->receiver_id) : [];
        return Inertia::render('Chat/Index', [
            'messages' => $messages
        ]);
    }

    public function store(Request $request)
    {
        $request->validate(['message' => 'required', 'receiver_id' => 'required|int']);

        try {
            $message = $this->chat->sendMessage([
                'sender_id' => (int)$request->user()->id,
                'receiver_id' => (int)$request->receiver_id,
                'message' => $request->message,
            ]);
            event(new MessageSent($message));
            return Redirect::route('chat.index', 'receiver_id=' . $request->receiver_id);
        } catch (\Exception $exception) {
            return Redirect::route('chat.index', 'receiver_id=' . $request->receiver_id);
        }
    }
}
