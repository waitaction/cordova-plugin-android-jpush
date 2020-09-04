 # 安卓手机极光推送

极光推送

安装 `cordova-plugin-android-jpush`
 
``` shell
 cordova plugin add cordova-plugin-android-jpush --variable APP_KEY=your_app_key
```

## 使用

使用前需注册，以获取 `token` ，你可以将 `token` 与你的app用户信息关联后上传到服务器

``` js
// 注册推送
jPush.register(function(token) {
    console.log(token); // 不一定能接收到token
}, function(err) {
    console.log(err);
}, []);
// 接收token
jPush.onNewToken(function(token) {
    console.log(token); // 会多次接收到token
});
```

注册完成后，需要监听 `messageReceived` 事件

``` js
document.addEventListener("messageReceived", function(result) {
    console.log(result);
}, false);
```
