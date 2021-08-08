import { AfterLoad, Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { CoreEntity } from "./CoreEntity";

@Entity({ name: "languages" })
export class Language extends CoreEntity {
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
