const { Bot, MessageEmbed, Modal, ModalText } = require('discord-sempai');
const { CreateSql } = require('database-sempai')
const db = new CreateSql({
  table: ["main", "server", "shop", "inv"],
  path: "./database",
  key: "sql"
});
const bot = new Bot({
  token: process.env.token, // если используете реплит создайте секретку, если же нет, то, удалите эту строчку.
  prefix: ["?", "!", "@"], // или просто "!!"
  help: false, // Кастом хелп 
  ready: true // Встроенное сообщение о запуске бота
});
let money = 52
bot.command({
  name: "work",
  code: (client, message, args) => {
    db.set("main", `money_${message.author.id}`, ++money)

    const work = new MessageEmbed()
      .setTitle('Work')
      .setDescription('Баланс: ' + db.get("main", `money_${message.author.id}`))
      .setFooter({ text: message.author.tag })
      .setTimestamp()

    message.reply({ embeds: [work] })
  }
});
/* db.set('main', 'myKey', JSON.stringify(myObject), false);

// Получаем значение из базы данных и преобразуем его обратно в объект
const savedObject = JSON.parse(db.get('main', 'myKey', false))

console.log(savedObject); // { name: "John", age: 30 }
*/
bot.command({
  name: "add",
  code: (client, message, args) => {
    const testOb = { name: `${args[0]}`, price: args[1] }
    db.set("shop", "pon", JSON.stringify(testOb));
    const savob = JSON.parse(db.get("shop", "pon"))
    message.channel.send("name: " + savob.name + "price: " + savob.price)
  }
})

bot.command({
  name: "buy",
  code: (client, message, args) => {
    const savob = JSON.parse(db.get("shop", "pon"))
    if (!savob.name) {
      message.channel.send("вы купили предмет")
      db.set("inv", args[0])
    } else {
      message.channel.send("Такого предмета нету.")
    }
  }
})
// bot.loaderTextCmd("./cmd")

bot.Status({
  status: "idle", // idle, dnd, invisible, online
  activity: {
    type: 3,
    name: "Ебашит экономику..."
  }
})

bot.connect()