/* =========================================================
   الأنواع العامة
========================================================= */

export type ReferenceItem = {
  [key: string]: string | number | boolean | null | undefined;
};

/* =========================================================
   بيانات الفرصة الرئيسية
========================================================= */

export type OpportunityData = {
  opportunity_id: string | number;
  opportunity_code: string;
  name_ar: string;
  name_en: string;

  sector_id: string | number;
  sub_sector_id: string | number;

  location_id: string | number;
  ownership_id: string | number;
  project_type_id: string | number;
  investor_type_id: string | number;
  contract_type_id: string | number;
  provider_entity_id: string | number;

  project_scale_id: string | number | null;
  status_id: string | number;

  created_at: string;
  updated_at: string;

  is_active: boolean | string;
};

/* =========================================================
   البيانات المرجعية
========================================================= */

export type OpportunityReferences = {
  sector_id?: string | number | null;
  sector_name_ar?: string | null;
  sector_name_en?: string | null;

  sub_sector_id?: string | number | null;
  sub_sector_name_ar?: string | null;
  sub_sector_name_en?: string | null;

  project_type_id?: string | number | null;
  project_type_name_ar?: string | null;
  project_type_name_en?: string | null;

  project_scale_id?: string | number | null;
  project_scale_name_ar?: string | null;
  project_scale_name_en?: string | null;

  investor_type_id?: string | number | null;
  investor_type_name_ar?: string | null;
  investor_type_name_en?: string | null;

  contract_type_id?: string | number | null;
  contract_type_name_ar?: string | null;
  contract_type_name_en?: string | null;

  status_id?: string | number | null;
  status_name_ar?: string | null;
  status_name_en?: string | null;

  ownership_id?: string | number | null;
  ownership_name_ar?: string | null;
  ownership_name_en?: string | null;

  provider_entity_id?: string | number | null;
  provider_entity_name_ar?: string | null;
  provider_entity_name_en?: string | null;

  entity_type_id?: string | number | null;
  provider_entity_type_name_ar?: string | null;
  provider_entity_type_name_en?: string | null;
};

/* =========================================================
   البيانات المالية
========================================================= */

export type FinancialData = {
  financial_id: string | number;
  opportunity_id: string | number;

  estimated_cost: string | number;
  currency_id: string | number;

  estimation_source_ar: string | null;
  estimation_source_en: string | null;

  annual_investment_return: string | number | null;

  investment_period_years: string | number | null;
  construction_period_years: string | number | null;
  grace_period_years: string | number | null;

  financing_model_id: string | number | null;

  expected_return_rate: string | number | null;

  notes_ar: string | null;
  notes_en: string | null;

  currency_code?: string | null;
  currency_name_ar?: string | null;
  currency_name_en?: string | null;
  currency_symbol?: string | null;

  financing_model_name_ar?: string | null;
  financing_model_name_en?: string | null;
};

/* =========================================================
   الموقع
========================================================= */

export type LocationData = {
  location_id: string | number;
  opportunity_id: string | number;

  description_ar?: string | null;
  description_en?: string | null;

  administrative_unit_id?: string | number | null;
  ownership_id?: string | number | null;

  property_numbers?: string | null;

  area_value?: string | number | null;
  area_unit_id?: string | number | null;

  expandable?: boolean | string | null;
  expansion_area_value?: string | number | null;

  latitude?: string | number | null;
  longitude?: string | number | null;

  map_url?: string | null;

  notes_ar?: string | null;
  notes_en?: string | null;

  area_unit_name_ar?: string | null;
  area_unit_name_en?: string | null;
  area_unit_symbol?: string | null;

  administrative_unit_name_ar?: string | null;
  administrative_unit_name_en?: string | null;

  administrative_unit_type_name_ar?: string | null;
  administrative_unit_type_name_en?: string | null;

  [key: string]: string | number | boolean | null | undefined;
};

/* =========================================================
   تفاصيل المشروع
========================================================= */

export type ProjectDetailsData = {
  project_detail_id: string | number;
  opportunity_id: string | number;

  description_ar?: string | null;
  description_en?: string | null;

  main_product_ar?: string | null;
  main_product_en?: string | null;

  main_product_specifications_ar?: string | null;
  main_product_specifications_en?: string | null;

  secondary_products_ar?: string | null;
  secondary_products_en?: string | null;

  production_capacity?: string | number | null;
  capacity_unit_id?: string | number | null;

  target_market_ar?: string | null;
  target_market_en?: string | null;

  economic_social_justification_ar?: string | null;
  economic_social_justification_en?: string | null;

  capacity_unit_name_ar?: string | null;
  capacity_unit_name_en?: string | null;
  capacity_unit_symbol?: string | null;

  [key: string]: string | number | boolean | null | undefined;
};

