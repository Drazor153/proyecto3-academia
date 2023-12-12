/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_SERVER_HOST: string;
	// más variables de entorno...
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
