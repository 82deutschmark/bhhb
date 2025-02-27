// ESBuild configuration for server build
export default {
  entryPoints: ['server/index.ts'],
  bundle: true,
  platform: 'node',
  format: 'esm',
  outfile: 'dist/index.js',
  external: [
    'fs/promises',
    'node:fs/promises',
    'node:http2',
    'node:perf_hooks',
    'node:v8',
    'node:worker_threads',
    'lightningcss'
  ],
  define: {
    'process.env.NODE_ENV': '"production"'
  }
}

// ESBuild configuration for worker build
export const workerConfig = {
  entryPoints: ['server/worker.ts'],
  bundle: true,
  platform: 'node',
  format: 'esm',
  outfile: 'dist/worker.js',
  external: [
    'fs/promises',
    'node:fs/promises',
    'node:http2',
    'node:perf_hooks',
    'node:v8',
    'node:worker_threads',
    'lightningcss'
  ],
  define: {
    'process.env.NODE_ENV': '"production"'
  }
}