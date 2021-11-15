<style lang="scss" scoped>
.customed-cell {
  height: 100%;
  .cell-head {
    height: 24px;
  }
  .cell-body {
    box-sizing: border-box;
    height: calc(100% - 24px);
    overflow: auto;
    font-size: 12px;
    padding: 5px;
    .event-container:nth-child(2n + 1) {
      background: #03a9f4;
    }
    .event-container:nth-child(2n) {
      background: coral;
    }
    .event-container:not(:nth-last-child(1)) {
      margin-bottom: 5px;
    }
  }
}
</style>
<template>
  <section>
    <input v-model="year" type="number" />
    <input v-model="month" type="number" />
    {{ year }}年{{ month }}月
    <calendar :year="year" :month="month" style="width: 1200px">
      <template v-slot="scope">
        <div class="customed-cell">
          <div class="cell-head">
            {{ scope.data.date.getDate() }}
          </div>
          <section v-if="getTodayData(scope.data.date)" class="cell-body">
            <div v-for="o in getTodayData(scope.data.date).events" class="event-container">
              <div @click="handleClick(scope.data, o)">
                {{ o.label }}
              </div>
            </div>
          </section>
        </div>
      </template>
    </calendar>
  </section>
</template>
<script>
import calendar from "./calendar.vue";
export default {
  components: { calendar },
  data() {
    return {
      year: 2019,
      month: 5,
      list: [
        {
          date: new Date("2019-05-26"),
          events: [
            { label: "你好" },
            { label: "哈哈" },
            { label: "12333" },
            { label: "王凤飞飞" },
            { label: "哈哈我试试" },
            { label: "品牌浅蓝色" },
            { label: "酷酷酷" },
            { label: "拼是毛实习生" },
          ],
        },
      ],
    };
  },
  methods: {
    isMonday(date) {
      return date.getDay() == 1;
    },
    isSameDay(day1, day2) {
      const _format = function (p) {
        let dateObj;
        if (typeof p === "string") {
          dateObj = new Date(p);
        } else if (p instanceof Date) {
          dateObj = p;
        }
        dateObj.setHours(0);
        dateObj.setMinutes(0);
        dateObj.setSeconds(0);
        return +dateObj;
      };
      return _format(day1) === _format(day2);
    },
    getTodayData(date) {
      const res = this.list.filter((o) => this.isSameDay(o.date, date));
      if (res.length > 0) {
        return res[0];
      } else {
        return null;
      }
    },
    handleClick(data, events) {
      console.log(data, events);
    },
  },
};
</script>
