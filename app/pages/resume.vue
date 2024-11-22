<script setup lang="ts">
definePageMeta({
  layout: false,
})
useSeoMeta({
  title: 'Resume',
})

const works = [
  {
    company: 'AM Collective',
    title: 'Techical Lead Lead',
    dates: 'Aug 2022 - Present',
    description: 'I am responsible for planning, managing, and executing both client and in-house technology projects. My role involves overseeing the entire project lifecycle—from initial concept to final delivery—while ensuring adherence to timelines, budget constraints, and quality standards. I collaborate closely with cross-functional teams to align technical solutions with business goals and drive the successful implementation of innovative, scalable, and efficient systems.',
  },
  {
    company: 'Jogja Node',
    title: 'DevOps Engineer',
    dates: 'Jul 2023 - Oct 2024',
    description: 'I managed the transition of workflows from GitLab to GitHub, ensuring a seamless migration process. I automated key processes, including release management, changelog generation, and versioning to enhance efficiency and reduce manual effort. My work focused on optimizing CI/CD pipelines and improving the overall development workflow, enabling the team to deliver projects faster and more reliably.',
  },
  {
    company: 'Jogja Node',
    title: 'Front-End Engineer',
    dates: 'Jul 2022 - Jun 2023',
    description: 'As a Frontend Developer at JogjaNode, I worked on diverse private client projects across multiple industries. I advocated for modern development practices, leading the transition away from jQuery and usage of more flexible tools like TailwindCSS. I contributed to drafting a design system for improved consistency and scalability and established team-opinionated stacks to streamline project development. Additionally, I bootstrapped project repositories and collaborated closely with the team to deliver high-quality, maintainable solutions tailored to client needs.',
  },
  {
    company: 'Picasso',
    title: 'Front-End Engineer',
    dates: 'Jul 2022 - Jun 2023',
    description: 'I contributed to the development and maintenance of various hotel-related projects, including a reservation module, finance module, restaurant POS system, and membership management panel. I collaborated with cross-functional teams to create user-friendly and scalable solutions, ensuring seamless functionality and responsiveness across devices. My responsibilities included designing intuitive interfaces, optimizing performance for faster load times, and delivering high-quality code that enhanced the overall user experience. Through these efforts, I played a key role in streamlining hotel operations and improving customer engagement.',
  },
  {
    company: 'Freelance',
    title: 'Full-Stack Developer & Photo/Videographer',
    dates: 'Mar 2016 - Jun 2022',
    description: 'I provide a diverse range of services, such as web/app development, software development, graphic design, and photo/video production. With each project I undertake, I continually expand my knowledge and expertise in these areas.',
  },
  {
    company: 'Apurva Digital',
    title: 'Technical Lead',
    dates: 'May 2020 - Jan 2021',
    description: 'Embarking on the journey of building a digital marketing agency from scratch.',
  },
  // {
  //   company: 'Cicil.co.id',
  //   title: 'Student Ambassador',
  //   dates: 'May 2018 - Aug 2020',
  //   description: 'Here I have discovered a fresh perspective on the functioning of startup organizations.'
  // },
  {
    company: 'Cicil.co.id',
    title: 'Marketing Operation Intern',
    dates: 'Apr 2019 - Dec 2019',
    description: 'I focused on automating processes to enhance the efficiency of the marketing team. My contributions included developing an email blast system to streamline outreach efforts, automating the generation and signing of Memorandums of Understanding (MoUs), and supporting other operational tasks to reduce manual workload. These initiatives helped optimize marketing workflows and improve team productivity.',
  },
  // {
  //   company: 'Pisang Keju S3',
  //   title: 'Product & Content Designer',
  //   dates: 'Mar 2019 - Oct 2019',
  //   description: 'Focused on handling product promotions and designing offline advertisements. I have also developed expertise in creating strategic Instagram plans and crafting compelling content for the platform.'
  // }
]

const educations = [
  {
    instance: 'Mercu Buana University of Yogyakarta',
    dates: '2016 - 2021',
    title: 'Bachelor of Psychology',
    description: 'Focused on Industrial and Organizational Psychology',
  },
]

