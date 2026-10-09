export type OpportunityStatus =
  | "فرصة استراتيجية"
  | "فرصة جديدة"
  | "إعادة تأهيل"
  | "نشطة"
  | "جاهزة"
  | "قيد الدراسة"
  | "مغلقة";

export type Opportunity = {
  code: string;
  name: string;
  sector: string;
  location: string;
  status: OpportunityStatus;
  value: number;
  description: string;
  projectType: string;
  projectScale: string;
  ownership: string;
  area: string;
  readiness: number;
  investmentModel: string;
};