/* O evento "message" */
module.exports = (clem, message) => {
  let prefix = clem.prefix;
  //se o usuário for um bot, retornará
  if(message.author.bot) return;
  //se o canal for um canal de mensagem direta, retornará
  if(message.channel.type == 'dm') return;
  //se o conteúdo da mensagem não começa com o prefix, retornará 
  if(!message.content.startsWith(prefix)) return;
  
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  let cmd = clem.comandos.get(command) || clem.comandos.find(x => x.alias.includes(command))

  if(cmd){
    return cmd.run(clem, message, args)
  }
} 