const awards = [
  {
    instance: 'Umbrella',
    title: 'Training Speaker',
    event: 'Mengoptimalkan Kreativitas dalam Menunjang Pengorganisasian di Era Digital',
    dates: 'April 6th, 2021',
  },
  {
    instance: 'Umbrella',
    title: 'Training Speaker & Judge',
    event: 'Creative Campaign Video Contest',
    dates: 'July 6th, 2020',
  },
  {
    instance: 'Cicil.co.id',
    title: 'Lifetime Achievement Award',
    event: 'As a Cicil Student Ambassador',
    dates: 'November 3rd, 2020',
  },
]

const skills = [
  'https://img.shields.io/badge/github%20actions-%232671E5.svg?style=flat&logo=githubactions&logoColor=white: Github Actions',
  'https://img.shields.io/badge/circle%20ci-%23161616.svg?style=flat&logo=circleci&logoColor=white: Circle CI',
  'https://img.shields.io/badge/gitlab%20ci-%23181717.svg?style=flat&logo=gitlab&logoColor=white: Gitlab CI',
  'https://img.shields.io/badge/Firebase-039BE5?style=flat&logo=Firebase&logoColor=white: Firebase',
  'https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=flat&logo=mongodb&logoColor=white: MongoDB',
  'https://img.shields.io/badge/postgres-%23316192.svg?style=flat&logo=postgresql&logoColor=white: PostgreSQl',
  'https://img.shields.io/badge/redis-%23DD0031.svg?style=flat&logo=redis&logoColor=white: Redis',
  'https://img.shields.io/badge/SurrealDB-FF00A0?style=flat&logo=surrealdb&logoColor=white: SurrealDB',
  'https://img.shields.io/badge/Adobe%20Creative%20Cloud-DA1F26.svg?style=flat&logo=Adobe%20Creative%20Cloud&logoColor=white: Adobe Creative Cloud',
  'https://img.shields.io/badge/affinity%20desginer-%231B72BE.svg?style=flat&logo=affinity-designer&logoColor=white: Affinity Designer',
  'https://img.shields.io/badge/affinityphoto-%237E4DD2.svg?style=flat&logo=affinity-photo&logoColor=white: Affinity Photo',
  'https://img.shields.io/badge/figma-%23F24E1E.svg?style=flat&logo=figma&logoColor=white: Figma',
  'https://img.shields.io/badge/Sketch-FFB387?style=flat&logo=sketch&logoColor=black: Sketch',
  'https://img.shields.io/badge/deno%20js-000000?style=flat&logo=deno&logoColor=white: Deno',
  'https://img.shields.io/badge/Electron-191970?style=flat&logo=Electron&logoColor=white: Electron.JS',
  'https://img.shields.io/badge/expo-1C1E24?style=flat&logo=expo&logoColor=#D04A37: Expo',
  'https://img.shields.io/badge/express.js-%23404d59.svg?style=flat&logo=express&logoColor=%2361DAFB: Express.JS',
  'https://img.shields.io/badge/fastify-%23000000.svg?style=flat&logo=fastify&logoColor=white: Fastify',
  'https://img.shields.io/badge/Ionic-%233880FF.svg?style=flat&logo=Ionic&logoColor=white: Ionic',
  'https://img.shields.io/badge/Next-black?style=flat&logo=next.js&logoColor=white: NextJS',
  'https://img.shields.io/badge/node.js-6DA55F?style=flat&logo=node.js&logoColor=white: NodeJS',
  'https://img.shields.io/badge/Nuxt-002E3B?style=flat&logo=nuxtdotjs&logoColor=#00DC82: Nuxt',
  'https://img.shields.io/badge/nx-143055?style=flat&logo=nx&logoColor=white: NX',
  'https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=flat&logo=pnpm&logoColor=f69220: PNPM',
  'https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB: React',
  'https://img.shields.io/badge/react_native-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB): React Native',
  'https://img.shields.io/badge/Socket.io-black?style=flat&logo=socket.io&badgeColor=010101: Socket.IO',
  'https://img.shields.io/badge/svelte-%23f1413d.svg?style=flat&logo=svelte&logoColor=white: Svelte',
  'https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=flat&logo=tailwind-css&logoColor=white: TailwindCSS',
  'https://img.shields.io/badge/tauri-%2324C8DB.svg?style=flat&logo=tauri&logoColor=%23FFFFFF: Tauri',
  'https://img.shields.io/badge/unocss-333333.svg?style=flat&logo=unocss&logoColor=white: UnoCSS',
  'https://img.shields.io/badge/vite-%23646CFF.svg?style=flat&logo=vite&logoColor=white: Vite',
  'https://img.shields.io/badge/vuejs-%2335495e.svg?style=flat&logo=vuedotjs&logoColor=%234FC08D: VueJS',
  'https://img.shields.io/badge/webpack-%238DD6F9.svg?style=flat&logo=webpack&logoColor=black: Webpack',
  'https://img.shields.io/badge/AWS-%23FF9900.svg?style=flat&logo=amazon-aws&logoColor=white: AWS',
  'https://img.shields.io/badge/Cloudflare-F38020?style=flat&logo=Cloudflare&logoColor=white: Cloudflare',
  'https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=flat&logo=google-cloud&logoColor=white: Google Cloud',
  'https://img.shields.io/badge/go-%2300ADD8.svg?style=flat&logo=go&logoColor=white: Golang',
  'https://img.shields.io/badge/javascript-%23323330.svg?style=flat&logo=javascript&logoColor=%23F7DF1E: Javascript',
  'https://img.shields.io/badge/markdown-%23000000.svg?style=flat&logo=markdown&logoColor=white: Markdown',
  'https://img.shields.io/badge/rust-%23000000.svg?style=flat&logo=rust&logoColor=white: Rust',
  'https://img.shields.io/badge/shell_script-%23121011.svg?style=flat&logo=gnu-bash&logoColor=white: Shell Script',
  'https://img.shields.io/badge/typescript-%23007ACC.svg?style=flat&logo=typescript&logoColor=white: TypeScript',
  'https://img.shields.io/badge/Prisma-3982CE?style=flat&logo=Prisma&logoColor=white: Prisma',
  'https://img.shields.io/badge/docker-%230db7ed.svg?style=flat&logo=docker&logoColor=white: Docker',
  'https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=flat&logo=kubernetes&logoColor=white: Kubernetes',
  'https://img.shields.io/badge/-Swagger-%23Clojure?style=flat&logo=swagger&logoColor=white: Swagger',
  'https://img.shields.io/badge/nginx-%23009639.svg?style=flat&logo=nginx&logoColor=white: Nginx',
  'https://img.shields.io/badge/Traefik-00a0c4?style=flat&logo=Traefik&logoColor=f8f3e0: Traefik',
  'https://img.shields.io/badge/Bun-f472b6?style=flat&logo=Bun&logoColor=f8f3e0: Bun',
]

