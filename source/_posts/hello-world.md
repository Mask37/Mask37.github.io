---
title: Hello World
description: hello world
abbrlink: 16107
date: 2022-01-20 00:46:04
top:
---
Welcome to [Hexo](https://hexo.io/)! This is your very first post. Check [documentation](https://hexo.io/docs/) for more info. If you get any problems when using Hexo, you can find the answer in [troubleshooting](https://hexo.io/docs/troubleshooting.html) or you can ask me on [GitHub](https://github.com/hexojs/hexo/issues).

## Quick Start

### Create a new post

``` bash
$ hexo new "My New Post"
```

More info: [Writing](https://hexo.io/docs/writing.html)

### Run server

``` bash
$ hexo server
```

More info: [Server](https://hexo.io/docs/server.html)

### Generate static files

``` bash
$ hexo generate
```

More info: [Generating](https://hexo.io/docs/generating.html)

### Deploy to remote sites

``` bash
$ hexo deploy
```

More info: [Deployment](https://hexo.io/docs/one-command-deployment.html)

```java
/**
 * 下载excel公共接口
 *
 * @param param
 * @return excel文件流
 */
@Override
public void commonDownLoad(DownloadParam param, HttpServletResponse response) {
	// 1.根据 请求的code查询downLoadPageTypeMap里对应cts的pageCode
	AssertUtils.notNull(downLoadPageTypeMap, "CTS下载编码未配置");
	String ctsPageCode = downLoadPageTypeMap.get(param.getCode());
	AssertUtils.hasLength(ctsPageCode, "CTS下载编码未配置");

	// 2.根据 cts的pageCode查询cts服务找到自定义列
	CustomerColumnResponse columnResponse = getCustomerColumnByPageCode(ctsPageCode);
	AssertUtils.notNull(columnResponse, "CTS下载编码不正确");

	ExcelExportMethodInfo excelExportMethodInfo = excelExportHandler.get(param.getCode());
	if (null == excelExportMethodInfo){
		log.info("下载编码:{},未找到对应下载方法,不执行查询与下载", param.getCode());
		return;
	}

	String pageName = excelExportMethodInfo.getDesc();

	// 3.反射调用
	List<Map> result = null;
	try {
		result = commonCallMethod.call(excelExportMethodInfo, param.getQuery(), param.getFilter(), param.getPage());
	} catch (Exception e) {
		log.error(pageName + "-列表查询接口异常：", e);
		throw new ServiceException(pageName + "-列表查询接口异常:" + e);
	}

	// 校验 返回是否为空
	AssertUtils.notEmpty(result, pageName + "查询为空");

	// 5.筛选 cts自定义列
	Map<String, String[]> contentMap = ExportUtil.parseExpContent(columnResponse);
	String[] headers = contentMap.get("headers");
	String[] ds_titles = contentMap.get("ds_titles");
	int[] widths = null;
	String nameFlag = pageName + DateParser.formatDate(new Date());

	HSSFWorkbook wb = PoiExcelUtil.createWorkbook(null, pageName, headers, ds_titles, widths, result, DateParser.FORMAT_STR_WITH_TIME_S);
	try {
		// 6.输出 excel文件流
		PoiExcelUtil.write(wb, response, nameFlag);
	} catch (IOException e) {
		log.error(pageName + "列表导出失败：" + e);
	}

}
```

