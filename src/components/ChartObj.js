import { formatter } from "../Orders/OrderDatesFunctions"

export let ChartObj = (X, Y, name, type, diff, currency, groups, series) => {
    return (
        {
            options: {
                chart: {
                    id: "basic-bar",
                    toolbar: {
                        show: true,
                    },
                    dropShadow: {
                        enabled: type === 'line' ? true : false,
                        color: '#69b2c5',
                        top: 15,
                        left: 5,
                        blur: 5,
                        opacity: 0.2
                    },
                },
                stroke: {
                    width: type === 'line' ? 4 : 0,
                    curve: 'smooth',
                },
                fill: {
                    type: 'solid',
                    colors: '#70e0ff',
                },
                colors: ['#00c9ff', '#0f0', '#9b4cff'],
                xaxis: {
                    type: 'datetime',
                    categories: X,
                    crosshairs: {
                        position: 'back',
                        show: true,
                        fill: {
                            type: 'gradient',
                            color: '#B1B9C4',
                            gradient: {
                                colorFrom: '#ffffffff',
                                colorTo: '#85e5ff',
                                stops: [0, 100],
                                opacityFrom: 0.2,
                                opacityTo: 0.6,
                            },
                        },
                    },
                    tickAmount: 4,
                    labels: {
                        rotate: 0,
                        maxHeight: 50,
                        style: {
                            colors: "#707070",
                            fontSize: '12px',
                            fontFamily: 'Poppins',
                            fontWeight: 500,
                            cssClass: 'chart_spans',
                        },
                        datetimeFormatter: {
                            year: 'yyyy',
                            month: "dd MMM",
                            day: 'dd MMM',
                            hour: 'HH:mm',
                        },
                    },
                    axisBorder: {
                        show: false,
                    },
                    axisTicks: {
                        show: true,
                        height: 2,
                    },
                    group: {
                        style: {
                            fontSize: '12px',
                            fontWeight: 500,
                            colors: '#888',
                        },
                        // groups: groups,
                    },
                },
                yaxis: {
                    tickAmount: 3,
                    labels: {
                        style: {
                            colors: "#707070",
                            fontSize: '15px',
                            fontFamily: 'Poppins',
                        },
                        formatter: (value) => {
                            return currency ? formatter('USD').format(value) : parseInt(value)
                        },
                    }
                },
                dataLabels: {
                    enabled: false,
                },
                tooltip: {
                    enabled: true,
                    shared: true,
                    intersect: false,
                    fillSeriesColor: false,
                    marker: {
                        show: true,
                    },
                    fixed: {
                        enabled: false,
                    },
                    x: {
                        show: true,
                        format: diff < 16 ? "dd MMM (HH:mm)" : "dd MMM",
                    },
                },
                grid: {
                    show: true,
                    borderColor: '#eee',
                    strokeDashArray: 0,
                    position: 'back',
                    xaxis: {
                        type: 'datetime',
                        lines: {
                            show: false,
                        },
                    },   
                    yaxis: {
                        lines: {
                            show: true,
                        }
                    },
                },
                plotOptions: {
                    bar: {
                        borderRadius: 2,
                    }
                }
            },
            series: series.length !== 0 ? 
            series :
            [
                {
                    name: name,
                    data: Y,
                }
            ],
        }
    )
}