const fancyLine = "⚘⊶───────────────────⚭";

const gifList = [
  "https://i.imgur.com/m7DFUwQ.gif",
  "https://i.postimg.cc/kGXFhs6z/image.gif",
  "https://i.postimg.cc/pXs1xhPK/9f86d35a-a401-4f8e-805e-0183141183fd.gif",
  "https://i.postimg.cc/tgZcBqQW/image.gif",
  "https://i.postimg.cc/HLRqmJ46/image.gif",
  "https://i.postimg.cc/HWXgptNX/alteredcarbon-cyberpunk-cyberpunkcity-dystopia-futureworld.gif",
  "https://i.postimg.cc/4dhTHvxC/Cyberpunk-Aesthetic.gif",
  "https://i.postimg.cc/zG5XmQXy/ILLNESS-Lee-haechan.gif",
  "https://i.imgur.com/qPKituS.gif",
  "https://i.postimg.cc/4dyDk697/image.gif",
  "https://i.postimg.cc/dQpYFxnq/Kiseki-ga-okoru-basho.gif",
  "https://i.postimg.cc/sDG3Zr1Q/image.gif",
  "https://i.postimg.cc/L5NgYMs0/Hina-Amano-Weathering-With-You-GIF-Hina-Amano-Weathering-With-You-Animation-Discover-Share-GIF.gif",
  "https://i.imgur.com/w0tJWab.gif",
  "https://i.imgur.com/V3mHeJW.gif",
  "https://i.imgur.com/d4zLX9L.gif"
];

function getRandomGif() {
  const url = gifList[Math.floor(Math.random() * gifList.length)];
  return {
    body: "",
    attachment: require("request")(url)
  };
}

module.exports.config = {
  name: "help",
  version: "1.0.4",
  hasPermssion: 0,
  credits: "Aminul Sordar",
  description: "Show available commands with usage details",
  commandCategory: "system",
  usages: "[command name | page number]",
  cooldowns: 5,
  envConfig: {
    autoUnsend: false,
    delayUnsend: 240
  }
};

module.exports.languages = {
  en: {
    moduleInfo: "🔹 Name: 「 %1 」\n📄 Description: %2\n🛠 Usage: %3\n📁 Category: %4\n⏳ Cooldown: %5s\n🔑 Permission: %6\n👑 Credits: %7",
    helpList: '[ There are %1 commands. Use: "%2help commandName" for usage details. ]',
    user: "User",
    adminGroup: "Admin (Group)",
    adminBot: "Admin (Bot)"
  }
};

module.exports.handleEvent = async function ({ api, event, getText }) {
  const { commands } = global.client;
  const { threadID, messageID, body } = event;
  if (!body?.toLowerCase().startsWith("help ")) return;

  const args = body.split(/\s+/);
  const cmdName = args[1]?.toLowerCase();
  if (!commands.has(cmdName)) return;

  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const prefix = threadSetting.PREFIX || global.config.PREFIX;
  const command = commands.get(cmdName);

  const msg = getText("moduleInfo",
    command.config.name,
    command.config.description || "No description",
    `${prefix}${command.config.name} ${(command.config.usages || "")}`,
    command.config.commandCategory || "Uncategorized",
    command.config.cooldowns || 5,
    command.config.hasPermssion === 0
      ? getText("user")
      : command.config.hasPermssion === 1
        ? getText("adminGroup")
        : getText("adminBot"),
    command.config.credits || "Unknown"
  );

  return api.sendMessage({ body: msg, attachment: getRandomGif().attachment }, threadID, messageID);
};

module.exports.run = async function ({ api, event, args, getText }) {
  const { commands } = global.client;
  const { threadID, messageID } = event;
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const { autoUnsend, delayUnsend } = global.configModule[this.config.name];
  const prefix = threadSetting.PREFIX || global.config.PREFIX;

  const input = (args[0] || "").toLowerCase();
  const command = commands.get(input);

  if (command) {
    const msg = getText("moduleInfo",
      command.config.name,
      command.config.description || "No description",
      `${prefix}${command.config.name} ${(command.config.usages || "")}`,
      command.config.commandCategory || "Uncategorized",
      command.config.cooldowns || 5,
      command.config.hasPermssion === 0
        ? getText("user")
        : command.config.hasPermssion === 1
          ? getText("adminGroup")
          : getText("adminBot"),
      command.config.credits || "Unknown"
    );
    return api.sendMessage({ body: msg, attachment: getRandomGif().attachment }, threadID, messageID);
  }

  // Paginated Help
  const commandNames = Array.from(commands.keys()).sort();
  const totalCmds = commandNames.length;
  const perPage = 15;
  const page = Math.max(1, parseInt(input)) || 1;
  const totalPage = Math.ceil(totalCmds / perPage);
  const start = (page - 1) * perPage;
  const currentCmds = commandNames.slice(start, start + perPage);

  let msg = "😊!!-> 𝗔𝗦𝗦𝗔𝗟𝗔-𝗠𝗨𝗔𝗟𝗔𝗜𝗞𝗨𝗠 <-!!🥰\n" + fancyLine + "\n❀ 𝗖𝗢𝗠𝗠𝗔𝗡𝗗 𝗟𝗜𝗦𝗧 ❀\n\n";

  currentCmds.forEach((name, idx) => {
    msg += `├⊶〘 ${start + idx + 1} 〙 - ${name} 𓆩😇𓆪\n`;
  });

  msg += `└────────────────────❍\n${fancyLine}\n`;

  const footer = `😫!!-> 𝐀𝐌𝐈𝐍𝐔𝐋 𝐒𝐎𝐑𝐃𝐀𝐑 <-!!🥵
😀!!-> 𝗕𝗢𝗧𓆩😇𓆪𝗔𝐌𝐈𝐍𝐔𝐋 𝟭𝟰𝟯 <-!!😘
┌──❀*̥˚───❀*̥˚─┐
     PAGE ${page}/${totalPage}
└───❀*̥˚───❀*̥˚┘
🧮 TOTAL COMMANDS: ${totalCmds}
📞 NEED HELP? CONTACT MY ADMIN
🌐 FB: 𝐀𝐌𝐈𝐍𝐔𝐋 𝐒𝐎𝐑𝐃𝐀𝐑 😗`;

  return api.sendMessage({ body: msg + footer, attachment: getRandomGif().attachment }, threadID, async (err, info) => {
    if (autoUnsend) {
      await new Promise(res => setTimeout(res, delayUnsend * 1000));
      return api.unsendMessage(info.messageID);
    }
  });
};
