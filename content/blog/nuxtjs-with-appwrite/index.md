---
title: NuxtJS with Appwrite
description: Speed up your development projects by using nuxtjs and appwrite as back-end
published: true
published_at: '2021-08-31'
tags: nuxt, vue, appwrite, baas
cover_image: https://github.com/Hrdtr/nuxt-appwrite/blob/main/docs/static/preview-bg-white.png?raw=true
---

## What is Appwrite?

Appwrite is an end-to-end backend server that is aiming to abstract the complexity of common, complex, and repetitive tasks required for building a modern app.

Appwrite provides you with a set of APIs, tools, and a management console UI to help you build your apps a lot faster and in a much more secure way. Between Appwrite different services, you can find user authentication and account management, user preferences, database and storage persistence, cloud functions, localization, image manipulation, scheduled background tasks, and more.

## Preparation

Before starting make sure you have installed appwrite on the server and appwrite is running fine there, if you haven't installed it please open the [appwrite documentation](https://appwrite.io/docs) and install it on your server.

By the way the setup process is very easy.

## Getting Started

Lets create a new NuxtJS project

```bash
yarn create nuxt-app <project-name>
```
or using npm:
```bash
npm init nuxt-app <project-name>
```

After the the package successfully installed, add appwrite module for NuxtJS

```bash
$ cd <project-name>
$ yarn add nuxt-appwrite
```
or using npm:
```bash
$ cd <project-name>
$ npm i nuxt-appwrite <project-name>
```

Next, add nuxt-appwrite to the modules section of in `nuxt.config.js`

```js
export default {
  ...
  modules: ['nuxt-appwrite']
  ...
}
```

At this point, make sure we have an active project in appwrite, if not, please login to your appwrite console and create a new project, then go to project settings and copy the value from project id field.

Next, add appwrite object inside `nuxt.config.js` export and fill it with some options

```js
export default {
  ...
  modules: ['nuxt-appwrite'],
  appwrite: {
    endpoint: 'https://appwrite.example.com/v1', // appwrite endpoint
    project: '60046530a120d', // project id
  }
  ...
```

Great! We have successfully setup the Appwrite Web SDK in NuxtJS

From here, we can use `this.$appwrite` to access the SDK from clients side methods in NuxtJS (e.g. `mounted()`).

For example, we can fetch database document inside vue component like this:
```js
{
  ...
  mounted() {
    try {
      const res = this.$appwrite.database.getDocument(collectionID, documentID)
      this.document = res
    } catch (err) {
      console.log(err.message)
    }
  },
  ...
}
```

## Server Side User Action

To maximize the capabilities of NuxtJS, `$appwrite` also accessible from NuxtJS context. So we can access the SDK from server side too (e.g.`asyncData()`).

However, when doing SDK calls in your users scope from the server, it is not possible right away, since the HTTP-only cookie used for authentication is saved in the user's browser. That's why the Appwrite Web SDK allows to use JWT for authentication.

There are **additional steps** that must be taken so that our NuxtJS server instance knows who we are (the logged in user). that way, the server can get the same access rights according to the user who is currently logged in.

Below is an example code to set JWT using the APIs available in nuxt-appwrite module *(do it directly after the user has successfully logged in)*:

```js
this.$appwrite.account
  .createJWT()
  .then((response) => {
    console.log(response)
    this.$appwrite.utils.setJWT(response.jwt)
  })
  .catch((error) => {
    console.log(error)
  })
```
Once the JWT is set, we can use the user-scoped action on the Nuxt process.server context, asyncData and nuxtServerInit.

Don't forget to remove the JWT after the user logs out
```js
this.$appwrite
  .account.deleteSessions('current')
  .then(() => {
    this.$appwrite.utils.removeJWT()
  }, function (error) {
    console.log(error);
  });
```

By the way Appwrite has a public [community on discord](https://appwrite.io/discord), you can join and find out more about Appwrite and if you run into any problems or difficulties people there are always there to help.