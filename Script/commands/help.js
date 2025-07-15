const fs = require("fs-extra");
const request = require("request");

module.exports.config = {
  name: "help",
  version: "2.1.0",
  hasPermssion: 0,
  credits: "Aminul Sordar",
  description: "Show command list or detailed command usage",
  commandCategory: "system",
  usages: "[name | all | page]",
  usePrefix: true,
  cooldowns: 1,
  envConfig: {
    autoUnsend: true,
    delayUnsend: 50,
  },
};

module.exports.languages = {
  en: {
    moduleInfo:
      "╭────『 %1 』────╮\n\n📌 Description: %2\n📥 Usage: %3\n📂 Category: %4\n⏳ Cooldown: %5s\n🔐 Permission: %6\n👤 Credits: %7\n\n╰────────────────╯",
    helpList: "[Total %1 commands] Use: \"%2help [name]\" to view command usage",
    user: "User",
    adminGroup: "Admin Group",
    adminBot: "Bot Admin",
  },
};

module.exports.handleEvent = function ({ api, event, getText }) {
  const { commands } = global.client;
  const { threadID, messageID, body } = event;

  if (!body || typeof body !== "string") return;
  if (!body.toLowerCase().startsWith("help ")) return;

  const args = body.trim().split(/\s+/).slice(1);
  const cmdName = args[0]?.toLowerCase();
  if (!cmdName || !commands.has(cmdName)) return;

  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const command = commands.get(cmdName);
  const prefix = threadSetting.PREFIX || global.config.PREFIX;

  const msg = getText(
    "moduleInfo",
    command.config.name,
    command.config.description,
    `${prefix}${command.config.name} ${command.config.usages || ""}`.trim(),
    command.config.commandCategory || "General",
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
  const { threadID, messageID } = event;
  const { commands } = global.client;
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const { autoUnsend, delayUnsend } = global.configModule[this.config.name];
  const prefix = threadSetting.PREFIX || global.config.PREFIX;

  const funFacts = [
    "Even a small amount of alcohol poured on a scorpion will drive it crazy and sting itself to death."," The crocodile can't stick its tongue out.","The oldest known animal in the world is a 405-year-old male, discovered in 2007.","Sharks, like other fish, have their reproductive organs located in the ribcage.","The eyes of the octopus have no blind spots. On average, the brain of an octopus has 300 million neurons. When under extreme stress, some octopuses even eat their trunks.","An elephant's brain weighs about 6,000g, while a cat's brain weighs only approximately 30g.","Cats and dogs have the ability to hear ultrasound.","Sheep can survive up to 2 weeks in a state of being buried in snow.","The smartest pig in the world is owned by a math teacher in Madison, Wisconsin (USA). It has the ability to memorize worksheets multiplying to 12.","Statistics show that each rattlesnake's mating lasts up to ... more than 22 hours", "Studies have found that flies are deaf.","In a lack of water, kangaroos can endure longer than camels.","","Dogs have 4 toes on their hind legs and 5 toes on each of their front paws.","The average flight speed of honey bees is 24km/h. They never sleep.","Cockroaches can live up to 9 days after having their heads cut off.","If you leave a goldfish in the dark for a long time, it will eventually turn white.","The flying record for a chicken is 13 seconds.","The mosquito that causes the most deaths to humans worldwide is the mosquito.","TThe quack of a duck doesn't resonate, and no one knows why.","Sea pond has no brain. They are also among the few animals that can turn their stomachs inside out.","Termites are active 24 hours a day and they do not sleep. Studies have also found that termites gnaw wood twice as fast when listening to heavy rock music.","Baby giraffes usually fall from a height of 1.8 meters when they are born.", "A tiger not only has a striped coat, but their skin is also streaked with stripes.."," Vultures fly without flapping their wings.","Turkeys can reproduce without mating.","Penguins are the only birds that can swim, but not fly. Nor have any penguins been found in the Arctic."," The venom of the king cobra is so toxic that just one gram can kill 150 people.","The venom of a small scorpion is much more dangerous than the venom of a large scorpion.","The length of an oyster's penis can be so 'monstrous' that it is 20 times its body size!","Rat's heart beats 650 times per minute.","The flea can jump 350 times its body length. If it also possessed that ability, a human would be able to jump the length of a football field once.","The faster the kangaroo jumps, the less energy it consumes.","Elephants are among the few mammals that can't jump! It was also discovered that elephants still stand after death.","Spiders have transparent blood."," Snails breathe with their feet.","Some lions mate more than 50 times a day.","Chuột reproduce so quickly that in just 18 months, from just 2 mice, the mother can give birth to 1 million heirs.","Hedgehog floats on water.","Alex is the world's first African gray parrot to question its own existence: What color am I?.","The reason why flamingos are pink-red in color is because they can absorb pigments from the shells of shrimp and shrimp that they eat every day."," Owls and pigeons can memorize human faces", "Cows are more dangerous than sharks","The single pair of wings on the back and the rear stabilizer help the flies to fly continuously, but their lifespan is not more than 14 days.","With a pair of endlessly long legs that can be up to 1.5 m high and weigh 20-25 kg, the ostrich can run faster than a horse. In addition, male ostriches can roar like a lion.","Kangaroos use their tails for balance, so if you lift a Kangaroo's tail off the ground, it won't be able to jump and stand.","Tigers not only have stripes on their backs but also printed on their skin. Each individual tiger is born with its own unique stripe.","If you are being attacked by a crocodile, do not try to get rid of their sharp teeth by pushing them away. Just poke the crocodile in the eye, that's their weakness.","Fleas can jump up to 200 times their height. This is equivalent to a man jumping on the Empire State Building in New York.","A cat has up to 32 muscles in the ear. That makes them have superior hearing ability","Koalas have a taste that does not change throughout life, they eat almost nothing but .. leaves of the eucalyptus tree.","The beaver's teeth do not stop growing throughout its life. If you do not want the teeth to be too long and difficult to control, the beaver must eat hard foods to wear them down.","Animals living in coastal cliffs or estuaries have extremely weird abilities. Oysters can change sex to match the mating method.","Butterflies have eyes with thousands of lenses similar to those on cameras, but they can only see red, green, and yellow..","Don't try this at home, the truth is that if a snail loses an eye, it can recover.","Giraffes do not have vocal cords like other animals of the same family, their tongues are blue-black.","Dog nose prints are like human fingerprints and can be used to identify different dogs.",
  ];

  const images = [
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

"https://i.postimg.cc/4dyDk697/image.gif", 

"https://i.postimg.cc/dQpYFxnq/Kiseki-ga-okoru-basho.gif",

"https://i.postimg.cc/sDG3Zr1Q/image.gif",

"https://i.postimg.cc/L5NgYMs0/Hina-Amano-Weathering-With-You-GIF-Hina-Amano-Weathering-With-You-Animation-Discover-Share-GIF.gif",  

"https://i.imgur.com/w0tJWab.gif",

"https://i.imgur.com/V3mHeJW.gif",   

"https://i.imgur.com/d4zLX9L.gif",
  ];

  const singleCommandGif = "https://i.postimg.cc/qM1v2LxS/72099e3c457732d395205929c29ef784.gif";
  const randomImage = images[Math.floor(Math.random() * images.length)];
  const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
  const ext = randomImage.split(".").pop();

  // 🌐 HELP ALL
  if (args[0] === "all") {
    const grouped = [];

    for (const cmd of commands.values()) {
      const cat = (cmd.config.commandCategory || "general").toLowerCase();
      const idx = grouped.findIndex((g) => g.group === cat);
      if (idx === -1) grouped.push({ group: cat, cmds: [cmd.config.name] });
      else grouped[idx].cmds.push(cmd.config.name);
    }

    let msg = "🎯 Command Groups:\n\n";
    grouped.forEach((g) => {
      msg += `🔹 ${g.group.charAt(0).toUpperCase() + g.group.slice(1)}\n${g.cmds.join(" • ")}\n\n`;
    });

    const callback = () => {
      api.sendMessage(
        {
          body: `🧾 All Commands of ${global.config.BOTNAME}\n\n${msg}\n💡 Total Commands: ${commands.size}`,
          attachment: fs.createReadStream(`${__dirname}/cache/helpall.${ext}`),
        },
        threadID,
        (err, info) => {
          if (err) return console.error(err);
          fs.unlinkSync(`${__dirname}/cache/helpall.${ext}`);
          if (autoUnsend)
            setTimeout(() => api.unsendMessage(info.messageID).catch(() => {}), delayUnsend * 1000);
        },
        messageID
      );
    };

    request(randomImage)
      .pipe(fs.createWriteStream(`${__dirname}/cache/helpall.${ext}`))
      .on("close", callback);
    return;
  }

  // 📚 HELP [COMMAND]
  const command = commands.get((args[0] || "").toLowerCase());
  if (command) {
    const cmdInfo = getText(
      "moduleInfo",
      command.config.name,
      command.config.description,
      `${prefix}${command.config.name} ${command.config.usages || ""}`.trim(),
      command.config.commandCategory || "General",
      command.config.cooldowns,
      command.config.hasPermssion === 0
        ? getText("user")
        : command.config.hasPermssion === 1
        ? getText("adminGroup")
        : getText("adminBot"),
      command.config.credits
    );

    const ext = singleCommandGif.split(".").pop();

    const callback = () => {
      api.sendMessage(
        {
          body: cmdInfo,
          attachment: fs.createReadStream(`${__dirname}/cache/singlecmd.${ext}`),
        },
        threadID,
        (err, info) => {
          if (err) return console.error(err);
          fs.unlinkSync(`${__dirname}/cache/singlecmd.${ext}`);
          if (autoUnsend)
            setTimeout(() => api.unsendMessage(info.messageID).catch(() => {}), delayUnsend * 1000);
        },
        messageID
      );
    };

    request(singleCommandGif)
      .pipe(fs.createWriteStream(`${__dirname}/cache/singlecmd.${ext}`))
      .on("close", callback);
    return;
  }

  // 📃 PAGINATED LIST
  const page = Math.max(parseInt(args[0]) || 1, 1);
  const perPage = 10;
  const allCommands = Array.from(commands.keys()).sort();
  const totalPages = Math.ceil(allCommands.length / perPage);

  const start = (page - 1) * perPage;
  const list = allCommands.slice(start, start + perPage);

  let msg = `
╭─────────⭓ 『 ⚡ | ${global.config.BOTNAME} 』
│ 📄 Page: ${page}/${totalPages}
│
${list.map(cmd => `│ ╰┈➤ ✨ ${cmd}`).join('\n')}
│
╰──────────────⭓

📌 *Fun Fact:* ${randomFact}

╰┈➤ ❄️ Year: 2023 | ⚡ ${global.config.BOTNAME}
💮 Command Count: ${commands.size}
🏵️ Bot Name: ${global.config.BOTNAME}
🌸 Prefix: ☃️ ${prefix} ☃️

👑 𝐀𝐌𝐈𝐍𝐔𝐋 𝐒𝐎𝐑𝐃𝐀𝐑🍁
🌐 https://www.facebook.com/100071880593545

🔎 Type: ${prefix}help [command] for details
`.trim();

  const callback = () => {
    api.sendMessage(
      {
        body: msg,
        attachment: fs.createReadStream(`${__dirname}/cache/page.${ext}`),
      },
      threadID,
      (err, info) => {
        if (err) return console.error(err);
        fs.unlinkSync(`${__dirname}/cache/page.${ext}`);
        if (autoUnsend)
          setTimeout(() => api.unsendMessage(info.messageID).catch(() => {}), delayUnsend * 1000);
      },
      messageID
    );
  };

  request(randomImage)
    .pipe(fs.createWriteStream(`${__dirname}/cache/page.${ext}`))
    .on("close", callback);
};
