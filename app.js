const CSVToJSON = require('csvtojson')
const fs = require('fs');

const folderName = 'keti_lte'
const fileName = 'KETI_SKT_LTE-GPS-2022-09-06T11-19_3'
const telecomName = 'SKT'

CSVToJSON()
  // csv convert to json array
  .fromFile(`assets/${folderName}/${fileName}.csv`)
  .then(data => {
    data.map(i=>{
      delete i.ct
      delete i.frequency
      delete i.bler 
      delete i.tx_power 
      delete i.drx 
      delete i.emm_cause 
      delete i.esm_cause 
      i.telecom = telecomName
      i.band = Number(i.band)
      i.earfcn = ""
      i.bandwidth = Number(i.bandwidth)
      i.pci = 0
      i.cell_id = ""
      i.guti = ""
      i.tac = Number(i.tac)
      i.rsrp = Number(i.rsrp)
      i.rsrq = Number(i.rsrq)
      i.rssi = Number(i.rssi)
      i.sinr = 0
      i.time_boot_ms = Number(i.time_boot_ms)
      i.lat = Number(i.lat)
      i.lon = Number(i.lon)
      i.alt = Number(i.alt)
      i.vx = 0
      i.vy = 0
      i.vz = 0
      i.hdg = 0
      i.relative_alt = Number(i.relative_alt)
      i.plmn = "0"
      i.latLng = { 
        coordinates: [i.lon/10000000, i.lat/10000000],
        type: "Point"
      }
    })

    console.log(data[0])

    // save json file
    fs.writeFile(`assets/${folderName}/${fileName}.json`, JSON.stringify(data, null, 4), err => {
      if (err) {
        throw err
      }
      console.log('JSON array is saved.')
    })
  })
  .catch(err => {
    console.log(err)
  })

