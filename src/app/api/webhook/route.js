// app/api/webhook/route.js
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Received Webhook Body:", body);

    // Handle game callback query (when user presses Play Game button)
    if (body.callback_query && body.callback_query.data === 'play_game') {
      const chatId = body.callback_query.from.id;
      await sendGame(chatId, 'fnfscrazycar');  // 게임을 시작하는 명령
      await answerCallbackQuery(body.callback_query.id);  // 콜백 쿼리 처리 완료
      return NextResponse.json({ ok: true });
    }

    // Handle regular messages
    if (body.message) {
      const chatId = body.message.from.id;
      const text = body.message.text;

      // Handle /start command
      if (text === '/start') {
        // 비디오 파일 URL을 배포한 도메인에 맞게 수정
        await sendVideo(chatId, 'https://fnfsbot.vercel.app/fnfsgif.mp4');  // 비디오 전송
        await sendTelegramMessageWithKeyboard(chatId, `🎉 Welcome to Fused n Furious! 🏎💨\n\nGet ready to race, earn, and dominate! Fused n Furious is more than just a game—it's a P2E revolution where every race brings new opportunities. 🚀🔥\n\n🏁 *Claim Your N₂O* – Fuel up and boost your rewards!\n⚡️ *Compete & Earn* – Race your way to the top and stack your winnings!\n🔥 *Play, Win, Repeat* – The thrill never stops in this high-speed battle!\n\nThe race for N₂O is *ON*! Are you ready to shift into high gear and take the lead? 💨🏆\n\n🚗 *Let’s race & earn!* 🚗`);
        return NextResponse.json({ ok: true });
      }

      // Handle other messages
      await sendTelegramMessage(chatId, 'Type /start you can play the game!');
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

// Helper function to answer callback query
async function answerCallbackQuery(callbackQueryId) {
  const TELEGRAM_API = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/answerCallbackQuery`;

  const response = await fetch(TELEGRAM_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      callback_query_id: callbackQueryId
    }),
  });

  return response.json();
}

// Helper function to send a game
async function sendGame(chatId, gameShortName) {
  const TELEGRAM_API = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendGame`;

  const response = await fetch(TELEGRAM_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      game_short_name: gameShortName
    }),
  });

  return response.json();
}

// Helper function to send a video
async function sendVideo(chatId, videoUrl) {
  const TELEGRAM_API = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendVideo`;

  const response = await fetch(TELEGRAM_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      video: videoUrl
    }),
  });

  return response.json();
}

// Helper function to send a message with inline keyboard
async function sendTelegramMessageWithKeyboard(chatId, message) {
  const TELEGRAM_API = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

  const inlineKeyboard = [
    [
      {
        text: "Play Game",
        callback_data: "play_game"  // 콜백 데이터에 'play_game'을 설정
      }
    ],
    [
      {
        text: "Follow X",
        url: "https://x.com/Fnfs_Official"
      }
    ],
    [
      {
        text: "Join Official Telegram",
        url: "https://t.me/fnfs_official"
      }
    ]
  ];

  const response = await fetch(TELEGRAM_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      reply_markup: {
        inline_keyboard: inlineKeyboard
      }
    }),
  });

  return response.json();
}

// Helper function to send a regular text message
async function sendTelegramMessage(chatId, message) {
  const TELEGRAM_API = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

  const response = await fetch(TELEGRAM_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message
    }),
  });

  return response.json();
}
