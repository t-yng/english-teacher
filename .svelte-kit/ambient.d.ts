
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://kit.svelte.dev/docs/configuration#env) (if configured).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
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
	export const OPENAI_API_KEY: string;
	export const LC_FIG_SET_PARENT: string;
	export const FIG_PID: string;
	export const MANPATH: string;
	export const npm_package_devDependencies_prettier: string;
	export const NODENV_ORIG_PATH: string;
	export const ZPLUG_LOG_LOAD_FAILURE: string;
	export const NODENV_SHELL: string;
	export const TERM_PROGRAM: string;
	export const npm_package_devDependencies_eslint_plugin_svelte: string;
	export const npm_package_scripts_playground_gpt: string;
	export const NODE: string;
	export const NODENV_DIR: string;
	export const INIT_CWD: string;
	export const PYENV_ROOT: string;
	export const npm_package_devDependencies_typescript: string;
	export const npm_package_devDependencies_prettier_plugin_svelte: string;
	export const npm_config_version_git_tag: string;
	export const TERM: string;
	export const SHELL: string;
	export const npm_package_devDependencies_vite: string;
	export const ZPLUG_LOADFILE: string;
	export const FIGTERM_SESSION_ID: string;
	export const npm_config_workspaces_nohoist_experimental: string;
	export const ZPLUG_LOG_LOAD_SUCCESS: string;
	export const HOMEBREW_REPOSITORY: string;
	export const TMPDIR: string;
	export const npm_config_10: string;
	export const npm_package_scripts_lint: string;
	export const npm_config_11: string;
	export const npm_config_init_license: string;
	export const TERM_PROGRAM_VERSION: string;
	export const npm_config_12: string;
	export const FPATH: string;
	export const npm_package_scripts_dev: string;
	export const npm_config_13: string;
	export const TERM_SESSION_ID: string;
	export const npm_package_devDependencies__sveltejs_kit: string;
	export const npm_config_registry: string;
	export const NODENV_ROOT: string;
	export const FIG_SET_PARENT_CHECK: string;
	export const NODENV_HOOK_PATH: string;
	export const npm_package_readmeFilename: string;
	export const ZPLUG_USE_CACHE: string;
	export const USER: string;
	export const npm_package_description: string;
	export const ZPLUG_ERROR_LOG: string;
	export const COMMAND_MODE: string;
	export const ZPLUG_PROTOCOL: string;
	export const SSH_AUTH_SOCK: string;
	export const __CF_USER_TEXT_ENCODING: string;
	export const npm_package_devDependencies_eslint: string;
	export const npm_execpath: string;
	export const npm_package_devDependencies_tslib: string;
	export const npm_package_devDependencies__typescript_eslint_eslint_plugin: string;
	export const npm_package_devDependencies_svelte: string;
	export const _ZPLUG_PREZTO: string;
	export const _ZPLUG_VERSION: string;
	export const PERIOD: string;
	export const npm_package_scripts_type_check: string;
	export const _ZPLUG_AWKPATH: string;
	export const npm_package_devDependencies__typescript_eslint_parser: string;
	export const npm_package_dependencies_diff: string;
	export const PATH: string;
	export const npm_config_argv: string;
	export const _: string;
	export const LaunchInstanceID: string;
	export const __CFBundleIdentifier: string;
	export const npm_config_9: string;
	export const TTY: string;
	export const PWD: string;
	export const npm_config_8: string;
	export const npm_package_scripts_preview: string;
	export const npm_lifecycle_event: string;
	export const LANG: string;
	export const npm_package_devDependencies__sveltejs_vite_plugin_svelte: string;
	export const npm_package_name: string;
	export const ITERM_PROFILE: string;
	export const npm_package_scripts_build: string;
	export const npm_config_version_commit_hooks: string;
	export const _ZPLUG_CONFIG_SUBSHELL: string;
	export const XPC_FLAGS: string;
	export const npm_package_devDependencies_vitest: string;
	export const _ZPLUG_OHMYZSH: string;
	export const ZPLUG_BIN: string;
	export const npm_package_devDependencies__types_diff: string;
	export const npm_config_1: string;
	export const npm_config_bin_links: string;
	export const _ZPLUG_URL: string;
	export const npm_config_0: string;
	export const npm_package_devDependencies_eslint_config_prettier: string;
	export const npm_config_3: string;
	export const XPC_SERVICE_NAME: string;
	export const npm_package_devDependencies__sveltejs_adapter_auto: string;
	export const npm_package_version: string;
	export const npm_config_2: string;
	export const npm_package_devDependencies_svelte_check: string;
	export const npm_config_5: string;
	export const ZPLUG_CACHE_DIR: string;
	export const SHLVL: string;
	export const HOME: string;
	export const COLORFGBG: string;
	export const npm_package_type: string;
	export const npm_config_4: string;
	export const npm_package_scripts_test: string;
	export const npm_config_7: string;
	export const LC_TERMINAL_VERSION: string;
	export const npm_package_dependencies_openai: string;
	export const npm_config_6: string;
	export const npm_config_save_prefix: string;
	export const npm_config_strict_ssl: string;
	export const ZPLUG_REPOS: string;
	export const ZPLUG_THREADS: string;
	export const HOMEBREW_PREFIX: string;
	export const npm_config_version_git_message: string;
	export const FIG_SET_PARENT: string;
	export const ITERM_SESSION_ID: string;
	export const LOGNAME: string;
	export const YARN_WRAP_OUTPUT: string;
	export const npm_package_scripts_format: string;
	export const npm_lifecycle_script: string;
	export const NODENV_VERSION: string;
	export const ZPLUG_FILTER: string;
	export const ZPLUG_HOME: string;
	export const npm_package_devDependencies__iconify_svelte: string;
	export const npm_config_version_git_sign: string;
	export const npm_config_ignore_scripts: string;
	export const npm_config_user_agent: string;
	export const INFOPATH: string;
	export const HOMEBREW_CELLAR: string;
	export const LC_TERMINAL: string;
	export const npm_package_devDependencies__types_eslint: string;
	export const npm_config_init_version: string;
	export const npm_config_ignore_optional: string;
	export const ZPLUG_ROOT: string;
	export const SQLITE_EXEMPT_PATH_FROM_VNODE_GUARDS: string;
	export const SECURITYSESSIONID: string;
	export const FIG_TERM: string;
	export const COLORTERM: string;
	export const npm_node_execpath: string;
	export const npm_config_version_tag_prefix: string;
	export const NODE_ENV: string;
}

