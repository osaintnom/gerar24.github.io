const mapaFetch = d3.json('../exp_1/barrios-caba.geojson')
const dataFetch = d3.dsv(',', '../data/OTROS.csv', d3.autoType)


Promise.all([mapaFetch, dataFetch]).then(([barrios, data]) => {
  
  /* Agrupamos reclamos x barrio */
  const reclamosPorBarrio = d3.group(data, d => d.domicilio_barrio) // crea un Map
  console.log('reclamosPorBarrio', reclamosPorBarrio)
  
  /* A cada feature del mapa le agregamos la prop DENUNCIAS */
  barrios.features.forEach(d => {
    let nombreBarrio = d.properties.BARRIO
    let cantReclamos =  reclamosPorBarrio.get(nombreBarrio).length
    d.properties.DENUNCIAS = cantReclamos

    console.log(nombreBarrio + ': ' + cantReclamos)
  })


  /* Mapa Coroplético */
  let chartMap = Plot.plot({
    // https://github.com/observablehq/plot#projection-options
    projection: {
      type: 'mercator',
      domain: barrios, // Objeto GeoJson a encuadrar
    },
    color: {
      // Quantize continuo (cant. denuncias) -> discreto (cant. colores)
      type: 'quantize', 
      n: 5,
      scheme: 'gnbu',
      label: 'Cantidad de denuncias',
      legend: true,
    },
    marks: [
      Plot.geo(barrios, {
        fill: d => d.properties.DENUNCIAS,
        stroke: 'gray',
        title: d => `${d.properties.BARRIO}\n${d.properties.DENUNCIAS} denuncias`,
      }),
      Plot.text(
        barrios.features,
        Plot.centroid({
          text: (d) => d.properties.BARRIO + ': ' + d.properties.DENUNCIAS,
          fill: "white",
          stroke: "black",
          textAnchor: "center",
          fontSize: 16,
          dx: 4,
          filter: (d) => d.properties.DENUNCIAS > 25000
        })
      )
    ],
    width: 800,
  })

  /* Agregamos al DOM la visualización chartMap */
  d3.select('#chart1').append(() => chartMap)


})
