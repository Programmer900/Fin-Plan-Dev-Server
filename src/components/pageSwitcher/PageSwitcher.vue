<template>
  <div class="greyBg">
    <div class="flexWrapperRow">
      <ul
        class="flexRowCenter"
        id="pageSwitcherListID"
        @mousemove="onDragging($event)"
        @mousedown="startDragging($event)"
        @mouseup="stopDragging($event)"
        @mouseleave="stopDragging($event)"
      >
        <li class="default-w-500" v-for="page in pages" :key="page.link">
          <router-link active-class="underline" exact :to="page.link">{{ page.name }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
  name: 'PageSwitcher',

  watch: {
    $route(to) {
      if (to.params.document === 'stock') this.pages[0].name = 'Об акции';
      if (to.params.document === 'bond') this.pages[0].name = 'Об облигации';
    },
  },

  data() {
    return {
      pages: [
        {
          name: this.$route.params.document === 'stock' ? 'Об акции' : 'Об облигации',
          link: 'info',
        },
        { name: 'О компании', link: 'about' },
        { name: 'Показатели компании', link: 'indicators' },
        { name: 'Дивиденды', link: 'dividends' },
        { name: 'Отчётность', link: 'reporting' },
        { name: 'Облигации', link: 'bonds' },
        { name: 'Обсуждение', link: 'discussion' },
      ],
    };
  },

  setup() {
    const $list = ref<any>('');
    const mouseDown = ref<boolean>(false);
    const startX = ref(0);
    const scrollLeft = ref(0);

    const startDragging = (e: any): void => {
      mouseDown.value = true;
      startX.value = e.pageX - $list.value.offsetLeft;
      scrollLeft.value = $list.value.scrollLeft;
    };

    const stopDragging = (e: any): void => {
      mouseDown.value = false;
    };

    const onDragging = (e: any): void => {
      e.preventDefault();
      if (mouseDown.value) {
        const x = e.pageX - $list.value.offsetLeft;
        const scroll = x - startX.value;
        $list.value.scrollLeft = scrollLeft.value - scroll;
      }
    };

    onMounted(() => {
      $list.value = document.querySelector('#pageSwitcherListID');
    });

    return {
      onDragging,
      startDragging,
      stopDragging,
    };
  },
});
</script>

<style scoped lang="scss" src="./style.scss" />
