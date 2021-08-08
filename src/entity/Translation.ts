import { Entity, Column } from 'typeorm'
import { CoreEntity } from './CoreEntity'

@Entity()
export class Translation extends CoreEntity {
  @Column()
  projectName: string

  @Column()
  keyName: string

  @Column('text', { nullable: true })
  en: string

  @Column('text', { nullable: true })
  fr: string

  @Column('text', { nullable: true })
  zh: string

  @Column('text', { nullable: true })
  pt: string

  @Column('text', { nullable: true })
  es: string

  @Column('text', { nullable: true })
  ar: string

  @Column('text', { nullable: true })
  ko: string
}
