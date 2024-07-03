import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const signUpRouter = router({
  consult: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        name: z.string().min(1),
        phone: z.string(),
        company: z.string(),
      }),
    )
    .query(async ({ input }) => {
      try {
        const slack = await $fetch(useRuntimeConfig().slackWebhookUrl, {
          method: "post",
          body: JSON.stringify({
            blocks: [
              {
                type: "section",
                text: {
                  type: "plain_text",
                  text: "Has requested a consult",
                  emoji: true,
                },
              },
              {
                type: "section",
                fields: [
                  {
                    type: "mrkdwn",
                    text: "*Email*",
                  },
                  {
                    type: "plain_text",
                    text: input.email ? input.email : "empty",
                    emoji: true,
                  },
                  {
                    type: "mrkdwn",
                    text: "*Name*",
                  },
                  {
                    type: "plain_text",
                    text: input.name ? input.name : "empty",
                    emoji: true,
                  },
                  {
                    type: "mrkdwn",
                    text: "*Phone*",
                  },
                  {
                    type: "plain_text",
                    text: input.phone ? input.phone : "empty",
                    emoji: true,
                  },
                  {
                    type: "mrkdwn",
                    text: "*Company*",
                  },
                  {
                    type: "plain_text",
                    text: input.company ? input.company : "empty",
                    emoji: true,
                  },
                ],
              },
            ],
          }),
        });
        return "success";
      } catch (error: any) {
        throw createError(error);
      }
    }),
  contact: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        name: z.string().min(1),
        phone: z.string(),
        company: z.string(),
        message: z.string().min(1),
      }),
    )
    .query(async ({ input }) => {
      try {
        const slack = await $fetch(useRuntimeConfig().slackWebhookUrl, {
          method: "post",
          body: JSON.stringify({
            blocks: [
              {
                type: "section",
                text: {
                  type: "plain_text",
                  text: "Has requested a consult",
                  emoji: true,
                },
              },
              {
                type: "section",
                fields: [
                  {
                    type: "mrkdwn",
                    text: "*Email*",
                  },
                  {
                    type: "plain_text",
                    text: input.email ? input.email : "empty",
                    emoji: true,
                  },
                  {
                    type: "mrkdwn",
                    text: "*Name*",
                  },
                  {
                    type: "plain_text",
                    text: input.name ? input.name : "empty",
                    emoji: true,
                  },
                  {
                    type: "mrkdwn",
                    text: "*Phone*",
                  },
                  {
                    type: "plain_text",
                    text: input.phone ? input.phone : "empty",
                    emoji: true,
                  },
                  {
                    type: "mrkdwn",
                    text: "*Company*",
                  },
                  {
                    type: "plain_text",
                    text: input.company ? input.company : "empty",
                    emoji: true,
                  },
                  {
                    type: "mrkdwn",
                    text: "*Message*",
                  },
                  {
                    type: "plain_text",
                    text: input.message ? input.message : "empty",
                    emoji: true,
                  },
                ],
              },
            ],
          }),
        });
        return "success";
      } catch (error: any) {
        throw createError(error);
      }
    }),
});
