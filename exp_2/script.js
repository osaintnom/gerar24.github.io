

d3.dsv(', ','../data/OTROS.csv', d3.autoType).then(data => {
  console.log(data)
  // Guardamos el svg generado en la variable chart
  let chart = Plot.plot({
    x: {
      grid: true,
      tickFormat: d3.format('.0f'),
      label:'',
    },
    y: {
      label: '',
    },
    marks: [
      Plot.barX(
        data,
        Plot.groupY(
          { x: 'count', title: d => JSON.stringify(d) },
          {
            y: 'categoria',
            sort: { y: 'x', reverse: true },
            filter: d => d.domicilio_barrio == 'PALERMO',
            fill: d => (d.categoria == 'TRÁNSITO' ? '#0769AC': '#B9E2BB'),
            
          },
        ),
      ),
      Plot.text(
        data,
        Plot.groupY(
          { x: 'count', text: 'count',},
          {
            y: 'categoria',
            textAnchor: 'start',
            dx: 5,
            filter: d => d.domicilio_barrio == 'PALERMO',
          },
        ),
      ),
    ],
    width: 1000,
    height: 300,
    marginLeft: 200,
    marginRight: 100,
  })
  // Agregamos chart al div#chart de index.html
  d3.select('#chart2b').append(() => chart)
})
