<script setup lang="ts">
import type { prizeType } from '~/types/prize';

const route = useRoute();
const prizeStore = usePrizeStore();
const isMainPage = computed(() => route.path.startsWith('/mainPage'));
const isMainPageUpdate = computed(() => route.path.startsWith('/mainPage/updatePrize'));
const { isLoading, prizes } = storeToRefs(prizeStore);

// Carousel config
const autoplay = ref(true);
const autoplayDelay = 2000;

// สร้าง computed property สำหรับ items ที่จะส่งให้ UCarousel
const carouselItems = computed(() => {
  // คืนค่า array ของรางวัลแต่ละชิ้น
  return prizes.value;
});

onMounted(() => {
  prizeStore.fetchPrizes(route.params.id as string);
  // ตั้งค่า room_id สำหรับรางวัลใหม่
  prizeStore.newPrize.room_id = route.params.id as string;
});

const toggleAutoplay = () => {
  autoplay.value = !autoplay.value;
};

const { handleEditPrize = () => { } } = defineProps<{
  handleEditPrize?: (prize: prizeType) => void
}>()



</script>

<template>
  <div class="card w-full px-10">
    <div class="">
      <div class="flex justify-end items-center mb-4">
        <div class="flex items-center gap-2">

          <!-- ปุ่มเปิด/ปิดการเลื่อนอัตโนมัติ -->
          <button @click="toggleAutoplay"
            class="btn h-fit bg-gradient-to-t from-[#3fc028] to-[#5ee746] p-2 border-0 rounded-[2rem] w-fit text-white shadow-black shadow-sm"
            :class="autoplay ? 'btn-success' : 'btn-outline'">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path v-if="autoplay" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path v-if="!autoplay" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>


          <button v-if="!isMainPage || isMainPageUpdate" @click="prizeStore.showAddPrizeModal = true"
            class="btn h-fit bg-gradient-to-t from-[#3fc028] to-[#5ee746] p-2 border-0 rounded-[2rem] w-fit text-white shadow-black shadow-sm">
            <div class="bg-[#3fc028] rounded-[2rem] p-2 text-sm font-semibold flex items-center gap-1">
              <p class="drop-shadow-lg">เพิ่มรางวัล</p>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
              </svg>
            </div>
          </button>
          <NuxtLink v-else :to="`updatePrize/${route.params.id}`">
            <button
              class="btn h-fit bg-gradient-to-t from-[#ff8f00] to-[#ffd902] p-2 border-0 rounded-[2rem] w-fit text-white shadow-black shadow-sm">
              <div class="bg-[#ffae02] rounded-[2rem] p-2 text-sm font-semibold flex items-center gap-1">
                <p class="drop-shadow-md">จัดการรางวัล</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                </svg>
              </div>
            </button>
          </NuxtLink>
        </div>
      </div>

      <!-- รายการรางวัลแบบ UCarousel -->
      <div v-if="prizes.length > 0" class="relative">
        <UCarousel v-slot="{ item }" :items="carouselItems" class="relative" :ui="{
          item: 'basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 px-2 grid grid-cols-1 gap-4',
        }" :autoplay="autoplay ? { delay: autoplayDelay } : false" loop arrows dots>
          <div class="relative px-2" :class="{
            'opacity-50 pointer-events-none': item.quantity === 0 && !isMainPageUpdate
          }">
            <div v-if="item.quantity === 0"
              class="absolute inset-0 bg-black/70 flex items-center justify-center text-white font-bold text-lg z-20 rounded-lg">
              หมดแล้ว
            </div>
            <PrizeCard :prize="item" :handleEditPrize=handleEditPrize />
          </div>
        </UCarousel>
      </div>


      <!-- ถ้าไม่มีรางวัล -->
      <div v-if="prizes.length === 0"
        class="badge badge-outline badge-primary shadow-md h-40 flex items-center justify-center gap-4 mx-auto rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24"
          class="stroke-current shrink-0 w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span class=" text-xl font-bold drop-shadow-2xl text-black/50">ยังไม่มีของรางวัลในตอนนี้ กรุณาเพิ่มรางวัลอย่างน้อย
          1
          รายการก่อนเริ่มใช้งาน</span>
      </div>
    </div>
  </div>
</template>
