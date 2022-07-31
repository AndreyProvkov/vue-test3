<template>
  <div class="about">
    <h1>This is an about page</h1>
    {{test}}
    {{$route.params.test}}
    {{$route.query.test2}}
    {{$route.params}}
    {{$route.query.query}}
    {{ query}}
  </div>
</template>

<script>
export default {
  name: 'UserView',
  props: ['test', 'hello', 'query']
}
</script>