@echo off

set cd=cd /home/dev/Projects/ryor-vscode
set run=deno --allow-run=cat,cp,deno,ls,mkdir,npm,rm,touch,./node_modules/.bin/js-yaml,./node_modules/.bin/ovsx,./node_modules/.bin/vsce -E=PATH -N=jsr.io,registry.npmjs.com -R=./ -W=./build,./deno.json,./dist,./tasks tasks/runner.ts --aliased

doskey tasks=%cd% ^& %run% $*
doskey build=%cd% ^& %run% build $*
doskey js-yaml=%cd% ^& %run% js-yaml $*
doskey log=%cd% ^& %run% log $*
doskey publish=%cd% ^& %run% publish $*
doskey update=%cd% ^& %run% update $*
doskey update-aliases=%cd% ^& %run% update-aliases $*