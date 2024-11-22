<script setup lang="ts">
definePageMeta({
  layout: false,
})

const code = ref(`console.log("Hello, World!");`)
const codeSnapshot = ref('')
const output = ref<string>('')

const initializationScript = `<script>
  // Capture console methods
  const output = [];
  const methods = ["log", "info", "warn", "error", "debug", "clear"];
  const originalConsole = window.console;

  methods.forEach(method => {
    // Temporarily override the console methods
    const originalMethod = originalConsole[method];
    window.console[method] = (...args) => {
      output.push(\`%%:\${method.toUpperCase()}\n\${args.join(" ")}\`);
      originalMethod.apply(originalConsole, args); // Call the original method
    };
  });

  document.addEventListener("DOMContentLoaded", () => {
    window.parent.postMessage({ type: "consoleOutput", output }, "*");
  });
${'<'}/script>`

const srcdoc = computed(() => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Playground</title>
  </head>
  <body>
    ${initializationScript}
    <script type="module">${codeSnapshot.value}${'<'}/script>
  </body>
</html>
`)

const runKey = ref(0)
const runCode = () => {
  output.value = '' // Clear output
  codeSnapshot.value = code.value
  runKey.value++
}

// Listen for console output messages
useEventListener('message', (event) => {
  if (event.data.type === 'consoleOutput') {
    output.value += event.data.output.join('\n') + '\n'
  }
})
</script>

<template>
  <div class="w-full h-dvh flex flex-col relative bg-neutral-950 text-neutral-200">
    <div class="h-[50vh] flex-shrink-0">
      <CodeEditor
        v-model="code"
        :options="{ minimap: { enabled: false } }"
      />
    </div>
    <button
      class="p-2 bg-neutral-900 text-neutral-200 flex-shrink-0"
      @click="runCode"
    >
      Run Code
    </button>
    <div class="flex-1 overflow-y-auto px-4">
      <h3 class="sticky top-0 bg-neutral-950 text-neutral-200 z-10 py-2 text-sm">
        Console Output
      </h3>
      <div
        v-for="(line, index) in output.split('\n')"
        :key="index"
        class="text-sm"
      >
        <span
          v-if="line.startsWith('%%')"
          class="text-xs opacity-65"
        >{{ line.slice(3) }}:</span>
        <pre v-else>{{ line }}</pre>
      </div>
    </div>

    <iframe
      :key="runKey"
      :srcdoc="srcdoc"
      sandbox="allow-scripts"
      class="hidden"
    />
  </div>
</template>
