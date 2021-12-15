# image-compress

基于git hook对png/jpg/jpeg/gif进行压缩并提交

**注**：当前方案暂不支持apng图片,请自行压缩后再提交

## 安装
建议配合npm包`husky`,在package.json下配置进行快速使用
**注**：

  1.由于个别npm源的问题，可能需要走科学上网流程才能安装

  2.依赖包存在libpng的底层依赖，请检查安装 mac用户推荐使用brew执行`brew install libpng`

```
yarn add image-compress husky -D
```

## 使用

```
{
  "husky": {
    "hooks": {
      "pre-commit": "image-compress",
      "post-commit": "image-commit"
    }
  }
}
```

