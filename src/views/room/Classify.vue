
<template>
  <div>
    <el-calendar v-model="value">
      <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
      <template slot="dateCell" slot-scope="{ data }">
        <!--自定义内容-->
        <div @click="clickData(data)">
          <div class="calendar-day">{{ data.day.split('-').slice(2).join('-') }}</div>
          <div v-for="(item, index) in calendarData" :key="index">
            <div v-if="item.months.indexOf(data.day.split('-').slice(1)[0]) != -1">
              <div v-if="item.days.indexOf(data.day.split('-').slice(2).join('-')) != -1">
                <div class="is-selected">{{ item.sign }}</div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  name: 'calendar',
  data() {
    return {
      calendarData: [{ months: [], days: [], sign: '✔️' }],
      value: new Date(),
    }
  },
  methods: {
    clickData(data) {
      this.calendarData[0].months.push(data.day.split('-')[1])
      this.calendarData[0].days.push(data.day.split('-')[2])
    },
  },
}
</script>
<style>
</style>