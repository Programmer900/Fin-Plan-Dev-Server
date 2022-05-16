<template>
  <div class="footerSocial">
    <PageFooterSocialItem
      alt="ВК"
      class="footerSocial__item"
      :icon="iconVk"
      :icon-active="iconVkActive"
      link="#"
    />
    <PageFooterSocialItem
      alt="Фейсбук"
      class="footerSocial__item"
      :icon="iconFb"
      :icon-active="iconFbActive"
      link="#"
    />
    <PageFooterSocialItem
      alt="Инстаграмм"
      class="footerSocial__item"
      :icon="iconInsta"
      :icon-active="iconInstaActive"
      link="#"
    />
    <PageFooterSocialItem
      alt="Ютуб"
      class="footerSocial__item"
      :icon="iconYouTube"
      :icon-active="iconYouTubeActive"
      link="#"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PageFooterSocialItem from '@/components/Common/Footer/modules/SocialList/modules/Item/index.vue';
import iconVk from '@/assets/icons/social/vk.svg';
import iconVkActive from '@/assets/icons/social/vk--active.svg';
import iconFb from '@/assets/icons/social/fb.svg';
import iconFbActive from '@/assets/icons/social/fb--active.svg';
import iconInsta from '@/assets/icons/social/insta.svg';
import iconInstaActive from '@/assets/icons/social/insta--active.svg';
import iconYouTube from '@/assets/icons/social/youtube.svg';
import iconYouTubeActive from '@/assets/icons/social/youtube--active.svg';

export default defineComponent({
  name: 'PageFooterSocialList',
  components: { PageFooterSocialItem },
  setup() {
    return {
      iconVk,
      iconVkActive,
      iconFb,
      iconFbActive,
      iconInsta,
      iconInstaActive,
      iconYouTube,
      iconYouTubeActive,
    };
  },
});
</script>

<style scoped lang="scss">
.footerSocial {
  display: flex;
  align-items: center;
  margin-top: 30px;

  &__item {
    &:not(:last-child) {
      margin-right: 20px;
    }
  }

  @include respond-to($container-media--tablet) {
    justify-content: flex-end;
    order: 2;
    margin-top: 0;
  }
}
</style>
