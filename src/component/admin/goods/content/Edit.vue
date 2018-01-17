<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" style="width: 700px" class="demo-ruleForm">
            <el-form-item label="文章标题" prop="title">
                <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="副标题" prop="sub_title">
                <el-input v-model="ruleForm.sub_title"></el-input>
            </el-form-item>
            <el-form-item label="所属类别" prop="category_id">
                <el-select v-model="ruleForm.category_id" placeholder="请选择活动区域">
                    <el-option v-for="item in goodsCategory" :key="item.category_id" :label="item.title" :value="item.category_id">
                        <span v-if="item.class_layer !=1">|-</span>
                        <span>{{ item.title }}</span>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否发布">
                <el-switch v-model="ruleForm.status"></el-switch>
            </el-form-item>
            <el-form-item label="轮播图">
                <el-switch v-model="ruleForm.is_slide"></el-switch>
            </el-form-item>
            <el-form-item label="置顶">
                <el-switch v-model="ruleForm.is_top"></el-switch>
            </el-form-item>
            <el-form-item label="推荐">
                <el-switch v-model="ruleForm.is_hot"></el-switch>
            </el-form-item>
            <!-- <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="true" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload> -->
            <el-form-item label="上传封面" prop="imgList">
                <el-upload class="upload-demo" action="http://localhost:8899/admin/article/uploadimg" :file-list="ruleForm.imgList" :on-remove="imgRemove" :on-success="imgUploaded" list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="上传附件">
                <el-upload class="upload-demo" action="http://localhost:8899/admin/article/uploadfile" :file-list="ruleForm.fileList" :on-success="fileUploaded" list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="商品货号" prop="goods_no">
                <el-input v-model="ruleForm.goods_no"></el-input>
            </el-form-item>
            <el-form-item label="库存数量" prop="stock_quantity">
                <el-input v-model="ruleForm.stock_quantity"></el-input>
            </el-form-item>
            <el-form-item label="市场价格" prop="market_price">
                <el-input v-model="ruleForm.market_price"></el-input>
            </el-form-item>
            <el-form-item label="销售价格" prop="sell_price">
                <el-input v-model="ruleForm.sell_price"></el-input>
            </el-form-item>
            <el-form-item label="内容摘要" prop="zhaiyao">
                <el-input type="textarea" v-model="ruleForm.zhaiyao"></el-input>
            </el-form-item>
            <el-form-item label="详细内容" prop="content">
                <quill-editor v-model="ruleForm.content"></quill-editor>
                <!-- <el-input type="textarea" v-model="ruleForm.zhaiyao"></el-input> -->
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                <el-button @click="resetForm('ruleForm')">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
//导入富文本样式与组件
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";

export default {
  data() {
    //   封面图校验函数
    var validateImg = (rule, value, callback) => {
      if (value === "" || value.length == 0) {
        callback(new Error("请上传封面"));
      } else {
        callback();
      }
    };

    return {
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          { min: 3, max: 50, message: "长度在 3 到 50 个字符", trigger: "blur" }
        ],
        sub_title: [
          { required: true, message: "请输入副标题", trigger: "blur" },
          { min: 3, max: 50, message: "长度在 3 到 50 个字符", trigger: "blur" }
        ],
        category_id: [
          { required: true, message: "请选择商品分类", trigger: "blur" },
          { type: "number", message: "值必须为数字", trigger: "blur" }
        ],
        zhaiyao: [{ required: true, message: "请输入摘要", trigger: "submit" }],
        imgList: [
          {
            validator: validateImg,
            required: true,
            message: "上传封面",
            trigger: "change"
          }
        ]
      },
      imageUrl: "",
      fileList2: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ],
      goodsCategory: []
    };
  },
  methods: {
    goodsModify() {
      this.$http.post(this.$api.gsEdit + this.id, this.ruleForm).then(res => {
        if (res.data.status == 0) {
          this.$alert("马上跳回商品列表页", "修改成功", {
            confirmButtonText: "确定",
            callback: action => {
              this.$router.push({ name: "goodsCtList" });
            }
          });
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.goodsModify();
        } else {
          this.$alert("error submit!!");
          return false;
        }
      });
    },
    imgRemove(file, fileList) {
      let removeUrl = file.url;
      this.ruleForm.imgList = this.ruleForm.imgList.filter(v => v.url != removeUrl);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    //获取商品数据
    getGoods() {
      this.$http.get(this.$api.gsDetail + this.id).then(res => {
        this.ruleForm = res.data.message;
        this.ruleForm.category_id = +this.ruleForm.category_id;
        // console.log(res.data.message);
      });
    },
    //获取商品分类
    getGoodsCategory() {
      this.$http.get(this.$api.ctList + "goods").then(res => {
        this.goodsCategory = res.data.message;
      });
    },
    //封面上传成功钩子回调
    imgUploaded(res, file, fileList) {
      this.ruleForm.imgList = [res];
    },
    //附图上传成功钩子回调
    fileUploaded(res, file, fileList) {
      this.ruleForm.fileList.push.res;
    }
  },
  created() {
    this.id = this.$route.params.id;
    this.getGoods();
    this.getGoodsCategory();
  },
  components: {
    quillEditor
  }
};
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>