<script>
    import {Bar} from 'vue-chartjs'

    export default {
        extends: Bar,
        props: ['keys', 'values'],
        mounted() {
            // Overwriting base render method with actual data.
            this.renderChart({
                labels: this.keys,
                datasets: [
                    {
                        label: 'Рейтинг',
                        data: this.values,
                        backgroundColor: ["#BBEB8B", "#eb8279", "#ebafb1", "#72aceb", "#9cebdb", "#ac90eb", "#c2e2ea", '#E0E0E0'],
                    }
                ],

            })
        }
    }
</script>

<style scoped>

</style>
