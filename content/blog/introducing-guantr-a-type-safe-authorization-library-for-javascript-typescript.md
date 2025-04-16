---
title: "Introducing Guantr: A Type-Safe Authorization Library for JavaScript/TypeScript"
description: "Flexible, type-safe JavaScript library for efficient authorization and permission checking. Easily manage permissions, and context-aware access control with minimal overhead and a simple API."
published_at: 2025-04-09
cover_image: null
tags: ["JavaScript", "TypeScript", "Authorization", "AuthZ", "Open Source", "Node.js", "Web Development"]
---

Handling permissions and access control is a fundamental part of building almost any web application. Deciding *who* can do *what* with *which* resource can quickly become complex. While working on one of my own projects, I found myself needing a solution that was not only flexible but also highly type-safe, integrating seamlessly with my TypeScript codebase.

Existing solutions didn't quite fit the bill – some felt too restrictive, others lacked the compile-time safety I was looking for, and some involved deploying entirely separate services which felt like overkill for my needs at the time. This led me down the path of building a custom authorization logic layer directly within that application.

After running and refining this core logic in production, I realized it might be useful to others facing similar challenges. So, I decided to extract it, polish it up, add features like customizable storage, and release it as an open-source library: **Guantr**.

## What is Guantr?

Guantr is an **embedded authorization library for JavaScript and TypeScript**. Its primary goal is to provide a flexible and developer-friendly way to manage permissions directly within your application codebase, with a strong emphasis on type safety.

It's not a standalone service like some other authorization systems; instead, you integrate it as a library, define your rules using familiar JS/TS constructs, and check permissions where needed.

## Key Features

Here are some of the core ideas behind Guantr:

### 1. TypeScript First with `GuantrMeta`

Guantr shines when used with TypeScript. You can define your entire authorization model – resources, actions, data shapes, and context structure – using the `GuantrMeta` type.

```ts
import type { GuantrMeta } from 'guantr';

// Define your models and context shape
interface PostModel { id: string; authorId: string; status: string; }
interface UserContext { userId: string | null; roles: string[]; }

// Define the Meta type
type AppMeta = GuantrMeta<
  { // Resource Map
    post: { action: 'read' | 'edit' | 'delete'; model: PostModel; };
    // ... other resources
  },
  // Context Shape
  UserContext 
>;

// Use it during initialization
const guantr = await createGuantr<AppMeta>({ /* ... options ... */ });
```

This provides compile-time safety and autocompletion when defining rules and checking permissions, helping to catch errors early.

### 2. Flexible Condition System

Rules can include conditions for fine-grained control (ABAC/ReBAC patterns). Guantr uses a straightforward array syntax `[operator, operand]` for these conditions.

```ts
await guantr.setRules<AppMeta>(async (allow, deny) => {
  // Allow reading any post
  allow('read', 'post');

  // Allow editing a post IF its authorId matches the current user's ID
  allow('edit', ['post', { 
    authorId: ['eq', '$ctx.userId'] // Check resource property against context
  }]);

  // Deny deleting posts that are 'published'
  deny('delete', ['post', {
    status: ['eq', 'published'] // Check resource property
  }]);
});
```

### 3. Context Integration (`getContext` & `$ctx`)

Dynamic information, like the current user's ID or roles, can be injected via an asynchronous `getContext` function during initialization. This context is then accessible within rule conditions using the `$ctx.` prefix.

```ts
const guantr = await createGuantr<AppMeta>({
  getContext: async (): Promise<UserContext> => {
    const user = await getCurrentUser(); // Fetch user data per request
    return { userId: user?.id ?? null, roles: user?.roles ?? [] };
  }
});

// Rule using context (from previous example):
// allow('edit', ['post', { authorId: ['eq', '$ctx.userId'] }]); 
```

### 4. Pluggable Storage

While Guantr includes a simple `InMemoryStorage` by default, it defines a `Storage` interface. This allows you to implement custom adapters to persist and query rules from different backends like PostgreSQL, MySQL, Redis, MongoDB, etc., making it suitable for various architectures. Examples are included in the documentation.

## Who is Guantr For?

Guantr is likely a good fit if:

* You are working primarily within the JavaScript/TypeScript ecosystem.
* You prefer embedding authorization logic within your application rather than using a separate service.
* Type safety is a high priority for your team.
* You need fine-grained control based on resource attributes, user context, or relationships (ABAC/ReBAC).

## Getting Started

You can install it via npm (or your preferred package manager):

```sh
npm install guantr
```

Here's a minimal example:

```ts
import { createGuantr } from 'guantr';

async function main() {
  // 1. Initialize Guantr
  const guantr = await createGuantr();

  // 2. Set some rules
  await guantr.setRules((allow, deny) => {
    allow('read', 'article'); // Anyone can read articles
    allow('edit', ['article', { status: ['eq', 'draft'] }]); // Can edit only if status is 'draft'
  });

  // 3. Check permissions
  const draftArticle = { id: 1, status: 'draft' };
  const publishedArticle = { id: 2, status: 'published' };

  const canRead = await guantr.can('read', 'article'); // true
  const canEditDraft = await guantr.can('edit', ['article', draftArticle]); // true
  const canEditPublished = await guantr.can('edit', ['article', publishedArticle]); // false

  console.log({ canRead, canEditDraft, canEditPublished });
}

main();
```

## Learn More

This is just a brief introduction. You can find comprehensive guides, API references, and more examples in the official documentation: **[guantr.hrdtr.dev](https://guantr.hrdtr.dev)**

The core logic powering Guantr has proven useful in a real-world application, and my hope is that releasing it as an open-source library might help others who need a similar blend of flexibility and type safety for their authorization needs.

Feedback, suggestions, and contributions are highly appreciated! Check out the [GitHub repository](https://github.com/Hrdtr/guantr) if you're interested.

Thanks for reading!
