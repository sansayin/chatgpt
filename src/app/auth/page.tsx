"use client"
import { useRouter } from 'next/router';
import React from 'react'
import {api} from "../../utils/api"
import { withTRPC } from '@trpc/next';
import { AppType } from 'next/dist/shared/lib/utils';
import type { AppRouter } from '~/server/api/root';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';

const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000',
    }),
  ],
});

function Page() {
  const models = client.openapi.getModels.useQuery()
  return (
    <>
      {models.data?models.data:"Nothing"}
    </>
  )
}
