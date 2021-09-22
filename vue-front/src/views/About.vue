<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script lang="ts" setup>
import { getUser } from '../../services/user'
getUser().then(res => console.log(res))
</script>