/* =========================================================
   العمالة
========================================================= */

export type EmploymentData = {
  employment_id: string | number;
  opportunity_id: string | number;

  local_specialized_workers?: string | number | null;
  local_unskilled_workers?: string | number | null;
  local_total_workers?: string | number | null;

  foreign_specialized_workers?: string | number | null;
  foreign_unskilled_workers?: string | number | null;
  foreign_total_workers?: string | number | null;

  total_jobs?: string | number | null;

  required_skills_ar?: string | null;
  required_skills_en?: string | null;

  notes_ar?: string | null;
  notes_en?: string | null;

  [key: string]: string | number | boolean | null | undefined;
};

/* =========================================================
   البنية التحتية
========================================================= */

export type InfrastructureItem = {
  opportunity_infrastructure_id: string | number;
  opportunity_id: string | number;

  infrastructure_type_id: string | number;

  availability_status?: string | null;

  description_ar?: string | null;
  description_en?: string | null;

  is_active?: boolean | string;

  infrastructure_type_name_ar?: string | null;
  infrastructure_type_name_en?: string | null;

  infrastructure_category?: string | null;

  [key: string]: string | number | boolean | null | undefined;
};

/* =========================================================
   خصائص الموقع
========================================================= */

export type SiteFeatureItem = {
  opportunity_site_feature_id: string | number;
  opportunity_id: string | number;

  site_feature_id: string | number;

  feature_value_ar?: string | null;
  feature_value_en?: string | null;

  notes_ar?: string | null;
  notes_en?: string | null;

  is_active?: boolean | string;

  feature_name_ar?: string | null;
  feature_name_en?: string | null;

  feature_description_ar?: string | null;
  feature_description_en?: string | null;

  [key: string]: string | number | boolean | null | undefined;
};

/* =========================================================
   الموافقات
========================================================= */

export type ApprovalItem = {
  opportunity_approval_id: string | number;
  opportunity_id: string | number;

  approval_type_id?: string | number | null;

  approval_name_ar?: string | null;
  approval_name_en?: string | null;

  approval_status_ar?: string | null;
  approval_status_en?: string | null;

  issuing_entity_id?: string | number | null;

  notes_ar?: string | null;
  notes_en?: string | null;

  approval_type_name_ar?: string | null;
  approval_type_name_en?: string | null;

  issuing_entity_name_ar?: string | null;
  issuing_entity_name_en?: string | null;

  [key: string]: string | number | boolean | null | undefined;
};

/* =========================================================
   الجهات
========================================================= */

export type EntityItem = {
  opportunity_entity_id: string | number;
  opportunity_id: string | number;

  entity_id: string | number;
  relation_type_id?: string | number | null;

  notes_ar?: string | null;
  notes_en?: string | null;

  created_at?: string | null;
  is_active?: boolean | string;

  entity_name_ar?: string | null;
  entity_name_en?: string | null;

  entity_phone?: string | null;
  entity_email?: string | null;

  entity_type_name_ar?: string | null;
  entity_type_name_en?: string | null;

  relation_type_name_ar?: string | null;
  relation_type_name_en?: string | null;

  [key: string]: string | number | boolean | null | undefined;
};

/* =========================================================
   المستثمرون
========================================================= */

export type InvestorItem = {
  opportunity_investor_id: string | number;
  opportunity_id: string | number;

  investor_type_id?: string | number | null;
  entity_id?: string | number | null;

  notes_ar?: string | null;
  notes_en?: string | null;

  investor_type_name_ar?: string | null;
  investor_type_name_en?: string | null;

  entity_name_ar?: string | null;
  entity_name_en?: string | null;

  [key: string]: string | number | boolean | null | undefined;
};

/* =========================================================
   العقود
========================================================= */

export type ContractItem = {
  opportunity_contract_id: string | number;
  opportunity_id: string | number;

  contract_type_id?: string | number | null;

  notes_ar?: string | null;
  notes_en?: string | null;

  contract_type_name_ar?: string | null;
  contract_type_name_en?: string | null;

  [key: string]: string | number | boolean | null | undefined;
};

/* =========================================================
   الوثائق
========================================================= */

export type AttachmentItem = {
  opportunity_attachment_id: string | number;
  opportunity_id: string | number;

  attachment_type_id?: string | number | null;

  file_name?: string | null;
  file_url?: string | null;

  document_status?: string | null;

  uploaded_date?: string | null;

  notes_ar?: string | null;
  notes_en?: string | null;

  attachment_type_name_ar?: string | null;
  attachment_type_name_en?: string | null;

  [key: string]: string | number | boolean | null | undefined;
};

