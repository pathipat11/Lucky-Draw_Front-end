<script setup lang="ts">
import { usePlayerStore } from '@/stores/playerStore' // import store
import { storeToRefs } from 'pinia' // ให้ reactive
import { onMounted, ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { playerType } from '@/types/player'
import AddPlayerModal from './AddPlayerModal.vue'
import EditPlayerModal from './EditPlayerModal.vue'

// store
const playerStore = usePlayerStore()
const playerList = playerStore.players
const { players } = storeToRefs(playerStore)

// route
const route = useRoute()
const roomId = route.params.id as string

// modal
const isShowing = ref<boolean>(false)
const isModalOpen = ref(false)
const selectedPlayer = ref<playerType | null>(null)
const isEditModalOpen = ref(false)

// filter
const nameSearch = ref<string>('')

const playerListWithFullName = computed(() => {
    return players.value
        .map((player) => ({
            ...player,
            full_name: `${player.prefix} ${player.first_name} ${player.last_name}`.trim()
        }))
        .filter((player) =>
            player.full_name.toLowerCase().includes(nameSearch.value.toLowerCase())
        )
})

const isNoResults = computed(() => playerListWithFullName.value.length === 0 && nameSearch.value.length > 0)
const togglePlayer = () => isShowing.value = !isShowing.value

const emit = defineEmits(['add', 'edit'])

const isMainPage = computed(() => route.path.startsWith('/mainPage'))

// สร้าง hash จาก string
const hashString = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0; // แปลงเป็น 32bit int
    }
    return Math.abs(hash);
};
const imageCache = new Map<string, string>();
const getProfileImage = (memberId: string): string => {
    if (imageCache.has(memberId)) return imageCache.get(memberId)!;

    const hash = hashString(memberId);
    const imageIndex = (hash % 10) + 1;
    const imagePath = new URL(`/assets/Image_profile/default_${imageIndex}.png`, import.meta.url).href;

    imageCache.set(memberId, imagePath);
    return imagePath;
};


const bgColors = [
    '#F44336', // red
    '#E91E63', // pink
    '#9C27B0', // purple
    '#3F51B5', // indigo
    '#2196F3', // blue
    '#009688', // teal
    '#4CAF50', // green
    '#FF9800', // orange
    '#795548', // brown
    '#607D8B'  // blue gray
]

const getRandomBgColor = (index: number): string => {
    return bgColors[index % bgColors.length]
}


const handleAddPlayer = (newPlayer: playerType) => {
    emit('add', newPlayer)
    isModalOpen.value = false
}

const openEditModal = (player: playerType) => {
    selectedPlayer.value = player
    isEditModalOpen.value = true
}

const handleEditPlayer = (updatedPlayer: playerType) => {
    emit('edit', updatedPlayer)
    isEditModalOpen.value = false
}
</script>

<template>
    <div class="card bg-[#ffffff98] shadow-xl mb-8 mx-4">
        <div class="card-body mim-w-[393pxdas] lg:min-w-[1408px]">
            <div class="flex items-center justify-between mb-4 md:min-w-[700px] gap-10">
                <h2 class="card-title text-black">รายชื่อผู้เข้าร่วม ({{ players.length }} คน)</h2>
                <input type="checkbox" @click="togglePlayer" class="toggle toggle-accent bg-black" checked />
            </div>

            <!-- mainPage layout -->
            <div v-if="isMainPage" class="flex flex-col gap-4" v-show="!isShowing">
                <div class="flex justify-between ">
                    <!-- ฟิลเตอร์ -->
                    <label
                        class="input input-bordered max-w-[200px] md:max-w-[275px] input-sm bg-[#c2787898] text-black">
                        <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none"
                                stroke="currentColor">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <input v-model="nameSearch" type="text" placeholder="ค้นหาชื่อ" />
                    </label>
                    <button @click="isModalOpen = true"
                        class="btn h-fit bg-gradient-to-t from-[#3fc028] to-[#5ee746] p-1 border-0 rounded-[2rem] w-fit text-white shadow-black shadow-sm">
                        <div
                            class="bg-[#3fc028] rounded-[2rem] p-1 text-sm md:text-md font-medium flex items-center gap-1">

                            <p class="drop-shadow-lg">เพิ่มผู้เล่น</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.0"
                                stroke="currentColor" class="size-4">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                            </svg>
                        </div>
                    </button>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    <div v-if="isNoResults" class="col-span-full text-center text-lg text-gray-500">
                        ไม่พบข้อมูลผู้เล่นที่ค้นหา
                    </div>
                    <div v-for="(player, index) in playerListWithFullName" :key="index"
                        class="card shadow-sm relative w-full">
                        <div class="card-body p-3 text-center">
                            <button class="btn bg-transparent border-0 cursor-pointer p-1 absolute top-2 left-2 z-10"
                                @click="openEditModal(player)">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-gray-700">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                                </svg>
                            </button>

                            <div class="absolute top-5 right-2 w-3 h-3 rounded-full shadow"
                                :class="player.is_active ? 'bg-green-500' : 'bg-red-500'" title="สถานะการเข้าร่วม">
                            </div>

                            <div class="card-body p-3 text-center text-black">
                                <div class="avatar mx-auto mb-2">
                                    <div class="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center text-white text-xl font-bold"
                                        :style="{ backgroundColor: getRandomBgColor(index) }">
                                        <img :src="getProfileImage(player.member_id ?? '')"
                                            class="w-full h-full object-cover" alt="profile" />

                                    </div>

                                </div>
                                <div class="text-sm md:text-base font-bold">{{ player.full_name }}</div>
                                <div class="text-xs md:text-sm text-gray-500">{{ player.position }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- other pages -->
            <div v-else v-show="!isShowing" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <div v-for="(player, index) in playerList" :key="index" class="card shadow-sm relative w-full">
                    <div class="absolute top-2 right-2 w-3 h-3 rounded-full shadow"
                        :class="player.is_active ? 'bg-green-500' : 'bg-red-500'" title="สถานะการเข้าร่วม"></div>

                    <div class="card-body p-3 text-center text-black">
                        <div class="avatar mx-auto mb-2">
                            <div class="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center text-white text-xl font-bold"
                                :style="{ backgroundColor: getRandomBgColor(index) }">
                                <img :src="getProfileImage(player.member_id ?? '')" class="w-full h-full object-cover"
                                    alt="profile" />

                            </div>

                        </div>
                        <div class="text-sm md:text-base font-bold">{{ player.full_name }}</div>
                        <div class="text-xs md:text-sm text-gray-500">{{ player.position }}</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <AddPlayerModal v-if="isModalOpen" :room-id="roomId" @close="isModalOpen = false" @submit="handleAddPlayer" />

        <EditPlayerModal v-if="isEditModalOpen" :room-id="roomId" :player-to-edit="selectedPlayer"
            @close="isEditModalOpen = false" @submit="handleEditPlayer" />

    </div>
</template>
