<template>
  <div class="whiteBg">
    <div class="flexWrapperColumn">
      <div>
        <div class="stocks">
          <div class="stocksHeader flexRowBetween">
            <div class="imageNameContainer">
              <h1 class="default-w-400">
                {{ getName }}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'IndexPageHeader',
  setup() {
    const store = useStore();

    const getName = computed(() => store.getters['indexPageStore/getName']);

    return {
      getName,
    };
  },
});
</script>

<style scoped lang="scss">
.flexWrapperColumn {
  margin: 0 auto;

  .stocks {
    margin-top: 15px;

    .stocksHeader {
      padding: 0 0 40px 0;
      //border-bottom: 1px solid rgba(179, 179, 179, 0.36);

      .priceAndIndexes {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: max-content;

        > span {
          margin-right: 50px;
          white-space: nowrap;
        }
      }

      .imageNameContainer {
        display: flex;
        flex-direction: row;
        align-items: center;
        //width: 100%;

        .logo {
          width: 95px;
          height: 40px;
          margin-right: 20px;
          background-color: #e0e0e0;
        }

        > h1 {
          margin: 0;
          font-size: 32px;
          line-height: 39px;
        }
      }

      .types {
        display: flex;
        flex-direction: row;
        width: max-content;
        max-width: 270px;

        > span {
          margin-right: 10px;
          margin-bottom: 5px;
          padding: 15px 24px;
          color: white;
          font-size: 20px;
          line-height: 150%;
          background-color: #2a8634;
          border-radius: 10px;
        }
      }

      span {
        font-size: 32px;
        line-height: 39px;
      }
    }
  }

  .info {
    display: flex;
    flex-direction: column;
    //width: 40%;
    margin-top: 40px;
    padding: 0;

    > h1 {
      width: max-content;
      margin: 0;
      color: #b2b2b2;
      font-size: 18px;
    }

    .dynamic {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;

      .percents {
        display: flex;
        flex-direction: column;
        width: max-content;

        > span {
          max-width: 100px;
          margin-top: 15px;
          color: #b2b2b2;
          font-weight: 400;
          font-size: 14px;
          line-height: 16.1px;
        }

        > p {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin: 0;
          color: black;
          font-weight: bold;
          font-size: 20px;

          .arrowDown {
            transform: rotate(180deg);
          }

          > img {
            width: 17px;
            height: 17px;
            margin-left: 10px;
          }
        }
      }
    }
  }
}

@media (max-width: 1400px) {
  .flexWrapperColumn {
    padding: 10px 100px;

    .indexes {
      padding: 20px 0;
    }

    .stocks {
      .stocksHeader {
        > h1,
        span {
          font-size: 26px;
        }
      }
    }

    .stock {
      .stockInfoHeader {
        .info {
          > h1 {
            font-size: 16px;
          }

          .dynamic {
            > p {
              font-size: 15px;

              > span {
                font-size: 12px;
              }
            }
          }
        }
      }
    }
  }
}

@media (max-width: 600px) {
  .flexWrapperColumn {
    padding: 35px 20px;

    .indexes {
      flex-direction: column;
      align-items: flex-start;
      margin-left: -50px;
    }

    .stock {
      .stockInfoHeader {
        flex-direction: column;

        .info {
          width: 100%;
          margin-left: -40px;
        }

        > p {
          width: 100%;
        }
      }

      .stockInfo {
        .parameters {
          display: none;
        }

        .info {
          flex-direction: column;

          > h1 {
            width: 100%;
          }

          > p {
            margin-top: 15px;
            margin-left: 0;

            > span {
              margin-top: 5px;
            }
          }
        }
      }
    }

    .stocks {
      //margin-top: 80px;

      .stocksHeader {
        flex-direction: column;
        align-items: flex-start;

        > span {
          margin-top: 20px;
        }

        .types {
          margin-top: 20px;
          margin-left: -10px;
        }
      }
    }
  }
}

@media (max-width: 1100px) {
  .flexWrapperColumn {
    .stocks {
      .stocksHeader {
        .priceAndIndexes {
          > span {
            margin-right: 20px;
            font-size: 20px;
          }

          .types {
            > span {
              padding: 7px 12px;
              font-size: 16px;
            }
          }
        }

        .imageNameContainer {
          > h1 {
            font-size: 22px;
          }
        }
      }
    }

    .stock {
      .stockInfoHeader {
        .stockInfoHeaderDescription {
          > p {
            font-size: 16px;
          }
        }

        .info {
          > h1 {
            font-size: 16px;
          }

          .dynamic {
            .percents {
              > span {
                max-width: 80px;
                font-size: 12px;
              }

              > p {
                font-size: 15px;

                > img {
                  width: 13px;
                  height: 13px;
                  margin-left: 5px;
                }
              }
            }
          }
        }
      }
    }
  }
}

@media (max-width: 950px) {
  .flexWrapperColumn {
    .stock {
      .stockInfoHeader {
        flex-direction: column;

        .stockInfoHeaderDescription {
          width: 100%;

          > p {
            font-size: 16px;
          }
        }

        .info {
          width: 80%;
          padding: 0;

          > h1 {
            font-size: 16px;
          }

          .dynamic {
            .percents {
              > span {
                max-width: max-content;
                font-size: 12px;
              }

              > p {
                width: max-content;
                font-size: 15px;

                > img {
                  width: 13px;
                  height: 13px;
                  margin-left: 5px;
                }
              }
            }
          }
        }
      }
    }
  }
}

@media (max-width: 800px) {
  .flexWrapperColumn {
    width: 100%;

    .stocks {
      .stocksHeader {
        flex-direction: column;
        align-items: flex-start;
        padding: 0 0 0 20px;
        border-bottom: none;

        .imageNameContainer {
          padding: 0 0 10px 0;
          border-bottom: 1px solid #d7d7d7;
        }

        .priceAndIndexes {
          justify-content: space-between;
          width: 100%;
          margin-top: 10px;
          border-bottom: none;

          > span {
            margin-right: 20px;
            font-size: 20px;
          }

          .types {
            > span {
              padding: 7px 12px;
              font-size: 16px;
            }
          }
        }

        .imageNameContainer {
          > h1 {
            font-size: 20px;
          }
        }
      }
    }

    .stock {
      .stockInfoHeader {
        .info {
          width: 100%;
          padding: 0;

          > h1 {
            font-size: 16px;
          }

          .dynamic {
            .percents {
              > span {
                max-width: max-content;
                font-size: 12px;
              }

              > p {
                width: max-content;
                font-size: 15px;

                > img {
                  width: 13px;
                  height: 13px;
                  margin-left: 5px;
                }
              }
            }
          }
        }
      }
    }
  }
}

@media (max-width: 600px) {
  .flexWrapperColumn {
    .stocks {
      .stocksHeader {
        padding: 0;
      }
    }

    .stock {
      .stockInfoHeader {
        border-bottom: none;

        .info {
          margin-left: 0;

          > h1 {
            font-size: 16px;
          }

          .dynamic {
            .percents {
              > span {
                max-width: max-content;
                font-size: 12px;
              }

              > p {
                width: max-content;
                font-size: 15px;

                > img {
                  width: 13px;
                  height: 13px;
                  margin-left: 5px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
