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

    if ((primaryInfo == "Elesis" && primaryInfo != "elesis") || (primaryInfo == "elesis" && primaryInfo != "Elesis"))  {
        elesisInfo(argumentInfo, receivedMessage, auteurMessage)
    }  else if ((primaryInfo == "Lass" && primaryInfo != "lass") || (primaryInfo == "lass" && primaryInfo != "Lass")) {
        lassInfo(argumentInfo, receivedMessage, auteurMessage)
    }  else if ((primaryInfo == "Ryan" && primaryInfo != "ryan") || (primaryInfo == "ryan" && primaryInfo != "Ryan")) {
        ryanInfo(argumentInfo, receivedMessage, auteurMessage)
    }  else {
        receivedMessage.channel.send("Je ne comprend pas votre requête :(")
    }

}

function elesisInfo(argumentInfo, receivedMessage, auteurMessage){
    receivedMessage.channel.send(auteurMessage)
    receivedMessage.delete(1000)
    receivedMessage.channel.send("Elesis :\n Rang : SR \n Type : Attaquant(e) \n Sets recommandés : Rose / Bleu \n Compétences : \nCritical X [2 SP – 15 secondes de cooldown] : Lance une lame de vent pour annuler l’attaque de l’ennemi. \nLancez de l’énergie de son épée vers l’emplacement ciblé et les ennemis sur le chemin subiront 123% de dégâts d’attaques physiques. Après avoir sauté dans les airs, frappez au sol pour infliger 344.4% de dégâts d’attaque physique tout en annulant l’attaque ennemi. \nMéga taillade [1 SP – 12 secondes de cooldown] : Appliquez un bouclier sur vous-même puis chargez sur l’ennemi. \nUne fois qu’Elesis crée un bouclier personnel (30% de la santé maximale) qui dure 8 secondes sur elle-même, elle se plonge dans le combat et attaque les ennemis en les tranchant les uns après les autres pour infliger 252% de dégâts d’attaque physique, puis elle rassemble les ennemis ensemble. \nFin du cœur [20 SP – 30 secondes de cooldown] : Coupe les ennemis à portée plusieurs fois d’affilés puis les étourdit. \nElesis saute dans la zone ciblée et attaque en brandissant son épée pour infliger 559.7% de dégâts d’attaque physique et étourdit les ennemis pendant 5 secondes. Après cela, pendant 10 secondes, elle augmente la vitesse d’attaque de base de ses alliées de 100%. \nChef Indomptable [40 secondes de cooldown] : Lorsqu’une compétence est utilisée, les statistiques des alliées augmentent.\nElesis est douée des qualités de leader et de la capacité de berserker.\n[Qualité de leader]\nLors de l’utilisation de compétences, Elesis continue à augmenter les stats de ses alliées. Les dégâts et la vitesse d’attaque de base de ses alliées augmentent de 3% (Maximum : 30%).\nLorsque les compétences sont au maximum, pendant 10 secondes, la vitesse d’attaque de base de ses alliées augmente de 100%.\n[Berserker]\nLorsque Elesis risque la mort, elle devient invincible pendant 3 secondes et récupère 20% de ses PV tout en ayant réinitialisé le temps de recharge de ses compétences. (Recharge : 40 secondes). 
")
}
function lassInfo(argumentInfo, receivedMessage, auteurMessage){
    receivedMessage.channel.send(auteurMessage)
    receivedMessage.delete(1000)
    receivedMessage.channel.send("Nom : Lass\nType : Attaquant\nClassement : PVE = SS-, PvP Attack = SS+, PvP Defense = S+, Boss Dimensionnel = SS-\nSet d'équipement : Orange\nCompétences : 5 en Chance de Critiques, 5 en Dégats de compétences")
}
function ryanInfo(argumentInfo, receivedMessage, auteurMessage){
    receivedMessage.channel.send(auteurMessage)
    receivedMessage.delete(1000)
    receivedMessage.channel.send("Nom : Ryan\nType : Tank\nClassement : PVE = S+, PvP Attack = S-, PvP Defense = S-, Boss Dimensionnel = C\nSet d'équipement : Bleu\nCompétences : 5 en Augmentation de soin reçu , 3 en Réduction de dégats de compétences et 2 en Réduction de dégats de base")
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
