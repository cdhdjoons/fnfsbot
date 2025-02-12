require('dotenv').config();

const { Bot } = require("grammy");

// Telegram 봇 토큰
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new Bot(token); // grammy 봇 객체 생성

// /start 명령어 처리
bot.on('message:text', async (ctx) => {
  if (ctx.message.text === '/start') {
    const keyboard = {
      inline_keyboard: [
        [
          {
            text: "Play Game",
            url: "https://fnfsgame.vercel.app/",
          },
        ],
        [
          {
            text: "Follow X",
            url: "https://x.com/Fnfs_Official",
          },
        ],
        [
          {
            text: "Join Official Telegram",
            url: "https://t.me/fnfs_official",
          },
        ],
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

    await ctx.reply(message, {
      reply_markup: keyboard,
      parse_mode: "Markdown",
    });
  }
});

// ✅ Vercel에서 서버리스 API로 실행되도록 설정
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
