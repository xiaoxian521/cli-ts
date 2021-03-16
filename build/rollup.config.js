const path = require('path');
const typescript = require('rollup-plugin-typescript2');
const buble = require("rollup-plugin-buble")
const babel = require("rollup-plugin-babel")
const resolve = require("rollup-plugin-node-resolve")
const commonjs = require("rollup-plugin-commonjs")
const json = require('rollup-plugin-json')
const nodePolyfills = require('rollup-plugin-node-polyfills')

const resolveFile = function(filePath) {
  return path.join(__dirname, '..', filePath)
}

module.exports = [
  {
    input: resolveFile('src/bin/command.ts'),
    output: {
      file: resolveFile('dist/index.js'),
      format: 'umd',
      name: "init",
      //通知系统用 node 运行
      banner: '#!/usr/bin/env node' 
    }, 
    plugins: [
      typescript({
        exclude: 'node_modules/**',
        useTsconfigDeclarationDir: false
      }),
      resolve({
        browser: false,
      }),
      json(),
      commonjs(),
      babel({
        babelrc: true,
        presets: [['env', { modules: false }]],
      }),
      buble(),
      nodePolyfills()
    ],
  },
]