/**
 * Similar to [`$env/static/private`](https://kit.svelte.dev/docs/modules#$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
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
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/master/packages/adapter-node) (or running [`vite preview`](https://kit.svelte.dev/docs/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://kit.svelte.dev/docs/configuration#env) (if configured).
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
		OPENAI_API_KEY: string;
		LC_FIG_SET_PARENT: string;
		FIG_PID: string;
		MANPATH: string;
		npm_package_devDependencies_prettier: string;
		NODENV_ORIG_PATH: string;
		ZPLUG_LOG_LOAD_FAILURE: string;
		NODENV_SHELL: string;
		TERM_PROGRAM: string;
		npm_package_devDependencies_eslint_plugin_svelte: string;
		npm_package_scripts_playground_gpt: string;
		NODE: string;
		NODENV_DIR: string;
		INIT_CWD: string;
		PYENV_ROOT: string;
		npm_package_devDependencies_typescript: string;
		npm_package_devDependencies_prettier_plugin_svelte: string;
		npm_config_version_git_tag: string;
		TERM: string;
		SHELL: string;
		npm_package_devDependencies_vite: string;
		ZPLUG_LOADFILE: string;
		FIGTERM_SESSION_ID: string;
		npm_config_workspaces_nohoist_experimental: string;
		ZPLUG_LOG_LOAD_SUCCESS: string;
		HOMEBREW_REPOSITORY: string;
		TMPDIR: string;
		npm_config_10: string;
		npm_package_scripts_lint: string;
		npm_config_11: string;
		npm_config_init_license: string;
		TERM_PROGRAM_VERSION: string;
		npm_config_12: string;
		FPATH: string;
		npm_package_scripts_dev: string;
		npm_config_13: string;
		TERM_SESSION_ID: string;
		npm_package_devDependencies__sveltejs_kit: string;
		npm_config_registry: string;
		NODENV_ROOT: string;
		FIG_SET_PARENT_CHECK: string;
		NODENV_HOOK_PATH: string;
		npm_package_readmeFilename: string;
		ZPLUG_USE_CACHE: string;
		USER: string;
		npm_package_description: string;
		ZPLUG_ERROR_LOG: string;
		COMMAND_MODE: string;
		ZPLUG_PROTOCOL: string;
		SSH_AUTH_SOCK: string;
		__CF_USER_TEXT_ENCODING: string;
		npm_package_devDependencies_eslint: string;
		npm_execpath: string;
		npm_package_devDependencies_tslib: string;
		npm_package_devDependencies__typescript_eslint_eslint_plugin: string;
		npm_package_devDependencies_svelte: string;
		_ZPLUG_PREZTO: string;
		_ZPLUG_VERSION: string;
		PERIOD: string;
		npm_package_scripts_type_check: string;
		_ZPLUG_AWKPATH: string;
		npm_package_devDependencies__typescript_eslint_parser: string;
		npm_package_dependencies_diff: string;
		PATH: string;
		npm_config_argv: string;
		_: string;
		LaunchInstanceID: string;
		__CFBundleIdentifier: string;
		npm_config_9: string;
		TTY: string;
		PWD: string;
		npm_config_8: string;
		npm_package_scripts_preview: string;
		npm_lifecycle_event: string;
		LANG: string;
		npm_package_devDependencies__sveltejs_vite_plugin_svelte: string;
		npm_package_name: string;
		ITERM_PROFILE: string;
		npm_package_scripts_build: string;
		npm_config_version_commit_hooks: string;
		_ZPLUG_CONFIG_SUBSHELL: string;
		XPC_FLAGS: string;
		npm_package_devDependencies_vitest: string;
		_ZPLUG_OHMYZSH: string;
		ZPLUG_BIN: string;
		npm_package_devDependencies__types_diff: string;
		npm_config_1: string;
		npm_config_bin_links: string;
		_ZPLUG_URL: string;
		npm_config_0: string;
		npm_package_devDependencies_eslint_config_prettier: string;
		npm_config_3: string;
		XPC_SERVICE_NAME: string;
		npm_package_devDependencies__sveltejs_adapter_auto: string;
		npm_package_version: string;
		npm_config_2: string;
		npm_package_devDependencies_svelte_check: string;
		npm_config_5: string;
		ZPLUG_CACHE_DIR: string;
		SHLVL: string;
		HOME: string;
		COLORFGBG: string;
		npm_package_type: string;
		npm_config_4: string;
		npm_package_scripts_test: string;
		npm_config_7: string;
		LC_TERMINAL_VERSION: string;
		npm_package_dependencies_openai: string;
		npm_config_6: string;
		npm_config_save_prefix: string;
		npm_config_strict_ssl: string;
		ZPLUG_REPOS: string;
		ZPLUG_THREADS: string;
		HOMEBREW_PREFIX: string;
		npm_config_version_git_message: string;
		FIG_SET_PARENT: string;
		ITERM_SESSION_ID: string;
		LOGNAME: string;
		YARN_WRAP_OUTPUT: string;
		npm_package_scripts_format: string;
		npm_lifecycle_script: string;
		NODENV_VERSION: string;
		ZPLUG_FILTER: string;
		ZPLUG_HOME: string;
		npm_package_devDependencies__iconify_svelte: string;
		npm_config_version_git_sign: string;
		npm_config_ignore_scripts: string;
		npm_config_user_agent: string;
		INFOPATH: string;
		HOMEBREW_CELLAR: string;
		LC_TERMINAL: string;
		npm_package_devDependencies__types_eslint: string;
		npm_config_init_version: string;
		npm_config_ignore_optional: string;
		ZPLUG_ROOT: string;
		SQLITE_EXEMPT_PATH_FROM_VNODE_GUARDS: string;
		SECURITYSESSIONID: string;
		FIG_TERM: string;
		COLORTERM: string;
		npm_node_execpath: string;
		npm_config_version_tag_prefix: string;
		NODE_ENV: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
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
