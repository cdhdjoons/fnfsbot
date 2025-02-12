// app/api/setGame/route.js
import fetch from 'node-fetch';

export async function GET() {
  try {
    const response = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/setGameShortName`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        game_short_name: 'fnfscrazycar',  // 게임의 short name
        game_url: 'https://fnfsgame.vercel.app/',  // 실제 게임 URL
      }),
    });

    const data = await response.json();
    console.log('Game set response:', data);

    return new Response('Game URL set successfully', { status: 200 });
  } catch (error) {
    console.error('Error setting game:', error);
    return new Response('Error setting game', { status: 500 });
  }
}
