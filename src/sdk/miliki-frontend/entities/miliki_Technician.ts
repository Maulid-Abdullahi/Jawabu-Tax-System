import { StandardEntity } from "./base/sys$StandardEntity";
import { Supplier } from "./miliki_Supplier";
import { TechnicianStatus, EducationLevel } from "../enums/enums";
import { TechnicianRegistrationFiles } from "./miliki_TechnicianRegistrationFiles";
export class Technician extends StandardEntity {
  static NAME = "miliki_Technician";
  firstName?: string | null;
  comment?: string | null;
  lastName?: string | null;
  tin?: string | null;
  email?: string | null;
  phone?: string | null;
  citizen?: boolean | null;
  residence?: boolean | null;
  idNumber?: string | null;
  certificateNumber?: string | null;
  certificationDate?: any | null;
  supplier?: Supplier | null;
  status?: TechnicianStatus | null;
  educationLevel?: EducationLevel | null;
  registrationFiles?: TechnicianRegistrationFiles[] | null;
}
export type TechnicianViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "technician-view";
export type TechnicianView<V extends TechnicianViewName> = V extends "_base"
  ? Pick<
      Technician,
      | "id"
      | "firstName"
      | "comment"
      | "lastName"
      | "tin"
      | "email"
      | "phone"
      | "citizen"
      | "residence"
      | "idNumber"
      | "certificateNumber"
      | "certificationDate"
      | "status"
      | "educationLevel"
    >
  : V extends "_local"
  ? Pick<
      Technician,
      | "id"
      | "firstName"
      | "comment"
      | "lastName"
      | "tin"
      | "email"
      | "phone"
      | "citizen"
      | "residence"
      | "idNumber"
      | "certificateNumber"
      | "certificationDate"
      | "status"
      | "educationLevel"
    >
  : V extends "_minimal"
  ? Pick<Technician, "id" | "firstName">
  : V extends "technician-view"
  ? Pick<
      Technician,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "firstName"
      | "comment"
      | "lastName"
      | "tin"
      | "email"
      | "phone"
      | "citizen"
      | "residence"
      | "idNumber"
      | "certificateNumber"
      | "certificationDate"
      | "status"
      | "educationLevel"
      | "supplier"
      | "registrationFiles"
    >
  : never;
