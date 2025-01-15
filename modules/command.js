const { getJobs, getModuleByJob, getModule } = require('./api');
const { getModulesText, getText, getJobsText, getModuleText } = require('./message');
const { getLang, setLang } = require('./languages');

const modulesCommand = async (ctx) => {
	try {
		const lang = getLang(ctx.from.id);
		if (ctx.message.text.split(' ')[1]) {
			const id = ctx.message.text.split(' ')[1];
			const lang = getLang(ctx.from.id);
			const modules = await getModuleByJob(id, lang);
			if (modules.error) {
				await ctx.reply(getText('job_not_found', lang));
				return;
			}
			const messages = getModulesText(modules, lang);

			for (let i = 0; i < messages.length; i++) {
				await ctx.reply(messages[i], {
					parse_mode: 'Markdown',
				});
			}
		} else {
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
		}
	} catch (error) {
		console.error(error);
		await ctx.reply(getText('error', getLang(ctx.from.id)));
	}
};

const moduleCommand = async (ctx) => {
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
};

const jobsCommand = async (ctx) => {
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
};

const languageCommand = async (ctx) => {
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
};

const callback = async (ctx) => {
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
};

module.exports = {
	modulesCommand,
	moduleCommand,
	jobsCommand,
	languageCommand,
	callback,
};
