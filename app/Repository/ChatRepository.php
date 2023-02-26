<?php

namespace App\Repository;

use App\Models\Message;

class ChatRepository
{
    public function getUserMessages(int $sender_id, int $receiver_id)
    {
        return Message::whereIn('sender_id', [$sender_id, $receiver_id])
            ->whereIn('receiver_id', [$sender_id, $receiver_id])
            ->get();
    }

    public function sendMessage(array $data)
    {
        return Message::create($data);
    }
}
