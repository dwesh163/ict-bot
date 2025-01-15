const { Telegraf, Markup } = require('telegraf');
const dotenv = require('dotenv');
const { getText } = require('./modules/message');
const { getLang } = require('./modules/languages');
const { modulesCommand, moduleCommand, jobsCommand, languageCommand, callback } = require('./modules/command');

dotenv.config();

console.log('Starting bot');

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply(getText('start', getLang(ctx.from.id)), { parse_mode: 'Markdown' }));

bot.help((ctx) => ctx.reply(getText('help', getLang(ctx.from.id)), { parse_mode: 'Markdown' }));
bot.command('h', (ctx) => ctx.reply(getText('help', getLang(ctx.from.id)), { parse_mode: 'Markdown' }));

bot.command('list', modulesCommand);
bot.command('l', modulesCommand);
bot.command('all', modulesCommand);
bot.command('modules', modulesCommand);

bot.command('module', moduleCommand);

bot.command('jobs', jobsCommand);

bot.command('language', languageCommand);

bot.on('callback_query', callback);

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
