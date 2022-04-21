<template>
  <div class="Footer">
    <div class="center">
      <div class="left">
        <img src="@/assets/img/footer-image.png" alt="" />
        <p>
          叩丁狼是一家专注于培养高级IT技术人才，为学员提供定制化IT职业规划方案及意见咨询服务的教育科技公司，为您提供海量优质课程，以及创新的线上线下学习体验，帮助您获得全新的个人发展和能力提升。
        </p>
      </div>
      <div class="mid">
        <ul>
          <li><a>微信公众号</a></li>
          <li><a>新浪微博</a></li>
          <li><a>在线客服</a></li>
        </ul>
      </div>
      <div class="right">
        <p>全国免费咨询热线：</p>
        <h2>020-85628002</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="less" scoped>
.Footer {
  background: #242b39;
  color: #7d879a;

  .center {
    display: flex;
    justify-content: space-between;
    height: 240px;

    .left {
      width: 426px;
      img {
        display: block;
        margin: 33px 0 27px 0;
      }
      p {
        text-align: left;
        font-size: 12px;
        font-weight: 400;
        line-height: 1.4;
        margin: 0;
      }
    }
    .mid {
      ul {
        margin-top: 123px;
        display: flex;
        font-size: 16px;
        li {
          border-right: 1px solid #7d879a;
          padding: 0 18px 0 18px;
          a {
            cursor: pointer;
          }
          &:nth-of-type(3) {
            border-right: 0px;
          }
        }
      }
    }
    .right {
      padding-top: 92px;
      text-align: left;
      p {
        margin: 0 0 10px 0;
        font-size: 14px;
      }
      h2 {
        font-size: 28px;
        font-weight: 700;
        margin: 0;
        color: #fff;
      }
    }
  }
}
</style>
