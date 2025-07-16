module.exports.config = {
	name: "help",
	version: "1.0.2",
	hasPermssion: 0,
	credits: "Aminulsordar",
	description: "show available command",
	commandCategory: "system",
	usages: "Command List",
	cooldowns: 5,
	envConfig: {
		autoUnsend: false,
		delayUnsend: 50
	}
};

module.exports.languages = {
	"en": {
		"moduleInfo": "「 %1 」\n%2\n\n❯ Usage: %3\n❯ Category: %4\n❯ Waiting time: %5 seconds(s)\n❯ Permission: %6\n\n» Module code by %7 «",
		"helpList": '[ There are %1 commands on this bot, Use: "%2help nameCommand" to know how to use! ]',
		"user": "User",
				"adminGroup": "Admin group",
				"adminBot": "Admin bot"
	}
};

module.exports.handleEvent = function ({ api, event, getText }) {
	const { commands } = global.client;
	const { threadID, messageID, body } = event;

	if (!body || typeof body == "undefined" || body.indexOf("help") != 0) return;
	const splitBody = body.slice(body.indexOf("help")).trim().split(/\s+/);
	if (splitBody.length == 1 || !commands.has(splitBody[1].toLowerCase())) return;
	const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
	const command = commands.get(splitBody[1].toLowerCase());
	const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
	return api.sendMessage(getText("moduleInfo", command.config.name, command.config.description, `${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`, command.config.commandCategory, command.config.cooldowns, ((command.config.hasPermssion == 0) ? getText("user") : (command.config.hasPermssion == 1) ? getText("adminGroup") : getText("adminBot")), command.config.credits), threadID, messageID);
}

module.exports. run = function({ api, event, args, getText }) {
	const { commands } = global.client;
	const { threadID, messageID } = event;
	const command = commands.get((args[0] || "").toLowerCase());
	const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
	const { autoUnsend, delayUnsend } = global.configModule[this.config.name];
	const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;

	if (!command) {
		const arrayInfo = [];
		const page = parseInt(args[0]) || 1;
		const numberOfOnePage = 15;
		let i = 0;
		let msg = "😊!!-> 𝗔𝗦𝗦𝗔𝗟𝗔-𝗠𝗨𝗔𝗟𝗔𝗜𝗞𝗨𝗠 <-!!🥰\n⚘⊶───────────────────⚭\n˚ · .˚ · . ❀ 𝗖𝗢𝗠𝗠𝗔𝗡𝗗 𝗟𝗜𝗦𝗧 ❀ ˚ · .˚ · .\n\n┌────────────────────❍\n";

		for (var [name, value] of (commands)) {
			name += `  𓆩😇𓆪`;
			arrayInfo.push(name);
		}

		arrayInfo.sort((a, b) => a.data - b.data);

		const startSlice = numberOfOnePage*page - numberOfOnePage;
		i = startSlice;
		const returnArray = arrayInfo.slice(startSlice, startSlice + numberOfOnePage);

		for (let item of returnArray) msg += `├⊶〘 ${++i} 〙-${item}\n`;

		const randomText = ["",];

		const text =  `└────────────────────❍\n⚘⊶───────────────────⚭
😫!!-> 𝐀𝐌𝐈𝐍𝐔𝐋 𝐒𝐎𝐑𝐃𝐀𝐑 <-!!🥵
😀!!-> 𝗕𝗢𝗧𓆩😇𓆪𝗔𝐌𝐈𝐍𝐔𝐋 𝟭𝟰𝟯 <-!!😘
					┌──❀*̥˚───❀*̥˚─┐
								 𝗣𝗔𝗚𝗘 ${page}/${Math.ceil(arrayInfo.length/numberOfOnePage)}
					└───❀*̥˚───❀*̥˚┘

𝗧𝗢𝗧𝗔𝗟 𝗖𝗢𝗠𝗠𝗔𝗡𝗗 𝗢𝗡 𝗕𝗢𝗧 - ${arrayInfo.length}

𝗔𝗡𝗬 𝗛𝗘𝗟𝗣 𝗖𝗢𝗡𝗧𝗔𝗖𝗧 𝗠𝗬 𝗔𝗗𝗠𝗜𝗡
𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞 𝗜𝗗  :  𝐀𝐌𝐈𝐍𝐔𝐋 𝐒𝐎𝐑𝐃𝐀𝐑 😗`;
		return api.sendMessage(msg + "" + text, threadID, async (error, info) => {
			if (autoUnsend) {
				await new Promise(resolve => setTimeout(resolve, delayUnsend * 10000));
				return api.unsendMessage(info.messageID);
			} else return;
		});
	}

	return api.sendMessage(getText("moduleInfo", command.config.name, command.config.description, `${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`, command.config.commandCategory, command.config.cooldowns, ((command.config.hasPermssion == 0) ? getText("user") : (command.config.hasPermssion == 1) ? getText("adminGroup") : getText("adminBot")), command.config.credits), threadID, messageID);
};
