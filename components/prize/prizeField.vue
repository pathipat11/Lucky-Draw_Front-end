<script setup lang="ts">
import { usePrizeStore } from '@/stores/PrizeStore';
import PrizesCarousel from './prizesCarousel.vue';
import type { prizeType } from '~/types/prize';

const route = useRoute();
const prizeStore = usePrizeStore();
const roomId = route.params.id as string;

const prizesQuantity = computed(() => prizeStore.prizes.length);



const props = defineProps<{
  handleEditPrize?: (prize: prizeType) => void
}>();
</script>

<template>
  <div class="container mx-auto">
    <fieldset class="fieldset bg-base-[#0F172B] p-4">
      <legend class="fieldset-legend">
        <h2 class="text-2xl md:text-3xl mb-2 text-black text-shadow-md">รางวัล ({{ prizesQuantity }} ชิ้น)</h2>
      </legend>
      <PrizesCarousel :handleEditPrize="handleEditPrize" />
    </fieldset>
  </div>
</template>