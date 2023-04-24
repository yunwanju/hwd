export function getHubNamefromLib(lib) {
  if (new RegExp(
    '(chl|lar|legislation|eagn|iel|hkd|aom|twd|protocol|lawexplanation|whitebook|workreport|news|contract|fmt)', 'g')
    .test(lib)) {
    return 'law'
  } else if (new RegExp('(pfnl|payz|gac|ear|gdd|bankruptcy|pal|atr)', 'g').test(lib)) {
    return 'case'
  } else if (new RegExp('(qikan)', 'g').test(lib)) {
    return 'qikan'
  } else if (new RegExp('(lawfirmarticles)', 'g').test(lib)) {
    return 'lawfirmarticles'
  } else if (new RegExp('(specialtopic)', 'g').test(lib)) {
    return 'specialtopic'
  } else if (new RegExp('(procuratoratedoc|crucialcaseinfo)', 'g').test(lib)) {
    return 'procuratorate'
  } else if (new RegExp('(apy)', 'g').test(lib)) {
    return 'apy'
  }
}
import { addExternalKnowledgeDownloadRecord } from '@/api/search'

export function addDownLoad(data) {
  return new Promise((resolve, reject) => {
    addExternalKnowledgeDownloadRecord(data).then(res => {
      resolve(res.data)
    }).catch(Error => {
      reject(Error);
    })
  })
}