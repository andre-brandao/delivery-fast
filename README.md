 if (templateName === 'batch') {
                nixExpression = batchToNix({
                    projectName: options.projectName || "Default Project",
                    description: options.description || "Default Description",
                    version: options.version || "1.0",
                });
            } else if (templateName === 'poc') {
                nixExpression = pocToNix({
                    projectName: options.projectName || "Default Project",
                    description: options.description || "Default Description",
                    version: options.version || "1.0",
                    deleteBase24: options.deleteBase24 || false,
                });

bun run ./uiv2/src/server.ts