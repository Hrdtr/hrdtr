<template>
  <div class="flex-1">
    <h1 class="text-3xl font-semibold mb-8">
      About Me
    </h1>
    <div class="prose dark:prose-invert">
      <p>
        I am a passionate software engineer with a deep love for crafting elegant and efficient solutions. With a strong foundation in programming languages and frameworks, I specialize in developing innovative software applications that make a difference. My journey in the world of technology has honed my skills in designing intuitive user interfaces, optimizing system performance, and tackling complex challenges with ease.
      </p>
      <p>
        Driven by an insatiable curiosity, I am constantly exploring emerging technologies and staying abreast of industry trends to ensure I am at the forefront of innovation. I believe in the power of collaboration and thrive in dynamic team environments, where I can contribute my expertise and learn from others.
      </p>
      <p>
        My dedication to excellence extends beyond writing code. I am committed to delivering high-quality results and exceeding client expectations. I take pride in my attention to detail, my ability to think critically, and my strong problem-solving skills.
      </p>
      <p>
        When I'm not immersed in coding, you can find me exploring the outdoors, diving into a good book, or tinkering with personal projects. I believe in the balance of work and play, as it fuels my creativity and inspires fresh perspectives.
      </p>
      <p>
        I am excited to take on new challenges, collaborate with like-minded individuals, and continue making an impact through technology. Let's connect and create something remarkable together.
      </p>
    </div>

    <h2 class="mt-12 mb-2">
      Let's Connect
    </h2>
    <div class="flex flex-row items-center gap-2">
      <NuxtLink
        target="_blank"
        external
        to="https://github.com/Hrdtr"
      >
        <UButton
          variant="soft"
          icon="i-heroicons-arrow-top-right-on-square scale-75 -ml-0.5"
          class="border border-primary/20"
        >
          Github
        </UButton>
      </NuxtLink>
      <NuxtLink
        target="_blank"
        external
        to="https://twitter.com/hrdtr_"
      >
        <UButton
          variant="soft"
          icon="i-heroicons-arrow-top-right-on-square scale-75 -ml-0.5"
          class="border border-primary/20"
        >
          X
        </UButton>
      </NuxtLink>
      <NuxtLink
        target="_blank"
        external
        to="https://www.linkedin.com/in/herdi-tr-778142170"
      >
        <UButton
          variant="soft"
          icon="i-heroicons-arrow-top-right-on-square scale-75 -ml-0.5"
          class="border border-primary/20"
        >
          Linkedin
        </UButton>
      </NuxtLink>
    </div>

    <h2 class="mt-8 mb-2">
      Contact
    </h2>
    <div class="flex flex-row gap-4">
      <div class="w-14 opacity-60">
        Email
      </div>
      <a
        href="mailto:iam@icm.hrdtr.dev"
        class="flex flex-row items-center group"
      >
        <span class="opacity-90 group-hover:opacity-100 transition-opacity">iam@icm.hrdtr.dev</span>
        <span class="i-heroicons-arrow-top-right-on-square ml-2 opacity-75" />
      </a>
    </div>
  </div>
</template>