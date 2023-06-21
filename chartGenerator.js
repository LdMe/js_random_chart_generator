

class ChartGenerator {
    constructor(labels,data,chartType,chartId,title="Chart"){
        this.labels = labels;
        this.data = data;
        this.chartType = chartType;
        this.chartId = chartId;
        this.title = title;
        this.chart = null;
    }
    setLabels(labels){
        this.labels = labels;
    }
    setData(data){
        this.data = data;
    }
    setChartType(chartType){
        this.chartType = chartType;
    }
    setChartId(chartId){
        this.chartId = chartId;
    }
    setTitle(title){
        this.title = title;
    }


    getRandomColor(alpha=0.2){
        // generar un color aleatorio en formato rgba
        let color = 'rgba(';
        for (let i = 0; i < 3; i++) {
            color += Math.floor(Math.random() * 255) + ',';
        }
        color += alpha + ')';
        return color;
    }
    destroy(){
        // destruir la gráfica
        if(this.chart != null){
            this.chart.destroy();
        }
    }
    
    generate(){

        // generar un color para cada valor
        let colors = [];
        for (let i = 0; i < this.data.length; i++) {
            colors.push(this.getRandomColor());
        }
        let borderColors = [];
        for (let i = 0; i < this.data.length; i++) {
            borderColors.push(this.getRandomColor(1));
        }
        // generar la configuración de la gráfica
        const data = {
            labels: this.labels,
            datasets: [
            {
                label: this.title,
                data: this.data,
                backgroundColor: colors,
                borderColor: borderColors,
                borderWidth: 1
            }
            ]
        };
        // generar la configuración de la gráfica
        const config = {
            type: this.chartType,
            data: data,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: this.title
                    }
                }
            }
        };
        let canvas = document.createElement('canvas');
        canvas.id = this.chartId;
        document.querySelector('#chart').innerHTML = '';
        document.querySelector('#chart').appendChild(canvas);
        // Creación de la gráfica
        this.chart = new Chart(
            canvas,
            config
        );

    }

}

export default ChartGenerator;