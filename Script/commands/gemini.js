const axios = require("axios");

module.exports.config = {
  name: "gemini",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "Aminul Sordar",
  description: "💬 Chat with Gemini AI (using Aryan API)",
  commandCategory: "🤖 AI Tools",
  usages: "[your question]",
  cooldowns: 5,
  dependencies: {
    "axios": ""
  }
};

module.exports.languages = {
  en: {
    missingInput: "❌ Please enter a question for Gemini AI.",
    error: "⚠️ An error occurred while contacting Gemini.",
    thinking: "🤔 Gemini is thinking, please wait..."
  },
  vi: {
    missingInput: "❌ Vui lòng nhập câu hỏi cho Gemini AI.",
    error: "⚠️ Đã xảy ra lỗi khi gọi Gemini.",
    thinking: "🤔 Gemini đang suy nghĩ, vui lòng đợi..."
  },
  bn: {
    missingInput: "❌ দয়া করে Gemini AI কে জিজ্ঞাসা করার জন্য একটি প্রশ্ন লিখুন।",
    error: "⚠️ Gemini এর উত্তর আনতে ত্রুটি হয়েছে।",
    thinking: "🤔 জেমিনি ভাবছে, অনুগ্রহ করে অপেক্ষা করুন..."
  }
};

module.exports.run = async function ({ api, event, args, getText }) {
  const { threadID, messageID, senderID } = event;
  const question = args.join(" ").trim();

  if (!question) {
    return api.sendMessage(getText("missingInput"), threadID, messageID);
  }

  api.sendMessage(getText("thinking"), threadID, async () => {
    try {
      const apiUrl = `https://xyz-nix.vercel.app/aryan/gemini?ask=${encodeURIComponent(question)}&uid=${senderID}&apikey=aryandev`;
      const res = await axios.get(apiUrl);
      const reply = res.data?.reply;

      if (!reply) {
        return api.sendMessage(getText("error"), threadID, messageID);
      }

      const response = 
`🌟 𝗚𝗲𝗺𝗶𝗻𝗶 𝗔𝗜 𝗥𝗲𝗽𝗹𝘆 🌟
━━━━━━━━━━━━━━━━━━
🧠 ${reply}
━━━━━━━━━━━━━━━━━━
🔹 Asked by: @${senderID}`;

      return api.sendMessage(response, threadID, messageID);
    } catch (err) {
      console.error("❌ Gemini API Error:", err.message || err);
      return api.sendMessage(getText("error"), threadID, messageID);
    }
  });
};
