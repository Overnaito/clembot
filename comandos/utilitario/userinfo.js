// comando userinfo para ver as informações de um usuário ou nossas
const { MessageEmbed } = require('discord.js')
const t = require('@vitalets/google-translate-api')
module.exports = {
  nome: 'userinfo',
  alias: ['user'],
  run: async(clem, message, args) => {
    let usuario = message.mentions.users.first() || clem.users.cache.get(args[0]) || message.author
    let data = await t(usuario.createdAt.toDateString(), { to: 'pt'})

    const embed = new MessageEmbed()
    .setColor(clem.color)
    .setAuthor(usuario.tag, usuario.displayAvatarURL())
    .setTitle('Informação do '+usuario.tag)
    .setThumbnail(usuario.displayAvatarURL())
    .addField('Menção', `${usuario.toString()}`)
    .addField('ID', `${usuario.id}`)
    .addField('Bot', usuario.bot ? 'sim' : 'não')
    .addField('Estado', usuario.presence.status)
    .addField('Presença', usuario.presence.activities[0] ? `${usuario.presence.activities[0].name}\n${usuario.presence.activities[0].state}` : 'Nenhum')
    .addField('Flags', usuario.flags.toArray().length > 0 ? usuario.flags.toArray().join(' | ') : 'Nenhum')
    .addField('Entrou no Discord em', data.text)
    .setFooter(`Requerido por ${message.author.tag}`, message.author.displayAvatarURL())
    message.channel.send(embed)
  }
}