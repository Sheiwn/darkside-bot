const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
    
    // List servers the bot is connected to
    console.log("Servers:")
    client.guilds.forEach((guild) => {
        console.log(" - " + guild.name)
        guild.channels.forEach((channel) => {
            console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)
        })
    })
         
    client.on('message', (receivedMessage) => {
    // Prevent bot from responding to its own messages
    if (receivedMessage.author == client.user) {
        return
    }
    
    // Check if the bot's user was tagged in the message
    if (receivedMessage.content.includes(client.user.toString())) {
        // Send acknowledgement message
        receivedMessage.channel.send("Message received from " +
            receivedMessage.author.toString() + ": " + receivedMessage.content)
    }
    if (receivedMessage.content.startsWith(".")) {
        processCommand(receivedMessage)
    }
        if (receivedMessage.content.startsWith("_")){
        processInfo(receivedMessage)
    }
})
    // Set bot status to: "Playing with JavaScript"
    client.user.setActivity("Grand Chase Mobile")

})

function processInfo(receivedMessage) {
    let fullInfo = receivedMessage.content.substr(1)
    let splitInfo = fullInfo.split(" ")
    let primaryInfo = splitInfo[0]
    let argumentInfo = splitInfo.slice(1)
    let auteurMessage = receivedMessage.author.toString()

    console.log("Command received: " + primaryInfo)
    console.log("Arguments: " + argumentInfo)

    if (primaryInfo == "Elesis") {
        elesisInfo(argumentInfo, receivedMessage, auteurMessage)
    } else if (primaryInfo == "elesis") {
        elesisInfo(argumentInfo, receivedMessage, auteurMessage)
    } else if (primaryInfo == "Lass") {
        lassInfo(argumentInfo, receivedMessage, auteurMessage)
    } else if (primaryInfo == "lass"){
        lassInfo(argumentInfo, receivedMessage, auteurMessage)
    }else if (primaryInfo == "Ryan") {
        ryanInfo(argumentInfo, receivedMessage, auteurMessage)
    } else if (primaryInfo == "ryan"){
        ryanInfo(argumentInfo, receivedMessage, auteurMessage)
    }else {
        receivedMessage.channel.send("Je ne comprend pas votre requête :(")
    }

}

function elesisInfo(argumentInfo, receivedMessage, auteurMessage){
    receivedMessage.channel.send(auteurMessage)
    receivedMessage.channel.send("Nom : Elesis")
    receivedMessage.channel.send("Type : Attaquante")
    receivedMessage.channel.send("Classement : PVE = S+, PvP Attack = S, PvP Defense = S, Boss Dimensionnel = S")
    receivedMessage.channel.send("Set d'équipement : Bleu (Tank) / Rose (Maximise le passif)")
    receivedMessage.channel.send("Compétences : 5 en Chance de critiques, 3 en Réduction de dégâts de compétences et 2 en Réduction de dégâts d'attaque de base ")
}
function lassInfo(argumentInfo, receivedMessage, auteurMessage){
    receivedMessage.channel.send("Nom : Lass")
    receivedMessage.channel.send("Type : Attaquant")
    receivedMessage.channel.send("Classement : PVE = SS-, PvP Attack = SS+, PvP Defense = S+, Boss Dimensionnel = SS-")
    receivedMessage.channel.send("Set d'équipement : Orange")
    receivedMessage.channel.send("Compétences : 5 en Chance de Critiques, 5 en Dégats de compétences")
}
function ryanInfo(argumentInfo, receivedMessage, auteurMessage){
    receivedMessage.channel.send("Nom : Ryan")
    receivedMessage.channel.send("Type : Tank")
    receivedMessage.channel.send("Classement : PVE = S+, PvP Attack = S-, PvP Defense = S-, Boss Dimensionnel = C")
    receivedMessage.channel.send("Set d'équipement : Bleu")
    receivedMessage.channel.send("Compétences : 5 en Augmentation de soin reçu , 3 en Réduction de dégats de compétences et 2 en Réduction de dégats de base")
}

function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1) // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

    console.log("Command received: " + primaryCommand)
    console.log("Arguments: " + arguments) // There may not be any arguments

    if (primaryCommand == "help") {
        helpCommand(arguments, receivedMessage)
    } else if (primaryCommand == "ping") {
        pongCommand(arguments, receivedMessage)
    } else {
        receivedMessage.channel.send("Je ne comprend pas votre demande :(")
    }
}

function pongCommand(arguments, receivedMessage){
    receivedMessage.channel.send("Pong!")
}

function helpCommand(arguments, receivedMessage) {
    if (arguments.length > 0) {
        receivedMessage.channel.send("Il me semble que vous avez besoin d'aide concernant " + arguments)
    } else {
        receivedMessage.channel.send("Je ne suis pas sûr de ce que vous avez besoin. Essayez `!help [topic]`")
    }
}

client.login(process.env.bot_token)
