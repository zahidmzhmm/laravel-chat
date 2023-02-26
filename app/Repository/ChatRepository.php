<?php

namespace App\Repository;

use App\Models\Message;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class ChatRepository
{
    public function getUserMessages(int $sender_id, int $receiver_id)
    {
        return Message::whereIn('sender_id', [$sender_id, $receiver_id])
            ->whereIn('receiver_id', [$sender_id, $receiver_id])
            ->get();
    }

    public function getRecentUsersWithMessage(int $sender_id): array
    {
        DB::statement('SET SESSION sql_mode=""');
        $recentMessages = Message::where(function ($query) use ($sender_id) {
            $query->where('sender_id', '=', $sender_id)
                ->orWhere('receiver_id', '=', $sender_id);
        })->groupBy('sender_id', 'receiver_id')
            ->select('sender_id', 'receiver_id', 'message')
            ->orderBy('id', 'desc')
            ->limit(30)
            ->get();
        return $this->getFilterRecentMessages($recentMessages, $sender_id);
    }

    private function getFilterRecentMessages($recentMessages, int $sender_id): array
    {
        $recentUsersWithMessage = [];
        $usedUserIds = [];
        foreach ($recentMessages as $message) {
            $user_id = $message->sender_id == $sender_id ? $message->receiver_id : $message->sender_id;
            if (!in_array($user_id, $usedUserIds)) {
                $recentUsersWithMessage[] = [
                    'user_id' => $user_id,
                    'message' => $message->message,
                ];
                $usedUserIds[] = $user_id;
            }
        }
        foreach ($recentUsersWithMessage as $item => $userMessage) {
            $recentUsersWithMessage[$item]['name'] = User::where('id', $userMessage['user_id'])->value('name') ?? '';
        }
        return $recentUsersWithMessage;
    }

    public function sendMessage(array $data)
    {
        return Message::create($data);
    }
}
