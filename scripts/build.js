// 把package目录下所有包进行打包

import { readdirSync, statSync } from 'fs'
import execa from 'execa' // 开启子进程，进行打包， 最终还是使用rollup打包

const targets = readdirSync('packages').filter((f) => {
  if (statSync(`packages/${f}`).isDirectory())
    return true

  return false
})

// 对目标进行依次打包  并行打包

async function build(target) {
  await execa('rollup', ['-c', '--environment', `TARGET:${target}`], {
    stdio: 'inherit' // 把子进程打包的信息共享给父进程
  })
}

function runParallel(targets, iteratorFn) {
  const res = []
  for (const item of targets) {
    const p = iteratorFn(item)
    res.push(p)
  }
  return Promise.all(res)
}

runParallel(targets, build)
