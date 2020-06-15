const Model = require('./model.js');

var check_write_submission = async function(client, message) {
    let channelId = message.channel.id;
    let game = Model.get_game(channelId);
    if (game.state !== "write") {
        return false;
    }
    let guess = message.content;
    let user = message.author;
    await message.delete().then(msg => {
        let text = message.author.username + ', ta définition est enregistrée.';
        console.log(`submission from ${msg.author.username} : ${msg.content}.`)
        msg.channel.send(text);
    }).catch(console.error);
    game.submissions[user.id] = guess;
    if (!game.scores[user.id]) {
        game.scores[user.id] = {
            'user': user.username,
            'points': 0,
        }
    }
    return true;
}

module.exports = {
    check_write_submission: check_write_submission,
};
