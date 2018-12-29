//图片压缩上传按钮
<template>
    <input ref="file" @change="getImg()" type="file" :accept="accept">
</template>

<script>
import {imgToBase64, base64ToBlob} from '@/util.js'
export default {
		name: "compress-upload",
    props: {
      'operate': {
        type: String,
        default: 'upLoad'
      },
      'accept': {
        type: String,
        default: 'image/jpg,image/png,image/bmp'
      }
    },
    methods:{
      getImg(){
        let file= this.$refs.file.files[0]
        console.log(file)
        imgToBase64(file, (base64, name ) => {
          // console.log(base64, name )
	        if(this.operate=='base64'){
		        this.$emit('done', base64);
	        }else{
		        let formdata = new FormData();
		        formdata.append('file' , base64ToBlob(base64), name);
		        this.axios({
			        method: 'post',
			        url: '/file/image/add',
			        headers: {'Content-Type': 'multipart/form-data'},
			        data: formdata
		        }).then( (res) => {
			        // console.log(res.data)
			        this.$emit('done', res.data);
		        })
	        }
        })
      }
    }
}
</script>

<style scoped lang="less">

</style>
