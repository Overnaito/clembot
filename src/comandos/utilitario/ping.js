/* nosso primeiro commando */
module.exports = {
  nome: 'ping',
  alias: ['p'],
  run: (clem, message, args) => {
  //Um comando ping
  message.channel.send(':ping_pong: Pong!').then(msg => {
    msg.edit(`${clem.ws.ping}ms`)
  })
  }
}