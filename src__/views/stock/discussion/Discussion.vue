<template>
  <div>
    <div class="whiteBg">
      <div class="flexWrapperColumn">
        <div class="totalComments tableValue flexRowCenter">
          <p>{{ $t('discussion.comments') }}</p>
          <span class="default-w-400">24</span>
        </div>
        <form class="commentForm">
          <textarea
            placeholder="Ваш комментарий"
            class="commentBlock"
            name="comment"
            cols="40"
            rows="3"
          ></textarea>
          <input class="submitBtn default-w-500" type="submit" :value="$t('discussion.send')" />
        </form>

        <div class="userComment flexRowCenter">
          <div class="avatar">
            <img
              src="https://st.depositphotos.com/1144472/2003/i/600/depositphotos_20030237-stock-photo-cheerful-young-man-over-white.jpg"
              alt="user photo"
            />
          </div>
          <div class="userGrade">
            <div class="gradeInfo flexRowCenter">Профи</div>
          </div>
          <div class="commentData defaultGrey20px">
            <span class="date default-w-500">14 августа 2020, 18:00</span>
            <span class="name default-w-bold">Павел Фамилия</span>
            <p>{{ $t('discussion.commentText') }}</p>
            <div class="commentBtns flexRowCenter">
              <p>{{ $t('discussion.reply') }}</p>
              <div class="likes defaultGrey20px flexRowCenter">
                <img :src="thumbDown" alt="thumb down" />
                <p>10</p>
                <img :src="thumbUp" alt="thumb up" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="greyBg">
      <div class="flexWrapperRow">
        <p>{{ $t('discussion.showMore') }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Discussion',
  data() {
    return {
      thumbUp: require('../../../assets/icons/thumbs-up.svg'),
      thumbDown: require('../../../assets/icons/thumbs-down.svg'),
    };
  },
});
</script>

<style scoped lang="scss" src="./style.scss" />
