function run([ArgumentCompleter({'aliases', 'build', 'js-yaml', 'log', 'publish', 'update'})] $command, [Parameter(ValueFromRemainingArguments)] $args) {
  cd /home/dev/Projects/ryor-vscode
  deno --allow-run=cat,cp,ls,mkdir,rm,touch,./node_modules/.bin/js-yaml,./node_modules/.bin/ovsx,./node_modules/.bin/vsce -E=PATH -N=jsr.io,registry.npmjs.com -R=./ -W=./build,./dist,./package.json,./tasks tasks/runner.ts --aliased $command $args
}
function build([Parameter(ValueFromRemainingArguments)] $args) { run build @args }
function js-yaml([Parameter(ValueFromRemainingArguments)] $args) { run js-yaml @args }
function log([Parameter(ValueFromRemainingArguments)] $args) { run log @args }
function publish([Parameter(ValueFromRemainingArguments)] $args) { run publish @args }
function update([Parameter(ValueFromRemainingArguments)] $args) { run update @args }