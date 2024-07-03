import { openai } from "../architecture/openai";
import fs from "fs";
import path from "path";

interface IOutlineResponse {
  outline: {
    title: string;
    description: string;
  }[];
  meta: {
    title: string;
    description: string;
    slug: string;
  };
}

export default defineTask({
  meta: {
    name: "content",
    description: "Run AI agent",
  },
  async run({ payload, context }) {
    const keyword = payload.keyword;
    console.log(`Start for ${keyword}`);
    let article = "";

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "Je bent de beste content marketeer ter wereld. Je schrijft blogs voor StakOprichten.nl. StackOprichten is een bedrijf dat zich specialiseert in medewerkersparticipatie, en specifiek het oprichten van Stichting Administratiekantoren. StakOprichten helpt bedrijven met het opzetten daarvan. Daarnaast helpen wij met aandelen, opties, stock appreciation rights, bonusregelingen en certificaten van aandelen. Je hebt een passie voor medewerkersparticipatie en wilt graag je kennis delen met anderen.",
        },
        {
          role: "user",
          content:
            "Je krijgt een keyword vanuit Google. Het is jouw taak om een outline te schrijven voor een blog over dit keyword. Optimaliseer de outline voor SEO. Houd slug ook kort en krachtig, geoptimaliseerd voor seo",
        },
        {
          role: "user",
          content: "We verwachten JSON output.",
        },
        {
          role: "user",
          content:
            "Output Een array met de naam van de paragraaf en de inhoud van de paragraaf. Output in JSON formaat, zoals: { outline: [{ title: 'Inleiding', description: '...' }, ...], meta: {title: '', description: '', slug: ''} }",
        },
        {
          role: "user",
          content: `Het keyword is ${keyword}. Maar je hoeft dit niet letterlijk over te nemen. Je kunt het keyword gebruiken als inspiratie voor de outline.`,
        },
      ],
      response_format: {
        type: "json_object",
      },
    });
    if (!response.choices[0].message.content) throw new Error("No response from OpenAI");

    const outline: IOutlineResponse = JSON.parse(response.choices[0].message.content);

    for (let i = 0; i < outline.outline.length; i++) {
      const paragraph = outline.outline[i];
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content:
              "Je bent de beste content marketeer ter wereld. Je schrijft blogs voor StakOprichten.nl. StackOprichten is een bedrijf dat zich specialiseert in medewerkersparticipatie, en specifiek het oprichten van Stichting Administratiekantoren. StakOprichten helpt bedrijven met het opzetten daarvan. Daarnaast helpen wij met aandelen, opties, stock appreciation rights, bonusregelingen en certificaten van aandelen. Je hebt een passie voor medewerkersparticipatie en wilt graag je kennis delen met anderen.",
          },
          {
            role: "user",
            content: `Voorheen heb je een outline geschreven over het keyword ${keyword}. Tot nu toe heb je de volgende paragrafen geschreven:
              ${article}.

              We moeten het artikel beginnen of afmaken. Ik geef je nu een onderdeel van de outline mee waar je een paragraaf over moet schrijven. Schrijf minimaal 6 zinnen per paragraaf. Schrijf het voor een publiek dat weinig kennis heeft. Schrijf ook voor B1 niveau (simpel Nederlands) 
              `,
          },
          {
            role: "user",
            content: `De titel van de paragraaf is ${paragraph.title} en inhoud moet gaan over ${paragraph.description}. Schrijf het in markdown, zodat ik het kan toevoegen aan het artikel. Schrijf het voor SEO en conversie, maak het dus makkelijk leesbaar en overtuigend.`,
          },
        ],
        response_format: {
          type: "text",
        },
      });
      // console.log(response.choices[0].message.content + "\n\n");
      console.log(`Paragraaf ${i + 1} van ${outline.outline.length} geschreven`);
      article += `${response.choices[0].message.content} \n\n`;
    }

    console.log(article);

    // const articleImproved = await openai.chat.completions.create({
    //   model: "gpt-4o",
    //   messages: [
    //     {
    //       role: "system",
    //       content:
    //         "Je bent de beste content redacteur ter wereld. Je schrijft blogs voor RoundE. RoundE is een bedrijf dat zich specialiseert in werknemersparticipaties. RoundE helpt bedrijven met het opzetten daarvan. Wij helpen met aandelen, opties, stock appreciation rights, bonusregelingen en certificaten van aandelen. Je hebt een passie voor medewerkersparticipatie en wilt graag je kennis delen met anderen. Maar je schrijft ook om mensen te converteren om onze diensten te gebruiken. Je moet dus ook commercieel schrijven.",
    //     },
    //     {
    //       role: "user",
    //       content: `Je taak voor vandaag is om een artikel aan te vullen. Het is geschreven door een junior redacteur, dus je mag alles verbeteren, maar houdt de lengte van het artikel ongeveer gelijk. Het artikel is in markdown, en je output moet een verbeterd artikel zijn, ook in markdown.
    //       Als het relevant is, kun je linken naar deze pagina's:
    //       - https://rounde.nl/plan/SAR
    //         - https://rounde.nl/plan/PAR
    //         - https://rounde.nl/plan/aandelen
    //         - https://rounde.nl/plan/opties
    //         - https://rounde.nl/plan/bonus
    //         - https://rounde.nl/plan/certificaten-van-aandelen
    //         - https://rounde.nl/survey (dit is een gratis tool / vragenlijst waarmee mensen snel kunnen achterhalen welke vorm van medewerkersparticipatie het beste bij hun bedrijf past)
    //         - https://rounde.nl/plan/vergelijken (een overzicht van alle vormen van medewerkersparticipatie)
    //         `,
    //     },
    //   ],
    // });

    // article = articleImproved.choices[0].message.content!;

    const articlePath = path.join(path.resolve(), `content/blog/${outline.meta.slug}.md`);

    article = `---
title: ${outline.meta.title}
description: ${outline.meta.description}
date: ${new Date().toISOString().split("T")[0]}
---
${article}`;

    fs.writeFileSync(articlePath, article, "utf-8");

    console.log("Article saved successfully");

    return { result: article };
  },
});
