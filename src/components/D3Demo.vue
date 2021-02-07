<template>
  <div>111</div>
</template>

<script>
import * as d3 from "d3";
export default {
  mounted() {
    const data = d3
      .csvParse(
        FileAttachment("us-population-state-age.csv").text(),
        (d, i, columns) => (
          d3.autoType(d), (d.total = d3.sum(columns, (c) => d[c])), d
        )
      )
      .sort((a, b) => b["<10"] / b.total - a["<10"] / a.total);
    console.log(data);
  },
};
</script>

<style></style>
