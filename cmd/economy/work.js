const { MessageEmbed } = require('discord-sempai')
const db = CreateSql({
  path: './database',
  table: ['main', 'shop', 'money']
});

module.exports = {
  name: "work",
  code: (client, message, args, money) => {
    db.set("main", `money_${message.author.id}`, ++money)

    const work = new MessageEmbed()
      .setTitle('Work')
      .setDescription('Баланс: ' + db.get("main", `money_${message.author.id}`))
      .setFooter({ text: message.author.tag })
      .setTimestamp()

    message.reply({ embeds: [work] })
    return;
  }
}