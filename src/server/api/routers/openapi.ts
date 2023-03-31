import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

import openai from "~/lib/chatgpt";

export const openapiRouter = createTRPCRouter({
  getModels: publicProcedure
    .query(async() => {
      const models = await openai.listModels().then((res) => { return res.data.data })
      const modelOptions = models.map((model) => ({
        value: model.id,
        label: model.id,
      }));
      return modelOptions
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
