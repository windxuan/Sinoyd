<template>
  <div class="shoppingCart">
    <!-- 头部 -->
    <div class="header">
      <div class="header-nav">
        <span>购物车</span>
      </div>
    </div>
    <!-- 购物车列表 -->
    <div class="main">
      <ul class="list">
        <!-- 列表循环 -->
        <!-- 触发在捕获阶段中  -->
        <li v-for="(item,index) in listData" @click.capture="mp(index,$event)" :key="index">
          <!-- 商铺标头 -->
          <p class="list-dp" v-show="item.show">
            <!-- 店铺选框 -->
            <span :class="[sel1,{bg:item.select}]" @click.stop="dpSelected(index)"></span>
            <!-- 店铺name -->
            <span class="dp">{{item.nav}}</span>
          </p>

          <!-- 所有商品内容展示 -->
          <div class="item" v-for="(pl,index) in listData[index].items" >
            <!-- 商品选择按钮 -->
            <p class="item-select">
              <span :class="[sel,{bg:pl.select}]" @click.capture="selected(index,$event)"></span>
            </p>
            <!-- 商品图 -->
            <div class="item-img">
              <img :src="pl.img" alt="">
            </div>
            <!-- 编辑弹出选框 -->
            <div v-if="pl.id==index" class="item-text">
              <div class="amount">
                <span @click="reduce(index)"> - </span>
                <input type="text" v-model="pl.amount">
                <span @click="add(index)"> + </span>
                <p @click="del(index)"> 删除 </p>
              </div>
              <!-- 完成按钮:点击隐藏编辑弹出框 -->
              <div class="Hide" @click="Hide(index)"> 完成 </div>
            </div>

            <!-- 商品信息渲染 -->
            <div v-else class="item-text">
              <!-- 商品名 -->
              <p>{{pl.name}}</p>
              <!-- 编辑行 -->
              <p>
                <!-- price -->
                <span class="item-jg">￥{{pl.pri}}</span>
                <!-- kg -->
                {{pl.kg}}kg
                <span class="edit" @click="show(index)">编辑</span>
              </p>
            </div>

            <!-- 删除 -->
            <p class="item-amount">
              x{{pl.amount}}
            </p>
          </div>
        </li>
      </ul>
    </div>
    <!-- 底部遮挡，空出一行 -->
    <div style="height:100px"></div>
    <!-- 底部 -->
    <div class="footer">
      <!-- 全选按钮 -->
      <span :class="[sel,{bg:allSelect}]" @click="AllSelect()"></span>
      <span class="all">全选</span>
      <span class="addAll">合计：￥{{allPrice}}</span>
      <p class="up" @click="final()">结算({{allNum}})</p>
    </div>
  </div>
</template>

<script>

