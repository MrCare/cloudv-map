<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      代码仓库：
      <a href="https://yunshitu.coding.net/" target="_blank" rel="noopener">coding</a>.
    </p>
    <p>
      知识共享：
      <a href="https://yunshitu.yuque.com/dashboard" target="_blank" rel="noopener">语雀空间</a>.
    </p>
    <p>
      官方文档：
      <a href="https://vuejs.org/" target="_blank" rel="noopener">vue官方文档</a>.
    </p>
  </div>
</template>

<script>
export default {
    name: 'HelloWorld',
    props: {
        msg: String,
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: var(--primary-color);
}
</style>
