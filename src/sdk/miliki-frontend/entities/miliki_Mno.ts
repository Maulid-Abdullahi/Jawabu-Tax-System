import { NamedEntity } from "./NamedEntity";
import { MnoStatus } from "../enums/enums";
import { MnoContactPersons } from "./miliki_MnoContactPersons";
export class Mno extends NamedEntity {
  static NAME = "miliki_Mno";
  city?: string | null;
  physicalLocation?: string | null;
  phone?: string | null;
  email?: string | null;
  status?: MnoStatus | null;
  comments?: string | null;
  contactPersons?: MnoContactPersons[] | null;
}
export type MnoViewName = "_base" | "_local" | "_minimal" | "mno-view";
export type MnoView<V extends MnoViewName> = V extends "_base"
  ? Pick<
      Mno,
      | "id"
      | "name"
      | "city"
      | "physicalLocation"
      | "phone"
      | "email"
      | "status"
      | "comments"
    >
  : V extends "_local"
  ? Pick<
      Mno,
      | "id"
      | "city"
      | "physicalLocation"
      | "phone"
      | "email"
      | "status"
      | "comments"
      | "name"
    >
  : V extends "_minimal"
  ? Pick<Mno, "id" | "name">
  : V extends "mno-view"
  ? Pick<
      Mno,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "city"
      | "physicalLocation"
      | "phone"
      | "email"
      | "status"
      | "comments"
      | "name"
      | "contactPersons"
    >
  : never;
