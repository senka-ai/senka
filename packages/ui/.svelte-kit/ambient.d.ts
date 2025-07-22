
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```bash
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const NVM_INC: string;
	export const DISABLE_SPRING: string;
	export const npm_package_devDependencies__tailwindcss_typography: string;
	export const npm_package_devDependencies_prettier: string;
	export const npm_package_scripts_test_visual: string;
	export const CLAUDE_CODE_ENTRYPOINT: string;
	export const TERM_PROGRAM: string;
	export const NODE: string;
	export const INIT_CWD: string;
	export const _P9K_TTY: string;
	export const PYENV_ROOT: string;
	export const NVM_CD_FLAGS: string;
	export const ANDROID_HOME: string;
	export const npm_package_devDependencies_typescript: string;
	export const npm_package_devDependencies_prettier_plugin_svelte: string;
	export const npm_package_homepage: string;
	export const npm_package_exports___styles_css: string;
	export const npm_config_version_git_tag: string;
	export const TERM: string;
	export const SHELL: string;
	export const npm_package_devDependencies_vite: string;
	export const HOMEBREW_REPOSITORY: string;
	export const TMPDIR: string;
	export const npm_config_init_license: string;
	export const TERM_PROGRAM_VERSION: string;
	export const npm_package_scripts_dev: string;
	export const npm_package_exports___icons___types: string;
	export const ZDOTDIR: string;
	export const ORIGINAL_XDG_CURRENT_DESKTOP: string;
	export const MallocNanoZone: string;
	export const npm_config__InvisibleCommerce_registry: string;
	export const VIPSHOME: string;
	export const npm_package_exports___icons___svelte: string;
	export const npm_package_devDependencies__sveltejs_kit: string;
	export const npm_package_peerDependencies_tailwindcss: string;
	export const npm_package_exports___svelte: string;
	export const npm_config_registry: string;
	export const ENABLE_IDE_INTEGRATION: string;
	export const ZSH: string;
	export const npm_package_repository_url: string;
	export const GIT_EDITOR: string;
	export const OBJC_DISABLE_INITIALIZE_FORK_SAFETY: string;
	export const NVM_DIR: string;
	export const USER: string;
	export const npm_package_description: string;
	export const npm_package_license: string;
	export const npm_config__catalin_invisible_registry: string;
	export const COMMAND_MODE: string;
	export const npm_package_scripts_build_storybook: string;
	export const npm_package_devDependencies__tailwindcss_vite: string;
	export const npm_package_repository_directory: string;
	export const npm_package_scripts_story: string;
	export const CLAUDE_CODE_SSE_PORT: string;
	export const SSH_AUTH_SOCK: string;
	export const VSCODE_PROFILE_INITIALIZED: string;
	export const __CF_USER_TEXT_ENCODING: string;
	export const npm_package_devDependencies__storybook_sveltekit: string;
	export const npm_execpath: string;
	export const PAGER: string;
	export const npm_package_devDependencies_svelte: string;
	export const npm_package_author_name: string;
	export const LSCOLORS: string;
	export const BUNDLE_ENTERPRISE__CONTRIBSYS__COM: string;
	export const PATH: string;
	export const npm_config_argv: string;
	export const npm_package_scripts_typecheck: string;
	export const _: string;
	export const npm_package_exports___icons___default: string;
	export const npm_config_engine_strict: string;
	export const USER_ZDOTDIR: string;
	export const __CFBundleIdentifier: string;
	export const npm_package_keywords_4: string;
	export const PWD: string;
	export const npm_package_devDependencies_tailwindcss: string;
	export const npm_package_devDependencies__storybook_addon_svelte_csf: string;
	export const npm_package_keywords_5: string;
	export const JAVA_HOME: string;
	export const npm_package_bugs_url: string;
	export const npm_package_scripts_preview: string;
	export const OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE: string;
	export const P9K_SSH: string;
	export const npm_lifecycle_event: string;
	export const P9K_TTY: string;
	export const LANG: string;
	export const npm_package_devDependencies_storybook: string;
	export const npm_package_devDependencies__sveltejs_vite_plugin_svelte: string;
	export const npm_package_repository_type: string;
	export const npm_package_keywords_0: string;
	export const npm_package_types: string;
	export const npm_package_name: string;
	export const npm_package_keywords_1: string;
	export const npm_package_keywords_2: string;
	export const npm_package_scripts_build: string;
	export const npm_package_exports___types: string;
	export const npm_config_version_commit_hooks: string;
	export const VSCODE_GIT_ASKPASS_EXTRA_ARGS: string;
	export const XPC_FLAGS: string;
	export const npm_package_devDependencies_vitest: string;
	export const npm_package_keywords_3: string;
	export const npm_package_devDependencies__tailwindcss_forms: string;
	export const npm_package_devDependencies__chromatic_com_storybook: string;
	export const npm_config_bin_links: string;
	export const RBENV_SHELL: string;
	export const npm_package_main: string;
	export const XPC_SERVICE_NAME: string;
	export const npm_package_devDependencies__sveltejs_adapter_auto: string;
	export const npm_package_exports___components___types: string;
	export const npm_package_version: string;
	export const VSCODE_INJECTION: string;
	export const npm_package_devDependencies_svelte_check: string;
	export const PYENV_SHELL: string;
	export const SHLVL: string;
	export const HOME: string;
	export const npm_package_devDependencies_playwright: string;
	export const npm_package_exports___components___svelte: string;
	export const npm_package_type: string;
	export const VSCODE_GIT_ASKPASS_MAIN: string;
	export const npm_package_scripts_test: string;
	export const npm_config_save_prefix: string;
	export const npm_config_strict_ssl: string;
	export const HOMEBREW_PREFIX: string;
	export const npm_config_version_git_message: string;
	export const npm_package_exports___default: string;
	export const LESS: string;
	export const LOGNAME: string;
	export const YARN_WRAP_OUTPUT: string;
	export const PREFIX: string;
	export const npm_lifecycle_script: string;
	export const npm_package_peerDependencies_svelte: string;
	export const VSCODE_GIT_IPC_HANDLE: string;
	export const npm_package_devDependencies_prettier_plugin_tailwindcss: string;
	export const COREPACK_ENABLE_AUTO_PIN: string;
	export const NVM_BIN: string;
	export const GITHUB_TOKEN: string;
	export const npm_package_devDependencies__storybook_addon_docs: string;
	export const npm_config_version_git_sign: string;
	export const npm_config_ignore_scripts: string;
	export const npm_config_user_agent: string;
	export const VSCODE_GIT_ASKPASS_NODE: string;
	export const GIT_ASKPASS: string;
	export const INFOPATH: string;
	export const HOMEBREW_CELLAR: string;
	export const npm_package_devDependencies__types_node: string;
	export const npm_package_devDependencies__playwright_test: string;
	export const npm_package_files_2: string;
	export const npm_package_files_1: string;
	export const npm_package_files_0: string;
	export const npm_config_init_version: string;
	export const npm_config_ignore_optional: string;
	export const CLAUDECODE: string;
	export const npm_package_scripts_check: string;
	export const COLORTERM: string;
	export const npm_node_execpath: string;
	export const npm_package_exports___components___default: string;
	export const npm_config_version_tag_prefix: string;
	export const NODE_ENV: string;
}

/**
 * Similar to [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured).
 * 
 * This module cannot be imported into client-side code.
 * 
 * Dynamic environment variables cannot be used during prerendering.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		NVM_INC: string;
		DISABLE_SPRING: string;
		npm_package_devDependencies__tailwindcss_typography: string;
		npm_package_devDependencies_prettier: string;
		npm_package_scripts_test_visual: string;
		CLAUDE_CODE_ENTRYPOINT: string;
		TERM_PROGRAM: string;
		NODE: string;
		INIT_CWD: string;
		_P9K_TTY: string;
		PYENV_ROOT: string;
		NVM_CD_FLAGS: string;
		ANDROID_HOME: string;
		npm_package_devDependencies_typescript: string;
		npm_package_devDependencies_prettier_plugin_svelte: string;
		npm_package_homepage: string;
		npm_package_exports___styles_css: string;
		npm_config_version_git_tag: string;
		TERM: string;
		SHELL: string;
		npm_package_devDependencies_vite: string;
		HOMEBREW_REPOSITORY: string;
		TMPDIR: string;
		npm_config_init_license: string;
		TERM_PROGRAM_VERSION: string;
		npm_package_scripts_dev: string;
		npm_package_exports___icons___types: string;
		ZDOTDIR: string;
		ORIGINAL_XDG_CURRENT_DESKTOP: string;
		MallocNanoZone: string;
		npm_config__InvisibleCommerce_registry: string;
		VIPSHOME: string;
		npm_package_exports___icons___svelte: string;
		npm_package_devDependencies__sveltejs_kit: string;
		npm_package_peerDependencies_tailwindcss: string;
		npm_package_exports___svelte: string;
		npm_config_registry: string;
		ENABLE_IDE_INTEGRATION: string;
		ZSH: string;
		npm_package_repository_url: string;
		GIT_EDITOR: string;
		OBJC_DISABLE_INITIALIZE_FORK_SAFETY: string;
		NVM_DIR: string;
		USER: string;
		npm_package_description: string;
		npm_package_license: string;
		npm_config__catalin_invisible_registry: string;
		COMMAND_MODE: string;
		npm_package_scripts_build_storybook: string;
		npm_package_devDependencies__tailwindcss_vite: string;
		npm_package_repository_directory: string;
		npm_package_scripts_story: string;
		CLAUDE_CODE_SSE_PORT: string;
		SSH_AUTH_SOCK: string;
		VSCODE_PROFILE_INITIALIZED: string;
		__CF_USER_TEXT_ENCODING: string;
		npm_package_devDependencies__storybook_sveltekit: string;
		npm_execpath: string;
		PAGER: string;
		npm_package_devDependencies_svelte: string;
		npm_package_author_name: string;
		LSCOLORS: string;
		BUNDLE_ENTERPRISE__CONTRIBSYS__COM: string;
		PATH: string;
		npm_config_argv: string;
		npm_package_scripts_typecheck: string;
		_: string;
		npm_package_exports___icons___default: string;
		npm_config_engine_strict: string;
		USER_ZDOTDIR: string;
		__CFBundleIdentifier: string;
		npm_package_keywords_4: string;
		PWD: string;
		npm_package_devDependencies_tailwindcss: string;
		npm_package_devDependencies__storybook_addon_svelte_csf: string;
		npm_package_keywords_5: string;
		JAVA_HOME: string;
		npm_package_bugs_url: string;
		npm_package_scripts_preview: string;
		OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE: string;
		P9K_SSH: string;
		npm_lifecycle_event: string;
		P9K_TTY: string;
		LANG: string;
		npm_package_devDependencies_storybook: string;
		npm_package_devDependencies__sveltejs_vite_plugin_svelte: string;
		npm_package_repository_type: string;
		npm_package_keywords_0: string;
		npm_package_types: string;
		npm_package_name: string;
		npm_package_keywords_1: string;
		npm_package_keywords_2: string;
		npm_package_scripts_build: string;
		npm_package_exports___types: string;
		npm_config_version_commit_hooks: string;
		VSCODE_GIT_ASKPASS_EXTRA_ARGS: string;
		XPC_FLAGS: string;
		npm_package_devDependencies_vitest: string;
		npm_package_keywords_3: string;
		npm_package_devDependencies__tailwindcss_forms: string;
		npm_package_devDependencies__chromatic_com_storybook: string;
		npm_config_bin_links: string;
		RBENV_SHELL: string;
		npm_package_main: string;
		XPC_SERVICE_NAME: string;
		npm_package_devDependencies__sveltejs_adapter_auto: string;
		npm_package_exports___components___types: string;
		npm_package_version: string;
		VSCODE_INJECTION: string;
		npm_package_devDependencies_svelte_check: string;
		PYENV_SHELL: string;
		SHLVL: string;
		HOME: string;
		npm_package_devDependencies_playwright: string;
		npm_package_exports___components___svelte: string;
		npm_package_type: string;
		VSCODE_GIT_ASKPASS_MAIN: string;
		npm_package_scripts_test: string;
		npm_config_save_prefix: string;
		npm_config_strict_ssl: string;
		HOMEBREW_PREFIX: string;
		npm_config_version_git_message: string;
		npm_package_exports___default: string;
		LESS: string;
		LOGNAME: string;
		YARN_WRAP_OUTPUT: string;
		PREFIX: string;
		npm_lifecycle_script: string;
		npm_package_peerDependencies_svelte: string;
		VSCODE_GIT_IPC_HANDLE: string;
		npm_package_devDependencies_prettier_plugin_tailwindcss: string;
		COREPACK_ENABLE_AUTO_PIN: string;
		NVM_BIN: string;
		GITHUB_TOKEN: string;
		npm_package_devDependencies__storybook_addon_docs: string;
		npm_config_version_git_sign: string;
		npm_config_ignore_scripts: string;
		npm_config_user_agent: string;
		VSCODE_GIT_ASKPASS_NODE: string;
		GIT_ASKPASS: string;
		INFOPATH: string;
		HOMEBREW_CELLAR: string;
		npm_package_devDependencies__types_node: string;
		npm_package_devDependencies__playwright_test: string;
		npm_package_files_2: string;
		npm_package_files_1: string;
		npm_package_files_0: string;
		npm_config_init_version: string;
		npm_config_ignore_optional: string;
		CLAUDECODE: string;
		npm_package_scripts_check: string;
		COLORTERM: string;
		npm_node_execpath: string;
		npm_package_exports___components___default: string;
		npm_config_version_tag_prefix: string;
		NODE_ENV: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * Dynamic environment variables cannot be used during prerendering.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
