<script setup>
import TableBody from "@/components/index/table/s-table-body.vue";
import TableHeader from "~/components/index/table/s-table-header.vue";

const emit = defineEmits();

function setItem(item) {
  emit("setItem", item);
}
</script>

<template>
  <table class="table">
    <TableHeader />
    <TableBody @setItem="setItem" />
  </table>
</template>

<style scoped lang="scss">
.table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
}
</style>
