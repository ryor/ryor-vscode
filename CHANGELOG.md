# Change Log

All notable changes to the "ryor-vscode" extension will be documented in this file.

## [0.0.1] - 2024-09-10

### Added

- Initial TextMate language grammar files (.json file for use by extension created from .yaml source)
- Initial icons for both the extension and file explorer/other views (the latter a bit awkwardly left-padded with whitespace in order to line it up visually with other icons in the file explorer)
- Other files/values necessary for basic syntax highlighting extension

## [0.0.2] - 2024-09-14

### Changed

- Reduced minimum required VS Code version to 1.0.0

## [0.0.3] - 2024-10-31

### Changed

- All task value names are now expected to be kebab-case instead of camel-case

## [0.0.4] - 2024-11-09

### Changed

- Added support for JavaScript and TypeScript inline template function (ryor`...`) syntax highlighting

## [0.0.5] - 2024-11-09

### Changed

- Updated change log

## [0.0.6] - 2024-11-09

### Changed

- Grammar file fixes and tweaks

## [0.0.7] - 2024-11-29

### Added

- Variable definitions

### Changed

- Grammar file regex tweaks

### Removed

- Module path value in task definitions. Task modules must be in the same directory as the runner script and match the task name

## [0.0.9] - 2025-1-11

### Changed

- Source grammar file patterns updated with syntax changes
- Script function (r$) pattern added to inline grammar file

## [0.0.10] - 2025-1-12

### Changed

- RUNNER_ALIAS variable pattern removed from source grammar file

## [0.0.11] - 2025-1-18

### Changed

- CHILD_PROCESS_ENV values are now comma-seperated to match Deno's --allow-env/-E values
