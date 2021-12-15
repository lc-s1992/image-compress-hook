# image-compress

基于git hook对png/jpg/jpeg/gif进行压缩并提交

**注**：当前方案暂不支持apng图片,请自行压缩后再提交

## 使用
配合npm包`husky`,在package.json下配置进行快速使用

```
yarn add image-compress husky -D
```

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

