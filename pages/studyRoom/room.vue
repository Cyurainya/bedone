<template>
  <view class="container">
    <view class="room-content">
      <view class="music"
            @click="playMusic">
        <image :class="play?'play-music':''"
               :src="!play ? './../../static/music-off.png':'./../../static/music-on.png'"
               mode="" />
        <view>
          {{!play ? '播放音乐':'暂停音乐'}}
        </view>
      </view>
      <view class="time-content">
        <view class="room-time">你已经学习了
          <text> {{minute}}:{{second}}</text>

          分钟
        </view>
      </view>
      <button open-type="share">
        <view class="invite-box"
              @click="inviteFri">
          <image src="./../../static/invite.png"
                 mode="" />
          <view>邀请好友</view>
        </view>
      </button>

    </view>
    <view class="users-container">
      <view class="count-box">共有
        <text class="counter">{{currentRoom.onlineUsers.count}}</text>
        人和你一起学习
      </view>
      <view class="user-box">
        <view class="user-item"
              v-for="(user, key) in currentRoom.onlineUsers.users"
              :key="key">
          <image :class="userId == currentRoom.currentUser.id ? 'avatar self-avatar' : 'avatar' "
                 :src="user.avatar"></image>
          <view class="user-name">{{user.nickname}}</view>
        </view>

      </view>
    </view>
    <view class="message-box">
      <view class="new-mes-box"
            v-show="newMessage">
        <view class="message-item">
          <text :class="newMessage.senderUserId == currentRoom.currentUser.id ? 'self' : '' ">{{newMessage && newMessage.senderNickname}}:</text>
          <text>
            {{newMessage && newMessage.content}}
          </text>
        </view>
      </view>
      <view class="message-container"
            v-show="messageShow">
        <view class="message-list"
              v-for="(message, key) in currentRoom.messages"
              :key="key"
              :id="'message-list'+ key">
          <view class="message-item">
            <text :class="message.senderUserId == currentRoom.currentUser.id ? 'self' : '' ">{{message && message.senderNickname}}:</text>
            <text>
              {{message && message.content}}
            </text>
          </view>
        </view>
      </view>
      <view class="message-action">
        <view class="history-btn"
              @click="historyShow">历史消息▲</view>
        <view><input class="send-input"
                 :value="newMessageContent"
                 placeholder="说点什么..."
                 @input="onInputMessage" /></view>
        <view class="send-btn"
              @click="sendMessage(newMessageContent)">send</view>
      </view>
    </view>

  </view>
</template>

