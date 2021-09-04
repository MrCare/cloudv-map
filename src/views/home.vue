<template>
  <div class="home">
    <img alt="苏州云视图信息科技有限公司" src="@/assets/img/logo.jpeg">
    <HelloWorld msg="长江三角洲智慧农业研究院"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/hello-world.vue';

export default {
    name: 'Home',
    components: {
        HelloWorld,
    },
};
</script>
<style>
img{
  width: 20vw;
}
ol > li {
  padding: 10px;
}
</style>
