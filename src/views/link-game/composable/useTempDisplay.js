import { uniqueId } from "lodash";
import { computed, ref } from "vue";

export function useTempDisplay() {
  const tempDisplay = ref([]);

  const tempDisplayConnectingLines = computed(() =>
    tempDisplay.value.filter((o) => o.type === "connectingLine").map((o) => o.value)
  );

  const tempDisplayEliminatedCells = computed(() =>
    tempDisplay.value.filter((o) => o.type === "eliminatedCells").map((o) => o.value)
  );

  function addTempDisplayItem(obj) {
    const id = uniqueId();
    tempDisplay.value.push({
      id,
      type: obj.type,
      value: obj.value,
    });
    setTimeout(() => {
      removeTempDisplayItem(id);
    }, obj.time);
  }

  function removeTempDisplayItem(id) {
    const index = tempDisplay.value.find((o) => o.id === id);
    tempDisplay.value.splice(index, 1);
  }

  return {
    tempDisplayConnectingLines,
    tempDisplayEliminatedCells,
    addTempDisplayItem,
  };
}
