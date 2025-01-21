---
title: Universal Persisted Storage for React Native Expo + Next.js SSR
description: Learn to unify state management for React Native and Next.js with Solito, Zustand, and Persist Middleware. Achieve cross-platform consistency effortlessly.
published_at: '2023-02-20'
tags: [react-native, expo, nextjs, zustand]
cover_image: null
---

The world of web development is marked by constant innovation, and developers are always on the lookout for tools and libraries that can simplify their workflows and make cross-platform development more efficient. In this article, we'll explore a powerful combination of technologies: React Native Expo, Next.js Server-Side Rendering (SSR), and some handy libraries like Fernando Rojo's Solito and Zustand with Persist Middleware. Together, these technologies enable the creation of cross-platform applications with universal storage capabilities.

## Bridging the Gap with Solito

At the heart of this cross-platform development approach is [Solito](https://solito.dev/), a library created by Fernando Rojo. Solito acts as the missing link that seamlessly bridges the gap between React Native and Next.js, enabling developers to build powerful cross-platform applications. It serves two primary purposes:

1. Navigation Simplified: Solito provides a tiny wrapper around React Navigation and Next.js, making it easy to share navigation code between native and web platforms. This means you can define your navigation logic once and use it across both platforms.

2. Patterns and Examples: Solito offers a set of patterns and examples that guide developers in building cross-platform apps with React Native and Next.js. It simplifies the development process by providing best practices and clear examples.

## Zustand with Persist Middleware

A crucial aspect of cross-platform development is managing state effectively. To achieve this, we turn to [Zustand](https://zustand-demo.pmnd.rs/), a state management library. Zustand, when coupled with the [Persist Middleware](https://docs.pmnd.rs/zustand/integrations/persisting-store-data), enables us to persist and manage application state consistently across platforms.

## Creating a Starter Project

To kickstart your journey into universal storage for React Native Expo + Next.js SSR, you can follow the guide provided by Solito: [Solito Starter Project](https://solito.dev/starter). This guide will help you set up the foundational structure of your project.

## Universal Persisted Storage Implementation

In the `/packages/app/storage.ts` file, we implement persist storage that utilizes cookies for Next.js/web and React Native MMKV on the native side. This setup allows your data to be accessible on the server side and in React Native:

```ts
import Cookies from 'js-cookie'
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string'
import { Platform } from 'react-native'
import { MMKV } from 'react-native-mmkv'
import { createJSONStorage, StateStorage } from 'zustand/middleware'

const mmkv = new MMKV()
const MMKVStorage: StateStorage = {
  getItem: (name) => {
    const value = mmkv.getString(name)
    if (!value) return null
    return value
  },
  setItem: (name, value) => {
    mmkv.set(name, value)
  },
  removeItem: (name) => {
    mmkv.delete(name)
  },
}

const CookieStorage: StateStorage = {
  getItem: (key) => {
    const value = Cookies.get(key)
    if (!value) return null
    return decompressFromEncodedURIComponent(value)
  },
  setItem: (key, value) => {
    Cookies.set(key, compressToEncodedURIComponent(value))
  },
  removeItem: (key) => {
    Cookies.remove(key)
  },
}

export const storage = {
  create: <T>() => {
    return createJSONStorage<T>(() => {
      if (Platform.OS !== 'web') return MMKVStorage
      return CookieStorage
    })
  },
}
```

## Zustand Store

We create a Zustand store in `/packages/app/stores/main.ts`, where we define the state we want to persist. In this example, we're persisting the disableParallaxEffect key:

```ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { storage } from './storage'

export namespace Main {
  export type State = {
    webHeaderHeight: number
    disableParallaxEffect: boolean
  }
}

export const main = create<Main.State>()(
  persist(
    (set, get) => ({
      webHeaderHeight: 0,
      disableParallaxEffect: false,
    }),
    {
      name: 'main-storage',
      storage: storage.create(),
      partialize: (state) => ({
        disableParallaxEffect: state.disableParallaxEffect,
      }),
    }
  )
)
```

## Addressing Hydration Mismatches

A challenge when persisting state in Next.js SSR is dealing with hydration mismatches. To address this issue, we make adjustments in the `/apps/next/pages/_app.tsx` file. This code ensures that the persisted state is correctly restored during server-side rendering:

```ts
App.getInitialProps = async (app: AppContext) => {
  const appProps = await NextApp.getInitialProps(app)

  const { req } = app.ctx
  if (req) { // if we're on the server
    const cookieStrings = req.headers.cookie || ''
    const cookies = Object.fromEntries(
      cookieStrings.split('; ')?.map((v) => v.split(/=(.*)/s)?.map(decodeURIComponent))
    )
    // Get and parse persisted main-storage cookie
    const mainStorageCookie = cookies['main-storage']
    const mainStorage = JSON.parse(
      mainStorageCookie
        ? decompressFromEncodedURIComponent(mainStorageCookie)
        : `{"state":{"disableParallaxEffect":false},"version":0}`
    ) as {
      state: { disableParallaxEffect: boolean }
      version: number
    }
    if (mainStorage.state) {
      // Set main state
      main.setState(mainStorage.state)
    }
  }

  return { ...appProps }
}
```

In this article, we've explored the fascinating world of universal storage for React Native Expo + Next.js SSR. By leveraging libraries like Solito, Zustand, and Persist Middleware, we can build cross-platform applications with shared state management, ensuring a consistent user experience across web and native platforms. The journey into cross-platform development continues to evolve, and these tools and patterns empower developers to tackle the challenges that come their way.

Feel free to explore and experiment with these technologies to enhance your cross-platform development projects. As always, stay curious and keep pushing the boundaries of what you can achieve in the world of web and mobile app development.
