// import * as fs from 'fs';
// import * as childProcess from 'child_process';
// import { exit } from 'process';
// import chalk from 'chalk';

// import compress from '../utils/compress';

// const log = console.log;

// // 索引 2 对应的 commit 消息文件
// const msg = fs.readFileSync(process.argv[2], 'utf-8').trim();
// log(chalk.grey(msg));

// // 上一次的提交commitId
// const lastCommitId = childProcess.execSync('git rev-parse HEAD ').toString();
// log(chalk.grey('上一次的提交commitId:', lastCommitId));

// // 获取当前需要提交的文件名
// const diffBuffer = childProcess.execSync(`git diff --name-only ${lastCommitId}`);
// // 当前需要提交的文件名列表形式
// const diffStr = diffBuffer.toString().replace(/[\n\r]/g, ',').trim();

// if (!diffStr) {exit(0);};

// // 待提交的图片
// const diffImages = diffStr.split(',').filter((el) => el.match(/([\s\S]*).(png|jpe?g|gif)/));

// compress(diffImages);
