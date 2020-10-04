// Comando Avatar para ver o Avatar dos outros usuários ou para ver o nosso
const { MessageEmbed } = require('discord.js')
module.exports = {
  nome: 'avatar',
  alias: ['av'],
  run: (clem, message, args) => {
    let user = message.mentions.users.first() || clem.users.cache.get(args[0]) || message.author
    const embed = new MessageEmbed()
    .setColor(clem.color)
    .setAuthor(user.tag, user.displayAvatarURL({ dynamic: true}))
    .setDescription(`[Baixe o Avatar](${user.displayAvatarURL({ dynamic: true, size: 2048 })})`)
    .setImage(user.displayAvatarURL({ dynamic: true, size: 2048 }))
    message.channel.send(embed)
  }
}