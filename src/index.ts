#!/usr/bin/env bun
import { TypeScriptConfigGenerator } from "@amadeustech/lokus";
import { Command } from "commander";

const program = new Command();

program
	.name("lokus")
	.description("CLI for usage of Lokus library")
	.version("1.0.0");

program
	.command("generate-config")
	.argument("<file>", "Path to the Lokus dictionary file")
	.option(
		"-o, --output <output>",
		"Output file for the TypeScript config",
		"config.ts",
	)
	.option("-t, --type <type>", "Type of the config to generate", "typescript")
	.action(async (file, options) => {
		switch (options.type) {
			case "typescript": {
				const dictionary = await Bun.file(file).json();
				const config = new TypeScriptConfigGenerator().generateConfig(
					dictionary,
				);
				await Bun.write(options.output, config);
				console.log(
					`✅ TypeScript config generated successfully at ${options.output}`,
				);
				break;
			}
			default:
				console.error(
					"Unsupported config type. Currently only 'typescript' is supported.",
				);
				process.exit(1);
		}
	});

program.parse();