/* =========================================================
   استجابة API الكاملة للفرصة
========================================================= */

export type OpportunityApiResponse = {
  opportunity: OpportunityData;

  references: OpportunityReferences;

  financial: FinancialData | null;

  financial_reference?: {
    currency?: ReferenceItem | null;
    financing_model?: ReferenceItem | null;
  };

  location: LocationData | null;

  location_reference?: {
    administrative_unit?: ReferenceItem | null;
    administrative_unit_type?: ReferenceItem | null;
    area_unit?: ReferenceItem | null;
  };

  project_details: ProjectDetailsData | null;

  capacity_unit?: ReferenceItem | null;

  employment: EmploymentData | null;

  infrastructure: InfrastructureItem[];

  site_features: SiteFeatureItem[];

  approvals: ApprovalItem[];

  entities: EntityItem[];

  investors: InvestorItem[];

  contracts: ContractItem[];

  attachments: AttachmentItem[];

  readiness?: number;

};

/* =========================================================
   إعدادات API
========================================================= */

const API_BASE_URL =
  window.location.hostname === "investment-ai-frontend.onrender.com"
    ? "https://investment-ai-platform.onrender.com/api"
    : "http://127.0.0.1:8000/api";

/* =========================================================
   جلب فرصة واحدة حسب الرمز
========================================================= */

export async function getOpportunityByCodeApi(
  code: string
): Promise<OpportunityApiResponse> {
  const response = await fetch(
    `${API_BASE_URL}/opportunities/${encodeURIComponent(code)}`
  );

  if (!response.ok) {
    let message = `Failed to fetch opportunity: ${response.status}`;

    try {
      const errorResult = await response.json();

      if (errorResult?.detail) {
        message = errorResult.detail;
      }
    } catch {
      // تجاهل خطأ قراءة الاستجابة
    }

    throw new Error(message);
  }

  const result = await response.json();

  if (result?.detail) {
    throw new Error(result.detail);
  }

  return result as OpportunityApiResponse;
}

/* =========================================================
   جلب جميع الفرص
========================================================= */

export async function getOpportunitiesApi(): Promise<
  OpportunityApiResponse[]
> {
  const response = await fetch(
    `${API_BASE_URL}/opportunities`
  );

  if (!response.ok) {
    let message = `Failed to fetch opportunities: ${response.status}`;

    try {
      const errorResult = await response.json();

      if (errorResult?.detail) {
        message = errorResult.detail;
      }
    } catch {
      // تجاهل خطأ قراءة الاستجابة
    }

    throw new Error(message);
  }

  const result = await response.json();

  const data = Array.isArray(result)
    ? result
    : result?.opportunities;

  if (!Array.isArray(data)) {
    throw new Error(
      "Invalid opportunities response format"
    );
  }

  return data as OpportunityApiResponse[];
}

/* =========================================================
   AI - أنواع التحليل الذكي
========================================================= */

export type AIScoreBreakdown = {
  [key: string]: number | string | null;
};

export type AIAnalysisResult = {
  opportunity_id: string | number;
  investment_score: number;
  investment_grade: string;

  score_breakdown?: AIScoreBreakdown | null;

  strengths?: string[];
  risks?: string[];
  recommendations?: string[];

  financial_analysis?: Record<string, unknown> | null;
  readiness_analysis?: Record<string, unknown> | null;
  risk_analysis?: Record<string, unknown> | null;

  estimated_readiness?: number | null;

  data_completeness?: number | null;
  analysis_confidence?: number | null;

  gaps?: string[];
  verification_items?: string[];

  suitable_investors?: string[];

  summary?: string;

  [key: string]: unknown;
};

/* =========================================================
   AI - تحليل فرصة استثمارية
========================================================= */

/*
   FastAPI:

   POST /api/ai/opportunities/{opportunity_id}/analyze

   مثال:

   POST http://127.0.0.1:8000/api/ai/opportunities/1/analyze

   ملاحظة:
   الـ Backend يحول ID:

   1  -> DZ-001
   2  -> DZ-002
   3  -> DZ-003

   لذلك نرسل opportunity_id وليس opportunity_code.
*/

export async function analyzeOpportunityApi(
  opportunityId: string | number
): Promise<AIAnalysisResult> {
  const response = await fetch(
    `${API_BASE_URL}/ai/opportunities/${encodeURIComponent(
      String(opportunityId)
    )}/analyze`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    let message = `AI analysis failed: ${response.status}`;

    try {
      const errorResult = await response.json();

      if (errorResult?.detail) {
        message = errorResult.detail;
      }
    } catch {
      // تجاهل خطأ قراءة الاستجابة
    }

    throw new Error(message);
  }

  const result = await response.json();

  return result as AIAnalysisResult;
}