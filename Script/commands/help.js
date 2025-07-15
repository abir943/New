const fs = require("fs-extra");
const request = require("request");

module.exports.config = {
  name: "help",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "aminulsordar",
  description: "Commands list",
  commandCategory: "system",
  usages: "module name",
  usePrefix: true,
  cooldowns: 1,
  envConfig: {
    autoUnsend: true,
    delayUnsend: 50, // seconds
  },
};

module.exports.languages = {
  en: {
    moduleInfo:
      "─────[ %1 ]──────\n\nUsage: %3\nCategory: %4\nWaiting time: %5 second(s)\nPermission: %6\nDescription: %2\n\nModule coded by %7",
    helpList:
      '[ There are %1 commands on this bot, Use: "%2help nameCommand" to know how to use! ]',
    user: "User",
    adminGroup: "Admin group",
    adminBot: "Admin bot",
  },
};

module.exports.handleEvent = function ({ api, event, getText }) {
  const { commands } = global.client;
  const { threadID, messageID, body } = event;

  if (!body || typeof body !== "string") return;
  if (!body.toLowerCase().startsWith("help")) return;

  const splitBody = body.trim().split(/\s+/);
  if (splitBody.length < 2) return;

  const cmdName = splitBody[1].toLowerCase();
  if (!commands.has(cmdName)) return;

  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const command = commands.get(cmdName);
  const prefix = threadSetting.PREFIX || global.config.PREFIX;

  const msg = getText(
    "moduleInfo",
    command.config.name,
    command.config.description,
    `${prefix}${command.config.name} ${command.config.usages || ""}`.trim(),
    command.config.commandCategory,
    command.config.cooldowns,
    command.config.hasPermssion === 0
      ? getText("user")
      : command.config.hasPermssion === 1
      ? getText("adminGroup")
      : getText("adminBot"),
    command.config.credits
  );

  return api.sendMessage(msg, threadID, messageID);
};

