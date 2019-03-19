// import * as echarts from 'echarts'

// const ParallelCoordinate = {}


// ParallelCoordinate.dataBJ = [
//     [1, 55, 9, 56, 0.46, 18, 6, "良"],
//     [2, 25, 11, 21, 0.65, 34, 9, "优"],
//     [3, 56, 7, 63, 0.3, 14, 5, "良"],
//     [4, 33, 7, 29, 0.33, 16, 6, "优"],
//     [5, 42, 24, 44, 0.76, 40, 16, "优"],
//     [6, 82, 58, 90, 1.77, 68, 33, "良"],
//     [7, 74, 49, 77, 1.46, 48, 27, "良"],
//     [8, 78, 55, 80, 1.29, 59, 29, "良"],
//     [9, 267, 216, 280, 4.8, 108, 64, "重度污染"],
//     [10, 185, 127, 216, 2.52, 61, 27, "中度污染"],
//     [11, 39, 19, 38, 0.57, 31, 15, "优"],
//     [12, 41, 11, 40, 0.43, 21, 7, "优"],
//     [13, 64, 38, 74, 1.04, 46, 22, "良"],
//     [14, 108, 79, 120, 1.7, 75, 41, "轻度污染"],
//     [15, 108, 63, 116, 1.48, 44, 26, "轻度污染"],
//     [16, 33, 6, 29, 0.34, 13, 5, "优"],
//     [17, 94, 66, 110, 1.54, 62, 31, "良"],
//     [18, 186, 142, 192, 3.88, 93, 79, "中度污染"],
//     [19, 57, 31, 54, 0.96, 32, 14, "良"],
//     [20, 22, 8, 17, 0.48, 23, 10, "优"],
//     [21, 39, 15, 36, 0.61, 29, 13, "优"],
//     [22, 94, 69, 114, 2.08, 73, 39, "良"],
//     [23, 99, 73, 110, 2.43, 76, 48, "良"],
//     [24, 31, 12, 30, 0.5, 32, 16, "优"],
//     [25, 42, 27, 43, 1, 53, 22, "优"],
//     [26, 154, 117, 157, 3.05, 92, 58, "中度污染"],
//     [27, 234, 185, 230, 4.09, 123, 69, "重度污染"],
//     [28, 160, 120, 186, 2.77, 91, 50, "中度污染"],
//     [29, 134, 96, 165, 2.76, 83, 41, "轻度污染"],
//     [30, 52, 24, 60, 1.03, 50, 21, "良"],
//     [31, 46, 5, 49, 0.28, 10, 6, "优"]
// ];

// ParallelCoordinate.schema = [
//     { name: 'sems1', index: 0, text: 'sems1' },
//     { name: 'sems2', index: 1, text: 'sems2' },
//     { name: 'sems3', index: 2, text: 'sems3' },
//     { name: 'sems4', index: 3, text: 'sems4' },
//     { name: 'sems5', index: 4, text: 'sems5' },
//     { name: 'sems6', index: 5, text: 'sems6' },

// ];

// ParallelCoordinate.lineStyle = {
//     normal: {
//         width: 1,
//         opacity: 0.8
//     }
// };
// ParallelCoordinate.option = {
//     backgroundColor: '#333',
//     // legend: {
//     //     bottom: 30,
//     //     data: ['北京', '上海', '广州'],
//     //     itemGap: 20,
//     //     textStyle: {
//     //         color: '#fff',
//     //         fontSize: 14
//     //     }
//     // },
//     tooltip: {
//         padding: 10,
//         backgroundColor: '#222',
//         borderColor: '#777',
//         borderWidth: 1,
//         // formatter: function (obj) {
//         //     var value = obj[0].value;
//         //     return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
//         //         + obj[0].seriesName + ' ' + value[0] + '日期：'
//         //         + value[7]
//         //         + '</div>'
//         //         + ParallelCoordinate.schema[1].text + '：' + value[1] + '<br>'
//         //         + ParallelCoordinate.schema[2].text + '：' + value[2] + '<br>'
//         //         + ParallelCoordinate.schema[3].text + '：' + value[3] + '<br>'
//         //         + ParallelCoordinate.schema[4].text + '：' + value[4] + '<br>'
//         //         + ParallelCoordinate.schema[5].text + '：' + value[5] + '<br>'
//         //         + ParallelCoordinate.schema[6].text + '：' + value[6] + '<br>';
//         // }
//     },
//     // dataZoom: {
//     //     show: true,
//     //     orient: 'vertical',
//     //     parallelAxisIndex: [0]
//     // },
//     parallelAxis: [
//         { dim: 0, name: ParallelCoordinate.schema[0].text, inverse: true, max: 31, nameLocation: 'start' },
//         { dim: 1, name: ParallelCoordinate.schema[1].text },
//         { dim: 2, name: ParallelCoordinate.schema[2].text },
//         { dim: 3, name: ParallelCoordinate.schema[3].text },
//         { dim: 4, name: ParallelCoordinate.schema[4].text },
//         { dim: 5, name: ParallelCoordinate.schema[5].text },
//         // { dim: 6, name: ParallelCoordinate.schema[6].text },
//         // {
//         //     dim: 7, name: ParallelCoordinate.schema[7].text,
//         //     type: 'category', data: ['优', '良', '轻度污染', '中度污染', '重度污染', '严重污染']
//         // }
//     ],
//     visualMap: {
//         show: false,
//         min: 0,
//         max: 150,
//         dimension: 2,
//         inRange: {
//             color: ['#d94e5d', '#eac736', '#50a3ba'].reverse(),
//             // colorAlpha: [0, 1]
//         }
//     },
//     parallel: {
//         left: '5%',
//         right: '18%',
//         bottom: 100,
//         parallelAxisDefault: {
//             type: 'value',
//             name: 'gradeDistribution',
//             nameLocation: 'end',
//             nameGap: 20,
//             nameTextStyle: {
//                 color: '#fff',
//                 fontSize: 12
//             },
//             axisLine: {
//                 lineStyle: {
//                     color: '#aaa'
//                 }
//             },
//             axisTick: {
//                 lineStyle: {
//                     color: '#777'
//                 }
//             },
//             splitLine: {
//                 show: false
//             },
//             axisLabel: {
//                 textStyle: {
//                     color: '#fff'
//                 }
//             }
//         }
//     },
//     series: [
//         {
//             name: '北京',
//             type: 'parallel',
//             lineStyle: ParallelCoordinate.lineStyle,
//             data: ParallelCoordinate.dataBJ
//         }
//     ]
// };

// ParallelCoordinate.initGraph = function (elem,option,brushCallback) {
//     let parallelCoordinate = echarts.init(elem)
//     parallelCoordinate.setOption({ option })

//     parallelCoordinate.on('brushSelected',brushCallback)
// }

// export default ParallelCoordinate