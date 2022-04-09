<template>
  <div class="company">
    <StudentBanner
      :bannerTitle="'产教融合'"
      :bannerMsg="
        '产教融合产教融合产教融合产教融合产教融合产教融合产教融合产教融合产教融合产教融合'
      "
    ></StudentBanner>
    <div class="w12 company-introduce">
      <el-row style="margin-right: -0.8rem;">
        <el-col :span="4" v-for="item in companyData" :key="item.company_id">
          <a @click="toCompanyDetail(item.company_id)">
            <img :src="item.company_img" />
          </a>
        </el-col>
      </el-row>
      <el-row>
        <el-pagination
          :page-size="companyRequestParam.limit"
          @current-change="handleCurrentChange"
          :current-page="companyRequestParam.from"
          layout="prev, pager, next"
          hide-on-single-page
          :total="companyRequestParam.total"
        ></el-pagination>
      </el-row>
    </div>
  </div>
</template>
<script>
import StudentBanner from '@/layouts/StudentBanner.vue'
export default {
  name: 'Company',
  components: {
    StudentBanner
  },
  data() {
    return {
      companyData: [],
      companyRequestParam: {
        limit: 15,
        from: 1,
        total: 16
      }
    }
  },
  created() {
    this.getCompanyData()
  },
  methods: {
    getCompanyData() {
      this.$axios.get('/company/selectCompany').then(res => {
        if (res.code !== 200) {
          this.$message.error(res.msg)
        }
        this.companyData = res.result
      })
    },
    toCompanyDetail(id) {
      this.$router.push(`/company-detail/${id}`)
    },
    handleCurrentChange() {
    }
  }
}
</script>
<style lang="less" scoped>
a:hover {
  cursor: pointer;
}
.w12 {
  background: #fff;
  max-width: 13rem;
  margin: 0 auto;
}
.el-pagination {
  text-align: center;
}
.company-introduce {
}
</style>
