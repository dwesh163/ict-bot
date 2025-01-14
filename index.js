const { Telegraf, Markup } = require('telegraf');
const dotenv = require('dotenv');
const { getJobs, getModuleByJob } = require('./modules/api');
const { getModulesText, getText, getJobsText } = require('./modules/message');
const { getLang } = require('./modules/languages');

dotenv.config();

console.log('Starting bot');

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply(getText('start', getLang(ctx.from.id))));
bot.help((ctx) => ctx.reply('Send me a sticker or use /modules to start.'));

bot.command('modules', async (ctx) => {
	try {
		const lang = getLang(ctx.from.id);
		const jobs = await getJobs(lang);

		await ctx.reply(getText('jobs_modules', lang), {
			parse_mode: 'Markdown',
			reply_markup: {
				inline_keyboard: jobs
					.map((job) => ({
						text: job.name.replace(getText('job_title', lang), '').charAt(0).toUpperCase() + job.name.replace(getText('job_title', lang), '').slice(1),
						callback_data: `job_${job.id}`,
					}))
					.map((button) => [button]),
			},
		});
	} catch (error) {
		console.error(error);
		await ctx.reply(getText('error', getLang(ctx.from.id)));
	}
});

bot.command('jobs', async (ctx) => {
	try {
		const lang = getLang(ctx.from.id);
		const jobs = await getJobs(lang);
		const formatted = getJobsText(jobs, lang);

		await ctx.reply(formatted, {
			parse_mode: 'Markdown',
		});
	} catch (error) {
		console.error(error);
		await ctx.reply(getText('error', getLang(ctx.from.id)));
	}
});

bot.on('callback_query', async (ctx) => {
	try {
		const callbackData = ctx.callbackQuery.data;

		if (callbackData.startsWith('job_')) {
			const id = callbackData.split('_')[1];
			const lang = getLang(ctx.from.id);
			const modules = await getModuleByJob(id, lang);
			const messages = getModulesText(modules, lang);

			await ctx.editMessageText(messages[0], {
				parse_mode: 'Markdown',
			});

			for (let i = 1; i < messages.length; i++) {
				await ctx.reply(messages[i], {
					parse_mode: 'Markdown',
				});
			}
		}
	} catch (error) {
		console.error(error);
		await ctx.answerCbQuery(getText('error', getLang(ctx.from.id)));
	}
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