const contacts = [
  {
    name: 'Website',
    text: 'hrdtr.dev',
    link: 'https://www.hrdtr.dev/',
  },
  {
    name: 'Email',
    text: 'iam@icm.hrdtr.dev',
    link: 'mailto:iam@icm.hrdtr.dev',
  },
  {
    name: 'Github',
    text: 'https://github.com/Hrdtr',
    link: 'https://github.com/Hrdtr',
  },
  {
    name: 'X',
    text: 'https://twitter.com/hrdtr_',
    link: 'https://twitter.com/hrdtr_',
  },
  {
    name: 'Linkedin',
    text: 'https://www.linkedin.com/in/hrdtr',
    link: 'https://www.linkedin.com/in/hrdtr',
  },
]
</script>

<template>
  <div
    class="w-full max-w-screen-sm mx-auto flex flex-col gap-10 px-4 py-12"
    style="font-size: 15px;"
  >
    <div class="w-full flex flex-col gap-4">
      <div class="w-[96px] h-[96px] rounded-md overflow-hidden">
        <NuxtImg
          src="/pic.jpeg"
          width="96px"
          height="96px"
          format="webp"
          class="rounded-md scale-125 hover:scale-100 translate-y-2 hover:translate-y-0 translate-x-1 hover:translate-x-0 transition-transform"
        />
      </div>
      <div class="flex flex-col">
        <h1 class="text-lg font-medium">
          Herdi Tr.
        </h1>
        <span class="opacity-75">Technical Lead | Software Engineer</span>
      </div>
    </div>

    <div>
      <p>Hey, I'm Herdi. Skilled at transforming ideas into impactful code. Adept at designing robust solutions and optimizing performance. Passionate about pushing boundaries in the ever-evolving tech landscape.</p>
    </div>

    <div>
      <h2 class="font-medium mb-4">
        Work Experiences
      </h2>
      <table>
        <tbody>
          <tr
            v-for="(work, i) in works"
            :key="i"
          >
            <td class="pr-4 opacity-75 w-[140px]">
              <p>
                {{ work.company }}
              </p>
              <p class="text-sm opacity-75">
                {{ work.dates }}
              </p>
            </td>
            <td>
              <div>
                <h3>{{ work.title }}</h3>
                <p class="opacity-75">
                  {{ work.description }}
                </p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div>
      <h2 class="font-medium mb-4">
        Educations
      </h2>
      <table>
        <tbody>
          <tr
            v-for="(education, i) in educations"
            :key="i"
          >
            <td class="pr-4 opacity-75 w-[140px]">
              <p class="">
                {{ education.instance }}
              </p>
              <p class="text-sm opacity-75">
                {{ education.dates }}
              </p>
            </td>
            <td>
              <div>
                <h3>{{ education.title }}</h3>
                <p class="opacity-75">
                  {{ education.description }}
                </p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div>
      <h2 class="font-medium mb-4">
        Awards and Certificates
      </h2>
      <table>
        <tbody>
          <tr
            v-for="(award, i) in awards"
            :key="i"
          >
            <td class="pr-4 opacity-75 w-[140px]">
              <p class="">
                {{ award.instance }}
              </p>
              <p class="text-sm opacity-75">
                {{ award.dates }}
              </p>
            </td>
            <td>
              <div>
                <h3>{{ award.title }}</h3>
                <p class="opacity-75">
                  {{ award.event }}
                </p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div>
      <h2 class="font-medium mb-4">
        Skills and Expertise
      </h2>
      <div class="flex flex-wrap gap-2">
        <div
          v-for="skill in skills"
          :key="skill"
          class="grayscale hover:grayscale-0 transition-all"
        >
          <img
            v-if="skill.split(': ')[0]?.startsWith('https://')"
            :src="skill.split(': ')[0]"
            :alt="`${skill.split(': ')[1]}`"
            class="h-[24px]"
          >
          <div
            v-else
            class="h-[24px] bg-zinc-200 dark:bg-zinc-800 text-[0.60rem] leading-none tracking-widest font-black uppercase px-2 flex items-center justify-center cursor-default"
          >
            {{ skill.split(': ')[0] }}
          </div>
        </div>
      </div>
    </div>

    <div>
      <h2 class="font-medium mb-4">
        Contact & Social Media
      </h2>
      <table class="contact">
        <tbody>
          <tr
            v-for="(contact, i) in contacts"
            :key="i"
          >
            <td class="pr-4 opacity-75 w-[140px]">
              <p class="">
                {{ contact.name }}
              </p>
            </td>
            <td>
              <div>
                <a
                  :href="contact.link"
                  target="_blank"
                  class="inline-flex items-center"
                >{{ contact.text }}</a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
table tr:first-of-type td {
  @apply pt-0;
}
table:not(.contact) tr td {
  @apply py-2;
}
table.contact tr td {
  @apply py-1;
}
table tr:last-of-type td {
  @apply pb-0;
}
table tr {
  @apply align-top;
}
</style>
