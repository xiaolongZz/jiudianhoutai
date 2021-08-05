<template>
  <div>
    <el-card>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="title">
        <el-breadcrumb-item :to="{ path: '/orderList' }">订单列表</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/comment' }">评价管理</el-breadcrumb-item>
        <el-breadcrumb-item>详情</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="main">
        <div>
          <span>{{ '订单编号：' + commentDetialData.order_sn }}</span>
          <span>{{ '房间类型：' + commentDetialData.room_name }}</span>
          <span>{{ '入住时间：' + commentDetialData.arrival_date }}</span>
        </div>
        <div>
          <span>{{ '用户昵称：' + commentDetialData.nickname }}</span>
          <span>{{ '入住人：' + commentDetialData.contact_name }}</span>
          <span>{{ '电话号码：' + commentDetialData.mobile }}</span>
        </div>
        <div>
          <span>{{ '用户评分：' + commentDetialData.ratings }}</span>
          <span>{{ '状态：' + commentDetialData.status }}</span>
          <span>{{ '评论时间：' + commentDetialData.created_at }}</span>
        </div>
        <div>
          <span>提交图片：</span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="demo-image__preview" style="width: 100%">
        <video width="250" height="200" v-for="(video, index) in commentDetialData.file.video" :key="video + index" controls class="videolist">
          <template slot-scope="scope">
            <source :src="scope" type="video/mp4" />
          </template>
        </video>
        <el-image
          v-for="(ele, index) in commentDetialData.file.picture"
          :key="ele + index"
          style="width: 250px; height: 200px"
          :src="ele"
          :preview-src-list="commentDetialData.file.picture"
          fit="cover"
        ></el-image>
      </div>
      <div class="message">
        <span>提交的信息：</span>
        <span></span>
        <span></span>
      </div>
      <div class="comment">
        <div v-for="(ele, index) in commentList" :key="index" class="message">
          <span :class="ele.source == '商家' ? 'is_reply' : 'content'">{{ ele.content }}</span>
          <span class="contentTime">{{ ele.created_at }}</span>
        </div>
      </div>
      <div class="reply">
        <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 4 }" placeholder="追加回复" v-model="content" resize="none"> </el-input>
        <el-button type="primary" @click="reply">确认</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getCommentDetial, createReply } from '../../assets/api/index.js'
export default {
  name: 'EvaluateDetail',
  data() {
    return {
      id: '', // 评论的id
      url: '',
      srcList: [],
      commentList: [],
      content: '',
      commentDetialData: {
        file: {
          picture: [],
          video: [],
        },
      },
    }
  },
  created() {
    this.id = this.$route.query.id
    this.commentDetial()
  },
  methods: {
    async commentDetial() {
      await getCommentDetial({ id: this.id }).then((res) => {
        this.commentDetialData = res.data[0]
        this.commentList = res.data[0].commentInfo
      })
    },
    async reply() {
      await createReply({ id: this.id, content: this.content, is_reply: this.commentList[this.commentList.length - 1].is_reply }).then((res) => {
        this.$message('回复成功~')
        this.commentDetial()
      })
    },
  },
}
</script> 
 
 <style lang="less" scoped>
.el-card {
  .title {
    padding-left: 10px;
    text-align: left;
    height: 54px;
    line-height: 54px;
    background-color: #fafafa;
    font-size: 13px;
  }
  .main {
    margin-top: 20px;
    div {
      margin-bottom: 30px;
      display: flex;
      justify-content: space-evenly;
      span {
        width: 400px;
      }
    }
  }
  .demo-image__preview {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin: 0 auto;
    margin-top: -20px;
    .el-image {
      margin: 0 5px;
      margin-top: 10px;
    }
  }
  .message {
    margin-top: 30px;
    display: flex;
    justify-content: space-evenly;
    span {
      width: 400px;
    }
  }
  .reply {
    display: flex;
    height: 100px;
    text-align: center;
    justify-content: space-evenly;
    width: 50%;
    margin-left: 18%;
    margin-top: 35px;
    .el-button {
      margin-top: 10px;
      margin-left: 20px;
      width: 90px;
      height: 50px;
    }
  }
  .is_reply {
    color: red;
  }
  .videolist {
    margin: 10px 10px;
  }
}
</style>