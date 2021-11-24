/* eslint-disable */
//prettier-ignore
module.exports = {
name: "@yarnpkg/plugin-kjo",
factory: function (require) {
var plugin=(()=>{var C=Object.create,p=Object.defineProperty;var O=Object.getOwnPropertyDescriptor;var K=Object.getOwnPropertyNames;var P=Object.getPrototypeOf,R=Object.prototype.hasOwnProperty;var A=e=>p(e,"__esModule",{value:!0});var i=e=>{if(typeof require!="undefined")return require(e);throw new Error('Dynamic require of "'+e+'" is not supported')};var F=(e,t)=>{for(var a in t)p(e,a,{get:t[a],enumerable:!0})},M=(e,t,a)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of K(t))!R.call(e,r)&&r!=="default"&&p(e,r,{get:()=>t[r],enumerable:!(a=O(t,r))||a.enumerable});return e},o=e=>M(A(p(e!=null?C(P(e)):{},"default",e&&e.__esModule&&"default"in e?{get:()=>e.default,enumerable:!0}:{value:e,enumerable:!0})),e);var I={};F(I,{default:()=>_});var w=o(i("@yarnpkg/cli")),$=o(i("@yarnpkg/core")),g=o(i("@yarnpkg/shell")),n;(function(a){a[a.ERROR=1]="ERROR",a[a.OK=0]="OK"})(n||(n={}));var s=class extends w.BaseCommand{async getManifest(){return await $.Manifest.tryFind(this.context.cwd)}async $(t){let a;return console.log(`[kjo] ${t}`),a=await this.runTask(t),this.taskFailed(a)&&process.exit(1),Promise.resolve(0)}runTask(t){let[a,...r]=t.split(" ");return(0,g.execute)(a,r)}taskFailed(t){return Array.isArray(t)?t.filter(a=>a!==0).length>0:t!==0}async promiseOK(){return 0}};s.usage={category:"kjo"};var l=o(i("clipanion")),m=class extends s{constructor(){super(...arguments);this.cjs=l.Option.Boolean("-c,--cjs",!1);this.esm=l.Option.Boolean("-e,--esm",!1);this.clean=l.Option.Boolean("--clean",!1);this.force=l.Option.Boolean("--force",!1);this.verbose=l.Option.Boolean("--verbose",!0)}async execute(){let t=!this.cjs&&!this.esm;this.clean&&this.force&&console.error("--clean and --force are mutually exclusive"),this.clean&&(this.verbose=!1),(this.cjs||t)&&await this.$(`yarn tsc -b tsconfig.json${this.verbose?" --verbose":""}${this.clean?" --clean":""}${this.force?" --force":""}`),(this.esm||t)&&await this.$(`yarn tsc -b tsconfig.esm.json${this.verbose?" --verbose":""}${this.clean?" --clean":""}${this.force?" --force":""}`),await this.$("yarn kjo compile @roots/container"),await this.$("yarn kjo compile @roots/filesystem"),await this.$("yarn kjo compile @roots/bud-dashboard"),await this.$("yarn kjo compile @roots/container"),await this.$("yarn kjo compile @roots/bud-support"),!this.clean}};m.paths=[["kjo","build"]];var j=o(i("clipanion")),h=class extends s{constructor(){super(...arguments);this.dfx=j.Option.Boolean("-d,--dfx",!1)}async execute(){if(this.dfx){await this.$("git clean -dfx"),await this.$("yarn cache clean");return}await this.$("yarn rimraf packages/**/.budfiles"),await this.$("yarn rimraf examples/*/node_modules"),await this.$("yarn rimraf packages/@roots/*/lib"),await this.$("yarn rimraf packages/@roots/*/node_modules"),await this.$("yarn rimraf node_modules"),await this.$("yarn cache clean")}};h.paths=[["kjo","clean"]];var v=o(i("clipanion")),f=class extends s{constructor(){super(...arguments);this.package=v.Option.String()}async execute(){await this.$(`yarn ts-node ./dev/tasks/compile/cjs ${this.package}`),await this.$(`yarn ts-node ./dev/tasks/compile/esm ${this.package}`)}};f.paths=[["kjo","compile"]];var c=o(i("clipanion")),d=class extends s{constructor(){super(...arguments);this.all=c.Option.Boolean("-a,--all",!1);this.prettier=c.Option.Boolean("-p,--prettier",!1);this.types=c.Option.Boolean("-t,--types",!1);this.eslint=c.Option.Boolean("-e,--eslint",!1);this.skypack=c.Option.Boolean("-s,--skypack",!1)}async execute(){let t=!this.prettier&&!this.skypack&&!this.eslint&&!this.types||this.all;(this.eslint||t)&&(await this.$("yarn eslint packages/**/src/**/*.{js,jsx,ts,tsx} --fix"),await this.$("yarn eslint dev/**/*.{js,jsx,ts,tsx} --fix")),(this.prettier||t)&&(await this.$("yarn prettier packages/**/src/**/*.{ts,js,tsx,jsx} --write --ignore-unknown --loglevel silent --no-error-on-unmatched-pattern"),await this.$("yarn prettier dev/**/*.{ts,js,tsx,jsx} --write --ignore-unknown --loglevel silent --no-error-on-unmatched-pattern"),await this.$("yarn prettier site/**/*.{ts,js,tsx,jsx,md,mdx} --write --ignore-unknown --loglevel silent --no-error-on-unmatched-pattern")),(this.skypack||t)&&await this.$("yarn workspaces foreach --no-private --exclude @roots/bud-typings -p -v run pkg")}};d.paths=[["kjo","lint"]];var x=o(i("clipanion")),u=class extends s{constructor(){super(...arguments);this.workers=x.Option.String("-w,--workers","50%");this.update=x.Option.Boolean("--update",!1)}async execute(){return await this.$(`yarn jest --verbose --maxWorkers=${this.workers} ${this.update?"--updateSnapshot":"--coverage"}`)}};u.paths=[["kjo","test"]];var B=o(i("clipanion")),y=class extends s{constructor(){super(...arguments);this.dfx=B.Option.Boolean("-d,--dfx",!1)}async execute(){await this.$("yarn install --immutable"),await this.$("yarn kjo build"),await this.$("yarn kjo lint --eslint --skypack"),await this.$("yarn kjo test")}};y.paths=[["kjo","make"]];var b=o(i("clipanion")),k=class extends s{constructor(){super(...arguments);this.site=b.Option.Boolean("-s,--site",!1);this.readme=b.Option.Boolean("-r,--readme",!1)}async execute(){let t=!this.site&&!this.readme;(this.site||t)&&await this.$("yarn workspace @roots/bud-docs run docusaurus build"),(this.readme||t)&&await this.$("yarn ts-node-transpile-only ./dev/readme")}};k.paths=[["kjo","md"]];var S={hooks:{afterAllInstalled:()=>{console.log("What a great install, am I right?")}},commands:[m,h,f,d,y,k,u]},_=S;return I;})();
return plugin;
}
};