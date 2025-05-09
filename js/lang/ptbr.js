const ptbr = {
    streamerbotconnected: 'Streamer.bot Conectado!',
    streamerbotdisconnected: 'Streamer.bot Desconectado!',
    ttschat: 'disse',

    twitch : {
        firstMessage : () => `Primeira mensagem`,
        follow : () => ` seguiu o canal`,
        announcement : () => ` <div class="reply">📢 <strong>Anúncio</strong></div>`,
        channelpoints : ({ title }) => ` <div class="reply"><i class="fa-solid fa-wand-magic-sparkles"></i> <strong>Pontos do Canal - ${title}</strong></div>`,
        bits : ({ bits, message }) => ` doou <i class="fa-regular fa-gem fall-and-bounce"></i> <strong>${bits} bits</strong>${message ? '<br>'+message : ''}`,

        sub : ({ months, isPrime, tier }) => ` se inscreveu por
            ${isPrime == true ? '<i class="fa-solid fa-crown"></i>' : '<i class="fa-solid fa-star"></i>'}
            <strong>${months || 1 } ${months == 1 ? 'mês' : 'meses'}
            (${isPrime == true ? 'Prime' : 'Tier '+tier.toString().charAt(0)})</strong>`,

        resub : ({ months, isPrime, tier, message }) => ` se inscreveu por
            ${isPrime == true ? '<i class="fa-solid fa-crown"></i>' : '<i class="fa-solid fa-star"></i>'}
            <strong>${months || 1 } ${months == 1 ? 'mês' : 'meses'}
            (${isPrime == true ? 'Prime' : 'Tier '+tier.toString().charAt(0)})</strong>
            ${message ? '<br>'+message : '' }`,

        gifted : ({ gifted, months, tier }) => ` doou
            <strong>${months || 1 } ${months == 1 ? 'mês' : 'meses'}
            de Tier ${tier.toString().charAt(0)}</strong>
            para <i class="fa-solid fa-gift"></i> <strong>${gifted}</strong>`,
        
        giftedbomb : ({ count, total, tier }) => ` doou <i class="fa-solid fa-gift"></i> <strong>${count} inscrições (Tier ${tier.toString().charAt(0)})</strong> para a Comunidade, totalizando <strong>${total || 1} ${total == 1 ? 'doação' : 'doações'}</strong>`,
            
        raid : ({ viewers }) => ` raidou o canal com <i class="fa-solid fa-users"></i> <strong>${viewers} pessoas</strong>`
        
    },


    youtube : {
        superchat : ({ money, message }) => ` fez um superchat de <i class="fa-solid fa-comments-dollar"></i> <strong>${money}</strong>
        ${message ? '<br>'+message : ''}
        `,

        supersticker : ({ money, sticker }) => ` 
        ${sticker ? '<br>': ''}
        enviou um super sticker de <i class="fa-solid fa-comments-dollar"></i> <strong>${money}</strong>
        ${sticker ? '</span></span><span class="sticker"><img src="'+sticker+'"></span>': ''}
        `,

        member : ({ months, tier, message }) => ` se inscreveu por
            <i class="fa-solid fa-star"></i>
            <strong>${months || 1 } ${months && months > 1 ? 'meses' : 'mês'}
            (Tier ${tier})</strong>
            ${message ? '<br>'+message : ''}`,
        
        giftedmembers : ({ total, tier }) => ` doou <i class="fa-solid fa-gift"></i> <strong>${total} ${total == 1 ? 'inscrição' : 'inscrições'} (Tier ${tier}) para  o canal</strong>`,

        giftedtrainmembers : ({ gifted, tier }) => ` doou uma assinatura
            <strong>(${tier})</strong>
            para <i class="fa-solid fa-gift"></i> <strong>${gifted}</strong>`,
        
    },


    streamlabs : {
        tip : ({ money, message }) => ` doou 🪙 <strong>${money}</strong>${message ? '<br>'+message : ''}`,
    },


    streamelements : {
        tip : ({ money, message }) => ` doou 🪙 <strong>${money}</strong>${message ? '<br>'+message : ''}`,
    },


    tiktok : {
        follow : () => ` seguiu o canal`,
        likes : (likes) => `mandou <strong><i class="fa-solid fa-heart"></i> <em class="likecount" style="font-style: normal;">${likes}</em> likes</strong>`,
        sub : ({ months }) => ` se inscreveu por <i class="fa-solid fa-star"></i> <strong>${months || 1 } ${(months && months > 1) ? 'meses' : 'mês'}</strong>`,
        gift : ({ gift, count, coins }) => ` doou <strong>${gift} x${count}</strong> (🪙 <strong>${coins} ${(coins && coins > 1) ? 'moedas' : 'moeda'})</strong>`,
        
    }
}