// source.config.ts
import { defineDocs, defineConfig } from "fumadocs-mdx/config";
var docs = defineDocs({
  dir: "content/docs"
});
var source_config_default = defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      // Use Shiki's full bundled-languages set so uncommon langs
      // (caddyfile, nginx, ssh-config, dockerfile, ini, …) work.
      lazy: false,
      langs: [
        "bash",
        "shell",
        "sh",
        "js",
        "jsx",
        "ts",
        "tsx",
        "json",
        "yaml",
        "toml",
        "ini",
        "sql",
        "dockerfile",
        "nginx",
        "ssh-config",
        "log",
        "text",
        "md",
        "mdx",
        "html",
        "css"
      ]
    }
  }
});
export {
  source_config_default as default,
  docs
};
