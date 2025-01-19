function tasks([ArgumentCompleter({'update-aliases', 'build', 'js-yaml', 'log', 'publish', 'update', 'update-aliases'})] $command, [Parameter(ValueFromRemainingArguments)] $args) {
  cd /home/dev/Projects/ryor-vscode
  deno --allow-run=cat,cp,deno,ls,mkdir,npm,rm,touch,./node_modules/.bin/js-yaml,./node_modules/.bin/ovsx,./node_modules/.bin/vsce -E=PATH -N=jsr.io,registry.npmjs.com -R=./ -W=./build,./deno.json,./dist,./tasks tasks/runner.ts --aliased $command $args
}
function build([Parameter(ValueFromRemainingArguments)] $args) { tasks build @args }
function js-yaml([Parameter(ValueFromRemainingArguments)] $args) { tasks js-yaml @args }
function log([Parameter(ValueFromRemainingArguments)] $args) { tasks log @args }
function publish([Parameter(ValueFromRemainingArguments)] $args) { tasks publish @args }
function update([Parameter(ValueFromRemainingArguments)] $args) { tasks update @args }
function update-aliases([Parameter(ValueFromRemainingArguments)] $args) { tasks update-aliases @args }