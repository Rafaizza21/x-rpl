<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function index()
    {
        return response()->json(Message::latest()->get());
    }

    public function destroy(Message $message)
    {
        $message->delete();
        return response()->json(null, 204);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string',
        ]);

        $message = Message::create($validated);

        return response()->json($message, 201);
    }
}
