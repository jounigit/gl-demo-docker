import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import macrosPlugin from 'vite-plugin-babel-macros'
import { resolve } from 'node:path'

const root = resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tsconfigPaths(), macrosPlugin()],
	resolve: {
		alias: {
			'@': resolve(root),
			components: resolve(root, 'components'),
			features: resolve(root, 'features'),
			hooks: resolve(root, 'hooks'),
			store: resolve(root, 'store'),
			services: resolve(root, 'services'),
			styles: resolve(root, 'styles'),
			assets: resolve(root, 'assets')
		}
	}
})
