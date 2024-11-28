"use strict";
/// <reference types="vitest" />
/// <reference types="vite/client" />
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vite_1 = require("vite");
const vite_2 = require("vite");
const vite_tsconfig_paths_1 = __importDefault(require("vite-tsconfig-paths"));
exports.default = (0, vite_1.defineConfig)({
    plugins: [(0, vite_tsconfig_paths_1.default)()],
    test: {
        // allows you to use stuff like describe, it, vi without importing
        globals: true,
        env: (0, vite_2.loadEnv)('', process.cwd(), ''),
        // enable esbuild for all files that
        // disables multi-threading and runs test serially, you can change this
        // threads: false,
        environment: 'happy-dom',
        // Path to your setup script that we will go into detail below
        setupFiles: ['./tests/setup.integration.ts'],
        // Up to you, I usually put my integration tests inside of integration
        // folders
        include: ['./tests/integration/*.test.ts'],
        coverage: {
            provider: 'v8',
        },
    }
});
