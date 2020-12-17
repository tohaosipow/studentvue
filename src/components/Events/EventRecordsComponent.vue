<template>
    <div>
        <v-card>
            <v-skeleton-loader
                    type="list-item-avatar-two-line,list-item-avatar-two-line,list-item-avatar-two-line,list-item-avatar-two-line"
                    v-if="!event"
            >

            </v-skeleton-loader>
        </v-card>
        <v-card>
            <v-alert v-if="!records.length"
                     prominent
                     type="info"
            >
                Если вы не видете здесь записей, то либо они отсутствуют, либо еще не обработаны
            </v-alert>
            <v-card-text>
                <v-simple-table dense>
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th class="text-left">
                                Название записи
                            </th>
                            <th class="text-left">
                                Участников
                            </th>
                            <th class="text-left">
                                Продолжительность
                            </th>
                            <th class="text-left">
                                Время обработки
                            </th>
                            <th class="text-left">
                                Открыть
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr
                                :key="item.name"
                                v-for="item in records"
                        >
                            <td v-html="item.name">{{ item.name }}</td>
                            <td>{{ item.participants }}</td>
                            <td>{{ item.playback.format.length }} минуты</td>
                            <td>{{ Math.round(item.playback.format.processingTime/60000) }} минуты</td>
                            <td>
                                <v-btn depressed :href=" item.playback.format.url" outlined text>Открыть</v-btn>
                            </td>
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>

            </v-card-text>


        </v-card>
    </div>
</template>

<script>
    import events from "@/api/events.js";

    export default {
        name: "EventRecordsComponents",
        methods: {},
        data() {
            return {
                records: []
            }
        },
        computed: {
            event() {
                return this.$store.state.events.currentEvent
            }
        },
        mounted() {
            events.records({id: this.$store.state.events.currentEvent.id}).then((r) => {
                this.records = typeof r.data.recording == 'object' ? [r.data.recording] : r.data.recording;
            })
        }
    }
</script>

<style scoped>

</style>
