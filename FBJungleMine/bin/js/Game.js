//初始化微信小游戏
Laya.MiniAdpter.init(true);
//laya初始化
Laya.init(GameConfig.GameWidth, GameConfig.GameHeight, Laya.WebGL);

//FPS
// Laya.Stat.show(0,0);
//设置适配模式 宽度不变，高度根据屏幕比缩放
Laya.stage.scaleMode = "fixedauto";
//场景布局类型 自动竖屏
Laya.stage.screenMode = "vertical";
//设置水平居中对齐
Laya.stage.alignH = "center";
//垂直居中对齐
Laya.stage.alignV = "middle";

Laya.stage.bgColor = "#dadd8e";//设置画布的背景颜色。
//使用WebWorker加载并解码图片，把耗费cpu的工作放到worker中执行，防止js主线程卡死，从而能大大减少游戏中加载卡顿现象。
//指定worker.js所在的路径,比如放在libs目录下
//Laya.WorkerLoader.workerPath = "libs/worker.js";
//开启使用WorkerLoader来加载解码图片的功能
//Laya.WorkerLoader.enable = true;

//设置版本控制类型为使用文件名映射的方式
// ResourceVersion.type = ResourceVersion.FILENAME_VERSION;
// //加载版本信息文件
// ResourceVersion.enable("version.json", Handler.create(this, beginLoad));   

if (GameInFackBook) {
    FBInstant.initializeAsync().then(function () {
        console.log("initializeAsync End 004");
        console.log("getLocale:", FBInstant.getLocale());
        console.log("getPlatform:", FBInstant.getPlatform());
        console.log("getSDKVersion", FBInstant.getSDKVersion());
        console.log("getSupportedAPIs", FBInstant.getSupportedAPIs());
        console.log("getEntryPointData", FBInstant.getEntryPointData());

        beginLoad();
        FBInstant.setLoadingProgress(10);
        
        FBGame.getInstance().Init();

    })

    
} else {
    beginLoad();
}

function  beginLoad(){
    var arr = [
                //图集
                ["res/atlas/WXGameUI.atlas",Laya.Loader.ATLAS],
                ["res/atlas/BeginUI.atlas",Laya.Loader.ATLAS],
                //图片
                ["WXGameUI/img_bg.jpg",Laya.Loader.IMAGE],
                ["WXGameUI/img_diban.jpg",Laya.Loader.IMAGE],
                ["WXGameUI/img_dikuang.jpg",Laya.Loader.IMAGE],
                ["BeginUI/img_yindao.png",Laya.Loader.IMAGE],
                ["BeginUI/img_1.png",Laya.Loader.IMAGE],
                ["BeginUI/img_2.png",Laya.Loader.IMAGE],
                ["BeginUI/img_3.png",Laya.Loader.IMAGE],
                ["BeginUI/img_4.png",Laya.Loader.IMAGE],
                ["BeginUI/img_5.png",Laya.Loader.IMAGE],
                ["BeginUI/img_logo.png",Laya.Loader.IMAGE],
                ["BeginUI/img_yindao.png",Laya.Loader.IMAGE],
                //字体
                // ["bitmapFont/shuzi.fnt",Laya.Loader.FONT],
                //声音
                ["res/music/1.mp3",Laya.Loader.SOUND],

                ];

    var asset = [];
    for(var i=0; i<arr.length; i++){
        asset.push({
            url : [
                arr[i][0]
            ],
            type:arr[i][1]
        }); 
    }

    //loading 界面需要的图集
    if (GameInFackBook) {
        Laya.loader.load(asset, Laya.Handler.create(null, loadingEnd), Laya.Handler.create(null, onLoading,null,false));
        // Laya.loader.load(asset, Laya.Handler.create(null, loadingCallback));
    } else {
        Laya.loader.load(asset, Laya.Handler.create(null, loadingCallback));
    }
}

//加载进度
function onLoading (progress){
    console.log("loadingUI onLoading: " + progress);
    var intPro = parseInt(progress *100+"");
    console.log("loadingUI onLoading: " + intPro);
    // if(intPro > 80)
    //     intPro = 80;
    FBInstant.setLoadingProgress(intPro);
    //取小数点后2位
    // this.loadingLabel.text = (progress).toFixed(2) * 100 +"%";
}

function loadingEnd() {
    console.log("-------------loadingEnd");

    FBInstant.startGameAsync().then(function () {
		console.log("-------------startGameAsync");
        loadingCallback();
    });

}

function loadingCallback(){

    Laya.Animation.createFrames(["WXGameUI/img_suilie1.png","WXGameUI/img_suilie2.png","WXGameUI/img_suilie3.png","WXGameUI/img_suilie4.png","WXGameUI/img_suilie5.png","WXGameUI/img_suilie6.png"],"suilie");
    Laya.Animation.createFrames(["WXGameUI/img_penhuo1.png","WXGameUI/img_penhuo2.png","WXGameUI/img_penhuo3.png","WXGameUI/img_penhuo4.png","WXGameUI/img_penhuo5.png",
    "WXGameUI/img_penhuo6.png","WXGameUI/img_penhuo7.png","WXGameUI/img_penhuo8.png","WXGameUI/img_penhuo9.png"],"mineAnim1");
    // Laya.Animation.createFrames(["WXGameUI/img_guaiwu1.png","WXGameUI/img_guaiwu2.png","WXGameUI/img_guaiwu3.png","WXGameUI/img_guaiwu4.png","WXGameUI/img_guaiwu5.png",
    // "WXGameUI/img_guaiwu6.png","WXGameUI/img_guaiwu7.png","WXGameUI/img_guaiwu8.png"],"mineAnim2");
    // Laya.Animation.createFrames(["WXGameUI/img_luoshi1.png","WXGameUI/img_luoshi2.png","WXGameUI/img_luoshi3.png","WXGameUI/img_luoshi4.png","WXGameUI/img_luoshi5.png",
    // "WXGameUI/img_luoshi6.png","WXGameUI/img_luoshi7.png","WXGameUI/img_luoshi8.png","WXGameUI/img_luoshi9.png","WXGameUI/img_luoshi10.png"],"mineAnim3");
    // Laya.Animation.createFrames(["WXGameUI/img_zhadan1.png","WXGameUI/img_zhadan2.png","WXGameUI/img_zhadan3.png","WXGameUI/img_zhadan4.png","WXGameUI/img_zhadan5.png",
    // "WXGameUI/img_zhadan6.png","WXGameUI/img_zhadan7.png","WXGameUI/img_zhadan8.png","WXGameUI/img_zhadan10.png"],"mineAnim4");

    Laya.Animation.createFrames(["WXGameUI/img_chaqi1.png","WXGameUI/img_chaqi2.png","WXGameUI/img_chaqi3.png","WXGameUI/img_chaqi4.png","WXGameUI/img_chaqi5.png",
    "WXGameUI/img_chaqi6.png","WXGameUI/img_chaqi7.png"],"chaqi");

     if (GameInFackBook) {
        FBGame.getInstance().loadRewardAd();
        FBGame.getInstance().loadInterstitialAd();
    }

    SceneManager.getInstance().currentScene  = new GameSceneMain();
    
    
}
