const Discord = require('discord.js');
const fetch = require('node-fetch');

async function getWikiPage(name = '') {

    const response = await fetch(name);
    return response.text();
}

function getMessageTemplate(pageUrl, response) {
    const title = response.slice(0, response.lastIndexOf("description")).replace("---", "").replace("title: ", "");
    const description = response.slice(response.lastIndexOf("description:") + 13, response.lastIndexOf("tags"))
    const params = response.slice(response.lastIndexOf("| -"), response.lastIndexOf("## Çalışınca Vereceği Sonuçlar"));
    const example = response.slice(response.lastIndexOf("## Örnekler"), response.lastIndexOf("```")).replace("```", "").replace("## Örnekler", "").replace("```", "");

    const wikiResult = {
        title: title,
        description: description,
        params: params,
        example: example,
        pageUrl: pageUrl
    };

    const leaderBoardTemplate = new Discord.MessageEmbed()
        .setColor(15844367)
        .setURL('https://open.mp/')
        .setDescription('SA-MP Wiki - ' + wikiResult.title)
        .setThumbnail('https://sampmonitoring.com/images/metaicon.png')
        .setTimestamp();

    leaderBoardTemplate.addField("Açıklama", wikiResult.description);

    if (wikiResult.params.length < 1000 && wikiResult.params.length != 0) {
        leaderBoardTemplate.addField("Parametreler", wikiResult.params);
    }

    leaderBoardTemplate.addField("Örnekler", "```" + wikiResult.example + "```");

    leaderBoardTemplate.addField("OPEN.MP", "Eğer ki içeriğinin bir kısmını göremiyorsanız " + wikiResult.pageUrl + " adresine tıklayarak gidebilirsiniz.");
    return leaderBoardTemplate;
}

exports.getWikiPage = getWikiPage;
exports.getMessageTemplate = getMessageTemplate;