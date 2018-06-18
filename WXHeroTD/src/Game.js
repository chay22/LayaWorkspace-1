//初始化微信小游戏
Laya.MiniAdpter.init(true);

//laya初始化
Laya.init(GameConfig.GameWidth, GameConfig.GameHeight, Laya.WebGL);

wxGame.getInstance().Init();


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

Laya.stage.bgColor = "#000000";//设置画布的背景颜色。
//使用WebWorker加载并解码图片，把耗费cpu的工作放到worker中执行，防止js主线程卡死，从而能大大减少游戏中加载卡顿现象。
//指定worker.js所在的路径,比如放在libs目录下
//Laya.WorkerLoader.workerPath = "libs/worker.js";
//开启使用WorkerLoader来加载解码图片的功能
//Laya.WorkerLoader.enable = true;

//设置版本控制类型为使用文件名映射的方式
ResourceVersion.type = ResourceVersion.FILENAME_VERSION;
//加载版本信息文件
ResourceVersion.enable("version.json", Handler.create(this, beginLoad));



function beginLoad() {
     var arr = [
                //图集
                ["res/atlas/game.atlas",Laya.Loader.ATLAS],
                ["res/atlas/hero.atlas",Laya.Loader.ATLAS],
                ["res/atlas/monster.atlas",Laya.Loader.ATLAS],
                ["res/atlas/tower.atlas",Laya.Loader.ATLAS],
                //图片
                ["game/loading_ky_zgtz.jpg",Laya.Loader.IMAGE],
                //字体
                // ["bitmapFont/shuziRed.fnt",Laya.Loader.FONT],
                //声音
                // ["res/music/1.mp3",Laya.Loader.SOUND],
                // ["res/music/1.wav",Laya.Loader.SOUND],
                // ["res/music/4.wav",Laya.Loader.SOUND],
                // ["res/music/6.wav",Laya.Loader.SOUND],
                // ["res/music/7.wav",Laya.Loader.SOUND],
                // ["res/music/8.wav",Laya.Loader.SOUND],
                // ["res/music/14.wav",Laya.Loader.SOUND],

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
    // Laya.loader.load(asset,Laya.Handler.create(this,showLoaded),null);
    Laya.loader.load(asset, Laya.Handler.create(this, loadingCallback), null);
}

function loadingCallback() {

    // Laya.Animation.createFrames(["bubbles/bomb_00.png","bubbles/bomb_01.png", "bubbles/bomb_02.png", "bubbles/bomb_03.png", "bubbles/bomb_04.png", "bubbles/bomb_05.png", "bubbles/bomb_06.png"], "bomb");

    Laya.Animation.createFrames(["monster/npc_102_walk_r_0001.png","monster/npc_102_walk_r_0001.png","monster/npc_102_walk_r_0003.png","monster/npc_102_walk_r_0004.png"], "monster001_walk_r");

    Laya.Animation.createFrames(["tower/tower_10_idle02_10000.png", "tower/tower_10_idle02_10001.png","tower/tower_10_idle02_10002.png","tower/tower_10_idle02_10003.png",
    "tower/tower_10_idle02_10004.png","tower/tower_10_idle02_10005.png",], "tower_idle");

    // Laya.Animation.createFrames(["bomb/firing_000.png", "bomb/firing_002.png", "bomb/firing_004.png", "bomb/firing_006.png"], "firing");

    SceneManager.getInstance().currentScene = new GameScene();
    // Laya.stage.addChild(new GameUILogic());
    // UIManager.getInstance().showUI("GameUI");

}