let listData = [
  {
    nav: '大冰的小屋',  //店铺名
    select: false,      //是否选中
    show: true,         //表头显示
    items: [
      {
        id: 1,
        name: '男士长袖打底衫韩版潮流体恤圆领修身纯棉男士条纹加厚T恤海魂衫',   //商品名，写长点显得丰满
        pri: 200,      //价格
        amount: 1,     //数量
        select: false, //默认不选中
        img: 'https://windxuan.com/banner/img/pic01.jpg',   //商品图片
        kg: '0.61'     //重量
      },
      {
        id: 2,
        name: '男士长袖打底衫韩版潮流体恤圆领修身纯棉男士条纹加厚T恤海魂衫',
        pri: 100,
        amount: 1,
        select: false,
        img: 'https://windxuan.com/banner/img/pic04.jpg',
        kg: '0.68'
      }
    ]
  },
  {
    nav: '猫猫的小屋',  //店铺名
    select: false,      //是否选中
    show: true,         //表头显示
    items: [
      {
        id: 1,
        name: '男士长袖打底衫韩版潮流体恤圆领修身纯棉男士条纹加厚T恤海魂衫',   //商品名，写长点显得丰满
        pri: 20,      //价格
        amount: 1,     //数量
        select: false, //默认不选中
        img: 'https://windxuan.com/banner/img/pic03.jpg',   //商品图片
        kg: '0.61'     //重量
      },
      {
        id: 2,
        name: '男士短袖t恤男夏季2018韩版潮polo衫青年帅气纯棉休闲裤运动套装',
        pri: 14.8,
        amount: 2,
        select: false,
        img: 'https://windxuan.com/banner/img/pic04.jpg',
        kg: '0.68'
      },
      {
        id: 3,
        name: '啄木鸟短袖T恤男士翻领丝光棉中年纯棉商务半袖爸爸装t恤衫大码夏',
        pri: 300,
        amount: 3,
        select: false,
        img: 'https://windxuan.com/banner/img/pic05.jpg',
        kg: '0.68'
      }
    ]
  },
  {
    nav: '毛毛的小屋',  //店铺名
    select: false,      //是否选中
    show: true,         //表头显示
    items: [
      {
        id: 1,
        name: '男士长袖打底衫韩版潮流体恤圆领修身纯棉男士条纹加厚T恤海魂衫',   //商品名，写长点显得丰满
        pri: 30,      //价格
        amount: 2,     //数量
        select: false, //默认不选中
        img: 'https://windxuan.com/banner/img/pic01.jpg',   //商品图片
        kg: '0.61'     //重量
      },
      {
        id: 2,
        name: '男士短袖t恤男夏季2018韩版潮polo衫青年帅气纯棉休闲裤运动套装',
        pri: 40,
        amount: 1,
        select: false,
        img: 'https://windxuan.com/banner/img/pic03.jpg',
        kg: '0.71'
      },
      {
        id: 3,
        name: '啄木鸟短袖T恤男士翻领丝光棉中年纯棉商务半袖爸爸装t恤衫大码夏',
        pri: 50,
        amount: 1,
        select: false,
        img: 'https://windxuan.com/banner/img/pic04.jpg',
        kg: '0.81'
      }
    ]
  }
]

