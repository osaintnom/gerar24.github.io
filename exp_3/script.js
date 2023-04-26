// config. fecha español
d3.json('https://cdn.jsdelivr.net/npm/d3-time-format@3/locale/es-ES.json').then(locale => {
  d3.timeFormatDefaultLocale(locale)
})

d3.dsv(', ','../data/fix_transito_por_hora.csv', d3.autoType).then(data => {
  data2 = data.filter(d => d.barrio == 'PALERMO' && d.dia == 'Monday' || d.barrio == 'PALERMO' &&d.dia == 'Tuesday' || d.barrio == 'PALERMO' &&d.dia == 'Wednesday' || d.barrio == 'PALERMO' &&d.dia == 'Thursday')
  console.log(data2)
  let chart = Plot.plot({
  height: 800,
  width: 2000,
  marginLeft: 110,
  grid: true,
  style:{fontSize: 12},
  x: {nice: true, grid:false},
  y: {inset: 5},
  color: {type: "categorical"},
  facet: {data:data2, x: "numero_dia", marginRight: 90, label:""},
  marks: [
      Plot.frame(),
      Plot.ruleX([6,12,18],{strokeWidth:1,stroke:"#E9EBE7"}),
      Plot.ruleY([200],{strokeWidth:8,stroke:"#001861"}),
      Plot.text(["Mín. Cantidad para Hora Pico"], {x: data2[data2.length - 19].hora, y: 205, alignX: "right", fontWeight:"bold",fill:"#001861", fontSize: 12}),

      Plot.barY(data2, {x: 'hora',y:'cantidad',fill: d => (d.cantidad>=200 ? '#0769AC': '#E9EBE7 ')}),
      // Plot.axisX({ 
      //   tickFormat: d3.utcFormat("%I%p"), 
      //   domain: [d3.utcHour.offset(d3.utcHour(), -12), d3.utcHour()
      //   ]

  ],
  })
  // Agregamos chart al div#chart de index.html
  d3.select('#chart3').append(() => chart)
})
// 

d3.dsv(', ','../data/fix_transito_por_hora.csv', d3.autoType).then(data => {
  data2 = data.filter(d => d.barrio == 'PALERMO' && d.dia == 'Friday'|| d.barrio == 'PALERMO' &&d.dia == 'Saturday' || d.barrio == 'PALERMO' &&d.dia == 'Sunday')
  console.log(data2)
  let chart2 = Plot.plot({
  height: 800,
  width: 2000,
  marginLeft: 110,
  grid: true,
  style:{fontSize: 12},
  x: {nice: true, grid:false},
  y: {inset: 5},
  color: {type: "categorical"},
  facet: {data:data2, x: "numero_dia", marginRight: 90, label:""},
  marks: [
      Plot.frame(),
      Plot.ruleX([6,12,18],{strokeWidth:1,stroke:"#E9EBE7"}),
      Plot.ruleY([200],{strokeWidth:8,stroke:"#001861"}),
      Plot.text(["Mín. Cantidad para Hora Pico"], {x: data2[data2.length - 20].hora, y: 205, alignX: "right", fill:"#001861",fontWeight:"bold", fontSize: 12}),
      Plot.barY(data2,{x: 'hora',y:'cantidad',fill: d => (d.cantidad>=200 ? '#0769AC': '#E9EBE7 ')}),
      //Plot.line(data2,{x: 'hora',y:'cantidad',strokeWidth:6,}),
      // Plot.axisX({ 
      //   tickFormat: d3.utcFormat("%I%p"), 
      //   domain: [d3.utcHour.offset(d3.utcHour(), -12), d3.utcHour()
      //   ]fill: d => (d.hora==15 ? '#0769AC': d.hora ==3?'#44A1CA': '#B9E2BB')
      // : d.cantidad <60?'#B9E2BB '

  ],
  })
  // Agregamos chart al div#chart de index.html
  d3.select('#chart4').append(() => chart2)
})