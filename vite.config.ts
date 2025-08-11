import devtoolsJson from 'vite-plugin-devtools-json';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';
// import tailwindcss from '@tailwindcss/vite';



export default ({ mode } : any) => {
    // Load env varaibles
    process.env = {...process.env, ...loadEnv(mode, process.cwd(), '')};

    return defineConfig({
        plugins: [sveltekit(), devtoolsJson()],

        server: {
            watch: {usePolling: true,}, // Enable hot reload
            host: process.env.HOST! || '0.0.0.0',
            port: parseInt(process.env.PORT!) || 5000,
        },
    });
}
