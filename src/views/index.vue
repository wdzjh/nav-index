<template>
  <div class="index-body" @contextmenu="disableRightClick">   <!-- disableRightClick()  不能加括号，区别：disableRightClick Vue 会将事件对象（$event）作为第一个参数传递给 disableRightClick 方法。因此，如果你的方法需要访问事件对象，你可以在方法内部通过 $event 获取
    加上括号，即没有参数。
  -->
    <!-- 头部div -->
    <div class="top-div">

    </div>
    <div class="body-div">

      <div class="top-left-tianqi">
        <p>这里要放天气</p>
      </div>

      <div class="top-right-goMyBlog">
        <p class="goBlog" @click="goMyBlog()">前往个人博客</p>
      </div>

      <div class="search-div">
        <div class="search-nav">
          <span class="nav-span">搜索</span>
          <ul>
            <li v-for="(item,index) in this.searchList" :key="index" @click="selectItem(index)" :class="{ activite: selectedIndex === index }">{{ item.name }}</li>
          </ul>
        </div>
        <div class="search-input">
          <el-input
            :placeholder="searchList[this.selectedIndex].tips"
            prefix-icon="el-icon-search"
            v-model="inputStr"
            @keydown.enter.native="onEnter"
          >
          </el-input>
        </div>
      </div>
    </div>

    <div class="end-div"></div>
  </div>
</template>

<script>

import { tianqiApi } from '@/api/search.js'

export default {
  data() {
    return {
      searchList:['百度','Google','360','火狐','Bing'],
      searchList:[
        {name:'百度',tips:'百度一下'},
        {name:'Google',tips:'谷歌引擎，第一个答案“心灵之约”'},
        {name:'360',tips:'360好搜'},
        {name:'火狐',tips:'火狐搜索'},
        {name:'Bing',tips:'微软Bing搜索'},
      ],
      selectedIndex: 0,
      inputStr: "",
      engine:"baidu",
    };
  },

  async created(){
      let [err,data] = await tianqiApi()
      navigator.geolocation.getCurrentPosition(
        position => {
          const latitude = position.coords.latitude;   // 纬度
          const longitude = position.coords.longitude;  // 经度
          console.log('Latitude:', latitude, 'Longitude:', longitude);
          // 接下来可以通过经纬度调用第三方 API 来获取城市信息
        },
        error => {
          console.error('获取地理位置失败:', error);
        }
      )
  },

  methods: {
    // 禁用右键点击的回调函数
    disableRightClick(event) {
      event.preventDefault(); // 阻止右键菜单弹出
    },

    // 点击某个 <li> 时，更新选中的索引
    selectItem(index) {
      this.selectedIndex = index;
      switch (this.searchList[index]) {
        case "百度":
          this.engine = "baidu";
          break;
        case "Google":
          this.engine = "google";
          break;
        case "360":
          this.engine = "360";
          break;
        case "火狐":
          this.engine = "huohu";
          break;
        case "Bing":
          this.engine = "bing";
          break;
        default:
          break;
      }
      
    },

    //打开个人博客
    goMyBlog(){
      let url = 'http://47.93.10.94:8090/';
      window.open(url,'_blank');
    },

    // input中，回车按下时触发的事件
    onEnter() {
      if(this.inputStr.trim()){
          let url;
          switch (this.engine) {
            case 'baidu':
              url = `https://www.baidu.com/s?wd=${encodeURIComponent(this.inputStr)}`;
              break;
            case 'google':
              url = `https://www.google.com/search?q=${encodeURIComponent(this.inputStr)}`;
              break;
            case '360':
              url = `https://www.so.com/s?q=${encodeURIComponent(this.inputStr)}`;
              break;
            case 'huohu':
              url = `https://search.mozilla.org/?q=${encodeURIComponent(this.inputStr)}`;
              break;
            case 'bing':
              url = `https://www.bing.com/search?q=${encodeURIComponent(this.inputStr)}`;
              break;
            default:
              return;
          }
           window.open(url, '_blank');  // 在新标签页中打开
      }
    }


  },
};
</script>




<style scoped>
.index-body {
  width: 100%;
  height: 100%;
}

.top-div {
  width: 100%;
  height: 0%;
  background-color: rgb(145, 145, 145);
}

.body-div {
  width: 100%;
  height: 100%;
  background-image: url('../assets/background.jpeg');
  background-size: cover;        /* 使图片铺满容器 */
  background-repeat: no-repeat;  /* 禁止图片重复 */
  background-position: center;   /* 让图片居中显示 */
  position: relative;
}

.end-div {
  width: 100%;
  height: 0%;
  background-color: rgb(130, 130, 130);
}


/*天气div样式*/
.top-left-tianqi{
  width: 100PX;
  height: 65PX;
  background-color: aqua;
  position: absolute;
  left: 8px;
  top: 8px;

}

/* 跳转个人网站的样式 */
.top-right-goMyBlog{
  width: 100px;
  height: 65px;
  background-color: antiquewhite;
  position: absolute;
  right:8px ;
  top: 8px;
}

.goBlog{
  cursor: pointer;
}

/* input框样式 */
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

.search-div {
  width: 50%;
  height: 150px;
  margin-top: 0px;
  position: absolute;
  top: 50%; /* 垂直居中 */
  left: 50%; /* 水平居中 */
  transform: translate(-50%, -120%); /* 调整偏移量使其真正居中 */
}

.search-nav{
  display: flex; /* 使 span 和 ul 在同一行排列 */
  align-items: center; /* 垂直居中对齐 */
}

.nav-span{
  margin-left: 5px;
  margin-right: 20px; /* 给 span 和 ul 之间加点间距 */
  font-size: 16px; /* 可以根据需求调整字体大小 */
  color: white;
  font-weight: 700;
}

.search-nav ul {
  list-style-type: none; /* 去掉默认的黑点 */
  padding: 0; /* 去除内边距 */
  margin: 0; /* 去除外边距 */
  display: flex; /* 使用 Flexbox 来水平排列 */
  user-select: none; /* 禁止选中文字 */
  color: white;
  font-weight: 700;
}

.search-nav ul li{
  margin-right: 10px; /* 设置列表项之间的间距 */
  padding: 10px;
  cursor: pointer; /* 设置为小手 */
}
.activite{
  background-color: rgba(240, 240, 240, 0.3);
}

.search-input {
  height: 60px;
  border-radius: 20px;
}
.search-input .el-input::v-deep{
  height: 60px;
}

.search-input >>> .el-input__inner {
  height: 60px;
  margin: 0 0 0 0;
  padding: 0 0 0 30px;
  border: 0;
  outline: none; /* 禁用聚焦时的外部边框 */
  background-color: rgba(240, 240, 240, 0.3);
}

.search-input >>> .el-input__inner::placeholder {
  color: white;
}
</style>