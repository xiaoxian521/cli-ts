const path = require('path')
const typescript = require('rollup-plugin-typescript2')
const buble = require("rollup-plugin-buble")
const babel = require("rollup-plugin-babel")
const nodeResolve = require("rollup-plugin-node-resolve")
const commonjs = require("rollup-plugin-commonjs")
const json = require('rollup-plugin-json')
const nodePolyfills = require('rollup-plugin-node-polyfills')

const resolveFile = function (filePath) {
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
      json(),
      commonjs(),
      babel({
        exclude: 'node_modules/**', // 防止打包node_modules下的文件
        runtimeHelpers: true,       // 使plugin-transform-runtime生效
      }),
      buble({
        transforms: {
          dangerousForOf: true,
          generator: false
        }
      }),
      nodeResolve({
        preferBuiltins: true,
        jsnext: true,
        main: true
      }),
      nodePolyfills()
    ],
  },
]