<template>
  <svg
    id="h"
    viewBox="0 0 192 192"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none">
      <clipPath id="c1">
        <path
          id="_p1"
          d="M5.272 30.728A18 18 0 0 0 0 43.456V156c0 19.882 16.118 36 36 36h78v-60c0-9.942-8.058-18-18-18H78v42H48c-6.627 0-12-5.373-12-12V0L5.272 30.728Z"
        />
      </clipPath>
      <use
        id="p1"
        href="#_p1"
        clip-path="url(#c1)"
        stroke="currentColor"
      />
      <clipPath id="c2">
        <path
          id="_p2"
          d="M186.728 161.272A18 18 0 0 0 192 148.544V36c0-19.882-16.118-36-36-36H78v60c0 9.942 8.058 18 18 18h18V36h30c6.627 0 12 5.373 12 12v144l30.728-30.728Z"
        />
      </clipPath>
      <use
        id="p2"
        href="#_p2"
        clip-path="url(#c2)"
        stroke="currentColor"
      />
    </g>
  </svg>
</template>

<style scoped>
/*
* Prefixed by https://autoprefixer.github.io
* PostCSS: v8.4.14,
* Autoprefixer: v10.4.7
* Browsers: last 4 version
*/

#p1,
#p2 {
  stroke-width: 18;
  stroke-dasharray: 645.8245849609375;
  stroke-dashoffset: 645.8245849609375; /* -1291.6491699219; /* calc(645.8245849609375 * 2 * -1); */
  perspective: 1000;
  -webkit-perspective: 1000;
  -webkit-backface-visiblity: hidden;
}

#p1 {
  -webkit-animation:
    1.125s ease-in-out forwards dash,
    0.35s ease-in 1.125s forwards fill;
  animation:
    1.125s ease-in-out forwards dash,
    0.35s ease-in 1.125s forwards fill;
}
#p2 {
  -webkit-animation:
    1.125s ease-in-out forwards dash,
    0.35s ease-in 1.125s forwards fill;
  animation:
    1.125s ease-in-out forwards dash,
    0.35s ease-in 1.125s forwards fill;
}

@-webkit-keyframes dash {
  to {
    stroke-dashoffset: 0;
  }
}
@keyframes dash {
  to {
    stroke-dashoffset: 0;
  }
}

@-webkit-keyframes fill {
  to {
    stroke-width: 99;
  }
}
@keyframes fill {
  to {
    stroke-width: 99;
  }
}
</style>
