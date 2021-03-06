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
     /** 是否震动中 */
    this._isShake = false;

    _proto.onInit = function () {
        this.width = Laya.stage.width;
        this.height = Laya.stage.height;

        // MusicManager.getInstance().playMusic("res/music/1.mp3");
        // UIManager.getInstance().showUI("GameStartUI");
        
        this.aniCloud.play(0,true);
        this.btn_share.on(Laya.Event.CLICK,this,this._shareClickEvent);
        this.btn_guid.on(Laya.Event.CLICK,this,this._guidClickEvent);
        this.btn_tip.on(Laya.Event.CLICK,this,this._tipClickEvent);
        this.btn_getGold.on(Laya.Event.CLICK,this,this._getGoldClickEvent);
        
        this.updateGoldNum();
        this.updateLifeNum();

        wxGame.getInstance().showClubBtn(true);
    }
    
    _proto.onDestroy = function () {
        // MusicManager.getInstance().stopMusic();
    }

    //初始化关卡
    _proto.initLevel = function(p_score){
        var t_index= SceneManager.getInstance().currentScene.curLevelIndex;
        var t_leveData = GameLevelData[t_index];
        this.t_id.text = t_leveData.id;
        this.t_name.text = t_leveData.name;

        switch (t_index) {
            case 0:
                UIManager.getInstance().showUI("GuidGameUI");
                break;
        
            default:
                break;
        }
        this.updateVideoAd();
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
        var offset = 10;
        var speed = 32

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

  _proto._shareClickEvent = function(){
      wxGame.getInstance().shareGame();
  }

  //更新金币数量
  _proto.updateGoldNum = function(){
      this.t_gold.text = GetLocalGoldNum();
  }
  //更新生命值
  _proto.updateLifeNum = function(){
      this.t_life.text = GetLocalLifeNum();
  }

  //点击引导
  _proto._guidClickEvent = function(){
      UIManager.getInstance().showUI("GuidGameUI");
  }

  //点击提示
  _proto._tipClickEvent = function(){

      var t_costNum = 40;
      if(GetLocalGoldNum() >= t_costNum){
        var t_index= SceneManager.getInstance().currentScene.curLevelIndex;
        var t_leveData = GameLevelData[t_index];
        this.t_tip.text = t_leveData.tip;

        SetLocalGoldNum(GetLocalGoldNum() - t_costNum);
        this.ani_tip.play(0,false);
        this.updateGoldNum();
      }
  }
  //点击获取金币
  _proto._getGoldClickEvent = function(){
      var t_gameUI = SceneManager.getInstance().currentScene.gameUI;
      if(Browser.onMiniGame){
          if(wxGame.getInstance().videoAd == null || !window.wxLoadVideoAd)
                return;
            t_gameUI.showRewardAd();
        }else{
            t_gameUI.rewardEffect();
        } 

  }

  //更新视频图标状态
  _proto.updateVideoAd = function(){
        this.btn_getGold.visible = false;
        if(Browser.onMiniGame){
            if(wxGame.getInstance().videoAd == null || !window.wxLoadVideoAd)
                return;
            this.btn_getGold.visible = true;
        }else{
            this.btn_getGold.visible = true;
        }
    }

    
  //展示奖励广告
  _proto.showRewardAd = function () {

        if (!Browser.onMiniGame) {
            return;
        }
        var t_gameUI = SceneManager.getInstance().currentScene.gameUI;

        var t_videoAd = wxGame.getInstance().videoAd;
        t_videoAd.show();
        t_videoAd.onClose( function(res){
            // 用户点击了【关闭广告】按钮
            // 小于 2.1.0 的基础库版本，res 是一个 undefined
            if (res && res.isEnded || res === undefined) {
                // 正常播放结束，可以下发游戏奖励
                Gamelog("正常播放结束");
                t_gameUI.rewardEffect();
            }
            else {
                // 播放中途退出，不下发游戏奖励
                Gamelog("视频中途退出");
            }
            t_videoAd.offClose();
            t_gameUI.updateVideoAd();
        })
    }

    //获取奖励效果
    _proto.rewardEffect = function(){
        var t_rewardNum = 10;
        SetLocalGoldNum(GetLocalGoldNum() + t_rewardNum);
        this.ani_addGold.play(0,false);
        this.updateGoldNum();
    }
  


    return GameUILogic;
})(GameUI);