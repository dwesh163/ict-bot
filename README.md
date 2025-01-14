# ICT-Bot

A [Telegram bot](https://telegram.org/blog/bot-revolution) that provides information about available modules for ICT apprentices (Federal VET Diploma) in Switzerland, covering all specializations:

-   Application Development
-   Platform Development
-   Business Informatics
-   System Engineering

## Modular System

> Swiss ICT vocational education is modular, meaning it consists of various modules describing specific operational competencies. The modular system contains all information about the modules and defines the mandatory content of ICT training. This modular system is public and freely available.

## Bot Usage

Contact [@ModulesICTBot](https://t.me/modulesIctBot) on Telegram.

```bash
docker run -d --name dwesh163/ict-bot -e TELEGRAM_BOT_TOKEN
```

## Available Commands

| Command                  | Description                                                 |
| ------------------------ | ----------------------------------------------------------- |
| `/start`                 | Initial bot command, displays help                          |
| `/help`, `/h`            | Shows help message (command descriptions)                   |
| `/module <ID>`           | Displays general information about a module based on its ID |
| `/search <keyword>`      | Searches for modules containing the specified keyword       |
| `/list`, `/all`          | Shows the list of all available modules                     |
| `/list <specialization>` | Shows modules for a specific specialization                 |
| `/jobs`                  | Shows the list of all specialization                        |
| `/info`                  | Provides general information about the bot                  |
| `/language`              | Changes the bot language to Italian, German or French       |

## Technical Details

-   Data is fetched from the API: `api-ict.kooked.app`
-   Module information is sourced from [ModulBaukasten](https://www.modulbaukasten.ch/)
-   Supports all ICT Federal VET Diploma specializations

## Useful Links

-   [ICT Professional Training](https://www.ict-berufsbildung.ch/en/vocational-education/)
-   [ModulBaukasten](https://www.modulbaukasten.ch/)
-   [Module Search](https://www.modulbaukasten.ch/module/search)
-   [Module Visualization](https://www.modulbaukasten.ch/module/visualization)
-   [Curriculum for Vocational Schools](https://www.ict-berufsbildung.ch/en/ict-vocational-education/vocational-school-curriculum/)

```

```
