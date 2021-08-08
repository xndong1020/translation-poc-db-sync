import 'reflect-metadata'
import * as dotenv from 'dotenv'
import { createConnection, getConnectionOptions, getManager } from 'typeorm'
import { Language } from './entity/Language'

import { Translation } from './entity/Translation'
import { consumer } from './kafka/consumer'
import { translateTextBulk } from './google-translate/autoTranslateService'
import { SUPPORTED_LANGUAGES } from './enums/SUPPORTED_LANGUAGES'
import { indexRecordsBulk } from './elasticsearch/elasticSearchService'

dotenv.config()

async function bootstrap() {
  const defaultOptions = await getConnectionOptions('default')
  const connectionOptions = await getConnectionOptions('postgresConnection')

  const conOne = await createConnection(defaultOptions)
  const conTwo = await createConnection(connectionOptions)

  const managerOne = getManager('default')
  const managerTwo = getManager('postgresConnection')

  await consumer.connect()
  await consumer.subscribe({
    topic: 'translation.creation.topic',
    fromBeginning: true
  })
  await consumer.subscribe({
    topic: 'translation.upsert.topic',
    fromBeginning: true
  })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      // handle auto translation when task is created
      if (topic === 'translation.creation.topic') {
        const payload = JSON.parse(message.value.toString())
        const translations = payload.body.value

        // await indexRecordsBulk(translations);

        Object.keys(translations).forEach(async key => {
          const autoTranslation = await translateTextBulk(
            translations[key].description
          )
          const translationInDb = await managerTwo
            .createQueryBuilder(Language, 'l')
            .where('id = :id', { id: +translations[key].id })
            .getOne()

          for (const lan of SUPPORTED_LANGUAGES) {
            translationInDb[lan] = autoTranslation[lan] || ''
          }
          await managerTwo.save<Language>(translationInDb)
        })
        return
      }

      if (topic === 'translation.upsert.topic') {
        const payload = JSON.parse(message.value.toString())
        const translations = payload.body.value

        await indexRecordsBulk(translations)

        translations.forEach(async translation => {
          // console.log("translation", translation);
          const newTranslation = new Translation()
          newTranslation.projectName = translation.projectName
          newTranslation.keyName = translation.keyName
          newTranslation.en = translation.description
          for (const lan of SUPPORTED_LANGUAGES) {
            newTranslation[lan] = translation.translation[lan] || 'N/A'
          }
          await managerOne.save(newTranslation)
        })
        return
      }
    }
  })

  console.log('Kafka db sync is running...')
}

bootstrap().catch(error => console.log(error))
