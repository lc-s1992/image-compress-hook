#!/usr/bin/env node

import * as childProcess from 'child_process';
import { exit } from 'process';

import compress from '../utils/compress';

childProcess.execSync('git config core.quotepath false');
// 获取当前需要提交的文件名
// 添加(A)、复制(C)、删除(D)、修改(M)、重命名(R)
const diffBuffer = childProcess.execSync('git diff --cached --diff-filter=ACMR --name-only HEAD');
// 当前需要提交的文件名列表形式
const diffStr = diffBuffer.toString().replace(/[\n\r]/g, ',').trim();

if (!diffStr) {exit(0);};

// 待提交的图片
const diffImages = diffStr.split(',').filter((el) => el.match(/([\s\S]*).(png|jpe?g|gif)/));

compress(diffImages);
