<template>
  <div class="whiteBg">
    <div class="flexWrapperColumn">
      <div class="totalComments tableValue flexRowCenter">
        <p>{{ $t('discussion.comments') }}</p>
        <span class="default-w-400">24</span>
      </div>
      <form class="commentForm">
        <textarea
          class="commentBlock"
          cols="40"
          name="comment"
          placeholder="Ваш комментарий"
          rows="3"
        />
        <input class="submitBtn default-w-500" type="submit" :value="$t('discussion.send')" />
      </form>

      <div class="userComment flexRowCenter">
        <div class="avatar">
          <img
            alt="user photo"
            src="https://st.depositphotos.com/1144472/2003/i/600/depositphotos_20030237-stock-photo-cheerful-young-man-over-white.jpg"
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
              <img alt="thumb down" :src="thumbDown" />
              <p>10</p>
              <img alt="thumb up" :src="thumbUp" />
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
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import thumbUp from '@/assets/icons/thumbs-up.svg';
import thumbDown from '@/assets/icons/thumbs-down.svg';

export default defineComponent({
  name: 'DocumentDiscussionPage',
  setup() {
    return {
      thumbUp,
      thumbDown,
    };
  },
});
</script>

<style scoped lang="scss">
.flexWrapperColumn {
  margin: auto;
}

.greyBg {
  .flexWrapperRow {
    justify-content: center;
    > p {
      width: max-content;
      color: #2a8634;
      font-weight: 600;
      font-size: 12px;
      text-transform: uppercase;
      cursor: pointer;

      &:hover {
        margin-left: 20px;
        color: #fec006;
        transition: 0.3s;
      }
    }
  }
}

.userComment {
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  .userGrade {
    position: absolute;
    width: 20px;
    height: 20px;
    margin-top: 50px;
    margin-left: 50px;
    background-color: #2a8634;
    border-radius: 50%;

    &:hover .gradeInfo {
      display: flex;
    }
  }

  .gradeInfo {
    position: absolute;
    display: none;
    justify-content: center;
    width: 100px;
    height: 40px;
    margin-top: 45px;
    margin-left: -28px;
    padding: 20px;
    color: white;
    font-size: 14px;
    background-color: black;
    border-radius: 20px;
  }

  .avatar {
    display: flex;
    flex-direction: column;
    width: max-content;
    > img {
      width: 70px;
      height: 70px;
      object-fit: cover;
      border-radius: 50%;
    }
  }

  .commentData {
    display: flex;
    flex-direction: column;
    width: 92%;
    margin-left: 20px;

    .commentBtns {
      justify-content: space-between;
      width: 180px;
      margin-top: 20px;
      > p {
        color: #2a8634;
        font-weight: 600;
        font-size: 12px;
        text-transform: uppercase;
        cursor: pointer;

        &:hover {
          margin-left: 20px;
          color: #fec006;
          transition: 0.3s;
        }
      }

      .likes {
        > img {
          cursor: pointer;
        }
        > p {
          margin-right: 10px;
          margin-left: 10px;
          font-size: 14px;
        }
      }
    }

    > p {
      margin-top: 20px;
      font-size: 16px;
    }

    .date {
      margin-top: 20px;
      color: #797979;
      font-size: 12px;
      line-height: 150%;
    }

    .name {
      margin-top: 6px;
      color: black;
      font-size: 18px;
      line-height: 150%;
    }
  }
}

.totalComments {
  width: max-content;
  > p {
    font-size: 19px;
  }

  > span {
    margin-left: 20px;
    color: #797979;
    font-size: 20px;
    line-height: 150%;
  }
}

.commentForm {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 60px;
  padding: 0 0 40px 0;
  border-bottom: #c4c4c4 1px solid;
}

.commentBlock {
  width: 100%;
  height: 300px;
  margin-top: 40px;
  padding: 30px;
  font-size: 18px;
  background-color: #f7f7f7;
  border: 2px solid transparent;
  outline: none;

  &:hover {
    background-color: white;
    border: #fec006 2px solid;
  }
}

.submitBtn {
  width: 200px;
  margin-top: 40px;
  padding: 20px 40px;
  color: white;
  font-size: 14px;
  text-transform: uppercase;
  background-color: #2a8634;
  border: none;
  border-radius: 6px;
  outline: none;
  cursor: pointer;

  &:hover {
    background-color: #fec006;
    transition: 0.3s;
  }
}

@media (max-width: 600px) {
  .flexWrapperColumn {
    padding: 20px;

    .commentForm {
      height: 300px;
    }

    .userComment {
      flex-direction: column;

      .userGrade {
        width: 18px;
        height: 18px;
        margin-top: 34px;
        margin-left: 34px;
      }

      .gradeInfo {
        margin-top: 35px;
        margin-left: -35px;
      }

      .avatar {
        > img {
          position: absolute;
          width: 50px;
          height: 50px;
        }
      }

      .commentData {
        width: 100%;
        margin-left: 0;

        > .date {
          margin-top: 0;
          margin-left: 60px;
        }

        > .name {
          margin-left: 60px;
        }

        > span {
          margin-left: 20px;
        }
      }
    }
  }
}
</style>
