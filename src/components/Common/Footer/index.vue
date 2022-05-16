<template>
  <footer class="pageFooter">

    <transition name="modals">
      <Modal
        v-if="isModalObligationsCalcVisible"
        @close="closeObligationsCalc"
        :width="'650px'"
        :bgColor="'#0d1214'"
      >
        <template v-slot:title>
          Калькулятор облигации
        </template>
        <template v-slot:content-text>
          <ObligationsCalc :hasCloseDetailObligation="hasCloseDetailObligation"></ObligationsCalc>
        </template>
      </Modal>
    </transition>

    <transition name="modals">
      <Modal
        v-if="isModalDetailObligationsCalcVisible"
        @close="closeDetailObligationsCalcModal"
        :width="'650px'"
        :bgColor="'#0d1214'"
        :isBack="true"
      >
        <template v-slot:back>
          <a class="postDetails__back more" href="javascript: void(0)" @click="closeDetailObligations">
            <span class="icon icon-arr_rounded_left"></span><span class="text">Назад</span>
          </a>
        </template>
        <template v-slot:title>
          Детализированные купоны {{ currentObligations.value }}
        </template>
        <template v-slot:content-text>
          <ObligationDetailCalc></ObligationDetailCalc>
        </template>
      </Modal>
    </transition>


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
import Modal from '@/components/Blocks/ConditionModal/index.vue';
import ObligationsCalc from '@/components/obligations/obligationsCalc.vue';
import ObligationDetailCalc from "@/components/obligations/obligationDetailCalc.vue";
import { copyrightTextLeft, copyrightTextRight } from '@/components/Common/Footer/data';

export default defineComponent({
  name: 'PageFooter',
  components: {
    PageFooterCopyright,
    PageFooterDocs,
    PageFooterSocialList,
    PageFooterMail,
    LogoFinPlan,
    Modal,
    ObligationsCalc,
    ObligationDetailCalc
  },
  data() {
    return {
      hasCloseDetailObligation: false
    }
  },
  methods: {
    closeDetailObligations() {
      const self = this

      setTimeout(function() {
        self.closeDetailObligationsCalcModal()
        self.showObligationsCalcModal()
        self.hasCloseDetailObligation = true
      },400)

    },
    closeObligationsCalc() {
      this.closeObligationsCalcModal()
    },
    ...mapMutations({
      /*closeModal: 'modal/closeModal',*/
      showObligationsCalcModal: 'modalObligationsCalcStore/showModal',
      closeObligationsCalcModal: 'modalObligationsCalcStore/closeModal',
      closeDetailObligationsCalcModal: 'modalObligationsCalcStore/closeModalDetail',
    })
  },
  computed: {
    ...mapGetters({
     /* isModalVisible: 'modal/isModalVisible',
      isLoaderVisible: 'loader/isLoaderVisible',
      notifications: 'notifications/getNotifications',*/
      currentObligations: 'obligationsStore/getCurrentObligations',
      isModalObligationsCalcVisible: 'modalObligationsCalcStore/isModalVisible',
      isModalDetailObligationsCalcVisible: 'modalObligationsCalcStore/isModalDetailVisible',
      /*isModalObligationsCalcIisVisible: 'modalObligationsCalcIis/isModalVisible',*/
    })
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

.icon-arr_rounded_left:before {
  content: "\e911";
}
</style>
