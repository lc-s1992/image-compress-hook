import * as fs from 'fs';
import * as path from 'path';

import * as imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
// @ts-ignore
import * as imageminGiflossy from 'imagemin-giflossy';
// @ts-ignore
import * as isAnimated from 'is-animated';

import { splitFile } from './function';

const imagemin = require('imagemin');
const ora = require('ora');
const chalk = require('chalk');

const log = console.log;

const getImagesResolvePath = (images: string[]) => {
  let imgFilters:Record<string, string[]> = {};
  images.forEach((img) => {
    const fullPath = path.resolve(img);
    if (img.match(/([\s\S]*).png/) && isAnimated(fs.readFileSync(fullPath))) {
      log(chalk.yellow(`${img} 是apng图片暂不支持直接插件压缩`));
      return;
    }
    
    const { fileName, filePath } = splitFile(fullPath);

    imgFilters[filePath] = (imgFilters[filePath] || []).concat(fileName);
  });

  return imgFilters;
};

export default async function compress(images: string[]) {
  const imgFilters = getImagesResolvePath(images);
  const list = Object.keys(imgFilters);
  
  if (!list.length) { return; };

  const spinner = ora({ color: 'blue', text: chalk.white('图片压缩中...\n') }).start();

  await Promise.all(list.map(async (el) => {
    await new Promise((resolve) => {
      imagemin(imgFilters[el].map((img) => `${el}/${img}`), {
        destination: el,
        plugins: [
          imageminMozjpeg({ quality: 80, progressive:true }),
          imageminPngquant({
            quality: [0.6, 0.8]
          }),
          imageminGiflossy({ lossy: 80 })
        ]
      })
      .then((res: any) => {
        res?.forEach((el: any) => {
          const sourceImg = el.sourcePath.split(path.resolve())[1];
          log(chalk.green(`${sourceImg}`));
        });
        resolve(res);
      });
    });
  }));
  // spinner结束时会导致最后一条日志打印失败？？ 加个log,防止日志缺少
  log();
  spinner.info(chalk.white('压缩完成!!'));
}

