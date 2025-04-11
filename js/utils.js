/* ----------------------- */
/*        UTILITIES        */
/* ----------------------- */

const chatThreshhold = 50;
const chatContainer                 = document.querySelector('#chat');
const currentLang                   = lang[getURLParam("language", 'ptbr')]; 
const showPlatform                  = getURLParam("showPlatform", true);
const showAvatar                    = getURLParam("showAvatar", false);
const showTimestamps                = getURLParam("showTimestamps", false);
const showBadges                    = getURLParam("showBadges", true);
const showPlatformStatistics        = getURLParam("showPlatformStatistics", false);
const hideAfter                     = getURLParam("hideAfter", 0);
const ignoreChatters                = getURLParam("ignoreChatters", "");
const excludeCommands               = getURLParam("excludeCommands", true);
const avatars = new Map();

const userColors = new Map();

const ignoreUserList = ignoreChatters.split(',').map(item => item.trim().toLowerCase()) || [];


async function addMessageToChat(userID, messageID, platform, data) {
        
    const html = DOMPurify.sanitize(`
        <div id="${messageID}" data-user="${userID}" class="${platform} ${data.classes} message" style="">
            <div class="animate__animated animate__fadeInUp animate__faster">

                ${!data.shared ? '' : data.shared}

                ${showTimestamps == true ? '<span class="time">'+whatTimeIsIt()+'</span>' : ''}
                
                ${showPlatform == true ? '<i class="platform fa-brands fa-'+platform+'"></i>' : '' }
                
                ${showAvatar == true ? '<span class="avatar"><img src="'+data.avatar+'"></span>' : ''}

                ${showBadges == true ? '<span class="badges">'+data.badges+'</span>' : ''}
                
                <span style="color: ${data.color}"  class="user">${data.userName}:</span>
                
                ${!data.reply ? '' : data.reply}
                
                <span class="text">${data.message}</span>
            </div>
        </div>
    `);

    chatContainer.insertAdjacentHTML('beforeend', html);

    const messageElement = document.getElementById(messageID);

    if (hideAfter > 0) {   
        setTimeout(function () {
            messageElement.style.opacity = 0;
            setTimeout(function () {
                messageElement.remove();
            }, 1000); 
        }, Math.floor(hideAfter * 1000));
    }

    removeExtraChatMessages();
}



async function addEventToChat(userID, messageID, platform, data) {
    
    const html = DOMPurify.sanitize(`
        <div id="${messageID}" data-user="${userID}" class="${platform} ${data.classes} message event" style="">
            <div class="animate__animated animate__faster animate__fadeInUp">
                ${!data.reply ? '' : data.reply}

                ${showPlatform == true ? '<i class="platform '+(platform == 'money' ? 'fa-solid' : 'fa-brands')+' fa-'+platform+'"></i>' : '&nbsp;&nbsp;' }

                <span class="info">
                    <!--<span class="avatar"><img src="${data.avatar}"></span>-->
                    <span style="color: ${data.color}"  class="user">${data.userName}</span>
                    <span class="text">${data.message}</span>
                </span>
            </div>
        </div>
    `);

    chatContainer.insertAdjacentHTML('beforeend', html);
    
    const messageElement = document.getElementById(messageID);

    if (hideAfter > 0) {   
        setTimeout(function () {
            messageElement.style.opacity = 0;
            setTimeout(function () {
                messageElement.remove();
            }, 1000); 
        }, Math.floor(hideAfter * 1000));
    }

    removeExtraChatMessages();
}


const whatTimeIsIt = () => {
    const now = new Date();
    const hours24 = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours24 >= 12 ? 'PM' : 'AM';
    const hours12 = (hours24 % 12) || 12;
    return `${hours12}:${minutes} ${ampm}`;
};


function removeExtraChatMessages() {

    const chatMessages = chatContainer.querySelectorAll('div.message').length;

    if (chatMessages > chatThreshhold) {
        for (let i = 0; i < Math.floor(chatThreshhold/2); i++) {
            chatContainer.removeChild(chatContainer.firstElementChild);
        }
    }
}


// Function to format large numbers (e.g., 1000 => '1K')
function formatNumber(num) {
    if (num >= 1000000) {
        let numStr = (num / 1000000).toFixed(1);
        if (numStr.endsWith('.0')) {
            numStr = numStr.slice(0, -2);
        }
        return numStr + 'M';
    }
    else if (num >= 1000) {
        let numStr = (num / 1000).toFixed(1);
        if (numStr.endsWith('.0')) {
            numStr = numStr.slice(0, -2);
        }
        return numStr + 'K';
    }
    return num.toString();
}


function formatCurrency(amount, currencyCode) {
    return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format(amount);
}



function createRandomColor(platform, username) {
    if (userColors.get(platform).has(username)) {
        return userColors.get(platform).get(username);
    }
    else {
        const randomColor = "hsl(" + Math.random() * 360 + ", 100%, 75%)";
        userColors.get(platform).set(username, randomColor);
        return randomColor;
    }
}


function createRandomString(length) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function getURLParam(param, defaultValue) {
    const chatQueryString = window.location.search;
    const urlParams = new URLSearchParams(chatQueryString);
    const paramVar = urlParams.get(param);

    switch (paramVar) {
        case 'true':
            return true;

        case 'false':
            return false;

        case null:
        case undefined:
            return defaultValue;

        default:
            return paramVar; 
    }
}


const pushNotify = (data) => {

    const SimpleNotify = {
        effect: 'fade',
        speed: 500,
        customClass: 'toasty',
        customIcon: '',
        showIcon: true,
        showCloseButton: true,
        autoclose: true,
        autotimeout: 5000,
        notificationsGap: null,
        notificationsPadding: null,
        type: 'outline',
        position: 'x-center bottom',
        customWrapper: '',
    };

    const mergedData = {
        ...SimpleNotify,
        ...data
    }

    new Notify (mergedData);
}

const notifyError = (err) => {
    err.status = 'error';
    pushNotify(err);
}

const notifyInfo = (info) => {
    info.status = 'info';
    pushNotify(info);
}

const notifyWarning = (warn) => {
    warn.status = 'warning';
    pushNotify(warn);
}


const notifySuccess = (success) => {
    success.status = 'success';
    pushNotify(success);
}
