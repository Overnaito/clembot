//Servidor para mantener o bot 24 horas
const express = require('express');
const app = express();
const port = 3009;

app.get('/', (req, res) => res.send('Servidor pronto!'))
app.listen(port, () => console.log('Bot conectado ao Express'))
//Eu Importo Discord.js
const Discord = require('discord.js');
//Eu crio o cliente, ele se chamará clem
const clem = new Discord.Client();
const {readdirSync, statSync} = require('fs')
//Eu importo config.js onde está o prefix e meu ID
const config = require('./config.js');
//Eu crio uma variável para o prefix usando config.prefix
const prefix = config.prefix;
//Eu crio uma propiedade no cliente para o prefix e poder acessar de qualquer lugar no código, especialmente os comandos
clem.prefix = prefix;
//outra propiedade do cliente de uma cor para embeds
clem.color = '#e9d68c';

/* O manipulador de comandos, para tener nossos comandos mais ordenados */

//função que usaremos para ter comandos em subpastas
function lerDiretorios(){
  return readdirSync('./comandos').filter(function subPasta(file){
    return statSync('./comandos/'+file).isDirectory()
  })
}
//criou a coleção para os comandos
clem.comandos = new Discord.Collection()

//Eu crio uma variável para ler os comandos que não estão em subpastas
let commandFiles = readdirSync('./comandos').filter(f => f.endsWith('.js'))

//Eu faço um for para ler os comandos dentro de todas as subpastas e filtrá-los
for(const pasta of lerDiretorios()){
  const folderFiles = readdirSync('./comandos/'+pasta).filter(f => f.endsWith('.js'))
  //outro for para ter os arquivos diretamente
  for(const file of folderFiles){
    //e fazemos um "push" de um array que inclui as subpastas e os arquivos
    commandFiles.push([folder, file])
  }
}
//Eu faço um for de commandFiles que já inclui os comandos das subpastas
for(const file of commandFiles){
  let command;
  if(Array.isArray(file)){
    //se file for um array, ou seja, uma subpasta e um comando
    command = require(`./comandos/${file[0]}/${file[1]}`)
  } else {
    //se file não for um array, ou seja, um comando que não está dentro de uma subpasta
    command = require(`./comandos/${file}`)
  }
  clem.comandos.set(command.nome, command)
}

//O manipulador de eventos para ter os eventos mais ordenados em outra pasta, é muito simples então não vou explicar
for(const file of readdirSync('./eventos/')){
  if(file.endsWith('.js')){
    let fileName = file.substring(0, file.length - 3)
    let fileContents = require(`./eventos/${file}`)
    clem.on(fileName, fileContents.bind(null, clem))
  }
}

//E o login do Bot
clem.login(process.env.DISCORD_TOKEN)