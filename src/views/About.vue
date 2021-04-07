<template>
  <div class="about">
    <h1>{{name}}</h1>
    <div>count * 2 = {{doubleCount}}</div>
    <button @click="handleClick">add</button>



    <div>state from vuex {{a}}</div>
    <button @click="update">update a</button>
  </div>
</template>

<script lang='ts'>
import { useRouter, useRoute } from 'vue-router';
import { ref , computed, watch,getCurrentInstance} from 'vue'

export default {
   setup(props) {
    const router = useRouter()
    const route = useRoute()
    const name = ref(44)
    const handleClick=()=>{
      name.value++
    }
    watch(() => name.value, val => {
        console.log(`name is ${val}`)
      })
    const doubleCount = computed(() => name.value * 2);
    console.log(getCurrentInstance())
    const  {ctx,proxy}:any = getCurrentInstance()
      console.log(ctx.$api.personTree)
      const a = computed(() => ctx.$store.state.test.a)
      const update = () => {
        ctx.$store.commit('setTestA', name)
      }
  // const  {proxy}:any = getCurrentInstance()
    proxy.$axios.post(ctx.$api.personTree, {}) // 网络请求
        .then((result: any) => {
          console.log(result)
        }).catch(() => { /* */ })
    return {
      name,
      handleClick,
      doubleCount,
      a,
      // update,
    }
  },
}
</script>

