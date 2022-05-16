<template>
  <footer class="pageFooter">
    <div class="pageFooter__container">
      <div class="pageFooter__wrap pageFooter__grid-3">
        <div class="pageFooter__logo">
          <LogoFinPlan />
        </div>
        <div class="pageFooter__mails">
          <PageFooterMail
            title="Служба инвест-заботы о клиентах:"
            link="mailto:koshin@fin-plan.org"
            link-text="koshin@fin-plan.org"
          />
          <PageFooterMail
            title="Написать лично Виталию:"
            link="//facebook.com/vitaly.koshin"
            link-text="facebook.com/vitaly.koshin"
          />
        </div>
        <div class="pageFooter__phone">
          <a href="tel:+74952408186">8 (495) 240-81-86</a>
        </div>
      </div>
      <div class="pageFooter__wrap pageFooter__grid-2">
        <PageFooterSocialList />
        <PageFooterDocs />
      </div>
      <div class="pageFooter__gridCopyright">
        <PageFooterCopyright class="pageFooter__copyrightItem" :text="copyrightTextLeft" />
        <PageFooterCopyright class="pageFooter__copyrightItem" :text="copyrightTextRight" />
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LogoFinPlan from '@/components/Common/Logo/FinPlan/index.vue';
import PageFooterMail from '@/components/Common/Footer/modules/Mail/index.vue';
import PageFooterSocialList from '@/components/Common/Footer/modules/SocialList/index.vue';
import PageFooterDocs from '@/components/Common/Footer/modules/Docs/index.vue';
import PageFooterCopyright from '@/components/Common/Footer/modules/Copyright/index.vue';
import { copyrightTextLeft, copyrightTextRight } from '@/components/Common/Footer/data';

export default defineComponent({
  name: 'PageFooter',
  components: {
    PageFooterCopyright,
    PageFooterDocs,
    PageFooterSocialList,
    PageFooterMail,
    LogoFinPlan,
  },
  setup() {
    return {
      copyrightTextLeft,
      copyrightTextRight,
    };
  },
});
</script>

<style scoped lang="scss">
.pageFooter {
  margin-top: 50px;
  padding: 50px 0;
  background: #fff;

  &__container {
    @include wrap-pad();
  }

  &__wrap {
    margin-bottom: 30px;
    padding-bottom: 30px;
    border-bottom: 1px solid #c4c4c4;
  }

  &__mails {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
  }

  &__phone {
    margin-top: 30px;

    a {
      color: #000;
      font-weight: 700;
      font-size: 20px;
      text-decoration: none;
      transition: all 0.1s ease;

      &:hover {
        color: #fec006;
      }
    }
  }

  &__copyrightItem:not(:last-child) {
    margin-top: 20px;
  }

  @include respond-to($container-media--tablet) {
    &__grid-2 {
      display: grid;
      grid-template-columns: 2fr 1fr;
      align-items: center;
    }
  }

  @include respond-to($container-media--desktop) {
    &__grid-3 {
      display: grid;
      grid-template-columns: 1fr 3fr 2fr;
      align-items: center;
    }

    &__mails {
      margin-top: 0;
    }

    &__phone {
      margin-top: 0;
      text-align: right;

      a {
        font-size: 32px;
      }
    }
  }

  &__gridCopyright {
    display: flex;
    align-items: center;
  }

  &__copyrightItem {
    &:not(:last-child) {
      margin-right: 10%;
    }

    &:not(:last-child) {
      margin-top: 0;
    }
  }
}
</style>
