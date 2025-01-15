# ICT-Bot

Un [bot Telegram](https://telegram.org/blog/bot-revolution) qui fournit des informations sur les modules disponibles pour les apprentis en informatique (CFC) en Suisse, couvrant toutes les spécialisations :

-   Développement d'applications
-   Développement de plateformes
-   Informatique de gestion
-   Ingénierie des systèmes
-   ... et bien d'autres

## Système modulaire

> La formation professionnelle en informatique en Suisse est modulaire, ce qui signifie qu'elle se compose de différents modules décrivant des compétences opérationnelles spécifiques. Le système modulaire contient toutes les informations sur les modules et définit le contenu obligatoire de la formation en informatique. Ce système modulaire est public et librement accessible.

## Utilisation du bot

Contactez [@ModulesICTBot](https://t.me/modulesIctBot) sur Telegram ou deployez votre propre instance du bot:

```bash
docker run -d --name dwesh163/ict-bot -e TELEGRAM_BOT_TOKEN=XXXX
```

## Commandes disponibles

| Commande                 | Description                                                 |
| ------------------------ | ----------------------------------------------------------- |
| `/start`                 | Commande initiale du bot, affiche l'aide                    |
| `/help`, `/h`            | Affiche un message d'aide (description des commandes)       |
| `/module <ID>`           | Affiche des informations générales sur un module via son ID |
| `/list`, `/all`          | Affiche la liste de tous les modules disponibles            |
| `/list <spécialisation>` | Affiche les modules d'une spécialisation spécifique         |
| `/jobs`                  | Affiche la liste de toutes les spécialisations              |
| `/info`                  | Fournit des informations générales sur le bot               |
| `/language`              | Change la langue du bot en italien, allemand ou français    |

## Détails techniques

-   Les données sont récupérées via l'API : `api-ict.kooked.app`
-   Les informations des modules proviennent de [ModulBaukasten](https://www.modulbaukasten.ch/)
-   Prend en charge toutes les spécialisations CFC en informatique

## Liens utiles

-   [Formation professionnelle en informatique](https://www.ict-berufsbildung.ch/fr/formation-professionnelle/)
-   [ModulBaukasten](https://www.modulbaukasten.ch/)
-   [Recherche de modules](https://www.modulbaukasten.ch/module/search)
-   [Visualisation des modules](https://www.modulbaukasten.ch/module/visualization)
-   [Plan d'études pour les écoles professionnelles](https://www.ict-berufsbildung.ch/fr/formation-professionnelle-informatique/ecoles-professionnelles/)
