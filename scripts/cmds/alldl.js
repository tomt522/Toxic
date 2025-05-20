const axios = require("axios");

module.exports = {
  config: {
    name: "alldl",
    aliases: ["download", "dl"],
    version: "1.0",
    author: "♡︎ 𝐻𝐴𝑆𝐴𝑁 ♡︎",
    countDown: 2,
    role: 0,
    description: {
      en: "Download 1000+ website's videos",
    },
    category: "media",
    guide: {
      en: "{pn} [url | reply to an url]",
    },
  },

  onStart: async function ({ api, args, event }) {
    const format = args.join(" ") || "b";
    let url = event.messageReply?.body || args[0];
       if (!url) {
         url = event.messageReply?.attachments[0]?.url;
       };
       if (!url) {
               api.setMessageReaction("❌", event.messageID, () => {}, true);
              return api.sendMessage("⁉️ | Please provide a valid URL Or reply to an URL", event.threadID, event.messageID);
    }
    try {
    const { data } = await axios.get("https://raw.githubusercontent.com/KingsOfToxiciter/alldl/refs/heads/main/toxicitieslordhasan.json");
    const hasan = data.hasan;
      
    const response = await axios.get(`${hasan}/alldl?url=${encodeURIComponent(url)}&format=${format}`); 

        api.sendMessage(
          {
            body: `✨ | Here is your Download video..!!\n\nLink: ${response.data.url}`,
            attachment: await global.utils.getStreamFromURL(response.data.url)
          },
          event.threadID,
          event.messageID
        );

    } catch (error) {
      api.setMessageReaction("❎", event.messageID, () => {}, true);
      api.sendMessage(`❌ | Error:\n${error.message}`, event.threadID, event.messageID);
    }
  },
};
