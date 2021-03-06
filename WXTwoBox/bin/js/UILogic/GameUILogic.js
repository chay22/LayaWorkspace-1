/**
 * 主游戏界面
 */

var GameUILogic = (function (_super) {

    function GameUILogic() {
        GameUILogic.super(this);
    }
    Laya.class(GameUILogic, "GameUILogic", _super);
    _proto = GameUILogic.prototype;
    _proto.scoreLable = null;                                                //分数文字
     

    _proto.onInit = function () {
        this.width = Laya.stage.width;
        this.height = Laya.stage.height;
        
        // this.ani1.play(0,true);
        // this.btn_addLife.visible= true;

        this.guidBox.on(Laya.Event.CLICK,this,this.bengbengguidBoxClickEvent);
        // this.btn_addLife.on(Laya.Event.CLICK,this,this.addLifeClick);

        // this.ani_num.on(Laya.Event.COMPLETE,this,this.onAniNumComplete);
        

    }
    
    _proto.onDestroy = function () {
        // MusicManager.getInstance().stopMusic();
    }

    //引导
    _proto.bengbengguidBoxClickEvent = function(){
        this.guidBox.visible = false;
        // SceneManager.getInstance().currentScene.resumeGame();
        SceneManager.getInstance().currentScene.startGame();
    }

    //显示分数
    _proto.setScore = function(p_score,p_anim){
        // Gamelog("-------gamescore="+SceneManager.getInstance().currentScene.gameScore)
        this.scoreLable.text = p_score;
        if(p_anim){
            this.scoreLable.scale(1.2,1.2);
            Laya.Tween.to(this.scoreLable,
            {
                scaleX:1,
                scaleY:1,
            },500,Laya.Ease.elasticOut);
        }
    }

   
    _proto._shareClickEvent = function(){
        wxGame.getInstance().shareGame();
    }

   

    //点击增加生命
    _proto.addLifeClick = function(){
        this.btn_addLife.visible= false;
        // SceneManager.getInstance().currentScene.pauseGame();
        //播放广告
        if (!Browser.onMiniGame) {
            // SceneManager.getInstance().currentScene.addLife(true);
            wxGame.getInstance().showVideoAD(SceneManager.getInstance().currentScene,SceneManager.getInstance().currentScene.addLife);
         }else{
             wxGame.getInstance().showVideoAD(SceneManager.getInstance().currentScene,SceneManager.getInstance().currentScene.addLife);
         }
    }

    //刷新是否可以显示增加生命
    _proto.updateAddLifeState = function(){
        if(Browser.onMiniGame){
            if(wxGame.getInstance().videoAd == null || !window.wxLoadVideoAd)
                return;
            this.btn_addLife.visible = true;
        }else{
            this.btn_addLife.visible = true;
        }
    }


    //更新动画
    _proto.updateHumainAnim = function(){

        switch (SceneManager.getInstance().currentScene.gameScore) {
            case 50:
                
                break;
        
            default:
                break;
        }
    }

    /**
   * 震动屏幕 
   * @param callBack
   * @param times
   * @param offset
   * @param speed
   *
   */  
    _proto.stageShake = function(){
        if(this._isShake)
             return;
        var times = 1;
        var offset = 3;
        var speed = 15;

        this._isShake = true;
        var num = 0;
        var offsetArr = [0, 0];
        var point = new Laya.Point(Laya.stage.x, Laya.stage.y);
        Laya.stage.timerLoop(speed, this, shakeObject);
        
        function shakeObject(){
            var count = (num++) % 4;
            offsetArr[num % 2] = count < 2 ? 0 : offset;
            Laya.stage.x = offsetArr[0] + point.x;
            Laya.stage.y = offsetArr[1] + point.y;
            if(num > (times * 4 + 1)){
                Laya.stage.clearTimer(this, shakeObject);
                num = 0;
                this._isShake = false;
            }
        }
   
  }

    
    return GameUILogic;
})(GameUI);