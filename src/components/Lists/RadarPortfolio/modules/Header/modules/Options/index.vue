<template>
  <div class="options">
    <div class="options__icon">
      <img alt="Настройки" :src="iconOptions" @click="onToggleDialogShow" />
    </div>
    <div class="options__icon--active">
      <img alt="Настройки" :src="iconOptionsActive" @click="onToggleDialogShow" />
    </div>
    <div :class="['options__dialog', { 'options__dialog--open': isShowDialog }]">
      <span class="options__close" @click="onToggleDialogShow" />
      <div class="options__dialogList">
        <InputCheckbox
          v-model:selected="profitability"
          class="options__dialogCheckbox"
          :is-left-checkmark="true"
          title="Доходность"
        />
        <InputCheckbox
          v-model:selected="cancellationPeriod"
          class="options__dialogCheckbox"
          :is-left-checkmark="true"
          title="Срок гашения"
        />
        <InputCheckbox
          v-model:selected="repaymentPrice"
          class="options__dialogCheckbox"
          :is-left-checkmark="true"
          title="Цена погашения"
        />
        <InputCheckbox
          v-model:selected="cost"
          class="options__dialogCheckbox"
          :is-left-checkmark="true"
          title="Стоимость"
        />
        <button class="options__show">Показать</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import InputCheckbox from '@/components/Inputs/Checkbox/index.vue';
import iconOptions from '@/assets/icons/settings.svg';
import iconOptionsActive from '@/assets/icons/settings--active.svg';

export default defineComponent({
  name: 'ListHeaderOptions',
  components: { InputCheckbox },
  setup() {
    const isShowDialog = ref<boolean>(false);
    const stateCheckboxes = reactive({
      profitability: true,
      cancellationPeriod: true,
      repaymentPrice: true,
      cost: false,
    });

    const onToggleDialogShow = () => {
      isShowDialog.value = !isShowDialog.value;
    };

    return {
      iconOptions,
      iconOptionsActive,
      isShowDialog,
      ...toRefs(stateCheckboxes),
      onToggleDialogShow,
    };
  },
});
</script>

<style scoped lang="scss">
.options {
  position: relative;
  cursor: pointer;

  &__icon {
    &--active {
      display: none;
    }
  }

  &__dialog {
    position: absolute;
    top: 30px;
    right: 0;
    z-index: 9;
    display: none;
    min-width: 220px;
    padding: 20px;
    background: #fff;

    &--open {
      display: block;
    }
  }

  &__show {
    width: 100%;
    margin-top: 15px;
    padding: 10px;
    color: #fff;
    text-transform: uppercase;
    background: #2a8634;
    border: none;
    outline: none;
    cursor: pointer;

    &:hover {
      background: #fec006;
    }
  }

  &__close {
    $_size: 14px;
    $_color: #747474;

    position: relative;
    display: block;
    width: $_size;
    height: $_size;
    margin-left: auto;
    border: 1px solid $_color;
    border-radius: 100%;

    @mixin _line() {
      position: absolute;
      top: 5px;
      left: 2px;
      display: block;
      width: 70%;
      height: 1px;
      background: $_color;
      content: '';
    }

    &::before {
      @include _line();

      transform: rotate(45deg);
    }

    &::after {
      @include _line();

      transform: rotate(-45deg);
    }
  }

  &__dialogCheckbox {
    &:first-child {
      margin-top: 10px;
    }

    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }

  &:hover > &__icon {
    display: none;

    &--active {
      display: unset;
    }
  }
}
</style>
