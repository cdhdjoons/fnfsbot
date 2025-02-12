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
      [{ text: "Play Game", callback_data: "play_game" }],  // callback_data로 설정
      [{ text: "Follow X", url: "https://x.com/Fnfs_Official" }],
      [{ text: "Join Official Telegram", url: "https://t.me/fnfs_official" }],
    ],
  };

  const message = `
🎉 Welcome to Fused n Furious! 🏎💨

Get ready to race, earn, and dominate! Fused n Furious is more than just a game—it's a P2E revolution where every race brings new opportunities. 🚀🔥

🏁 *Claim Your N₂O* – Fuel up and boost your rewards!  
⚡️ *Compete & Earn* – Race your way to the top and stack your winnings!  
🔥 *Play, Win, Repeat* – The thrill never stops in this high-speed battle!  

The race for N₂O is *ON*! Are you ready to shift into high gear and take the lead? 💨🏆  

🚗 *Let’s race & earn!* 🚗
`;

  const videoUrl = 'https://fnfsbot.vercel.app/fnfsgif.mp4';

  // 1. 비디오 먼저 전송 (캡션 없이)
  await ctx.replyWithVideo(videoUrl, { caption: "" });

  // 2. 텍스트 메시지와 버튼 전송
  await ctx.reply(message, {
    reply_markup: keyboard,
    parse_mode: "Markdown",
  });
});

// callback_query 처리 (Play Game 버튼 클릭 시 URL 반환)
bot.on("callback_query:data", async (ctx) => {
  if (ctx.callbackQuery.data === "play_game") {
    await ctx.answerCallbackQuery();  // 버튼 클릭 시 로딩 표시 없애기
    await ctx.reply("✅ Redirecting to the game... [Click here to start!](https://fnfsgame.vercel.app/)", {
      parse_mode: "Markdown",
    });
  }
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
