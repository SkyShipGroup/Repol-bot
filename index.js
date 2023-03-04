const { Bot } = require('discord-sempai');
const { CreateSql } = require('database-sempai');
let money = 50
// Создайте новый экземпляр Bot:

const bot = new Bot({
  prefix: ["!", "r."],
  status: "dnd"
});
// Используйте методы библиотеки, чтобы создать необходимые функциональности для Вашего бота.

bot.createEvent({
  name: 'ready',
  code: (client) => {
  console.log(`Вы вошли как  ${client.user.tag}!`);
  }
});
// пон
bot.command({
  name: 'ping',
  code: (client, message, args) => {
   message.reply("Pong " + client.ws.ping)
  }
});
// запуск бота
bot.connect(process.env.token);