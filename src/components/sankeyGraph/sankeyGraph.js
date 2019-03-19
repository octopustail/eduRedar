import echarts from 'echarts'
const sankeyGraph = {}
const colorGroup = { a1: "#ff0", b1: '#00f', c1: '#0f0' }
sankeyGraph.option = {
    tooltip: {
        trigger: 'item',
        formatter: "{b} :{c}"

    },
    series: {
        type: 'sankey',
        layout: 'none',
        focusNodeAdjacency: 'allEdges',
        data: [{
            name: 'a1',
        }, {
            name: 'b1'
        }, {
            name: 'c1'
        }, {
            name: 'a2',
        }, {
            name: 'b2'
        }, {
            name: 'c2'
        }, {
            name: 'a3',
        }, {
            name: 'b3'
        }, {
            name: 'c3'
        }, {
            name: 'a4',
        }, {
            name: 'b4'
        }, {
            name: 'c4'
        },{
            name: 'a5',
        }, {
            name: 'b5'
        }, {
            name: 'c5'
        }],
        links: [
            {
                source: 'a1',
                target: 'a2',
                value: 80,
                lineStyle: { color: colorGroup.a1 }
            },
            {
                source: 'a1',
                target: 'b2',
                value: 20,
                lineStyle: { color: colorGroup.a1 }
            }, {
                source: 'a1',
                target: 'c2',
                value: 5,
                lineStyle: { color: colorGroup.a1 }
            }, {
                source: 'b1',
                target: 'a2',
                value: 10,
                lineStyle: { color: colorGroup.b1 }
            }, {
                source: 'b1',
                target: 'b2',
                value: 99,
                lineStyle: { color: colorGroup.b1 }

            }, {
                source: 'b1',
                target: 'c2',
                value: 6,
                lineStyle: { color: colorGroup.b1 }

            }, {
                source: 'c1',
                target: 'a2',
                value: 5,
                lineStyle: { color: colorGroup.c1 }

            }, {
                source: 'c1',
                target: 'b2',
                value: 10,
                lineStyle: { color: colorGroup.c1 }
            }, {
                source: 'c1',
                target: 'c2',
                value: 23,
                lineStyle: { color: colorGroup.c1 }
            }]
    }
};

sankeyGraph.initGraph = function (elem) {
    var sankeyChart = echarts.init(elem)
    sankeyChart.setOption({ option })
}

export default sankeyGraph