<script>
let goEasy = getApp().globalData.goEasy;
export default {
  data () {
    return {
      currentRoom: null,
      newMessageContent: "",
      messageShow: false,
      newMessage: '',
      messageTimer: null,
      loginPop: false,
      room: null,
      roomTimer: null,
      roomTime: 0,
      minute: '00',
      second: '00',
      play: false,
      bgAudioMannager: null
    }
  },
  computed: {
    userId () {
      return this.$store.getters.userId
    },
  },
  //分享按钮
  onShareAppMessage (res) {
    if (res.from === 'button') {// 来自页面内分享按钮
      console.log(res.target)
    }
    return {
      title: '一起加入自习室吧!',
      path: '/pages/studyRoom/room?roomId=' + this.currentRoom.roomId + '&roomName' + this.currentRoom.roomName
    }
  },
  onLoad (options) {
    if (options.roomToken) {
      //主动打开小程序
      //获取数据
      let roomToken = JSON.parse(options.roomToken);
      // 初始化room
      this.currentRoom = {
        roomId: roomToken.roomId,
        roomName: roomToken.roomName,
        onlineUsers: {
          count: 0,
          users: []
        },
        messages: [],
        currentUser: {
          id: roomToken.userId,
          nickname: roomToken.nickname,
          avatar: roomToken.avatar
        }
      };
      console.log(roomToken)
      // 设置导航标题
      uni.setNavigationBarTitle({
        title: roomToken.roomName
      });

      // 连接goEasy
      this.connectGoEasy();

      // 监听用户上下线
      this.listenUsersOnlineOffline();

      // 监听新消息
      this.listenNewMessage();
    } else if (options.roomId) {
      console.log('转发打开')
      console.log(options)
      console.log('userId:', this.userId)
      //通过分享打开的 需要获取用户信息

      if (this.$store.getters.userId) {
        console.log('有user')
        //有userID 只需要获取用户信息就可以了
        uni.showLoading({
          title: '加载中'
        });
        this.currentRoom = {
          roomId: options.roomId,
          roomName: options.roomName,
          onlineUsers: {
            count: 0,
            users: []
          },
          messages: [],
          currentUser: {
            id: this.$store.getters.userId,
            nickname: this.$store.getters.userName,
            avatar: this.$store.getters.userAvatar
          }
        };
        // 设置导航标题
        uni.setNavigationBarTitle({
          title: options.roomName
        });

        // 连接goEasy
        this.connectGoEasy();

        // 监听用户上下线
        this.listenUsersOnlineOffline();

        // 监听新消息
        this.listenNewMessage();
        uni.hideLoading();
      }

    }
    this.roomTimer = setInterval(() => {
      this.roomTime++;

      //开始计时
      this.minute =
        Math.floor(this.roomTime / 60).toString().length == 2
          ? Math.floor(this.roomTime / 60)
          : '0' + Math.floor(this.roomTime / 60)
      this.second =
        Math.floor(this.roomTime % 60).toString().length == 2
          ? Math.floor(this.roomTime % 60)
          : '0' + Math.floor(this.roomTime % 60)

    }, 1000)


  },
  onUnload () {
    clearTimeout(this.roomTimer)
    // 断开连接
    goEasy.disconnect({
      onSuccess () {
        console.log("GoEasy disconnect successfully");
      },
      onFailed (error) {
        console.log("GoEasy disconnect failed" + JSON.stringify(error));
      }
    });
  },
  methods: {
    // 连接goEasy
    connectGoEasy () {

      let self = this;
      goEasy.connect({
        userId: this.currentRoom.currentUser.id,
        userData: '{"nickname":"' + this.currentRoom.currentUser.nickname + '","avatar":"' + this.currentRoom.currentUser.avatar + '"}',
        onSuccess: function () {

          console.log("GoEasy connect successfully.")
          // 加载在线用户列表
          self.loadOnlineUsers();

          // 加载最后10条消息历史
          //self.loadHistory();
        },
        onFailed: function (error) {
          console.log("Failed to connect GoEasy, code:" + error.code + ",error:" + error.content);
        },
        onProgress: function (attempts) {
          console.log("GoEasy is connecting", attempts);
        }
      });
    },
    // 监听用户上下线
    listenUsersOnlineOffline () {
      let self = this;
      let roomId = this.currentRoom.roomId;
      goEasy.subscribePresence({
        channel: roomId,
        onPresence: function (presenceEvents) {
          self.currentRoom.onlineUsers.count = presenceEvents.clientAmount;
          presenceEvents.events.forEach(function (event) {
            if (event.action === "join" || event.action === "online") {
              //进入房间
              let userData = JSON.parse(event.userData);
              let user = {
                id: event.userId,
                avatar: userData.avatar,
                nickname: userData.nickname
              };
              //添加新用户
              self.currentRoom.onlineUsers.users.push(user);
              //添加进入房间的消息
              let message = {
                content: " 进入自习室",
                senderUserId: event.userId,
                senderNickname: userData.nickname,
              };
              self.currentRoom.messages.push(message);
              self.newMessageShow(message)
            } else {
              //退出房间
              self.currentRoom.onlineUsers.users.forEach((user, index) => {
                if (event.userId === user.id) {
                  // 删除当前聊天室列表中离线的用户
                  let offlineUser = self.currentRoom.onlineUsers.users.splice(index, 1);
                  let message = {
                    content: " 退出房间",
                    senderUserId: offlineUser[0].userId,
                    senderNickname: offlineUser[0].nickname,
                  };
                  self.currentRoom.messages.push(message);
                  self.newMessageShow(message)
                }
              });
            }
          });
        },
        onSuccess: function () {
          console.log("用户上下线监听成功")
        },
        onFailed: function (error) {
          if (error.code === 401) {
            console.log("监听用户上下线失败,默认不开通，付费应用，可以在我的应用->查看详情，高级功能里自助开通");
          } else {
            console.log("监听用户上下线失败, code:" + error.code + ",content:" + error.content);
          }
        }
      })
    },
    // 监听新消息
    listenNewMessage () {
      // 监听当前聊天室的消息
      let self = this;
      let roomId = this.currentRoom.roomId;
      goEasy.subscribe({
        channel: roomId,
        onMessage: function (message) {
          let content = JSON.parse(message.content);
          let messageContent = "";
          messageContent = content.content;

          //添加消息
          let newMessage = {
            content: messageContent,
            senderUserId: content.senderUserId,
            senderNickname: content.senderNickname,
          };
          self.currentRoom.messages.push(newMessage);
          self.newMessageShow(newMessage)
        },
        onSuccess: function () {
          console.log("监听新消息成功")
        },
        onFailed: function (error) {
          console.log("订阅消息失败, code:" + error.code + ",错误信息:" + error.content);
        }
      })
    },
    // 加载在线用户列表
    loadOnlineUsers () {
      let self = this;
      let roomId = this.currentRoom.roomId;
      goEasy.hereNow({
        channels: [roomId],
        includeUsers: true,
        distinct: true
      }, function (result) {
        if (result.code === 200) {
          let currentRoomOnlineUsers = result.content.channels[roomId];
          let users = [];
          currentRoomOnlineUsers.users.forEach(function (onlineUser) {
            let userData = JSON.parse(onlineUser.data);
            let user = {
              id: onlineUser.id,
              nickname: userData.nickname,
              avatar: userData.avatar
            };
            users.push(user);
          });
          self.currentRoom.onlineUsers = {
            users: users,
            count: currentRoomOnlineUsers.clientAmount
          };
        } else if (result.code === 401) {
          console.log("获取在线用户失败,默认不开通，付费应用，可以在我的应用->查看详情，高级功能里自助开通");
        } else {
          console.log("获取在线用户失败, code:" + result.code + ",错误信息:" + result.content);
        }
      })
    },
    onInputMessage (event) {//双向绑定消息 兼容
      this.newMessageContent = event.target.value;
    },

    sendMessage (content) {
      //发送消息
      if (content === "") {
        return;
      }
      let message = {
        senderNickname: this.currentRoom.currentUser.nickname,
        senderUserId: this.currentRoom.currentUser.id,
        content: content
      };
      goEasy.publish({
        channel: this.currentRoom.roomId,
        message: JSON.stringify(message),
        onSuccess: function () {
          console.log("发送成功");
        },
        onFailed: function (error) {
          console.log("消息发送失败，错误编码：" + error.code + " 错误信息：" + error.content);
        }
      });
      this.newMessageContent = "";
    },
    // 加载最后10条消息历史
    loadHistory () {
      let self = this;
      let roomId = this.currentRoom.roomId;
      goEasy.history({
        channel: roomId, //必需项
        limit: 10 //可选项，返回的消息条数
      }, function (response) {
        if (response.code === 200) {
          let messages = [];
          response.content.messages.map(message => {
            let historyMessage = JSON.parse(message.content);

            messages.push(historyMessage);
          });
          self.currentRoom.messages = messages;
        } else if (response.code === 401) {
          console.log("获取历史消息失败,默认不开通，付费应用，可以在我的应用->查看详情，高级功能里自助开通");
        } else {
          console.log("获取历史消息失败, code:" + response.code + ",错误信息:" + response.content);
        }
      });
    },
    //显示历史信息
    historyShow () {
      this.messageShow = !this.messageShow
    },
    //新消息定时显示一条
    newMessageShow (message) {
      clearTimeout(this.messageTimer)
      this.newMessage = message;
      this.messageTimer = setTimeout(() => {
        //五秒后清除
        this.newMessage = ''
      }, 5000)
    },
    //播放音乐
    playMusic () {
      this.play = !this.play
      if (this.play) {
        this.bgAudioMannager = uni.getBackgroundAudioManager();
        this.bgAudioMannager.title = 'Cry for the Moon';
        this.bgAudioMannager.singer = '出羽良彰 (でわ よしあき)';
        this.bgAudioMannager.coverImgUrl = 'https://i.ytimg.com/vi/QsdDNZUktHA/sddefault.jpg';
        this.bgAudioMannager.src = 'https://mp32.9ku.com/upload/128/2017/11/16/872337.mp3';

      } else {
        this.bgAudioMannager.stop()
      }

    }
  }
}
</script>

