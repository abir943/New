const axios = require("axios");

module.exports.config = {
  name: "imgur",
  version: "1.2.0",
  hasPermssion: 0,
  credits: "Islamick Cyber Chat | Modified by Aminul",
  description: "Upload image to Imgur and get shareable link.",
  commandCategory: "tools",
  usages: "[reply to image]",
  cooldowns: 2
};

module.exports.languages = {
  en: {
    reply: "🌸 Hello there!\n\n❖ Please reply to an image and type `imgur` to get the Imgur link.\n\n📌 Example: reply to a photo and type `imgur`.",
    success: "✅ Your Imgur link has been created:\n\n🔗 %1",
    error: "❌ Failed to upload image to Imgur. Please try again later.",
    noImage: "⚠️ Please reply to a photo to upload it to Imgur."
  },
  vi: {
    reply: "🌸 Xin chào!\n\n❖ Vui lòng trả lời một hình ảnh và gõ `imgur` để nhận liên kết Imgur.\n\n📌 Ví dụ: trả lời một bức ảnh và gõ `imgur`.",
    success: "✅ Đây là liên kết Imgur của bạn:\n\n🔗 %1",
    error: "❌ Không thể tải ảnh lên Imgur. Vui lòng thử lại sau.",
    noImage: "⚠️ Vui lòng trả lời một hình ảnh để tải lên Imgur."
  },
  ar: {
    reply: "🌸 مرحباً!\n\n❖ الرجاء الرد على صورة وكتابة `imgur` للحصول على رابط Imgur.\n\n📌 مثال: قم بالرد على صورة واكتب `imgur`.",
    success: "✅ تم إنشاء رابط Imgur الخاص بك:\n\n🔗 %1",
    error: "❌ فشل في تحميل الصورة إلى Imgur. حاول مرة أخرى لاحقًا.",
    noImage: "⚠️ الرجاء الرد على صورة لتحميلها إلى Imgur."
  },
  bn: {
    reply: "🌸 আসসালামু আলাইকুম!\n\n❖ আপনি যে ছবিটিকে Imgur লিংকে রূপান্তর করতে চান,\n➤ সেই ছবিতে `imgur` লিখে রিপ্লাই দিন 🖼️\n\n📌 উদাহরণ: ছবিতে রিপ্লাই দিয়ে লিখুন `imgur`",
    success: "✅ আপনার Imgur লিংক তৈরি হয়েছে:\n\n🔗 %1",
    error: "❌ Imgur-এ আপলোড ব্যর্থ হয়েছে। পরে আবার চেষ্টা করুন।",
    noImage: "⚠️ অনুগ্রহ করে একটি ছবিতে রিপ্লাই করুন।"
  }
};

module.exports.run = async ({ api, event, args, getText }) => {
  try {
    const { threadID, messageID, messageReply } = event;

    // STEP 1: Validate image reply
    if (
      !messageReply ||
      !messageReply.attachments ||
      messageReply.attachments.length === 0 ||
      messageReply.attachments[0].type !== "photo"
    ) {
      return api.sendMessage(getText("noImage"), threadID, messageID);
    }

    const imageURL = messageReply.attachments[0].url;

    // STEP 2: Fetch API link
    const response = await axios.get("https://raw.githubusercontent.com/shaonproject/Shaon/main/api.json");
    const imgurAPI = response.data.imgur;

    // STEP 3: Upload image
    const res = await axios.get(`${imgurAPI}/imgur?link=${encodeURIComponent(imageURL)}`);
    const imgurLink = res.data?.uploaded?.image;

    // STEP 4: Return result
    if (!imgurLink) {
      return api.sendMessage(getText("error"), threadID, messageID);
    }

    return api.sendMessage(getText("success", imgurLink), threadID, messageID);

  } catch (err) {
    console.error("Imgur command error:", err);
    return api.sendMessage(getText("error"), event.threadID, event.messageID);
  }
};
