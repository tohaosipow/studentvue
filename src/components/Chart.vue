<script>
    import { Doughnut } from 'vue-chartjs'

    export default {
        extends: Doughnut,
        props: ['keys', 'values'],
        mounted () {
            // Overwriting base render method with actual data.
            this.renderChart({
                labels: this.keys,
                datasets: [
                    {
                        label: 'Кол-во участников',
                        data: this.values,
                        backgroundColor: ['#E0E0E0', "#BBEB8B", "#eb8279", "#ebafb1", "#72aceb", "#9cebdb", "#ac90eb", "#c2e2ea"],
                    }
                ],

            })
        }
    }
</script>

<style scoped>

</style>
