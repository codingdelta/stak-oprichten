import OpenAI from "openai";
import type { ITask } from "./agents/contentMarketer/task";

export const openai = new OpenAI({
  apiKey: useRuntimeConfig().openAI,
});

export async function call({ systemMessage, task, prompt }: { systemMessage: string; task: ITask; prompt: string }): Promise<string> {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: systemMessage,
      },
      {
        role: "user",
        content: "We verwachten JSON output.",
      },
      {
        role: "user",
        content: task.description,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    response_format: {
      type: "json_object",
    },
  });
  if (!response) throw new Error("No response from OpenAI");
  return response.choices[0].message.content!;
}
