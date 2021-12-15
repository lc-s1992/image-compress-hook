export const splitFile = (path: string) => {
  const formatPath = path.match(/([\s\S]*).(png|jpe?g|gif)/);

  const filePathWithoutSuffix = formatPath?.[1] || path;
  const suffixSimple = formatPath?.[2] || 'png';
  const suffix = `.${suffixSimple}`;

  const pathArr = filePathWithoutSuffix.split('/');

  const len = pathArr.length;
  const fileName = pathArr[ len - 1];
  const filePath = pathArr.slice(0, len - 1).join('/');

  return {
    fileSimpleName: fileName,
    fileName: `${fileName}${suffix}`,
    filePath,
    suffix,
    suffixSimple
  };
};
