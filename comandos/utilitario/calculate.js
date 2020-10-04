//Um comando de calculadora usando o módulo "math-expression-evaluator"
const math = require('math-expression-evaluator')
const {MessageEmbed} = require('discord.js')
module.exports = {
  nome: 'calcular',
  alias: ['calc', 'calculadora'],
  run: (clem, message, args) => {
    const embed = new MessageEmbed()
    if(!args[0]) return message.channel.send('Você tem que escrever uma operação matemática')

    let result;
    try{
      result = math.eval(args.join(' '))
    } catch(err) {
      result = 'ERRO'
    }
    embed.setColor(clem.color)
    embed.setAuthor(message.author.tag, message.author.displayAvatarURL())
    embed.addField('Entrada:', '```js\n'+args.join(' ')+'```', false)
    embed.addField('Saída:', '```js\n'+result+'```', false)
    message.channel.send(embed)
  }
}