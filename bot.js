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
    
     // List all channels        
    
    var generalChannel = client.channels.get("540173603342254110") // Replace with known channel ID
    
    client.on('message', (receivedMessage) => {
    // Prevent bot from responding to its own messages
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

    // Alternatively, you can set the activity to any of the following:
    // PLAYING, STREAMING, LISTENING, WATCHING
    // For example:
    // client.user.setActivity("TV", {type: "WATCHING"})
})

function processInfo(receivedMessage) {
    let fullInfo = receivedMessage.content.substr(1)
    let splitInfo = fullInfo.split(" ")
    let primaryInfo = splitInfo[0]
    let argumentInfo = splitInfo.slice(1)

    console.log("Command received: " + primaryInfo)
    console.log("Arguments: " + argumentInfo)

    if (primaryInfo == "Elesis") {
        elesisInfo(argumentInfo, receivedMessage)
    } else if (primaryInfo == "Lass") {
        lassInfo(argumentInfo, receivedMessage)
    } else {
        receivedMessage.channel.send("Je ne comprend pas votre requête :(")
    }

}

function elesisInfo(receivedMessage){
    receivedMessage.channel.send("test1")
}
function lassInfo(receivedMessage){
    receivedMessage.channel.send("test2")
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
        receivedMessage.channel.send("It looks like you might need help with " + arguments)
    } else {
        receivedMessage.channel.send("I'm not sure what you need help with. Try `!help [topic]`")
    }
}

client.login(process.env.bot_token)
