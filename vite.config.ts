import react from '@vitejs/plugin-react';
import { readdir } from 'fs/promises';
import { defineConfig, loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

const autoFactoryImport = async () => {
  const factories: string[] = [];
  const path = './src/shared/factories';

  const files = await readdir(path);

  files.forEach((file) => {
    factories.push(`${path}/${file}`.replace('./src/', '').replace('.ts', ''));
  });

  return factories;
};


export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const factories = [...(await autoFactoryImport())];

  return {
    server: {
      host: true,
      proxy: {
        '/api': {
          target: env.API_HOST,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '/api'),
        },
        '/storage': {
          target: env.API_HOST,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/storage/, '/storage'),
        },
      },
    },
    plugins: [
      svgr({
        include: 'src/assets/icons/**/*.svg?react',
        esbuildOptions: { loader: 'tsx' },
        svgrOptions: {
          replaceAttrValues: {
            black: 'currentColor',
          },
          icon: true,
          svgo: true,
          typescript: true,
          expandProps: 'end',
          svgoConfig: {
            plugins: [
              {
                name: 'preset-default',
                params: {
                  overrides: {
                    removeViewBox: false,
                  },
                },
              },
            ],
          },
        },
      }),
      react({
        babel: {
          presets: ['./node_modules/atomic-router/babel-preset.js', 'effector-http-api/babel-preset'],
          plugins: [
            [
              'effector/babel-plugin', 
              { 
                addLoc: true, 
                factories 
              }, 
              'auto-factory',
            ],
          ],
        },
      }),
      tsconfigPaths(),
    ],
    test: {
      include: ['**/*.test.tsx', '**/*.test.ts'],
      globals: true,
      environment: 'happy-dom'
    },
  };
});
