const { Telegraf, Markup } = require('telegraf');
const dotenv = require('dotenv');
const { getModules, getJobs, getModuleByJob } = require('./modules/api');
const { getModulesText, getText } = require('./modules/message');
const { getLang } = require('./modules/languages');

dotenv.config();

console.log('Starting bot');

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply(getText('start', getLang(ctx.from.id))));
bot.help((ctx) => ctx.reply('Send me a sticker or use /modules to start.'));

bot.command('modules', async (ctx) => {
	const lang = getLang(ctx.from.id);

	try {
		const jobs = await getJobs(lang);
		await ctx.reply(getText('modules', lang), {
			parse_mode: 'Markdown',
			reply_markup: {
				inline_keyboard: jobs.map((job) => ({ text: job.name, callback_data: `job_${job.id}` })).map((button) => [button]),
			},
		});
	} catch (error) {
		console.error(error);
		await ctx.reply(getText('error', lang));
	}
});
bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
