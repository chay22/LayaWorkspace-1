/**
 * 开始游戏界面
 */

var GameStartUiLogic = (function (_super) {

    function GameStartUiLogic() {
        GameStartUiLogic.super(this);
    }
    Laya.class(GameStartUiLogic, "GameStartUiLogic", _super);
    _proto = GameStartUiLogic.prototype;
     

    _proto.onInit = function () {
        this.width = Laya.stage.width;
        this.height = Laya.stage.height;
        
        // this.ani_play.play(0,true);
        
        this.btn_start.on(Laya.Event.CLICK,this,this.bengbeng_startClickEvent);
        // this.btn_rank.on(Laya.Event.CLICK,this,this._rankClickEvent);
        this.btn_share.on(Laya.Event.CLICK,this,this.bengbeng_shareClickEvent);

        wxGame.getInstance().showClubBtn(true);
    }
    
    _proto.onDestroy = function () {
        // MusicManager.getInstance().stopMusic();
    }

    _proto.bengbeng_startClickEvent = function(){
        // MusicManager.getInstance().playSound("res/music/click.wav");
        wxGame.getInstance().showClubBtn(false);
        wxGame.getInstance().createVideoAD();

        UIManager.getInstance().closeUI("GameStartUI");
        // UIManager.getInstance().showUI("GameUI");

        // SceneManager.getInstance().currentScene.startGame();
        SceneManager.getInstance().currentScene.gameUI.guidBox.visible = true;
    }
    
    _proto.bengbeng_shareClickEvent = function(){
        //  MusicManager.getInstance().playSound("res/music/click.wav");
        wxGame.getInstance().shareGame();
    }
    _proto._rankClickEvent = function(){
        //  MusicManager.getInstance().playSound("res/music/click.wav");
        UIManager.getInstance().showUI("GameRankUI");
    }


    return GameStartUiLogic;
})(GameStartUI);