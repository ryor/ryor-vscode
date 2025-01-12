import { ryor } from '@ryor/ryor'

ryor`
CHILD_PROCESS_ENV PATH
DENO_PERMISSIONS --allow-run=cat,cp,ls,mkdir,rm,touch,./node_modules/.bin/js-yaml,./node_modules/.bin/ovsx,./node_modules/.bin/vsce -E=PATH -N=jsr.io,registry.npmjs.com -R=./ -W=./build,./dist,./package.json,./tasks
REQUIRED_RUNTIME deno

build Builds extension

js-yaml Converts grammar YAML files into JSON

log Logs a message with a timestamp, a message type icon character and an optional logger label
  --alert -a Uses the alert icon character: ⚠
  --bold -b Prints the label in bold
  --check -c Uses the check icon character: ✓
  --cross -x Uses the cross icon character: ✖
  --green -g Prints the icon character and label in green
  --italic -i Italicizes the label
  --label -l string The logger label
  --no-time -n Omits the timestamp
  --red -r Prints the icon character and label in red
  --timer-start -t Starts a timer
  --timer-stop -s Stops timer if started and outputs timer duration
  --yellow -y Prints the icon character and label in yellow
  --wait -w Uses the wait icon character: ⌛
  ...message string The log message

publish Publishes extension to the Open VSX Registry or the Visual Studio Marketplace
  --ovsx-token -o string Open VSX Registry access token (required)
  --vsce-token -v string Visual Studio Marketplace access token (required)

update Updates dependencies to their latest versions
`
