<script setup lang="ts">
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string'

definePageMeta({
  layout: 'play',
})

const route = useRoute()

const iframeEl = useTemplateRef('iframeElRef')
const code = ref(route.query.code && typeof route.query.code === 'string'
  ? JSON.parse(decompressFromEncodedURIComponent(route.query.code))
  : {
      js: `import { ofetch } from 'https://esm.sh/ofetch'\n\nconst res = await ofetch('https://jsonplaceholder.typicode.com/todos/1')\nconsole.log(res)\n`,
    })
const codeSnapshot = ref({ ...code.value })
const consoleOutput = ref<string>('')

const initializationScript = `
// Capture console methods
function serializeForConsole(obj, depth = 0, maxDepth = 2) {
  if (depth > maxDepth) return '[Object]';
  
  if (obj === null) return 'null';
  if (obj === undefined) return 'undefined';
  
  // Handle primitive types
  if (typeof obj !== 'object' && typeof obj !== 'function') {
    return String(obj);
  }
  
  // Handle Response objects
  if (obj instanceof Response) {
    return \`[Response: \${obj.status}\${obj.statusText ? ' ' + obj.statusText : ''}]\`;
  }
  
  // Handle promises
  if (obj instanceof Promise) {
    return '[Promise]';
  }
  
  // Handle functions
  if (typeof obj === 'function') {
    return '[Function: ' + (obj.name || 'anonymous') + ']';
  }
  
  // Handle arrays
  if (Array.isArray(obj)) {
    if (depth === maxDepth) return '[Array]';
    const items = obj.map(item => serializeForConsole(item, depth + 1, maxDepth));
    return \`[\${items.join(', ')}]\`;
  }
  
  // Handle DOM elements
  if (obj instanceof Element) {
    return \`[Element: <\${obj.tagName.toLowerCase()}\${
      obj.id ? ' id="' + obj.id + '"' : ''
    }\${
      obj.className ? ' class="' + obj.className + '"' : ''
    }>]\`;
  }
  
  // Handle Error objects
  if (obj instanceof Error) {
    return \`[Error: \${obj.message}]\`;
  }
  
  // Handle Date objects
  if (obj instanceof Date) {
    return \`[Date: \${obj.toISOString()}]\`;
  }
  
  // Handle RegExp
  if (obj instanceof RegExp) {
    return obj.toString();
  }
  
  // Handle plain objects
  try {
    const seen = new Set();
    
    function serializer(key, value) {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) return '[Circular]';
        seen.add(value);
        
        if (value instanceof Response) return \`[Response: \${value.status} \${value.statusText}]\`;
        if (value instanceof Promise) return '[Promise]';
        if (value instanceof Element) return \`[Element: <\${value.tagName.toLowerCase()}>]\`;
        if (value instanceof Error) return \`[Error: \${value.message}]\`;
        if (value instanceof Date) return \`[Date: \${value.toISOString()}]\`;
      }
      if (typeof value === 'function') {
        return '[Function: ' + (value.name || 'anonymous') + ']';
      }
      return value;
    }
    
    return JSON.stringify(obj, serializer, 2);
  } catch (err) {
    return '[Unable to serialize object]';
  }
}

const methods = ["log", "info", "warn", "error", "debug", "clear"];
const originalConsole = window.console;

methods.forEach(method => {
  const originalMethod = originalConsole[method];
  window.console[method] = async (...args) => {
    window.parent.postMessage({
      type: "console-output",
      output: \`%%:\${method.toUpperCase()}\n\${args.map(arg => serializeForConsole(arg)).join(' ')}\`
    }, "*");
    originalMethod.apply(originalConsole, args);
  };
});

// Enhanced fetch proxy with Promise resolution
window.fetch = (url, options = {}) => {
  return new Promise((resolve, reject) => {
    // Generate unique request ID
    const requestId = Date.now() + Math.random().toString(36).substr(2, 9);
    
    // Setup response handler
    window.addEventListener('message', function responseHandler(event) {
      if (event.data?.type === 'fetch-response' && event.data?.requestId === requestId) {
        window.removeEventListener('message', responseHandler);
        
        if (event.data.error) {
          reject(new Error(event.data.error));
        } else {
          resolve(new Response(JSON.stringify(event.data.data), {
            status: event.data.status,
            headers: new Headers(event.data.headers)
          }));
        }
      }
    });

    // Send request to parent
    window.parent.postMessage({
      type: 'fetch',
      requestId,
      payload: { url, options: JSON.parse(JSON.stringify(options)) }
    }, '*');
  });
}`