export default {
  name: 'test',
  data () {
    return {
      listData: listData,   //传入数据
      sel: 'sel1',          //商品选框
      sel1: 'sel',          //店铺选框
      Index: '',            //记录商铺的下标
      nameIndex: '',        //记录商品名的下标
      allPrice: '0.00',     //合计
      allSelect: false,     //全选
      Show: -1,             //编辑弹出框
      allNum: 0,            //结算
    }
  },
  mounted(){
    //发请求，从后台拿数据
  },
  methods: {
    // 获取店铺id:在捕获阶段中触发
    mp(dpIndex,e){
      this.Index = dpIndex;
      console.log("1---选择的店铺是------" + this.Index);
      // console.log(e.target);
      // console.log(e.currentTarget);
    },
    // 获取商品id
    selected(nameIndex,e){

      var select = this.listData[this.Index].items[nameIndex].select;
      this.listData[this.Index].items[nameIndex].select =! select;
      this.nameIndex = nameIndex;
      var length = this.listData[this.Index].items.length;
      // console.log(length);

      // 商品全部选中，店铺才选中
      var select = true;
      for (var i = 0;i < length;i++) {

        // 叠加积累有false就为false
        select *= this.listData[this.Index].items[i].select;
      }
      if (select == true) {
        this.listData[this.Index].select = true;
      }else{
        this.listData[this.Index].select = false;
      }
      // 判断商品是否全部选中，是的话，全选也选中
      var listData = this.listData.length;
      var all = true;
      for (var i = 0;i < listData;i++) {
        all *= this.listData[i].select;     //全部选中则为1;有未选中的则为0
      }
      if (all == true) {
        this.allSelect = true;
      }
      console.log("2---店铺------" + this.Index + "商品序列---" + nameIndex);
      // console.log(e.currentTarget);

      //商品数量
      this.allAmount();

      //商品没有全部选中就取消全选
      this.cancel();

      //总价
      this.price();
    },
    // 结算商品数量
    allAmount(){
      var listData = this.listData.length;
      var count = 0;

      for (var i = 0;i < listData;i++) {
        var arr = this.listData[i].items;

        // 接收到每一个商品
        for (var j = 0; j < arr.length;j++) {

          // 添加被选中的商品
          count += this.listData[i].items[j].select;
        }
      }
      this.allNum = count;
    },
    // 计算价格
    price(){
      var all = 0;

      // 点击循环有多少个商家
      for (var i = 0;i < this.listData.length;i++) {

        // 获取商家下面的列表产品
        var arr = this.listData[i].items;
        // console.log(arr);

        // 循环商品列表
        for (var j = 0;j < arr.length;j++) {

          // 列表里面哪些为true(被选中的商品)
          if (arr[j].select === true) {

            // 为true的价格加起来，为总价
            all += arr[j].pri * arr[j].amount;
          }
        }
      }
      // 返回数据：保留两位小数
      this.allPrice = all.toFixed(2);
    },
    // 选择属于某个商家地所有产品
    dpSelected(index){
      // 商家选中
      var select = this.listData[index].select;
      this.listData[index].select =! select;

      // 获取店铺下面的产品数量
      var arr = this.listData[index].items;

      // 循环产品数量
      for(var i = 0;i < arr.length;i++){

        // 判断有哪些产品未选中
        if (arr[i].select == false) {
          arr[i].select = true;       // 将其选中
        }

        // 当店铺取消全选的时候
        if (this.listData[index].select === false) {
          arr[i].select = false;      // 将商品全部不选中
        }
      }

      // 创建一个为真的变量
      var select = true;

      for (var i = 0;i < this.listData.length;i++) {

        // 如果有商家没选中全选则为false
        if (this.listData[i].select == false) {
          this.allSelect = false;
        }
        select *= this.listData[i].select;
      }
      console.log(select);
      if (select == true) {
        this.allSelect = true;
      }

      // 商品数量
      this.allAmount();
      this.price();
      // console.log(arr.length);
    },
    // 全选
    AllSelect(){
      var selected = this.allSelect;
      this.allSelect =! selected;

      // 获取店铺数量
      var dp = this.listData.length;
      // 循环店铺
      for (var i = 0;i < dp;i++) {

        // 获取每个店铺的商品
        var arr = this.listData[i].items;

        // 循环每个店铺里面的商品为选中
        for (var j = 0;j < arr.length;j++) {

          // 全选选中
          if (this.allSelect == true) {

            // 选中所有商品
            var select = this.listData[i].items[j].select;
            this.listData[i].items[j].select = true;
          }

          // 全选取消
          if (this.allSelect == false) {

            // 所有商品选中状态取消
            this.listData[i].items[j].select = false;
          }
        }

        // 店铺选中状态
        if (this.allSelect == true) {
          this.listData[i].select = true;
        }else{
          this.listData[i].select = false;
        }
      }
      // 商品数量
      this.allAmount();
      this.price();
    },
    // 商品没有全部选中则取消全选
    cancel(){
      if (this.listData[this.Index].items[this.nameIndex].select == false) {
        this.allSelect = false;
      }
    },
    // 弹出编辑选框
    show(index){
      this.listData[this.Index].items[index].id = index;
      // console.log(index)
    },
    // 收起编辑选框
    Hide(index){
      this.listData[this.Index].items[index].id = -1;
    },
    // 商品--
    reduce(index){
      if (this.listData[this.Index].items[index].amount <= 1) {
        return;
      }
      this.listData[this.Index].items[index].amount--;
      this.price();
    },
    // 商品++
    add(index){
      if (this.listData[this.Index].items[index].amount >= 5) {
        if (this.listData[this.Index].items[index].amount == 5) {
        alert("商品已到达最大值！");
      }
        return;
      }
      this.listData[this.Index].items[index].amount++;
      this.price();
    },
    // 删除商品
    del(index){
      this.listData[this.Index].items.splice(index,1);
      if (this.listData[this.Index].items.length == 0) {
        this.listData[this.Index].show = false;
      }
    },
    // 结算支付
    final(){
      if (this.allPrice == 0) {
        alert("请选择商品");
        return;
      }
      alert("共计支付：" + this.allPrice + "元");
    }
  }
}
</script>

