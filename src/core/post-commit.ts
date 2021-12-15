#!/usr/bin/env node

import * as childProcess from 'child_process';
import { exit } from 'process';

const execSync = childProcess.execSync;
const log = console.log;

// 最近一次的提交commitId
const lastCommitId = execSync('git rev-parse HEAD').toString();
// 最近一次的提交信息
const lastCommitMsg = execSync('git log --pretty=format:“%s” -1').toString().replace(/"|”|“|'/g, '');

log('lastCommitInfo:', { lastCommitId, lastCommitMsg });

// 获取前2次的commitId
const res = childProcess.execSync('git log --pretty=format:“%H” -2').toString();
const ids = res.trim().match(new RegExp(/“(\S*)”/g));

let lastBeforeCommitId = '';

if (Number(ids?.length) >= 2) {
  // 上一次的commitId
  // @ts-ignore
  lastBeforeCommitId = ids[1].match(/“(\S*)”/)[1];
  console.log('lastBeforeCommitId:', lastBeforeCommitId);
};

const diff = childProcess.execSync('git diff --name-only');
const diffStr = diff.toString().replace(/[\n\r]/g, ',').trim();

// 不存在文件改变
if (!diffStr) {exit(0);};

const diffImage = diffStr.split(',').filter((el: string) => el.match(/([\s\S]*).(png|jpe?g|gif)/));
// 不存在图片改变
if (!diffImage.length) {exit(0);};

console.log('执行 add');
childProcess.execSync(`git add ${diffImage.join(' ')}`);

if (lastBeforeCommitId) {
  console.log('执行 reset');
  childProcess.execSync(`git reset --soft ${lastBeforeCommitId}`);
}

console.log('执行 commit');

childProcess.exec(`git commit -m "${lastCommitMsg}" --no-verify`, (error) => {
  if (error) {
    console.log(error);
    exit(0);
  }
});
