require('dotenv').config();
const { Bot } = require("grammy");

// Telegram 봇 토큰
const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);

// 봇 초기화
await bot.init();

// /start 명령어 처리
bot.command("start", async (ctx) => {
  const keyboard = {
    inline_keyboard: [
      [{ text: "Play Game", web_app: { url: "https://fnfsgame.vercel.app/" } }],  // 게임 링크 수정
      [{ text: "Follow X", url: "https://x.com/Fnfs_Official" }],
      // [{ text: "Join Official Telegram", url: "https://t.me/fnfs_official" }],
    ],
  };

  const message = `
🎉 Welcome to *Fused n Furious*! 🏎💨

Get ready to race, earn, and dominate! Fused n Furious is more than just a game—it's a *P2E revolution* where every race brings new opportunities. 🚀🔥

🏁 *Claim Your N₂O* – Fuel up and boost your rewards!  
⚡️ *Compete & Earn* – Race your way to the top and stack your winnings!  
🔥 *Play, Win, Repeat* – The thrill never stops in this high-speed battle!  

The race for N₂O is *ON*! Are you ready to shift into high gear and take the lead? 💨🏆  

🚗 *Let’s race & earn!* 🚗
  `;

  const gifUrl = 'https://fnfsbot.vercel.app/fnfsgif.gif';  // public 폴더에 있는 GIF 파일 경로

  // ✅ GIF + 메시지 + 버튼을 한 번에 보냄
  await ctx.replyWithAnimation(gifUrl, {
    caption: message,
    reply_markup: keyboard,
    parse_mode: "Markdown",
  });
});

// ✅ Vercel 서버리스 API로 실행
export async function POST(req) {
  try {
    const body = await req.json();
    await bot.handleUpdate(body);
    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Bot Error:", error);
    return new Response("Error", { status: 500 });
  }
}

