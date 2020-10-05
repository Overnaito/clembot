//Comando Serverinfo para visualizar informações do servidor como cargos, membros, proprietário e muito mais
const { MessageEmbed } = require('discord.js')
const t = require('@vitalets/google-translate-api')
module.exports = {
  nome: 'serverinfo',
  alias: ['server'],
  run: async(clem, message, args) => {
    let data = await t(message.guild.createdAt.toDateString(), { to: 'pt' })
    let humanos = message.guild.members.cache.filter(x => !x.user.bot).size
    let bots = message.guild.members.cache.filter(x => x.user.bot).size

    let canais_de_texto = message.guild.channels.cache.filter(x => x.type == 'text').size
    let canais_de_voz = message.guild.channels.cache.filter(x => x.type == 'voice').size
    let categorias = message.guild.channels.cache.filter(x => x.type == 'category').size
    let canais = message.guild.channels.cache.size - categorias

    const embed = new MessageEmbed()
    .setColor(clem.color)
    .setAuthor(message.guild.name, message.guild.iconURL())
    .setTitle('Informação do servidor')
    .addField('Nome', message.guild.name)
    .addField('ID', message.guild.id)
    .addField('proprietário do servidor', message.guild.owner.user.tag)
    .addField('Data de criação do Servidor', data.text)
    .addField('Membros do Servidor', `${message.guild.memberCount}\nHumanos: ${humanos}\nBots: ${bots}`)
    .addField('Canais', `Número de Canais: ${canais}\nCategorias: ${categorias}\nCanais de texto: ${canais_de_texto}\nCanais de Voz: ${canais_de_voz}`)
    .addField('Cargos', message.guild.roles.cache.size)
    message.channel.send(embed)
  }
}