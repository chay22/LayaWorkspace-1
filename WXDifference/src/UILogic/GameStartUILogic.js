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
        

        this.btn_start.on(Laya.Event.CLICK,this,this._startClickEvent);
        this.btn_rank.on(Laya.Event.CLICK,this,this._rankClickEvent);
        // this.btn_share.on(Laya.Event.CLICK,this,this._shareClickEvent);

        wxGame.getInstance().showClubBtn(true);
    }
    
    _proto.onDestroy = function () {
        // MusicManager.getInstance().stopMusic();
    }

    _proto._startClickEvent = function(){
        MusicManager.getInstance().playSound("res/music/click.wav");
        wxGame.getInstance().showClubBtn(false);
        wxGame.getInstance().createVideoAD();

        UIManager.getInstance().closeUI("GameStartUI");
        UIManager.getInstance().showUI("GameUI");

        SceneManager.getInstance().currentScene.startGame();
    }
    
    _proto._shareClickEvent = function(){
        MusicManager.getInstance().playSound("res/music/click.wav");
        wxGame.getInstance().shareGame();
    }
    _proto._rankClickEvent = function(){
        MusicManager.getInstance().playSound("res/music/click.wav");
        UIManager.getInstance().showUI("GameRankUI");
    }


    return GameStartUiLogic;
})(GameStartUI);