<style scope lang="scss">
.container {
  min-height: 100vh;
  padding-top: 3vh;
}
.room-content {
  width: 90vw;
  height: 15vh;
  background: white;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 0 auto;
  border-radius: 10px;
  align-items: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  button {
    height: 11vh;
    width: 19vw;
    margin: 0;
    padding: 0;
    line-height: normal;
    background-color: white;
    border: 0px solid white;
    border-radius: 0px;
    font-size: smaller;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    padding-left: 0;
    padding-right: 0;
  }
  button::after {
    border: none;
  }
  .music {
    text-align: center;
    font-size: smaller;
    image {
      width: 10vw;
      height: 10vw;
    }
    .play-music {
      animation: rotate 3s linear 0s infinite;
    }
  }
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .time-content {
    display: flex;
    height: inherit;
    justify-content: space-around;
    flex-direction: column;
    text {
      font-weight: bold;
      font-size: initial;
      padding: 1vw;
    }
  }
  .invite-box {
    text-align: center;
    font-size: smaller;
    image {
      width: 10vw;
      height: 10vw;
    }
  }
}
.message-box {
  position: absolute;
  width: 100vw;
  bottom: 0;
  .message-container {
    padding: 2vw;
    width: 100vw;
    max-height: 30vh;
    overflow: scroll;
    background: rgba(250, 234, 214, 0.2);
  }
  .message-item {
    background-color: rgba(138, 138, 138, 0.2);
    border-radius: 10px;
    width: fit-content;
    margin: 2px 0;
    padding: 5px;
    .self {
      color: green;
    }
  }
  .message-action {
    width: 100vw;
    display: flex;
    flex-direction: row;
    padding: 1vw;
    justify-content: space-between;
    .history-btn {
      height: 5vh;
      line-height: 5vh;
      text-align: center;
      /* background-color: rgba(138, 138, 138, 0.2); */
      color: black;
      border-radius: 8px;
      border: 1px solid black;
      padding: 0 2vw;
    }
  }
  .send-input {
    width: 65vw;
  }
  .send-btn {
    width: 10vw;
    height: 5vh;
    line-height: 5vh;
    text-align: center;
    /* background-color: rgb(255 ,255 ,255 , 20%); */
    color: black;
    border-radius: 7px;
    /* background-color: white; */
    border: 1px solid black;
  }
}

.users-container {
  width: 100vw;
  .count-box {
    color: black;
    width: 100vw;
    padding: 2vw;
    text-align: center;
    padding-bottom: 0;
    .counter {
      font-size: 7vw;
      padding: 0 2vw;
    }
  }
  .user-box {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: center;
    .user-item {
      width: 21vw;
      //height: 20vw;
      margin: 2vw;
      display: flex;
      flex-direction: column;
      align-items: center;
      .user-name {
        text-align: center;
      }
      .self-avatar {
        border: 2px solid yellow;
      }
      .avatar {
        width: 15vw;
        height: 15vw;
        border-radius: 100%;
      }
    }
  }
}
</style>