const srcdoc = computed(() => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Playground</title>
    <script>${initializationScript}${'<'}/script>
  </head>
  <body>
    <script type="module">${codeSnapshot.value.js}${'<'}/script>
    <style>${codeSnapshot.value.css || ''}</style>
    ${codeSnapshot.value.html || ''}
  </body>
</html>
`)

const runKey = ref(0)
const runCode = () => {
  if (!iframeEl.value) return
  consoleOutput.value = ''
  codeSnapshot.value = { ...code.value }
  runKey.value++
}

// Enhanced message handler with response routing
useEventListener('message', async (event) => {
  if (event.data.type === 'console-output') {
    consoleOutput.value += event.data.output + '\n'
  }
  else if (event.data?.type === 'fetch') {
    const { requestId, payload } = event.data
    const { url, options } = payload

    try {
      const response = await $fetch(url, options)

      // Send response back to iframe with the matching requestId
      event.source?.postMessage({
        type: 'fetch-response',
        requestId,
        data: response,
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }
    catch (error) {
      // Send error back to iframe
      event.source?.postMessage({
        type: 'fetch-response',
        requestId,
        error: error instanceof Error ? error.message : String(error),
      })
    }
  }
})

const editorTab = ref('js')
const outputTab = ref('consoleOutput')

const hideEditorView = ref(false)
// const hideOutputView = ref(false)

const { copy } = useClipboard()
const share = async () => {
  await copy(location.origin + location.pathname + '?code=' + compressToEncodedURIComponent(JSON.stringify(code.value)))
  alert('URL copied to clipboard')
}
</script>

<template>
  <div class="w-full h-dvh flex flex-col relative overflow-hidden">
    <PlaygroundSection
      with-mobile-navigation-toggle
      class="h-[60dvh] flex-shrink-0 flex-col transition-all duration-300 ease-in-out"
      :class="hideEditorView ? '-mt-[60dvh]' : ''"
    >
      <template #toolbar>
        <div class="flex flex-row items-center justify-between gap-4">
          <!-- Tab js html css -->
          <div
            class="flex flex-row gap-1"
            role="tablist"
            aria-orientation="horizontal"
            tabindex="-1"
            dir="ltr"
          >
            <button
              class="px-2 py-1 flex-shrink-0 text-sm rounded transition inline-flex items-center"
              :class="editorTab === 'js' ? 'bg-background-content/10' : 'bg-background-content/5 hover:bg-background-content/10 opacity-65 hover:opacity-100'"
              type="button"
              role="tab"
              tabindex="0"
              :aria-selected="editorTab === 'js'"
              @click="editorTab = 'js'"
            >
              JavaScript
            </button>
          </div>

          <div class="flex flex-row gap-1">
            <button
              class="flex-shrink-0 inline-flex items-center justify-center p-1.5 text-sm rounded transition bg-background-content/5 hover:bg-background-content/10 opacity-65 hover:opacity-100"
              type="button"
              tabindex="0"
              @click="share"
            >
              <Icon
                name="lucide:share-2"
                class="w-4 h-4 opacity-75"
              />
            </button>
            <button
              class="px-2 py-1 flex-shrink-0 text-sm rounded transition inline-flex items-center bg-background-content/5 hover:bg-background-content/10 opacity-65 hover:opacity-100"
              type="button"
              tabindex="0"
              @click="runCode"
            >
              Run <Icon
                name="lucide:play"
                class="ml-1 -mr-0.5 opacity-75"
              />
            </button>
          </div>
        </div>
      </template>

      <div class="flex-shrink-0 flex-1 overflow-y-auto [&_.cm-wrapper]:max-w-[100dvw]">
        <CodeMirror
          v-model="code.js"
          :lang="() => import('@codemirror/lang-javascript').then(m => m.javascript())"
          @ready="({ view }) => view.focus()"
        />
      </div>
    </PlaygroundSection>

    <PlaygroundSection class="flex-shrink-0 flex-1 flex flex-col overflow-hidden">
      <template #toolbar>
        <div class="flex flex-row items-center justify-between gap-4">
          <div
            class="flex flex-row gap-1"
            role="tablist"
            aria-orientation="horizontal"
            tabindex="-1"
            dir="ltr"
          >
            <button
              class="px-2 py-1 flex-shrink-0 text-sm rounded transition inline-flex items-center"
              :class="outputTab === 'consoleOutput' ? 'bg-background-content/10' : 'bg-background-content/5 hover:bg-background-content/10 opacity-65 hover:opacity-100'"
              type="button"
              role="tab"
              tabindex="0"
              :aria-selected="outputTab === 'consoleOutput'"
              @click="outputTab = 'consoleOutput'"
            >
              Console Output
            </button>
          </div>
          <div class="flex flex-row gap-1">
            <button
              class="px-2 py-1 flex-shrink-0 text-sm rounded inline-flex items-center bg-background-content/5 hover:bg-background-content/10 opacity-65 hover:opacity-100"
              type="button"
              tabindex="0"
              @click="runCode"
            >
              Re-run <Icon
                name="lucide:rotate-ccw"
                class="ml-1 -mr-0.5 opacity-75"
              />
            </button>

            <button
              class="flex-shrink-0 inline-flex items-center justify-center p-1.5 text-sm rounded bg-background-content/5 hover:bg-background-content/10 opacity-65 hover:opacity-100"
              type="button"
              tabindex="0"
              :aria-label="hideEditorView ? 'Minimize output pane' : 'Maximize output pane'"
              @click="hideEditorView = !hideEditorView"
            >
              <Icon
                :name="hideEditorView ? 'lucide:minimize-2' : 'lucide:maximize-2'"
                class="w-4 h-4 opacity-75"
              />
            </button>
          </div>
        </div>
      </template>

      <div class="flex-1 overflow-y-auto p-2">
        <template v-if="outputTab === 'consoleOutput'">
          <div
            v-for="(line, index) in consoleOutput.split('\n')"
            :key="index"
            class="text-sm"
          >
            <span
              v-if="line.startsWith('%%')"
              class="text-xs opacity-65"
            >{{ line.slice(3) }}:</span>
            <pre v-else>{{ line }}</pre>
          </div>
        </template>

        <iframe
          ref="iframeElRef"
          :key="runKey"
          :srcdoc="srcdoc"
          class="hidden"
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    </PlaygroundSection>
  </div>
</template>
