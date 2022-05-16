<template>
  <div class="userMenu">
    <img alt="profile" class="userMenu__icon" :src="user" />
    <img alt="star" class="userMenu__icon" :src="star" />
    <img alt="case" class="userMenu__icon" :src="userCase" />
  </div>
</template>

<script>
import star from '../../assets/icons/star.svg';
import user from '../../assets/icons/user.svg';
import userCase from '../../assets/icons/case.svg';

export default defineComponent({
  name: 'UserMenu',

  data() {
    return {
      star,
      user,
      userCase,
    };
  },
});
</script>

<style scoped lang="scss" src="./style.scss" />
