<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ChatController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show chats
     *
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        return Inertia::render('Chats/ChatPanel', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    public function users(Request $request)
    {
        return User::with('messages')->get();
    }

    /**
     * Fetch all messages
     *
     * @return Builder[]|Collection
     */
    public function messages(Request $request)
    {
        return Message::with('user')
            ->where('rec_id', '=', $request->rec_id)
            ->where('message', '=', $request->message)
            ->get();
    }

    /**
     * Persist message to database
     *
     * @param Request $request
     * @return string[]
     */
    public function sendMessage(Request $request)
    {
        $user = Auth::user();

        $message = $user->messages()->create([
            'message' => $request->input('message')
        ]);

        return ['status' => 'Message Sent!'];
    }
}
