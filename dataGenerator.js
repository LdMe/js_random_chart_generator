

class DataGenerator{
    constructor(qty,min,max, direction="random",trend="linear"){
        this.qty = qty;
        this.min = min;
        this.max = max;
        this.direction = direction;
        this.trend = trend;
    }
    getCurrentValue(i){
        let randomError = Math.random() *0.2;
        let result = 0;
        let k = 0;
        switch(this.trend){
            case 'linear':
                result = i * (this.max - this.min) / this.qty + this.min ;
                break;
            case 'sin':
                result = (this.max-this.min)/2 * (Math.sin(i) + 1) + this.min;
                break;
            case 'cos':
                result = (this.max-this.min)/2 * (Math.cos(i) + 1) + this.min;
                break;
            case 'exp':
                k = this.max - this.min
                result = Math.exp(i *Math.log(k+1) /this.qty) + this.min  ;
                break;
            case 'log':
                k = this.max - this.min
                result = Math.log(i+1) * k / Math.log(this.qty+1) + this.min;
                break;
            case 'random':
                return Math.random() * (this.max - this.min) + this.min;
            case 'binary':
                return Math.random() > 0.5 ? this.max : this.min;
            case 'sqrt':
                result = Math.sqrt(i) * (this.max - this.min)  ;
                break;
            case 'pow':
                result = Math.pow(i,2) * (this.max - this.min) / Math.pow(this.qty,2) + this.min  ;
                break;
            default:
                result = Math.floor(Math.random() * (this.max - this.min + 1) + this.min);
                break;
        }
        return result * (1-randomError);

    }
    generate(){
        let data = [];
        for (let i = 0; i < this.qty; i++) {
            let value = this.min;
            if(this.direction == 'up'){
                // generamos un valor creciente desde min a max, en proporción a i y con un poco de aleatoriedad
                value = this.getCurrentValue(i);
            }else{
                // generamos un valor decreciente desde max a min, en proporción a i y con un poco de aleatoriedad
                value = this.getCurrentValue(this.qty-i);
            }
            data.push(value);
        }
        return data;
    }
    generateLabels(){
        let labels = [];
        for (let i = 0; i < this.qty; i++) {
            labels.push('Label ' + i);
        }
        return labels;
    }

}

export default DataGenerator;