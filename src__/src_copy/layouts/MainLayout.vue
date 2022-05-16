<template>
  <main>
    <Header />
    <Indexes />
    <UserMenu />
    <slot />
  </main>
  <PageFooter />
</template>

<script>
import { defineComponent } from 'vue';
import Header from '../components/header/Header.vue';
import UserMenu from '../components/userMenu/UserMenu.vue';
import Indexes from '../components/indexes/Indexes.vue';
import PageFooter from '../components/Common/Footer/index.vue';

export default defineComponent({
  name: 'MainLayout',
  components: {
    PageFooter,
    Indexes,
    UserMenu,
    Header,
  },
});
</script>

<style lang="scss" scoped></style>
