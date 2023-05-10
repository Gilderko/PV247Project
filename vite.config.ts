import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		svgr(),
		VitePWA({
			registerType: 'autoUpdate',
			includeAssets: ['tableIcon.svg', 'webSitePreview.png'],
			manifest: {
				short_name: 'Furni 3D',
				name: 'Furni 3D',
				description:
					'The best furniture shop with 3D previews of the furniture :)',
				icons: [
					{
						src: '/grid.svg',
						type: 'image/svg+xml',
						sizes: '48x48 192x192 512x512'
					}
				],
				theme_color: '#f2d45c',
				background_color: '#ffffff'
			}
		})
	]
});
