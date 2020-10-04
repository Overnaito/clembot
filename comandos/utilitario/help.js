//Este será o nosso comando de ajuda, que conterá as informações úteis de todos os comandos, links úteis e mais
const {MessageEmbed} = require('discord.js')
module.exports = {
  nome: 'help',
  alias: ['ajuda'],
  run: (clem, message, args) => {
    const embed = new MessageEmbed()
    .setColor(clem.color)
    .setAuthor('Olá!', message.author.displayAvatarURL())
    .setTitle('Eu sou Clembot.')
    .setDescription('E aqui estão meus comandos')
    .addField('Utilitario [4]', '```ping help calcular avatar```')
    .addField('Links', '[Convite](https://discord.com/oauth2/authorize?client_id=760580230875316224&scope=bot&permissions=8)\n[Github](https://github.com/Overnaito/clembot)')
    .setFooter(clem.user.tag, clem.user.displayAvatarURL())
    message.channel.send(embed)
  }
}