module.exports.run = async function ({ api, event, args, getText }) {
  const { commands } = global.client;
  const { threadID, messageID } = event;
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const { autoUnsend, delayUnsend } = global.configModule[this.config.name];
  const prefix = threadSetting.PREFIX || global.config.PREFIX;

  // Random fun facts array
  const randomTexts = [
    "Even a small amount of alcohol poured on a scorpion will drive it crazy and sting itself to death.",
    "The crocodile can't stick its tongue out.",
    "The oldest known animal in the world is a 405-year-old male, discovered in 2007.",
    "Sharks, like other fish, have their reproductive organs located in the ribcage.",
    "The eyes of the octopus have no blind spots. On average, the brain of an octopus has 300 million neurons.",
    "An elephant's brain weighs about 6,000g, while a cat's brain weighs only approximately 30g.",
    "Cats and dogs have the ability to hear ultrasound.",
    "Sheep can survive up to 2 weeks in a state of being buried in snow.",
    "The smartest pig in the world is owned by a math teacher in Madison, Wisconsin (USA). It has the ability to memorize worksheets multiplying to 12.",
    "Statistics show that each rattlesnake's mating lasts up to ... more than 22 hours.",
    "Studies have found that flies are deaf.",
    "In a lack of water, kangaroos can endure longer than camels.",
    "Dogs have 4 toes on their hind legs and 5 toes on each of their front paws.",
    "The average flight speed of honey bees is 24km/h. They never sleep.",
    "Cockroaches can live up to 9 days after having their heads cut off.",
    "If you leave a goldfish in the dark for a long time, it will eventually turn white.",
    "The flying record for a chicken is 13 seconds.",
    "The mosquito that causes the most deaths to humans worldwide is the mosquito.",
    "The quack of a duck doesn't resonate, and no one knows why.",
    "Sea pond has no brain. They are also among the few animals that can turn their stomachs inside out.",
    "Termites are active 24 hours a day and they do not sleep.",
    "Baby giraffes usually fall from a height of 1.8 meters when they are born.",
    "A tiger not only has a striped coat, but their skin is also streaked with stripes.",
    "Vultures fly without flapping their wings.",
    "Turkeys can reproduce without mating.",
    "Penguins are the only birds that can swim, but not fly.",
    "The venom of the king cobra is so toxic that just one gram can kill 150 people.",
    "The venom of a small scorpion is much more dangerous than the venom of a large scorpion.",
    "The length of an oyster's penis can be so 'monstrous' that it is 20 times its body size!",
    "Rat's heart beats 650 times per minute.",
    "The flea can jump 350 times its body length.",
    "The faster the kangaroo jumps, the less energy it consumes.",
    "Elephants are among the few mammals that can't jump!",
    "Spiders have transparent blood.",
    "Snails breathe with their feet.",
    "Some lions mate more than 50 times a day.",
    "Chuột reproduce so quickly that in just 18 months, from just 2 mice, the mother can give birth to 1 million heirs.",
    "Hedgehog floats on water.",
    "Alex is the world's first African gray parrot to question its own existence: What color am I?.",
    "The reason why flamingos are pink-red in color is because they can absorb pigments from the shells of shrimp and shrimp that they eat every day.",
    "Owls and pigeons can memorize human faces.",
    "Cows are more dangerous than sharks.",
    "With a pair of endlessly long legs that can be up to 1.5 m high and weigh 20-25 kg, the ostrich can run faster than a horse.",
    "Kangaroos use their tails for balance, so if you lift a Kangaroo's tail off the ground, it won't be able to jump and stand.",
    "Tigers not only have stripes on their backs but also printed on their skin.",
    "If you are being attacked by a crocodile, do not try to get rid of their sharp teeth by pushing them away. Just poke the crocodile in the eye, that's their weakness.",
    "Fleas can jump up to 200 times their height.",
    "A cat has up to 32 muscles in the ear.",
    "Koalas have a taste that does not change throughout life, they eat almost nothing but eucalyptus leaves.",
    "The beaver's teeth do not stop growing throughout its life.",
    "Animals living in coastal cliffs or estuaries have extremely weird abilities.",
    "Butterflies have eyes with thousands of lenses similar to those on cameras, but they can only see red, green, and yellow.",
    "Don't try this at home, the truth is that if a snail loses an eye, it can recover.",
    "Giraffes do not have vocal cords like other animals of the same family, their tongues are blue-black.",
    "Dog nose prints are like human fingerprints and can be used to identify different dogs.", " Even a small amount of alcohol poured on a scorpion will drive it crazy and sting itself to death.",
    "The crocodile can't stick its tongue out.",
    "The oldest known animal in the world is a 405-year-old male, discovered in 2007.",
    "Sharks, like other fish, have their reproductive organs located in the ribcage.",
    "The eyes of the octopus have no blind spots. On average, the brain of an octopus has 300 million neurons.",
    "An elephant's brain weighs about 6,000g, while a cat's brain weighs only approximately 30g.",
    // ... (You can keep or shorten the list)
  ];

  const randomText =
    randomTexts[Math.floor(Math.random() * randomTexts.length)];

  // GIF/Image links for paginated command list
  const randomImages = [
    "https://i.imgur.com/rmvrQhf.gif",
    "https://i.imgur.com/m7DFUwQ.gif",
    "https://i.postimg.cc/kGXFhs6z/image.gif",
    "https://i.postimg.cc/pXs1xhPK/9f86d35a-a401-4f8e-805e-0183141183fd.gif",
    "https://i.postimg.cc/tgZcBqQW/image.gif",
    "https://i.postimg.cc/HLRqmJ46/image.gif",
    "https://i.postimg.cc/HWXgptNX/alteredcarbon-cyberpunk-cyberpunkcity-dystopia-futureworld.gif",
    "https://i.postimg.cc/4dhTHvxC/Cyberpunk-Aesthetic.gif",
    "https://i.postimg.cc/zG5XmQXy/ILLNESS-Lee-haechan.gif",
    "https://i.imgur.com/qPKituS.gif",
    // ... more links if needed
  ];

  // GIF for single command help
  const singleCommandGifs = [
    "https://i.postimg.cc/qM1v2LxS/72099e3c457732d395205929c29ef784.gif",
  ];

  // Fixed Imgur image URL for "help all"
  const helpAllImageUrl = "https://i.imgur.com/m7DFUwQ.gif"; // <-- Replace with your Imgur image direct URL

  // Handle "help all"
  if (args[0] === "all") {
    const groups = [];

    for (const cmd of commands.values()) {
      const category = cmd.config.commandCategory.toLowerCase();
      const groupIndex = groups.findIndex((g) => g.group === category);
      if (groupIndex === -1) {
        groups.push({ group: category, cmds: [cmd.config.name] });
      } else {
        groups[groupIndex].cmds.push(cmd.config.name);
      }
    }

    let msg = "";
    groups.forEach(
      (g) =>
        (msg += `☂︎ ${g.group.charAt(0).toUpperCase() + g.group.slice(1)}\n${g.cmds.join(
          " • "
        )}\n\n`)
    );

    // Use fixed Imgur image URL instead of API
    const ext = helpAllImageUrl.substring(helpAllImageUrl.lastIndexOf(".") + 1);

    const callback = () => {
      api.sendMessage(
        {
          body:
            "Commands list\n\n" +
            msg +
            `Spamming the bot is strictly prohibited\n\nTotal Commands: ${commands.size}\n\nDeveloper:\nLoid Butter`,
          attachment: fs.createReadStream(__dirname + `/cache/helpall.${ext}`),
        },
        threadID,
        (err, info) => {
          if (err) console.error(err);
          fs.unlinkSync(__dirname + `/cache/helpall.${ext}`);
          if (autoUnsend) {
            setTimeout(() => {
              api.unsendMessage(info.messageID).catch(() => {});
            }, delayUnsend * 1000);
          }
        },
        messageID
      );
    };

    request(helpAllImageUrl)
      .pipe(fs.createWriteStream(__dirname + `/cache/helpall.${ext}`))
      .on("close", callback);

    return;
  }

  // Handle detailed info for one command
  const command = commands.get((args[0] || "").toLowerCase());

  if (command) {
    const infoText = getText(
      "moduleInfo",
      command.config.name,
      command.config.description,
      `${prefix}${command.config.name} ${command.config.usages || ""}`.trim(),
      command.config.commandCategory,
      command.config.cooldowns,
      command.config.hasPermssion === 0
        ? getText("user")
        : command.config.hasPermssion === 1
        ? getText("adminGroup")
        : getText("adminBot"),
      command.config.credits
    );

    const ext = singleCommandGifs[0].substring(
      singleCommandGifs[0].lastIndexOf(".") + 1
    );

    const callback = () => {
      api.sendMessage(
        {
          body: infoText,
          attachment: fs.createReadStream(__dirname + `/cache/singlecmd.${ext}`),
        },
        threadID,
        (err, info) => {
          if (err) console.error(err);
          fs.unlinkSync(__dirname + `/cache/singlecmd.${ext}`);
          if (autoUnsend) {
            setTimeout(() => {
              api.unsendMessage(info.messageID).catch(() => {});
            }, delayUnsend * 1000);
          }
        },
        messageID
      );
    };

    request(singleCommandGifs[0])
      .pipe(fs.createWriteStream(__dirname + `/cache/singlecmd.${ext}`))
      .on("close", callback);

    return;
  }

  // Handle paginated command list (default or page number)
  const page = Math.max(parseInt(args[0]) || 1, 1);
  const commandsPerPage = 10;

  const commandNames = Array.from(commands.keys()).sort();

  const totalPages = Math.ceil(commandNames.length / commandsPerPage);

  const start = (page - 1) * commandsPerPage;
  const end = start + commandsPerPage;

  let msg = "";
  for (let i = start; i < end && i < commandNames.length; i++) {
    msg += `╰┈➤》✨${commandNames[i]}\n`;
  }

  msg +=
    "\n━━━━━━━━━━━━━━━━\n\n" +
    randomText +
    `\n\n 》『 ⚡ | ${global.config.BOTNAME}』\nPage 『${page}/${totalPages}』\n\nType: ${prefix}help [command] for detailed info`;

  // Pick a random image for paginated list
  const randomImage =
    randomImages[Math.floor(Math.random() * randomImages.length)];
  const ext = randomImage.substring(randomImage.lastIndexOf(".") + 1);

  const callback = () => {
    api.sendMessage(
      {
        body: msg,
        attachment: fs.createReadStream(__dirname + `/cache/page.${ext}`),
      },
      threadID,
      (err, info) => {
        if (err) console.error(err);
        fs.unlinkSync(__dirname + `/cache/page.${ext}`);
        if (autoUnsend) {
          setTimeout(() => {
            api.unsendMessage(info.messageID).catch(() => {});
          }, delayUnsend * 1000);
        }
      },
      messageID
    );
  };

  request(randomImage)
    .pipe(fs.createWriteStream(__dirname + `/cache/page.${ext}`))
    .on("close", callback);
};
