import { environment } from "./environment";

import OpenAI from "openai";

if (!environment.openaiApiKey) {
  throw new Error("Missing OpenAI API key. Check OPENAI_API_KEY in .env");
}

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: environment.openaiApiKey,
});

export const DEFAULT_MODEL = "deepseek-chat";

process.env["OPENAI_API_KEY"] = environment.openaiApiKey;

export const llm = {
  completion: async (params: any) => {
    const response = await openai.chat.completions.create({
      messages: params.messages,
      model: DEFAULT_MODEL,
      temperature: params.temperature,
      max_tokens: params.max_tokens,
      stream: false,
    });

    return {
      choices: [
        {
          message: {
            content: response.choices[0]?.message?.content || "",
            role: response.choices[0]?.message?.role || "assistant",
          },
        },
      ],
    };
  },
};
