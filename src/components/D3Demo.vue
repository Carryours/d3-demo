<template>
  <div>
    <div ref="demo" class="demo"></div>
  </div>
</template>

<script>
import * as d3 from "d3";
import * as echarts from "echarts";
import axios from "axios";
export default {
  mounted() {
    this.draw();
  },
  methods: {
    draw() {
      const margin = { top: 30, right: 10, bottom: 0, left: 30 };
      axios
        .request({
          baseURL: "http://127.0.0.1:2021",
          method: "GET",
          url: "/us-population-state-age.csv",
        })
        .then((res) => {
          const data = d3
            .csvParse(
              res.data,
              (d, i, columns) => (
                d3.autoType(d), (d.total = d3.sum(columns, (c) => d[c])), d
              )
            )
            .sort((a, b) => b["<10"] / b.total - a["<10"] / a.total);
          console.log(data);
          const width = 1200;
          const height = data.length * 25 + margin.top + margin.bottom;
          const series = d3
            .stack()
            .keys(data.columns.slice(1))
            .offset(d3.stackOffsetExpand)(data)
            .map((d) => (d.forEach((v) => (v.key = d.key)), d));

          console.log(series);

          const x = d3.scaleLinear().range([margin.left, width - margin.right]);

          const y = d3
            .scaleBand()
            .domain(data.map((d) => d.name))
            .range([margin.top, height - margin.bottom])
            .padding(0.08);

          const color = d3
            .scaleOrdinal()
            .domain(series.map((d) => d.key))
            .range(d3.schemeSpectral[series.length])
            .unknown("#ccc");

          const formatPercent = d3.format(".1%");

          const formatValue = (x) =>
            isNaN(x) ? "N/A" : x.toLocaleString("en");

          d3.select(".demo")
            .append("svg")
            .attr("viewBox", [0, 0, width, height])
            .style("overflow", "visible")
            .append("g")
            .selectAll("g")
            .data(series)
            .enter()
            .append("g")
            .attr("fill", (d) => color(d.key))
            .selectAll("rect")
            .data((d) => d)
            .join("rect")
            .attr("x", (d) => x(d[0]))
            .attr("y", (d) => y(d.data.name))
            .attr("width", (d) => x(d[1]) - x(d[0]))
            .attr("height", y.bandwidth())
            .append("title")
            .text(
              (d) =>
                `${d.data.name} ${d.key}\n${formatPercent(
                  d[1] - d[0]
                )} (${formatValue(d.data[d.key])})`
            );
        });
    },
    renderChart() {
      let chart = echarts.init(this.$refs.demo);
      let option = (option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        legend: {
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
        },
        yAxis: {
          type: "category",
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        },
        series: [
          {
            name: "直接访问",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "insideRight",
            },
            data: [320, 302, 301, 334, 390, 330, 320],
          },
          {
            name: "邮件营销",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "insideRight",
            },
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "联盟广告",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "insideRight",
            },
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "视频广告",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "insideRight",
            },
            data: [150, 212, 201, 154, 190, 330, 410],
          },
          {
            name: "搜索引擎",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "insideRight",
            },
            data: [820, 832, 901, 934, 1290, 1330, 1320],
          },
        ],
      });
      chart.setOption(option);
    },
  },
};
</script>

<style>
.demo {
  width: 1000px;
  height: 800px;
}
</style>
