<template>
<div class="extra-page">
 <qa v-if="$route.query.type=='school-qa'"></qa>
</div>
</template>

<script>
import Qa from '@/page/service-map/qa.vue'
export default {
	name: "extra-page",
	components: { Qa},
}
</script>

<style scoped lang="less">

</style>
