const { Telegraf, Markup } = require('telegraf');
const dotenv = require('dotenv');
const { getJobs, getModuleByJob, getModule } = require('./modules/api');
const { getModulesText, getText, getJobsText, getModuleText } = require('./modules/message');
const { getLang, setLang } = require('./modules/languages');

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

bot.command('module', async (ctx) => {
	try {
		const lang = getLang(ctx.from.id);
		const module = await getModule(ctx.message.text.split(' ')[1], lang);
		if (!module) {
			await ctx.reply(getText('module_not_found', lang));
			return;
		}

		const text = getModuleText(module, lang);
		await ctx.reply(text, {
			parse_mode: 'Markdown',
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

bot.command('language', async (ctx) => {
	try {
		const lang = getLang(ctx.from.id);
		await ctx.reply(getText('choose_language', lang || 'de'), {
			reply_markup: {
				inline_keyboard: [
					[
						{ text: '🇩🇪 Deutsch', callback_data: 'lang_de' },
						{ text: '🇮🇹 Italiano', callback_data: 'lang_it' },
						{ text: '🇫🇷 Français', callback_data: 'lang_fr' },
					],
				],
			},
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
		} else if (callbackData.startsWith('lang_')) {
			const lang = callbackData.split('_')[1];
			setLang(ctx.from.id, lang);
			await ctx.editMessageText(getText('language_changed', lang), {
				parse_mode: 'Markdown',
			});
		}
	} catch (error) {
		console.error(error);
		await ctx.answerCbQuery(getText('error', getLang(ctx.from.id)));
	}
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
