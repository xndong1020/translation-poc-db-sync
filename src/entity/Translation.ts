import { Entity, Column } from "typeorm";
import { CoreEntity } from "./CoreEntity";

@Entity()
export class Translation extends CoreEntity {
  @Column()
  projectName: string;

  @Column()
  keyName: string;

  @Column({ nullable: true })
  en: string;

  @Column({ nullable: true })
  fr: string;

  @Column({ nullable: true })
  zh: string;

  @Column({ nullable: true })
  pt: string;

  @Column({ nullable: true })
  es: string;

  @Column({ nullable: true })
  ar: string;

  @Column({ nullable: true })
  ko: string;
}