<style>
/*媒体查询自适应*/
/*大屏-750px~1920*/
@media screen and (min-width:750px) and (max-width:1920px){
  html{
    font-size:100px;
  }
}
/*670px~750px*/
@media screen and (min-width:670px) and (max-width:750px){
    html{
      font-size:100px;
    }
}
/*570px~670px*/
@media screen and (min-width:570px) and (max-width:670px){
    html{
      font-size:80px;
    }
}
/*414px~570px*/
@media screen and (min-width:414px) and (max-width:570px){
    html{
      font-size:61px;
    }
}
/*320px~414px*/
@media screen and (min-width:320px) and (max-width:414px){
    html{
      font-size:58px;
    }
}
*{
    border: 0;
    padding: 0;
    margin: 0;
    font-family: "微软雅黑";
}

body {
  background: rgb(238, 238, 238);
}

.header {
  width: 100%;
  height: 50px;
  background: #fff;
}

.header-nav {
  width: 100%;
  height: 50px;
  margin: 0 auto;
  background: #f40;
}

.header-nav:nth-child(1) {
  font-size: 20px;
  color: #fff;
  text-align: center;
  line-height: 50px;
}

/*底部：固定到底部*/
.footer {
  width: 100%;
  height: 50px;
  background: #fff;
  position: fixed;
  bottom: 0;
  z-index: 999;
}

.list {
  list-style-type: none;
}

.list li {
  width: 100%;
  border-bottom: 1px solid #ccc;
}

.sel {
  border: 1px solid #ccc;
  width: 20px;
  height: 20px;
  display: inline-block;
  border-radius: 50%;
  position: relative;
  top: 0.1rem;
  left: 0.3rem;
}

.list-dp {
  width: 100%;
  background: #fff;
  line-height: 0.8rem;
  font-size: 18px;
  color: #666;
  margin: 0 auto;
  margin-top: 0.2rem
}

.dp {
  margin-left: 5%;
  line-height: 0.8rem;
  font-size: 14px;
}

.item {
  width: 92%;
  height: 1.5rem;
  display: flex;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
}

.item-select {
  width: 1.2rem;
  height: 1.5rem;
}

.item-img {
  width: 1.5rem;
  height: 1.5rem;
  margin-top: 0.3rem
}

.item-img img {
  width: 100%;
}

.item-text {
  height: 1.5rem;
  width: 95%;
  margin-left: 3%;
  margin-top: 0.35rem;
  overflow: hidden;
}

.item-text p:nth-child(1) {
  color: #666;
  font-size: 12px;/*padding: 10px;*/
}

.item-text p:nth-child(2) {
  color: #999;
  font-size: 12px;
  padding-top: 0.1rem;
}

.item-pri {
  color: #f40;
  padding-right: 10px;
}

.item-amount {
  color: #999;
  line-height: 1.5rem;
  font-size: 12px;
}

.sel1 {
  border: 1px solid #ccc;
  width: 20px;
  height: 20px;
  display: inline-block;
  border-radius: 50%;
}

.footer {
  font-size: 12px;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.up {
  width: 2rem;
  height: 50px;
  color: #fff;
  font-size: 14px;
  line-height: 50px;
  text-align: center;
  background: #f40;
  margin-right: -6%;
}

.all {
  margin-left: -7%;
}

.bg {
  background: #f40
}

.addAll {
  margin-left: 15%
}

.edit {
  color: #999;
  font-size: 12px;
  float: right;
  margin-right: 5%;
}

.amount {
  width: 70%;
  height: 1.5rem;
  display: inline-block;
  font-size: 12px;
}

.amount span {
  font-size: 20px;
  width: 20%;
  height: 0.5rem;
  display: inline-block;
  text-align: center;
  border: 1px solid #666;
  border-radius: 5px;
  line-height: 0.5rem;
}

.amount input {
  display: inline-block;
  width: 50%;
  height: 0.5rem;
}

.Hide {
  width: 28%;
  height: 1.1rem;
  background: #f40;
  display: inline-block;
  border-radius: 5px;
  float: right;
  font-size: 16px;
  line-height: 1.1rem;
  text-align: center;
  color: #fff;
}
</style>
