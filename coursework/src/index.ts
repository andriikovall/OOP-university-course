import Telegrah from 'telegraf';

const bot = new Telegrah('1045750573:AAFyCWKHEqIMIBDCrlV3UrZDIIBHpLO10Q4');

bot.launch().then(() => console.log('bot started')).catch((err) => console.log('err', err));
