export class ChartUtil {

    constructor() { /**/ }

    public static getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    public static getFirstDayOfPeriod(period) : any {
        var date = new Date();
        var newPeriod = period;
        switch (period) {
            //Heure courante
            case "hour": {
                //On change la période afin d'avoir le format adapté
                newPeriod = 'minute';
                date.setHours(date.getHours() - 1);
                break;
            }
            //Aujourd'hui
            case "day": {
                newPeriod = 'hour';
                date.setHours(0, 0, 0, 0);
                break;
            }
            //Semaine courante
            case "week": {
                newPeriod = 'day';
                var day = date.getDay();
                date = new Date(date.getFullYear(), date.getMonth(),
                                date.getDate() + (day === 0 ? -6 : 1) - day, 0, 0, 0, 0);
                break;
            }
            //Mois courant
            case "month": {
                newPeriod = 'day';
                var y = date.getFullYear(), m = date.getMonth();
                date = new Date(y, m, 1, 0, 0, 0, 0);
                break;
             }
             //Trimestre courant
            case "quarter": {
                newPeriod = 'week';
                var quarter = Math.floor((date.getMonth() / 3));
                date = new Date(date.getFullYear(), quarter * 3, 1, 0, 0, 0, 0);
                break;
            }
            //Année courante
            case "year": {
                newPeriod = 'week';
                var y = date.getFullYear();
                date = new Date(y, 0, 1, 0, 0, 0, 0);
                break;
             }
            default: {
                break;
            }
        }
        return {period: newPeriod, date: date};
    }
}