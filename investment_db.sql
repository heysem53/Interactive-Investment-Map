--
-- PostgreSQL database dump
--

\restrict ePpPwRdoLYPuftUq5lemYrwesuG6zt9OiicNb2jgbtgio7d3kDVLJVv5Yv2sqws

-- Dumped from database version 18.2
-- Dumped by pg_dump version 18.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: administrative_unit_types; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.administrative_unit_types (
    unit_type_id integer NOT NULL,
    name_ar text NOT NULL,
    name_en text,
    description_ar text,
    description_en text
);


--
-- Name: administrative_units; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.administrative_units (
    administrative_unit_id integer NOT NULL,
    parent_id integer,
    unit_type_id integer,
    name_ar text NOT NULL,
    name_en text,
    is_active boolean DEFAULT true
);


--
-- Name: approval_types; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.approval_types (
    approval_type_id integer NOT NULL,
    name_ar text NOT NULL,
    name_en text,
    description_ar text,
    description_en text,
    is_active boolean DEFAULT true
);


--
-- Name: area_units; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.area_units (
    area_unit_id integer NOT NULL,
    name_ar text NOT NULL,
    name_en text,
    symbol text,
    is_active boolean DEFAULT true
);


--
-- Name: attachment_types; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.attachment_types (
    attachment_type_id integer NOT NULL,
    name_ar text NOT NULL,
    name_en text,
    description_ar text,
    description_en text
);


--
-- Name: capacity_units; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.capacity_units (
    capacity_unit_id integer NOT NULL,
    name_ar text NOT NULL,
    name_en text,
    symbol text,
    category text,
    description_ar text,
    description_en text,
    is_active boolean DEFAULT true
);


--
-- Name: contract_types; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.contract_types (
    contract_type_id integer NOT NULL,
    name_ar text NOT NULL,
    name_en text,
    description_ar text,
    description_en text,
    is_active boolean DEFAULT true
);


--
-- Name: currencies; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.currencies (
    currency_id integer NOT NULL,
    code text NOT NULL,
    name_ar text NOT NULL,
    name_en text,
    symbol text,
    is_active boolean DEFAULT true
);


--
-- Name: employment; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.employment (
    employment_id integer NOT NULL,
    opportunity_id integer NOT NULL,
    local_specialized_workers integer,
    local_unskilled_workers integer,
    local_total_workers integer,
    foreign_specialized_workers integer,
    foreign_unskilled_workers integer,
    foreign_total_workers integer,
    total_jobs integer,
    required_skills_ar text,
    required_skills_en text,
    notes_ar text,
    notes_en text
);


--
-- Name: entities; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.entities (
    entity_id integer NOT NULL,
    name_ar text NOT NULL,
    name_en text,
    entity_type_id integer,
    phone text,
    email text,
    address_ar text,
    address_en text,
    notes_ar text,
    notes_en text,
    is_active boolean DEFAULT true
);


--
-- Name: entity_relation_types; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.entity_relation_types (
    relation_type_id integer NOT NULL,
    name_ar text NOT NULL,
    name_en text,
    description_ar text,
    description_en text,
    is_active boolean DEFAULT true
);


--
-- Name: entity_types; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.entity_types (
    entity_type_id integer NOT NULL,
    name_ar text NOT NULL,
    name_en text,
    description_ar text,
    description_en text,
    is_active boolean DEFAULT true
);


--
-- Name: financial_data; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.financial_data (
    financial_id integer NOT NULL,
    opportunity_id integer NOT NULL,
    estimated_cost numeric(18,2),
    currency_id integer,
    estimation_source_ar text,
    estimation_source_en text,
    annual_investment_return numeric(18,2),
    investment_period_years numeric(10,2),
    construction_period_years numeric(10,2),
    grace_period_years numeric(10,2),
    financing_model_id integer,
    expected_return_rate numeric(10,4),
    notes_ar text,
    notes_en text
);


--
-- Name: financing_models; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.financing_models (
    financing_model_id integer NOT NULL,
    name_ar text NOT NULL,
    name_en text,
    description_ar text,
    description_en text,
    is_active boolean DEFAULT true
);


--
-- Name: infrastructure_types; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.infrastructure_types (
    infrastructure_type_id integer NOT NULL,
    name_ar text NOT NULL,
    name_en text,
    category text,
    description_ar text,
    description_en text,
    is_active boolean DEFAULT true
);


--
-- Name: investment_opportunities; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.investment_opportunities (
    opportunity_id integer NOT NULL,
    opportunity_code text NOT NULL,
    name_ar text NOT NULL,
    name_en text,
    sector_id integer,
    sub_sector_id integer,
    location_id integer,
    ownership_id integer,
    project_type_id integer,
    investor_type_id integer,
    contract_type_id integer,
    provider_entity_id integer,
    project_scale_id integer,
    status_id integer,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    is_active boolean DEFAULT true
);


--
-- Name: investor_types; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.investor_types (
    investor_type_id integer NOT NULL,
    name_ar text NOT NULL,
    name_en text,
    description_ar text,
    description_en text,
    is_active boolean DEFAULT true
);


--
-- Name: locations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.locations (
    location_id integer NOT NULL,
    opportunity_id integer NOT NULL,
    description_ar text,
    description_en text,
    administrative_unit_id integer,
    ownership_id integer,
    property_numbers text,
    area_value numeric(18,2),
    area_unit_id integer,
    expandable boolean,
    expansion_area_value numeric(18,2),
    latitude numeric(10,7),
    longitude numeric(10,7),
    map_url text,
    notes_ar text,
    notes_en text
);


--
-- Name: opportunity_approvals; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.opportunity_approvals (
    opportunity_approval_id integer NOT NULL,
    opportunity_id integer NOT NULL,
    approval_type_id integer,
    approval_name_ar text,
    approval_name_en text,
    approval_status_ar text,
    approval_status_en text,
    issuing_entity_id integer,
    notes_ar text,
    notes_en text
);


--
-- Name: opportunity_attachments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.opportunity_attachments (
    opportunity_attachment_id integer NOT NULL,
    opportunity_id integer NOT NULL,
    attachment_type_id integer,
    file_name text,
    file_url text,
    document_status text,
    uploaded_date date,
    notes_ar text,
    notes_en text
);


--
-- Name: opportunity_contracts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.opportunity_contracts (
    opportunity_contract_id integer NOT NULL,
    opportunity_id integer NOT NULL,
    contract_type_id integer,
    notes_ar text,
    notes_en text
);


--
-- Name: opportunity_entities; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.opportunity_entities (
    opportunity_entity_id integer NOT NULL,
    opportunity_id integer NOT NULL,
    entity_id integer NOT NULL,
    relation_type_id integer NOT NULL,
    notes_ar text,
    notes_en text,
    created_at timestamp without time zone,
    is_active boolean DEFAULT true
);


--
-- Name: opportunity_infrastructure; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.opportunity_infrastructure (
    opportunity_infrastructure_id integer CONSTRAINT opportunity_infrastructure_opportunity_infrastructure__not_null NOT NULL,
    opportunity_id integer NOT NULL,
    infrastructure_type_id integer NOT NULL,
    availability_status text,
    description_ar text,
    description_en text,
    is_active boolean DEFAULT true
);


--
-- Name: opportunity_investors; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.opportunity_investors (
    opportunity_investor_id integer NOT NULL,
    opportunity_id integer NOT NULL,
    investor_type_id integer,
    entity_id integer,
    notes_ar text,
    notes_en text
);


--
-- Name: opportunity_site_features; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.opportunity_site_features (
    opportunity_site_feature_id integer NOT NULL,
    opportunity_id integer NOT NULL,
    site_feature_id integer NOT NULL,
    feature_value_ar text,
    feature_value_en text,
    notes_ar text,
    notes_en text,
    is_active boolean DEFAULT true
);


--
-- Name: opportunity_statuses; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.opportunity_statuses (
    status_id integer NOT NULL,
    name_ar text NOT NULL,
    name_en text,
    description_ar text,
    description_en text,
    is_active boolean DEFAULT true
);


--
-- Name: ownership_types; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.ownership_types (
    ownership_id integer NOT NULL,
    name_ar text NOT NULL,
    name_en text,
    description_ar text,
    description_en text,
    is_active boolean DEFAULT true
);


--
-- Name: project_details; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.project_details (
    project_detail_id integer NOT NULL,
    opportunity_id integer NOT NULL,
    description_ar text,
    description_en text,
    main_product_ar text,
    main_product_en text,
    main_product_specifications_ar text,
    main_product_specifications_en text,
    secondary_products_ar text,
    secondary_products_en text,
    production_capacity numeric(18,2),
    capacity_unit_id integer,
    target_market_ar text,
    target_market_en text,
    economic_social_justification_ar text,
    economic_social_justification_en text
);


--
-- Name: project_scales; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.project_scales (
    project_scale_id integer NOT NULL,
    name_ar text NOT NULL,
    name_en text
);


--
-- Name: project_types; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.project_types (
    project_type_id integer NOT NULL,
    name_ar text NOT NULL,
    name_en text,
    description_ar text,
    description_en text,
    is_active boolean DEFAULT true
);


--
-- Name: sectors; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sectors (
    sector_id integer NOT NULL,
    name_ar text NOT NULL,
    name_en text,
    description_ar text,
    description_en text,
    is_active boolean DEFAULT true
);


--
-- Name: site_features; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.site_features (
    feature_id integer NOT NULL,
    name_ar text NOT NULL,
    name_en text,
    description_ar text,
    description_en text
);


--
-- Name: sub_sectors; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sub_sectors (
    sub_sector_id integer NOT NULL,
    sector_id integer NOT NULL,
    name_ar text NOT NULL,
    name_en text,
    description_ar text,
    description_en text,
    is_active boolean DEFAULT true
);


--
-- Data for Name: administrative_unit_types; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.administrative_unit_types (unit_type_id, name_ar, name_en, description_ar, description_en) FROM stdin;
1	محافظة	Governorate	أعلى مستوى إداري	The highest administrative level
2	منطقة	District	تقسيم إداري تابع للمحافظة	An administrative division under the governorate
3	ناحية	Subdistrict	تقسيم إداري تابع للمنطقة	An administrative division under the district
4	مدينة	City	تجمع حضري رئيسي	A major urban settlement
5	مجلس مدينة	City Council	وحدة إدارة مدينة	The administrative council responsible for managing a city
6	بلدة	Town	تجمع سكاني متوسط	A medium-sized settlement
7	مجلس بلدة	Town Council	وحدة إدارة بلدة	The administrative council responsible for managing a town
8	بلدية	Municipality	وحدة إدارية بلدية	A local administrative municipality unit
9	قرية	Village	تجمع سكاني ريفي	A rural settlement
10	مجلس قرية	Village Council	وحدة إدارة قرية	The administrative council responsible for managing a village
11	حي	Neighborhood	تقسيم داخل المدينة	A subdivision within a city
12	تجمع سكاني	Residential Community	تجمع سكاني معتمد	A recognized residential community
\.


--
-- Data for Name: administrative_units; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.administrative_units (administrative_unit_id, parent_id, unit_type_id, name_ar, name_en, is_active) FROM stdin;
1	\N	1	محافظة دير الزور	Deir ez Zor Governorate	t
2	1	2	منطقة دير الزور	Deir ez Zor District	t
3	1	2	منطقة الميادين	Al Mayadin District	t
4	1	2	منطقة البوكمال	Al Bukamal District	t
5	2	3	ناحية البصيرة	Al Busayrah Subdistrict	t
6	2	3	ناحية خشام	Khasham Subdistrict	t
7	3	3	ناحية العشارة	Al Asharah Subdistrict	t
8	4	3	ناحية هجين	Hajin Subdistrict	t
9	2	5	مجلس مدينة دير الزور	Deir ez Zor City Council	t
10	3	5	مجلس مدينة الميادين	Al Mayadin City Council	t
11	4	5	مجلس مدينة البوكمال	Al Bukamal City Council	t
12	3	7	مجلس بلدة ذيبان	Dhiban Town Council	t
13	3	7	مجلس بلدة العشارة	Al Asharah Town Council	t
14	4	7	مجلس بلدة هجين	Hajin Town Council	t
15	2	8	بلدية البصيرة	Al Busayrah Municipality	t
16	2	8	بلدية خشام	Khasham Municipality	t
17	3	8	بلدية الشحيل	Al Shuhail Municipality	t
18	4	8	بلدية السوسة	Al Sousah Municipality	t
19	2	9	قرية مراط	Marat Village	t
20	2	9	قرية الحصان	Al Husan Village	t
21	3	9	قرية الكشكية	Al Kishkiyah Village	t
22	4	9	قرية أبو حمام	Abu Hamam Village	t
23	19	10	مجلس قرية مراط	Marat Village Council	t
24	21	10	مجلس قرية الكشكية	Al Kishkiyah Village Council	t
25	22	10	مجلس قرية أبو حمام	Abu Hamam Village Council	t
26	9	11	حي الجورة	Al Jourah Neighborhood	t
27	9	11	حي القصور	Al Qusour Neighborhood	t
28	15	12	تجمع سكاني جديد	New Residential Community	t
\.


--
-- Data for Name: approval_types; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.approval_types (approval_type_id, name_ar, name_en, description_ar, description_en, is_active) FROM stdin;
1	موافقة مبدئية متوفرة	Initial Approval Available	تم الحصول على موافقة مبدئية للمشروع	Initial project approval obtained	t
2	موافقات قائمة سابقة	Existing Approvals	وجود موافقات أو تراخيص سابقة للمشروع	Previous approvals or licenses exist	t
3	بحاجة لموافقات	Approvals Required	المشروع يحتاج إلى استكمال الموافقات الرسمية	Project requires official approvals	t
4	غير محدد	Undefined	لم يتم تحديد حالة الموافقات بعد	Approval status not defined	t
\.


--
-- Data for Name: area_units; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.area_units (area_unit_id, name_ar, name_en, symbol, is_active) FROM stdin;
1	متر مربع	Square Meter	m²	t
2	هكتار	Hectare	ha	t
3	دونم	Dunam	dunum	t
4	كيلومتر مربع	Square Kilometer	km²	t
\.


--
-- Data for Name: attachment_types; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.attachment_types (attachment_type_id, name_ar, name_en, description_ar, description_en) FROM stdin;
1	دفتر الشروط	Terms Book	وثيقة شروط الاستثمار أو التعاقد	Investment and contract conditions document
2	وثائق الملكية	Ownership Documents	وثائق تثبت ملكية العقار أو الأصل	Property ownership documents
3	مخطط KMZ	KMZ File	ملف الموقع الجغرافي بصيغة KMZ	Geographical KMZ file
4	دراسة جدوى	Feasibility Study	دراسة الجدوى الاقتصادية للمشروع	Economic feasibility study
5	مخطط تنظيمي	Organizational Plan	المخطط التنظيمي للموقع	Site organizational plan
6	صور الموقع	Site Photos	صور توثيقية للموقع	Site documentation photos
7	فيديو تعريفي	Presentation Video	فيديو تعريفي بالفرصة	Opportunity presentation video
8	بطاقة فرصة استثمارية	Investment Opportunity Card	البطاقة التعريفية للفرصة	Investment opportunity profile card
9	تراخيص وموافقات	Licenses and Approvals	التراخيص والموافقات الرسمية	Official licenses and approvals
10	أخرى	Other	وثائق إضافية	Additional documents
\.


--
-- Data for Name: capacity_units; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.capacity_units (capacity_unit_id, name_ar, name_en, symbol, category, description_ar, description_en, is_active) FROM stdin;
1	متر مربع	Square Meter	m²	Area	وحدة قياس المساحات	Area measurement unit	t
2	سرير / غرفة	Bed / Room	unit	Tourism	وحدة قياس الطاقة الاستيعابية الفندقية	Hospitality capacity unit	t
3	طن سنوياً	Ton per Year	ton/year	Production	قياس الطاقة الإنتاجية السنوية	Annual production capacity	t
4	طن	Ton	ton	Mining	قياس الإنتاج أو الاستخراج	Production or extraction measurement	t
5	رأس حيواني	Animal Head	head	Livestock	عدد الحيوانات في المشروع	Number of animals in project	t
6	وحدة سنوياً	Unit per Year	unit/year	Production	عدد الوحدات المنتجة سنوياً	Annual produced units	t
7	وحدة تشغيلية	Operational Unit	unit	Services	وحدة قياس الخدمات أو التشغيل	Service or operation measurement	t
8	كيلو واط	Kilowatt	kW	Energy	قياس القدرة الكهربائية	Electric power measurement	t
9	متر مكعب	Cubic Meter	m³	Volume	قياس الأحجام والكميات	Volume measurement unit	t
\.


--
-- Data for Name: contract_types; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.contract_types (contract_type_id, name_ar, name_en, description_ar, description_en, is_active) FROM stdin;
1	PPP	Public Private Partnership	شراكة بين القطاع العام والخاص لتنفيذ واستثمار المشروع	Partnership between public and private sectors for project development and operation	t
2	BOT	Build Operate Transfer	إنشاء وتشغيل ونقل ملكية المشروع بعد مدة محددة	Build, operate and transfer ownership after agreed period	t
3	استثمار مباشر	Direct Investment	استثمار مباشر من المستثمر وتمويل وتشغيل المشروع	Direct investment and operation by investor	t
4	تشغيل واستثمار	Operation and Investment	تشغيل واستثمار أصل أو منشأة قائمة	Operation and investment of existing asset or facility	t
5	إيجار واستثمار	Lease and Investment	استثمار العقار أو الأصل من خلال عقد إيجار استثماري	Investment through lease agreement	t
6	تخصيص واستثمار	Allocation and Investment	تخصيص أرض أو أصل عام لإقامة مشروع استثماري	Allocation of public asset for investment project	t
\.


--
-- Data for Name: currencies; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.currencies (currency_id, code, name_ar, name_en, symbol, is_active) FROM stdin;
1	USD	دولار أمريكي	US Dollar	$	t
2	SYP	ليرة سورية	Syrian Pound	ل.س	t
3	EUR	يورو	Euro	€	t
4	TRY	ليرة تركية	Turkish Lira	₺	t
\.


--
-- Data for Name: employment; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.employment (employment_id, opportunity_id, local_specialized_workers, local_unskilled_workers, local_total_workers, foreign_specialized_workers, foreign_unskilled_workers, foreign_total_workers, total_jobs, required_skills_ar, required_skills_en, notes_ar, notes_en) FROM stdin;
1	1	50	150	200	10	20	30	230	إدارة مشاريع، هندسة، تخطيط	Project management, engineering, planning	مشروع تطوير عمراني	Urban development project
2	2	100	300	400	20	30	50	450	هندسة وإنشاءات	Engineering and construction	مجمعات سكنية	Residential complexes
3	3	30	70	100	5	10	15	115	إدارة فنادق وخدمات	Hotel management and services	قطاع سياحي	Tourism sector
4	4	40	200	240	5	20	25	265	زراعة وتصنيع غذائي	Agriculture and food processing	مشروع زراعي	Agricultural project
5	5	80	200	280	30	50	80	360	تعدين وجيولوجيا	Mining and geology	مشروع تعدين	Mining project
6	6	20	80	100	0	5	5	105	تربية حيوانية	Animal husbandry	ثروة حيوانية	Livestock
7	7	60	150	210	20	30	50	260	تعدين وتشغيل	Mining operations	منجم ملح	Salt mine
8	8	40	120	160	10	20	30	190	تصنيع وإنتاج	Manufacturing	مصنع أعلاف	Feed factory
9	9	30	100	130	5	10	15	145	هندسة صناعية	Industrial engineering	معدات ري	Irrigation equipment
10	10	20	150	170	5	10	15	185	تربية دواجن	Poultry farming	دواجن	Poultry
11	11	150	500	650	50	100	150	800	هندسة وصناعة إسمنت	Engineering and cement production	مشروع كبير	Large project
12	12	50	200	250	10	20	30	280	تدوير ومعالجة	Recycling and processing	مشروع بيئي	Environmental project
13	13	40	120	160	5	10	15	175	تشغيل مطاحن	Mill operation	مطحنة	Mill
14	14	20	50	70	5	5	10	80	تقنيات زراعية	Agricultural technology	مختبر	Laboratory
15	15	40	150	190	5	10	15	205	تصنيع غذائي	Food processing	كونسروة	Canning
16	16	60	150	210	10	20	30	240	سياحة وخدمات	Tourism services	مشروع سياحي	Tourism
17	17	100	300	400	20	30	50	450	نسيج وتشغيل آلات	Textile operations	إعادة تأهيل	Rehabilitation
18	18	80	200	280	10	20	30	310	صناعة ورق	Paper industry	إعادة تشغيل	Restart
19	19	100	400	500	30	50	80	580	صناعة غذائية	Food industry	معمل السكر	Sugar factory
20	20	50	120	170	20	30	50	220	تعدين	Mining	منجم	Mine
21	21	30	80	110	5	10	15	125	زراعة وتقنيات	Agriculture technologies	بذار	Seeds
22	22	20	50	70	5	5	10	80	أحياء زراعية	Biological agriculture	مكافحة حيوية	Biological control
23	23	30	100	130	5	10	15	145	تصنيع غذائي	Food processing	دبس تمر	Date molasses
24	24	20	60	80	0	5	5	85	خدمات زراعية	Agricultural services	مكننة	Mechanization
25	25	100	400	500	20	50	70	570	إدارة مناطق صناعية	Industrial management	ورش صناعية	Workshops
26	26	20	80	100	5	5	10	110	تصنيع غذائي	Food processing	طحينية	Tahini
27	27	40	120	160	5	10	15	175	صناعات غذائية	Food industries	معكرونة وبرغل	Pasta and bulgur
28	28	20	70	90	5	5	10	100	تشغيل صناعي	Industrial operation	تجفيف	Drying
29	29	50	200	250	10	20	30	280	تربية أبقار	Cattle farming	ألبان ولحوم	Dairy and meat
30	30	40	120	160	10	15	25	185	دباغة جلود	Leather tanning	جلود	Leather
31	31	60	200	260	10	20	30	290	سياحة وتجارة	Tourism and commerce	كورنيش	Waterfront
32	32	50	150	200	5	10	15	215	نقل وصيانة	Transport and maintenance	نقل عام	Public transport
33	33	100	400	500	20	50	70	570	إدارة وتشغيل صناعي	Industrial operation	مدينة صناعية	Industrial city
34	34	20	50	70	0	5	5	75	إدارة وخدمات	Management services	فارمكس	Farmex
35	35	30	100	130	5	10	15	145	فندقة وسياحة	Hospitality	فندق	Hotel
\.


--
-- Data for Name: entities; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.entities (entity_id, name_ar, name_en, entity_type_id, phone, email, address_ar, address_en, notes_ar, notes_en, is_active) FROM stdin;
1	محافظة دير الزور	Deir ez Zor Governorate	1	\N	\N	\N	دير الزور - سوريا	Deir ez Zor - Syria	الجهة المحلية المقدمة لعدد من الفرص الاستثمارية	\N
2	الجهة المالكة للعقار	Property Owner Entity	2	\N	\N	\N	دير الزور - سوريا	Deir ez Zor - Syria	جهة مالكة لأصول وعقارات استثمارية	\N
3	مديرية الزراعة بدير الزور	Directorate of Agriculture - Deir ez Zor	1	\N	\N	\N	دير الزور - سوريا	Deir ez Zor - Syria	جهة مقدمة للفرص الزراعية	\N
4	جهة حكومية مختصة بالموارد الطبيعية	Government Natural Resources Authority	1	\N	\N	\N	سوريا	Syria	جهة مرتبطة باستثمار الموارد الطبيعية	\N
5	وزارة الصناعة	Ministry of Industry	1	\N	\N	\N	دمشق - سوريا	Damascus - Syria	الجهة المشرفة على عدد من المشاريع الصناعية	\N
6	القطاع الخاص	Private Sector	3	\N	\N	\N	دير الزور - سوريا	Deir ez Zor - Syria	مصدر فرص مقدمة من المستثمرين أو الشركات الخاصة	\N
7	جهة حكومية	Government Entity	1	\N	\N	\N	سوريا	Syria	جهة حكومية مالكة أو مشرفة على مشاريع	\N
8	الجهة المالكة لمبنى فارمكس	Farmex Building Owner	2	\N	\N	\N	دير الزور - سوريا	Deir ez Zor - Syria	مالك الأصل العقاري	\N
9	نقابة المهندسين	Engineers Syndicate	3	\N	\N	\N	دير الزور - سوريا	Deir ez Zor - Syria	جهة مالكة لمشروع فندقي	\N
\.


--
-- Data for Name: entity_relation_types; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.entity_relation_types (relation_type_id, name_ar, name_en, description_ar, description_en, is_active) FROM stdin;
1	مقدم الفرصة	Opportunity Provider	الجهة التي قدمت الفرصة الاستثمارية	Entity that provided the investment opportunity	t
2	مالك الأصل	Asset Owner	الجهة المالكة للعقار أو الأصل	Owner of property or asset	t
3	جهة إشرافية	Supervisory Entity	جهة رقابية أو مشرفة على المشروع	Regulatory or supervisory authority	t
4	جهة موافقة	Approval Entity	جهة تمنح الموافقات اللازمة	Authority issuing approvals	t
5	شريك محتمل	Potential Partner	جهة محتملة للمشاركة في الاستثمار	Potential investment partner	t
\.


--
-- Data for Name: entity_types; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.entity_types (entity_type_id, name_ar, name_en, description_ar, description_en, is_active) FROM stdin;
1	جهة حكومية	Government Entity	وزارات ومديريات ومؤسسات عامة	Ministries, directorates and public institutions	t
2	مالك عقار أو أصل	Property / Asset Owner	جهة تملك عقار أو أصل استثماري	Entity owning property or investment asset	t
3	قطاع خاص	Private Sector	شركات أو مستثمرون من القطاع الخاص	Private companies or investors	t
4	مؤسسة مالية	Financial Institution	جهات التمويل والاستثمار المالي	Financial and investment institutions	t
\.


--
-- Data for Name: financial_data; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.financial_data (financial_id, opportunity_id, estimated_cost, currency_id, estimation_source_ar, estimation_source_en, annual_investment_return, investment_period_years, construction_period_years, grace_period_years, financing_model_id, expected_return_rate, notes_ar, notes_en) FROM stdin;
1	1	50000000.00	1	تقدير أولي	Initial estimate	10.00	25.00	3.00	2.00	1	12.0000	يحتاج دراسة جدوى تفصيلية	Requires detailed feasibility study
2	2	100000000.00	1	تقدير مبدئي	Preliminary estimate	15.00	30.00	5.00	2.00	1	15.0000	مشروع تطوير عقاري كبير	Large real estate development
3	3	10000000.00	1	تقدير إعادة تأهيل	Rehabilitation estimate	8.00	20.00	2.00	1.00	2	10.0000	فندق قائم	Existing hotel
4	4	20000000.00	1	تقدير زراعي	Agricultural estimate	6.00	15.00	2.00	1.00	3	9.0000	حسب المساحات المزروعة	Based on cultivated area
5	5	150000000.00	1	تقدير أولي	Initial estimate	20.00	30.00	5.00	3.00	1	18.0000	يحتاج دراسة جيولوجية	Requires geological study
6	6	5000000.00	1	تقدير زراعي	Agricultural estimate	4.00	10.00	1.00	1.00	3	8.0000	مشروع إنتاج حيواني	Livestock project
7	7	30000000.00	1	تقدير صناعي	Industrial estimate	12.00	25.00	3.00	2.00	3	14.0000	مشروع تعدين	Mining project
8	8	15000000.00	1	تقدير صناعي	Industrial estimate	7.00	15.00	2.00	1.00	3	11.0000	مصنع أعلاف	Feed factory
9	9	10000000.00	1	تقدير صناعي	Industrial estimate	5.00	15.00	2.00	1.00	3	10.0000	صناعة داعمة للزراعة	Agriculture supporting industry
10	10	12000000.00	1	تقدير زراعي	Agricultural estimate	5.00	12.00	2.00	1.00	3	10.0000	منشأة دواجن	Poultry facility
11	11	500000000.00	1	تقدير صناعي	Industrial estimate	50.00	35.00	6.00	3.00	1	20.0000	مشروع استراتيجي	Strategic project
12	12	50000000.00	1	تقدير أولي	Initial estimate	10.00	20.00	3.00	2.00	1	13.0000	مشروع بيئي	Environmental project
13	13	20000000.00	1	تقدير صناعي	Industrial estimate	8.00	20.00	3.00	1.00	3	12.0000	مطحنة حديثة	Modern mill
14	14	8000000.00	1	تقدير تقني	Technical estimate	4.00	10.00	2.00	1.00	3	10.0000	مختبر زراعي	Agricultural laboratory
15	15	15000000.00	1	تقدير صناعي	Industrial estimate	7.00	15.00	2.00	1.00	3	11.0000	تصنيع غذائي	Food processing
16	16	40000000.00	1	تقدير سياحي	Tourism estimate	10.00	25.00	4.00	2.00	1	13.0000	تطوير سياحي	Tourism development
17	17	70000000.00	1	تقدير إعادة تأهيل	Rehabilitation estimate	15.00	25.00	4.00	2.00	2	15.0000	معمل قائم	Existing factory
18	18	60000000.00	1	تقدير إعادة تأهيل	Rehabilitation estimate	12.00	25.00	4.00	2.00	2	14.0000	إعادة تشغيل	Restart operation
19	19	100000000.00	1	تقدير صناعي	Industrial estimate	20.00	30.00	5.00	3.00	1	17.0000	مشروع غذائي كبير	Large food project
20	20	25000000.00	1	تقدير تعدين	Mining estimate	10.00	20.00	3.00	2.00	3	13.0000	منجم ملح	Salt mine
21	21	10000000.00	1	تقدير زراعي	Agricultural estimate	5.00	15.00	2.00	1.00	3	10.0000	مشروع زراعي تقني	Agricultural technology project
22	22	7000000.00	1	تقدير تقني	Technical estimate	4.00	10.00	2.00	1.00	3	9.0000	إنتاج حيوي	Biological production
23	23	12000000.00	1	تقدير صناعي	Industrial estimate	6.00	15.00	2.00	1.00	3	10.0000	مصنع غذائي	Food factory
24	24	5000000.00	1	تقدير خدمي	Service estimate	3.00	10.00	1.00	1.00	3	8.0000	خدمات زراعية	Agricultural services
25	25	100000000.00	1	تقدير تطوير مناطق	Zone development estimate	15.00	30.00	5.00	2.00	1	15.0000	منطقة صناعية	Industrial zone
26	26	8000000.00	1	تقدير صناعي	Industrial estimate	4.00	12.00	2.00	1.00	3	10.0000	مصنع غذائي	Food factory
27	27	15000000.00	1	تقدير صناعي	Industrial estimate	7.00	15.00	2.00	1.00	3	11.0000	تصنيع غذائي	Food manufacturing
28	28	10000000.00	1	تقدير صناعي	Industrial estimate	5.00	12.00	2.00	1.00	3	10.0000	تجفيف صناعي	Industrial drying
29	29	20000000.00	1	تقدير زراعي	Agricultural estimate	8.00	15.00	2.00	1.00	3	12.0000	إنتاج حيواني	Livestock production
30	30	15000000.00	1	تقدير صناعي	Industrial estimate	7.00	15.00	2.00	1.00	3	11.0000	صناعة جلدية	Leather industry
31	31	60000000.00	1	تقدير سياحي	Tourism estimate	12.00	25.00	4.00	2.00	1	14.0000	تطوير حضري	Urban development
32	32	20000000.00	1	تقدير خدمي	Service estimate	5.00	15.00	2.00	1.00	3	10.0000	نقل عام	Public transport
33	33	150000000.00	1	تقدير تطوير صناعي	Industrial development estimate	25.00	30.00	5.00	2.00	1	16.0000	مدينة صناعية	Industrial city
34	34	5000000.00	1	تقدير عقاري	Real estate estimate	3.00	15.00	1.00	1.00	2	9.0000	استثمار أصل قائم	Existing asset investment
35	35	15000000.00	1	تقدير سياحي	Tourism estimate	6.00	20.00	3.00	1.00	2	11.0000	فندق ثلاث نجوم	Three-star hotel
36	36	12500000.00	1	تقدير صحي	\N	\N	\N	\N	\N	\N	\N	\N	\N
\.


--
-- Data for Name: financing_models; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.financing_models (financing_model_id, name_ar, name_en, description_ar, description_en, is_active) FROM stdin;
1	شراكة عامة خاصة PPP	Public Private Partnership PPP	شراكة بين القطاع العام والخاص لتنفيذ المشروع	Partnership between public and private sectors	t
2	بناء تشغيل نقل BOT	Build Operate Transfer BOT	إنشاء وتشغيل المشروع ثم نقله للجهة المالكة	Build operate and transfer model	t
3	استثمار مباشر	Direct Investment	تمويل وتنفيذ المشروع من المستثمر مباشرة	Project funded directly by investor	t
4	تمويل مصرفي	Bank Financing	تمويل المشروع عبر القروض المصرفية	Project financed through bank loans	t
5	تمويل مختلط	Mixed Financing	مزيج من مصادر تمويل متعددة	Combination of financing sources	t
\.


--
-- Data for Name: infrastructure_types; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.infrastructure_types (infrastructure_type_id, name_ar, name_en, category, description_ar, description_en, is_active) FROM stdin;
1	طرق ونقل	Roads and Transport	Transport	توفر شبكة الطرق ووسائل الوصول والنقل إلى الموقع	Availability of road networks and transport access	t
2	كهرباء	Electricity	Energy	توفر التغذية الكهربائية وقدرة الربط بالشبكة	Availability of electricity supply and grid connection	t
3	مياه	Water Supply	Utilities	توفر مصادر المياه وشبكات التزويد	Availability of water sources and supply networks	t
4	صرف صحي ومعالجة	Sewage and Treatment	Utilities	توفر شبكات الصرف الصحي أو أنظمة المعالجة	Availability of sewage networks or treatment systems	t
5	اتصالات وإنترنت	Telecommunications and Internet	Digital Infrastructure	توفر خدمات الاتصالات والربط الرقمي	Availability of telecommunication and digital connectivity	t
6	غاز ووقود	Gas and Fuel	Energy	توفر مصادر الغاز والوقود اللازمة للتشغيل	Availability of gas and fuel sources required for operation	t
7	شبكة ري	Irrigation Network	Agriculture	توفر شبكات الري ومصادر المياه الزراعية	Availability of irrigation networks and agricultural water supply	t
8	سكك حديدية	Railway	Transport	توفر أو قرب خطوط النقل الحديدية	Availability or proximity of railway connections	t
9	موانئ ومنافذ لوجستية	Ports and Logistics Facilities	Logistics	قرب الموقع من الموانئ أو مراكز الخدمات اللوجستية	Proximity to ports and logistics facilities	t
10	مطارات	Airports	Transport	قرب الموقع من المطارات أو خدمات النقل الجوي	Proximity to airports and air transport services	t
11	بنية تحتية صناعية	Industrial Infrastructure	Industrial	توفر تجهيزات وخدمات داعمة للنشاط الصناعي	Availability of industrial supporting infrastructure	t
12	أخرى	Other	Other	مقومات بنية تحتية إضافية	Additional infrastructure elements	t
\.


--
-- Data for Name: investment_opportunities; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.investment_opportunities (opportunity_id, opportunity_code, name_ar, name_en, sector_id, sub_sector_id, location_id, ownership_id, project_type_id, investor_type_id, contract_type_id, provider_entity_id, project_scale_id, status_id, created_at, updated_at, is_active) FROM stdin;
1	DZ-001	التطوير العقاري في المدينة القديمة	Old City Real Estate Development	1	101	1	1	1	1	1	1	\N	1	2026-07-19 00:00:00	2026-07-19 00:00:00	t
2	DZ-002	التطوير العقاري في المدينة الجديدة	New City Real Estate Development	1	102	2	1	1	2	1	1	\N	2	2026-07-19 00:00:00	2026-07-19 00:00:00	t
3	DZ-003	فندق فرات الشام	Furat Al Sham Hotel	2	201	3	1	2	3	2	2	\N	2	2026-07-19 00:00:00	2026-07-19 00:00:00	t
4	DZ-004	استثمار زراعة الشوندر السكري	Sugar Beet Agriculture Investment	3	301	4	5	3	3	3	3	\N	2	2026-07-19 00:00:00	2026-07-19 00:00:00	t
5	DZ-005	استثمار جبل البشري	Al Bishri Mountain Investment	4	401	5	1	4	4	1	4	\N	1	2026-07-19 00:00:00	2026-07-19 00:00:00	t
6	DZ-006	مشروع تربية أغنام العواس	Awassi Sheep Farming Project	3	302	6	5	5	1	3	3	\N	2	2026-07-19 00:00:00	2026-07-19 00:00:00	t
7	DZ-007	منجم ملح التبني	Al Tabni Salt Mine	4	402	7	1	6	5	3	5	\N	2	2026-07-19 00:00:00	2026-07-19 00:00:00	t
8	DZ-008	معمل إنتاج الأعلاف	Animal Feed Factory	5	501	8	5	7	3	3	6	\N	2	2026-07-19 00:00:00	2026-07-19 00:00:00	t
9	DZ-009	تصنيع مستلزمات الري الحديث	Modern Irrigation Equipment Factory	5	502	9	5	7	1	3	6	\N	2	2026-07-19 00:00:00	2026-07-19 00:00:00	t
10	DZ-010	مدجنة إنتاج الفروج وبيض المائدة	Poultry and Egg Production Farm	3	303	10	5	5	1	3	3	\N	2	2026-07-19 00:00:00	2026-07-19 00:00:00	t
11	DZ-011	مصنع الإسمنت	Cement Factory	5	503	11	1	7	4	1	5	\N	1	2026-07-19 00:00:00	2026-07-19 00:00:00	t
12	DZ-012	مجمع السماد العضوي وإدارة النفايات الزراعية	Organic Fertilizer and Agricultural Waste Management Complex	6	601	12	1	8	4	1	1	\N	1	2026-07-19 00:00:00	2026-07-19 00:00:00	t
13	DZ-013	مطحنة حديثة في دير الزور	Modern Grain Mill	5	504	13	5	7	1	3	6	\N	2	2026-07-19 00:00:00	2026-07-19 00:00:00	t
14	DZ-014	مختبر إكثار النباتات بالأنسجة النباتية	Plant Tissue Culture Laboratory	3	304	14	1	9	3	3	3	\N	2	2026-07-19 00:00:00	2026-07-19 00:00:00	t
15	DZ-015	مصنع كونسروة	Canned Food Factory	5	505	15	1	7	1	3	6	\N	2	2026-07-19 00:00:00	2026-07-19 00:00:00	t
16	DZ-016	سد حلبية وزلبية	Halabiya and Zalabiya Dam Development	7	701	16	1	10	4	1	7	\N	1	2026-07-19 00:00:00	2026-07-19 00:00:00	t
17	DZ-017	معمل الغزل والنسيج	Textile Factory Rehabilitation	5	506	17	1	11	3	2	5	\N	3	2026-07-19 00:00:00	2026-07-19 00:00:00	t
18	DZ-018	إعادة إحياء معمل الورق	Paper Factory Rehabilitation	5	507	18	1	11	3	1	5	\N	3	2026-07-19 00:00:00	2026-07-19 00:00:00	t
19	DZ-019	معمل السكر	Sugar Factory Rehabilitation	5	508	19	1	11	3	1	5	\N	1	2026-07-19 00:00:00	2026-07-19 00:00:00	t
20	DZ-020	منجم ملح الهرموشية	Al Harmoushiya Salt Mine	4	402	20	1	6	5	3	4	\N	2	2026-07-19 00:00:00	2026-07-19 00:00:00	t
21	DZ-021	مجمع إنتاج البذار والفطر الزراعي	Seeds and Mushroom Production Complex	3	305	21	1	9	3	3	3	\N	2	2026-07-19 00:00:00	2026-07-19 00:00:00	t
22	DZ-022	معمل إكثار وتربية الأعداء الحيوية	Biological Control Production Facility	3	306	22	1	9	3	3	3	\N	2	2026-07-19 00:00:00	2026-07-19 00:00:00	t
23	DZ-023	مصنع دبس التمر	Date Molasses Factory	5	505	23	1	7	1	3	6	\N	2	2026-07-19 00:00:00	2026-07-19 00:00:00	t
24	DZ-024	مراكز المكننة الزراعية الحديثة	Modern Agricultural Mechanization Centers	8	801	24	1	12	1	3	3	\N	2	2026-07-19 00:00:00	2026-07-19 00:00:00	t
25	DZ-025	المنطقة الصناعية للورش	Industrial Workshops Zone	5	509	25	1	13	3	1	1	\N	1	2026-07-19 00:00:00	2026-07-19 00:00:00	t
26	DZ-026	مصنع طحينية	Tahini Factory	5	505	26	1	7	1	3	6	\N	2	2026-07-19 00:00:00	2026-07-19 00:00:00	t
27	DZ-027	مصنع المعكرونة والبرغل	Pasta and Bulgur Factory	5	505	27	1	7	1	3	6	\N	2	2026-07-19 00:00:00	2026-07-19 00:00:00	t
28	DZ-028	مجفف صناعي للذرة الصفراء	Industrial Corn Dryer	5	502	28	\N	7	1	3	6	\N	2	2026-07-19 00:00:00	2026-07-19 00:00:00	t
29	DZ-029	منشأة أبقار متكاملة	Integrated Cattle Farm	3	302	29	1	5	2	3	3	\N	2	2026-07-19 00:00:00	2026-07-19 00:00:00	t
30	DZ-030	مصنع دباغة جلود	Leather Tanning Factory	5	510	30	1	7	2	3	6	\N	2	2026-07-19 00:00:00	2026-07-19 00:00:00	t
31	DZ-031	كورنيش طريق الشام	Damascus Road Waterfront Development	1	103	31	1	10	3	1	1	\N	1	2026-07-19 00:00:00	2026-07-19 00:00:00	t
32	DZ-032	شركة نقل داخلي بباصات كهربائية	Electric Bus Public Transport Company	9	901	32	1	14	2	4	1	\N	2	2026-07-19 00:00:00	2026-07-19 00:00:00	t
33	DZ-033	تأهيل المدينة الصناعية	Industrial City Rehabilitation	5	509	33	1	13	3	1	1	\N	1	2026-07-19 00:00:00	2026-07-19 00:00:00	t
34	DZ-034	استثمار مبنى فارمكس	Farmex Building Investment	1	104	34	1	11	1	2	8	\N	2	2026-07-19 00:00:00	2026-07-19 00:00:00	t
35	DZ-035	فندق 3 نجوم لنقابة المهندسين	Three Star Engineers Syndicate Hotel	2	201	35	1	2	3	2	9	\N	2	2026-07-19 00:00:00	2026-07-19 00:00:00	t
36	DZ-036	مشفى جامعي	University Hospital	10	1001	36	1	\N	\N	\N	\N	\N	1	\N	\N	t
\.


--
-- Data for Name: investor_types; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.investor_types (investor_type_id, name_ar, name_en, description_ar, description_en, is_active) FROM stdin;
1	محلي	Local	مستثمر أو شركة محلية سورية	Syrian local investor or company	t
2	أجنبي	Foreign	مستثمر أو شركة أجنبية	Foreign investor or company	t
3	مشترك	Joint	شراكة بين مستثمر محلي وأجنبي	Partnership between local and foreign investors	t
4	حكومي / مؤسسات عامة	Government / Public Entity	جهة حكومية أو مؤسسة عامة	Government entity or public institution	t
5	مؤسسة أو شركة صناعية	Industrial Company	شركات صناعية متخصصة	Specialized industrial companies	t
6	صندوق استثماري	Investment Fund	صناديق استثمارية وتمويلية	Investment and financing funds	t
\.


--
-- Data for Name: locations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.locations (location_id, opportunity_id, description_ar, description_en, administrative_unit_id, ownership_id, property_numbers, area_value, area_unit_id, expandable, expansion_area_value, latitude, longitude, map_url, notes_ar, notes_en) FROM stdin;
1	1	المدينة القديمة - مركز مدينة دير الزور	Old City Center - Deir ez Zor	1	1	متعدد	50000.00	1	t	20000.00	35.3350000	40.1400000	https://maps.google.com	منطقة ذات أهمية تاريخية وإعادة إعمار	Historic area requiring redevelopment
2	2	المدينة الجديدة - دير الزور	New City Area - Deir ez Zor	2	1	متعدد	100000.00	1	t	50000.00	35.3300000	40.1500000	https://maps.google.com	قابلة للتوسع العمراني	Suitable for urban expansion
3	3	موقع فندق فرات الشام	Furat Al Sham Hotel Site	1	2	1	8000.00	1	f	0.00	35.3400000	40.1450000	https://maps.google.com	عقار قائم يحتاج تأهيل	Existing property requiring rehabilitation
4	4	أراضي زراعية للاستثمار	Agricultural Investment Lands	3	3	متعدد	1000000.00	2	t	500000.00	35.2000000	40.3000000	https://maps.google.com	أراضٍ مناسبة للمحاصيل الاستراتيجية	Suitable lands for strategic crops
5	5	منطقة جبل البشري	Al Bishri Mountain Area	4	1	متعدد	5000000.00	2	t	1000000.00	34.8000000	40.5000000	https://maps.google.com	موقع غني بالموارد الطبيعية	Natural resources rich area
6	6	مناطق تربية الأغنام	Livestock Areas	3	3	متعدد	200000.00	2	t	50000.00	35.1000000	40.2500000	https://maps.google.com	مناسبة للثروة الحيوانية	Suitable for livestock
7	7	منجم ملح التبني	Al Tabni Salt Mine	5	1	متعدد	300000.00	2	t	100000.00	35.6000000	40.6000000	https://maps.google.com	موقع منجمي	Mining location
8	8	منطقة صناعية	Industrial Area	6	1	متعدد	50000.00	1	t	20000.00	35.3200000	40.1300000	https://maps.google.com	قريبة من الخدمات	Near infrastructure
9	9	منطقة صناعية	Industrial Area	6	1	متعدد	30000.00	1	t	10000.00	35.3200000	40.1300000	https://maps.google.com	مناسبة للصناعات الزراعية	Suitable for agro industries
10	10	موقع زراعي	Agricultural Site	3	3	متعدد	50000.00	2	t	20000.00	35.1500000	40.2700000	https://maps.google.com	موقع لتربية الدواجن	Poultry farming site
11	11	موقع معمل الإسمنت	Cement Factory Site	6	1	متعدد	1000000.00	2	t	500000.00	35.0000000	40.7000000	https://maps.google.com	موقع صناعي استراتيجي	Strategic industrial location
12	12	موقع مجمع السماد	Organic Fertilizer Site	6	1	متعدد	100000.00	1	t	30000.00	35.3000000	40.2000000	https://maps.google.com	قريب من مصادر المخلفات الزراعية	Near agricultural waste sources
13	13	موقع مطحنة الحبوب	Grain Mill Site	6	1	500	15000.00	1	f	0.00	35.3300000	40.1400000	https://maps.google.com	موقع صناعي	Industrial site
14	14	موقع المختبر الزراعي	Agricultural Laboratory Site	3	3	200	5000.00	1	t	2000.00	35.2000000	40.3000000	https://maps.google.com	قابل للتوسع	Expandable
15	15	موقع مصنع الكونسروة	Canning Factory Site	6	1	700	20000.00	1	t	5000.00	35.3200000	40.1300000	https://maps.google.com	ضمن منطقة صناعية	Inside industrial zone
16	16	موقع سد حلبية وزلبية	Halabiya and Zalabiya Dam Site	7	1	متعدد	200000.00	1	t	100000.00	35.9000000	40.2000000	https://maps.google.com	موقع سياحي ومائي مميز	Strategic tourism and water site
17	17	موقع معمل الغزل والنسيج	Textile Factory Site	6	1	1001	80000.00	1	f	0.00	35.3200000	40.1300000	https://maps.google.com	منشأة صناعية قائمة	Existing industrial facility
18	18	موقع معمل الورق	Paper Factory Site	6	1	1002	120000.00	1	f	0.00	35.3200000	40.1300000	https://maps.google.com	معمل متوقف يحتاج تأهيل	Idle factory requiring rehabilitation
19	19	موقع معمل السكر	Sugar Factory Site	6	1	1003	300000.00	1	t	50000.00	35.3000000	40.1800000	https://maps.google.com	منشأة استراتيجية قائمة	Strategic existing facility
20	20	منجم ملح الهرموشية	Al Harmoushiya Salt Mine	5	1	متعدد	400000.00	2	t	150000.00	35.7000000	40.5000000	https://maps.google.com	موقع لاستخراج الملح	Salt extraction site
21	21	موقع إنتاج البذار والفطر	Seeds and Mushroom Production Site	3	3	متعدد	20000.00	1	t	10000.00	35.2000000	40.3000000	https://maps.google.com	موقع زراعي تقني	Agricultural technology site
22	22	موقع الأعداء الحيوية	Biological Control Facility Site	3	3	متعدد	10000.00	1	t	5000.00	35.2000000	40.3000000	https://maps.google.com	مشروع زراعي متخصص	Specialized agricultural project site
23	23	موقع مصنع دبس التمر	Date Molasses Factory Site	6	1	متعدد	15000.00	1	t	5000.00	35.3200000	40.1300000	https://maps.google.com	قريب من مصادر التمور	Near date production areas
24	24	مراكز المكننة الزراعية	Agricultural Mechanization Centers	3	3	متعدد	10000.00	1	t	3000.00	35.2000000	40.3000000	https://maps.google.com	مراكز خدمية زراعية	Agricultural service centers
25	25	المنطقة الصناعية للورش	Industrial Workshops Zone	6	1	متعدد	500000.00	1	t	200000.00	35.3100000	40.1200000	https://maps.google.com	منطقة صناعية مقترحة	Proposed industrial zone
26	26	موقع مصنع الطحينية	Tahini Factory Site	6	1	متعدد	10000.00	1	t	3000.00	35.3200000	40.1300000	https://maps.google.com	مناسب للصناعات الغذائية	Suitable for food industries
27	27	موقع مصنع المعكرونة والبرغل	Pasta and Bulgur Factory Site	6	1	متعدد	15000.00	1	t	5000.00	35.3200000	40.1300000	https://maps.google.com	ضمن القطاع الصناعي	Industrial sector location
28	28	موقع مجفف الذرة	Corn Dryer Site	6	1	متعدد	12000.00	1	t	4000.00	35.3200000	40.1300000	https://maps.google.com	قريب من الإنتاج الزراعي	Near agricultural production
29	29	منطقة منشأة الأبقار	Cattle Farm Area	3	3	متعدد	300000.00	2	t	100000.00	35.1500000	40.2700000	https://maps.google.com	مناسبة للإنتاج الحيواني	Suitable for livestock production
30	30	موقع مصنع دباغة الجلود	Leather Tanning Factory Site	6	1	متعدد	20000.00	1	t	5000.00	35.3200000	40.1300000	https://maps.google.com	منطقة صناعية	Industrial location
31	31	كورنيش طريق الشام	Damascus Road Waterfront	1	1	متعدد	100000.00	1	t	30000.00	35.3350000	40.1400000	https://maps.google.com	واجهة حضرية وسياحية	Urban tourism waterfront
32	32	مسارات النقل الداخلي	Public Transport Routes	8	1	غير محدد	0.00	1	f	0.00	35.3300000	40.1400000	https://maps.google.com	مشروع خدمي لا يعتمد على أرض محددة	Service project without fixed land
33	33	المدينة الصناعية	Industrial City	6	1	متعدد	1000000.00	2	t	500000.00	35.3000000	40.1500000	https://maps.google.com	تأهيل وتطوير منطقة صناعية	Industrial zone rehabilitation
34	34	مبنى فارمكس	Farmex Building	1	2	1	7000.00	1	f	0.00	35.3350000	40.1400000	https://maps.google.com	منشأة قائمة قابلة للاستثمار	Existing facility for investment
35	35	موقع فندق نقابة المهندسين	Engineers Syndicate Hotel Site	2	2	1	6000.00	1	f	0.00	35.3350000	40.1400000	https://maps.google.com	موقع فندقي	Hotel investment site
\.


--
-- Data for Name: opportunity_approvals; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.opportunity_approvals (opportunity_approval_id, opportunity_id, approval_type_id, approval_name_ar, approval_name_en, approval_status_ar, approval_status_en, issuing_entity_id, notes_ar, notes_en) FROM stdin;
1	1	3	موافقة تطوير عمراني	Urban Development Approval	بحاجة لاستكمال	Pending completion	1	يتطلب موافقات التخطيط والتنظيم	Requires planning and zoning approvals
2	2	3	موافقة تطوير عقاري	Real Estate Development Approval	بحاجة لاستكمال	Pending completion	1	مرتبطة بالمخططات التنظيمية	Related to urban plans
3	3	2	ترخيص منشأة سياحية	Tourism Facility License	متوفرة جزئياً	Partially Available	2	يحتاج تحديث التراخيص	License update required
4	4	3	موافقات زراعية	Agricultural Approvals	بحاجة لاستكمال	Pending completion	3	حسب نوع الاستثمار الزراعي	Based on agricultural activity
5	5	3	موافقات تعدين	Mining Approvals	بحاجة لدراسة	Requires Study	4	تحتاج موافقات جيولوجية وبيئية	Requires geological and environmental approvals
6	6	3	موافقات ثروة حيوانية	Livestock Approvals	بحاجة لاستكمال	Pending completion	3	متعلقة بالصحة الحيوانية	Related to animal health
7	7	3	ترخيص استثمار منجمي	Mining License	بحاجة لاستكمال	Pending completion	4	يتطلب موافقات التعدين	Requires mining approvals
8	8	3	موافقات صناعية	Industrial Approvals	بحاجة لاستكمال	Pending completion	5	ترخيص منشأة صناعية	Industrial facility licensing
9	9	3	موافقات صناعية	Industrial Approvals	بحاجة لاستكمال	Pending completion	5	صناعة تجهيزات زراعية	Agricultural equipment industry
10	10	3	موافقات دواجن	Poultry Approvals	بحاجة لاستكمال	Pending completion	3	موافقات بيطرية	Veterinary approvals
11	11	3	موافقات صناعية وبيئية	Industrial and Environmental Approvals	بحاجة لدراسة	Requires Study	5	مشروع استراتيجي يحتاج موافقات متعددة	Strategic project requiring multiple approvals
12	12	2	موافقات بيئية	Environmental Approvals	متوفرة جزئياً	Partially Available	6	مشروع تدوير نفايات	Waste recycling project
13	13	3	ترخيص صناعي غذائي	Food Industrial License	بحاجة لاستكمال	Pending completion	5	ترخيص مطحنة	Mill license
14	14	3	موافقات مخبرية وزراعية	Laboratory and Agricultural Approvals	بحاجة لاستكمال	Pending completion	3	إنتاج نباتي مخبري	Plant laboratory production
15	15	3	ترخيص صناعات غذائية	Food Industry License	بحاجة لاستكمال	Pending completion	5	تصنيع غذائي	Food processing
16	16	3	موافقات سياحية	Tourism Approvals	بحاجة لاستكمال	Pending completion	7	موقع سياحي وأثري	Tourism and archaeological site
17	17	2	ترخيص إعادة تشغيل صناعي	Industrial Restart License	متوفرة جزئياً	Partially Available	5	منشأة قائمة	Existing facility
18	18	2	موافقات إعادة تأهيل	Rehabilitation Approvals	متوفرة جزئياً	Partially Available	5	إعادة تشغيل مصنع	Factory restart
19	19	2	موافقات صناعية	Industrial Approvals	متوفرة جزئياً	Partially Available	5	تطوير معمل قائم	Existing factory development
20	20	3	موافقات تعدين	Mining Approvals	بحاجة لاستكمال	Pending completion	4	مشروع منجمي	Mining project
21	21	3	موافقات زراعية	Agricultural Approvals	بحاجة لاستكمال	Pending completion	3	إنتاج بذار وفطر	Seeds and mushroom production
22	22	3	موافقات إنتاج حيوي	Biological Production Approvals	بحاجة لاستكمال	Pending completion	3	مكافحة حيوية	Biological control
23	23	3	ترخيص غذائي	Food License	بحاجة لاستكمال	Pending completion	5	مصنع دبس تمر	Date molasses factory
24	24	3	موافقات خدمات زراعية	Agricultural Services Approvals	بحاجة لاستكمال	Pending completion	3	مراكز مكننة	Mechanization centers
25	25	3	موافقات تطوير منطقة صناعية	Industrial Zone Development Approval	بحاجة لاستكمال	Pending completion	1	تطوير منطقة صناعية	Industrial zone development
26	26	3	ترخيص غذائي	Food License	بحاجة لاستكمال	Pending completion	5	مصنع طحينية	Tahini factory
27	27	3	ترخيص غذائي	Food License	بحاجة لاستكمال	Pending completion	5	مصنع حبوب	Grain processing factory
28	28	3	ترخيص صناعي	Industrial License	بحاجة لاستكمال	Pending completion	5	مجفف صناعي	Industrial dryer
29	29	3	موافقات ثروة حيوانية	Livestock Approvals	بحاجة لاستكمال	Pending completion	3	منشأة أبقار	Cattle facility
30	30	3	ترخيص صناعي	Industrial License	بحاجة لاستكمال	Pending completion	5	مصنع دباغة	Leather tanning factory
31	31	3	موافقات سياحية وعمرانية	Tourism and Urban Approvals	بحاجة لاستكمال	Pending completion	1	تطوير كورنيش	Waterfront development
32	32	3	موافقات نقل	Transport Approvals	بحاجة لاستكمال	Pending completion	1	نقل عام كهربائي	Electric public transport
33	33	3	موافقات تطوير صناعي	Industrial Development Approval	بحاجة لاستكمال	Pending completion	1	تأهيل المدينة الصناعية	Industrial city rehabilitation
34	34	2	موافقات تشغيل مبنى قائم	Existing Building Operation Approval	متوفرة جزئياً	Partially Available	8	استثمار أصل قائم	Existing asset investment
35	35	3	ترخيص منشأة فندقية	Hotel License	بحاجة لاستكمال	Pending completion	7	فندق ثلاث نجوم	Three-star hotel
\.


--
-- Data for Name: opportunity_attachments; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.opportunity_attachments (opportunity_attachment_id, opportunity_id, attachment_type_id, file_name, file_url, document_status, uploaded_date, notes_ar, notes_en) FROM stdin;
1	1	8	بطاقة فرصة المدينة القديمة	/files/DZ-001/card.pdf	Available	2026-01-01	متوفرة	Available
2	2	6	صور الموقع	/files/DZ-001/photos.zip	Available	2026-01-01	صور أولية	Initial photos
3	3	2	وثائق الفندق	/files/DZ-003/property.pdf	Available	2026-01-02	وثائق ملكية	Ownership documents
4	4	3	مخطط جبل البشري KMZ	/files/DZ-005/site.kmz	Available	2026-01-03	موقع جغرافي	GIS location
5	5	4	دراسة جدوى الإسمنت	/files/DZ-011/feasibility.pdf	Pending	2026-01-03	بحاجة تحديث	Needs update
6	6	6	صور السد	/files/DZ-016/photos.zip	Available	2026-01-04	صور الموقع	Site photos
7	7	2	وثائق المعمل	/files/DZ-017/property.pdf	Available	2026-01-05	وثائق قانونية	Legal documents
8	8	5	مخطط المنطقة الصناعية	/files/DZ-025/plan.pdf	Available	2026-01-06	مخطط تنظيمي	Organization plan
9	9	8	بطاقة الفندق	/files/DZ-035/card.pdf	Available	2026-01-07	بطاقة فرصة	Opportunity card
\.


--
-- Data for Name: opportunity_contracts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.opportunity_contracts (opportunity_contract_id, opportunity_id, contract_type_id, notes_ar, notes_en) FROM stdin;
1	1	2	شراكة تطوير حضري	Urban development partnership
2	2	2	تطوير عقاري بنظام PPP	Real estate PPP
3	3	3	تأهيل وتشغيل ونقل	Rehabilitation operation transfer
4	4	1	استثمار زراعي مباشر	Direct agricultural investment
5	5	2	شراكة استثمار موارد	Resource investment partnership
6	6	1	استثمار مباشر	Direct investment
7	7	1	استثمار منجمي مباشر	Direct mining investment
8	8	1	إنشاء وتشغيل مصنع	Factory investment
9	9	1	استثمار صناعي مباشر	Direct industrial investment
10	10	1	استثمار مباشر	Direct investment
11	11	2	مشروع إسمنت استراتيجي PPP	Strategic cement PPP
12	12	2	شراكة بيئية	Environmental partnership
13	13	1	استثمار صناعي	Industrial investment
14	14	1	استثمار تقني زراعي	Agricultural technology investment
15	15	1	استثمار غذائي مباشر	Direct food investment
16	16	2	تطوير سياحي PPP	Tourism PPP
17	17	3	إعادة تأهيل وتشغيل	Rehabilitation and operation
18	18	2	إعادة تشغيل بشراكة	Partnership operation
19	19	2	تطوير معمل السكر PPP	Sugar factory PPP
20	20	1	استثمار منجمي	Mining investment
21	21	1	استثمار زراعي	Agricultural investment
22	22	1	استثمار مباشر	Direct investment
23	23	1	استثمار صناعي غذائي	Food industrial investment
24	24	1	تشغيل خدمات زراعية	Agricultural service operation
25	25	2	تطوير منطقة صناعية PPP	Industrial zone PPP
26	26	1	استثمار غذائي	Food investment
27	27	1	استثمار صناعي غذائي	Food manufacturing investment
28	28	1	استثمار صناعي	Industrial investment
29	29	1	استثمار ثروة حيوانية	Livestock investment
30	30	1	استثمار صناعي جلدي	Leather industrial investment
31	31	2	تطوير حضري PPP	Urban development PPP
32	32	5	تشغيل وإدارة النقل	Transport operation and management
33	33	2	تطوير مدينة صناعية PPP	Industrial city PPP
34	34	3	تأهيل وتشغيل مبنى قائم	Existing building operation
35	35	3	إنشاء وتشغيل فندق	Hotel development operation
\.


--
-- Data for Name: opportunity_entities; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.opportunity_entities (opportunity_entity_id, opportunity_id, entity_id, relation_type_id, notes_ar, notes_en, created_at, is_active) FROM stdin;
1	1	1	1	الجهة المقدمة لفرصة تطوير المدينة القديمة	Provider of old city development opportunity	2026-07-19 00:00:00	t
2	2	1	1	الجهة المقدمة لفرصة المدينة الجديدة	Provider of new city development opportunity	2026-07-19 00:00:00	t
3	3	2	2	الجهة المالكة للعقار الخاص بالفندق	Owner of hotel property asset	2026-07-19 00:00:00	t
4	4	3	1	الجهة المقدمة للفرصة الزراعية	Provider of agricultural opportunity	2026-07-19 00:00:00	t
5	5	4	1	جهة حكومية مختصة باستثمار جبل البشري	Government authority responsible for Al Bishri investment	2026-07-19 00:00:00	t
6	6	3	1	الجهة المقدمة لمشروع الثروة الحيوانية	Provider of livestock project opportunity	2026-07-19 00:00:00	t
7	7	5	1	وزارة الصناعة الجهة المقدمة للمشروع	Ministry of Industry project provider	2026-07-19 00:00:00	t
8	8	6	1	جهة خاصة مقدمة للفرصة الصناعية	Private sector opportunity provider	2026-07-19 00:00:00	t
9	9	6	1	جهة خاصة مقدمة لمشروع مستلزمات الري	Private sector provider of irrigation equipment project	2026-07-19 00:00:00	t
10	10	3	1	الجهة الزراعية المقدمة للمشروع	Agricultural authority provider	2026-07-19 00:00:00	t
11	11	5	1	وزارة الصناعة الجهة المشرفة على مشروع الإسمنت	Ministry of Industry supervisor	2026-07-19 00:00:00	t
12	12	1	1	المحافظة مقدمة فرصة إدارة النفايات	Governorate provider of waste management opportunity	2026-07-19 00:00:00	t
13	13	6	1	جهة خاصة مقدمة للمشروع	Private sector provider	2026-07-19 00:00:00	t
14	14	3	1	مديرية الزراعة مقدمة الفرصة	Agriculture Directorate provider	2026-07-19 00:00:00	t
15	15	6	1	القطاع الخاص مقدم الفرصة	Private sector provider	2026-07-19 00:00:00	t
16	16	7	1	جهة حكومية مقدمة لمشروع السد	Government authority provider	2026-07-19 00:00:00	t
17	17	5	1	وزارة الصناعة الجهة المشرفة	Ministry of Industry supervisor	2026-07-19 00:00:00	t
18	18	5	1	وزارة الصناعة الجهة المشرفة	Ministry of Industry supervisor	2026-07-19 00:00:00	t
19	19	5	1	وزارة الصناعة الجهة المشرفة	Ministry of Industry supervisor	2026-07-19 00:00:00	t
20	20	4	1	جهة حكومية مختصة	Government authority provider	2026-07-19 00:00:00	t
21	21	3	1	مديرية الزراعة مقدمة الفرصة	Agriculture Directorate provider	2026-07-19 00:00:00	t
22	22	3	1	مديرية الزراعة مقدمة الفرصة	Agriculture Directorate provider	2026-07-19 00:00:00	t
23	23	6	1	القطاع الخاص مقدم الفرصة	Private sector provider	2026-07-19 00:00:00	t
24	24	3	1	مديرية الزراعة مقدمة الفرصة	Agriculture Directorate provider	2026-07-19 00:00:00	t
25	25	1	1	محافظة دير الزور مقدمة الفرصة	Governorate provider	2026-07-19 00:00:00	t
26	26	6	1	القطاع الخاص مقدم الفرصة	Private sector provider	2026-07-19 00:00:00	t
27	27	6	1	القطاع الخاص مقدم الفرصة	Private sector provider	2026-07-19 00:00:00	t
28	28	6	1	القطاع الخاص مقدم الفرصة	Private sector provider	2026-07-19 00:00:00	t
29	29	3	1	مديرية الزراعة مقدمة الفرصة	Agriculture Directorate provider	2026-07-19 00:00:00	t
30	30	6	1	القطاع الخاص مقدم الفرصة	Private sector provider	2026-07-19 00:00:00	t
31	31	1	1	محافظة دير الزور مقدمة الفرصة	Governorate provider	2026-07-19 00:00:00	t
32	32	1	1	محافظة دير الزور مقدمة الفرصة	Governorate provider	2026-07-19 00:00:00	t
33	33	1	1	محافظة دير الزور مقدمة الفرصة	Governorate provider	2026-07-19 00:00:00	t
34	34	8	2	الجهة المالكة لمبنى فارمكس	Farmex property owner	2026-07-19 00:00:00	t
35	35	9	2	نقابة المهندسين مالكة المشروع	Engineers Syndicate project owner	2026-07-19 00:00:00	t
\.


--
-- Data for Name: opportunity_infrastructure; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.opportunity_infrastructure (opportunity_infrastructure_id, opportunity_id, infrastructure_type_id, availability_status, description_ar, description_en, is_active) FROM stdin;
1	1	1	Available	طرق رئيسية ضمن المدينة	Main urban roads	t
2	2	1	Available	شبكة طرق قريبة من الموقع	Road network near site	t
3	3	3	Available	مصادر مياه متوفرة	Water sources available	t
4	4	7	Available	توفر شبكة ري زراعية	Agricultural irrigation network available	t
5	5	1	Partial	طرق تحتاج تحسين للوصول للموقع	Access roads require improvement	t
6	6	7	Available	توفر مياه ري ومصادر زراعية	Irrigation water and agricultural resources available	t
7	7	1	Partial	طرق تحتاج تطوير لخدمة الموقع المنجمي	Roads require development for mining site access	t
8	8	6	Available	توفر مصادر طاقة صناعية	Industrial energy sources available	t
9	9	2	Available	تغذية كهربائية صناعية	Industrial electricity supply	t
10	10	6	Available	مصادر وقود وتشغيل متاحة	Fuel sources available	t
11	11	1	Available	طرق نقل صناعية مناسبة	Suitable industrial transport roads	t
12	12	3	Available	مياه تشغيلية للمشروع	Operational water supply	t
13	13	1	Partial	طرق تحتاج تطوير قرب مناطق الإنتاج	Roads near production areas require improvement	t
14	14	2	Available	كهرباء مناسبة للمختبرات والمنشآت	Electricity suitable for laboratories and facilities	t
15	15	1	Available	سهولة الوصول للموقع والأسواق	Easy access to site and markets	t
16	16	1	Partial	طرق سياحية تحتاج تطوير	Tourism roads require development	t
17	17	11	Available	بنية تحتية صناعية قائمة	Existing industrial infrastructure	t
18	18	11	Available	خدمات صناعية قائمة للموقع	Existing industrial services	t
19	19	11	Available	بنية صناعية داعمة	Supporting industrial infrastructure	t
20	20	1	Partial	طرق وصول إلى موقع التعدين	Access roads to mining site	t
21	21	7	Available	شبكة ري ومياه زراعية	Irrigation network and agricultural water	t
22	22	3	Available	خدمات مياه قائمة	Existing water services	t
23	23	1	Available	طرق قريبة من مناطق إنتاج التمور	Road access near date production areas	t
24	24	1	Available	طرق تخدم المراكز الزراعية	Roads serving agricultural centers	t
25	25	11	Available	بنية تحتية صناعية في منطقة قابلة للتوسع	Industrial infrastructure in expandable area	t
26	26	1	Available	قرب الموقع من شبكة الطرق والأسواق	Site connected to roads and markets	t
27	27	1	Available	سهولة نقل الحبوب والمواد الأولية	Easy transport of grains and raw materials	t
28	28	1	Available	طرق تخدم النشاط الصناعي الزراعي	Roads supporting agro-industrial activity	t
29	29	7	Partial	توفر مصادر مياه للثروة الحيوانية	Water sources available for livestock	t
30	30	1	Available	طرق مناسبة لنقل المنتجات الجلدية	Suitable roads for leather products transport	t
31	31	1	Available	موقع مرتبط بشبكة الطرق الحضرية	Connected to urban road network	t
32	32	1	Available	سهولة الوصول داخل المدينة	Easy access inside city	t
33	33	11	Available	بنية صناعية قابلة للتطوير	Developable industrial infrastructure	t
34	34	11	Available	خدمات أساسية لمنشأة قائمة	Basic services for existing facility	t
35	35	1	Available	وصول جيد لموقع سياحي وخدمي	Good access to tourism and service site	t
\.


--
-- Data for Name: opportunity_investors; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.opportunity_investors (opportunity_investor_id, opportunity_id, investor_type_id, entity_id, notes_ar, notes_en) FROM stdin;
1	1	1	1	مستثمر محلي محتمل	Potential local investor
2	2	2	2	مستثمر أجنبي محتمل	Potential foreign investor
3	3	3	3	شراكة مستثمر محلي وأجنبي	Local and foreign partnership
4	4	1	4	مستثمر محلي	Local investor
5	5	2	5	مستثمر أجنبي	Foreign investor
6	6	1	6	مشغل فندقي محلي	Local hotel operator
7	7	3	7	شراكة تشغيلية	Operational partnership
8	8	1	8	مستثمر زراعي محلي	Local agricultural investor
9	9	3	9	شراكة زراعية	Agricultural partnership
10	10	2	\N	مستثمر تعدين أجنبي	Foreign mining investor
11	11	3	\N	استثمار مشترك	Joint investment
12	12	1	\N	مستثمر صناعي محلي	Local industrial investor
13	13	2	\N	مستثمر تعدين أجنبي	Foreign mining investor
14	14	2	\N	مستثمر صناعي أجنبي	Foreign industrial investor
15	15	3	\N	شراكة استراتيجية	Strategic partnership
16	16	1	\N	مستثمر بيئي محلي	Local environmental investor
17	17	2	\N	مستثمر دولي	International investor
18	18	2	\N	مستثمر سياحي أجنبي	Foreign tourism investor
19	19	3	\N	شراكة سياحية	Tourism partnership
20	20	3	\N	إعادة تأهيل بشراكة	Rehabilitation partnership
21	21	3	\N	تطوير منطقة صناعية بشراكة	Industrial zone partnership
22	22	3	\N	تطوير حضري مشترك	Joint urban development
23	23	1	\N	شركة نقل محلية	Local transport company
24	24	3	\N	تطوير صناعي مشترك	Joint industrial development
25	25	1	\N	مستثمر سياحي محلي	Local tourism investor
\.


--
-- Data for Name: opportunity_site_features; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.opportunity_site_features (opportunity_site_feature_id, opportunity_id, site_feature_id, feature_value_ar, feature_value_en, notes_ar, notes_en, is_active) FROM stdin;
1	1	7	موقع مركزي ضمن مدينة دير الزور وإمكانية تطوير حضري	Central urban location with development potential	منطقة بحاجة لإعادة تأهيل	Area requiring rehabilitation	t
2	2	6	إمكانية توسع عمراني واستيعاب مشاريع جديدة	Urban expansion and new development potential	أرض قابلة للتطوير	Developable land	t
3	3	16	إطلالة على نهر الفرات وموقع حضري مميز	Euphrates river frontage and strategic urban location	مبنى قائم يحتاج استثمار	Existing building requiring investment	t
4	4	1	توفر أراضي زراعية ومياه ري ومصادر إنتاج محلية	Availability of agricultural lands and irrigation resources	مناسب للمحاصيل الاستراتيجية	Suitable for strategic crops	t
5	5	15	وجود ثروات معدنية ومقومات طبيعية وسياحية	Mineral resources and natural tourism potential	يحتاج دراسات جيولوجية	Requires geological studies	t
6	6	1	توفر مراعي وأعلاف ومصادر تربية محلية	Availability of grazing areas and local feed resources	مناسب للثروة الحيوانية	Suitable for livestock production	t
7	7	15	توفر مورد ملحي طبيعي وموقع منجمي	Natural salt resources and mining location	مشروع منجمي متخصص	Specialized mining project	t
8	8	2	قرب مصادر الإنتاج الزراعي والمواد الأولية	Near agricultural production sources and raw materials	موقع مناسب للتصنيع الزراعي	Suitable for agro processing	t
9	9	12	قرب المنطقة الصناعية ووجود بيئة إنتاجية داعمة	Near industrial zone and supporting production environment	صناعة داعمة للقطاع الزراعي	Agriculture supporting industry	t
10	10	7	مساحات مناسبة لتربية الدواجن وإمكانية التوسع	Suitable poultry farming areas with expansion potential	مشروع إنتاج حيواني	Livestock production project	t
11	11	11	وجود بنية تحتية داعمة وموقع صناعي استراتيجي	Supporting infrastructure and strategic industrial location	مشروع صناعي كبير	Large industrial project	t
12	12	2	قرب مصادر المخلفات الزراعية والمواد الأولية	Near agricultural waste and raw material sources	مشروع إنتاج بيئي	Environmental production project	t
13	13	2	قرب مناطق إنتاج الحبوب المحلية	Near local grain production areas	مناسب للصناعات الغذائية	Suitable for food industries	t
14	14	10	بيئة مناسبة للمختبرات والأنشطة التقنية	Suitable environment for laboratories and technology activities	مشروع متخصص	Specialized project	t
15	15	3	قرب المنتجات الزراعية والأسواق المحلية	Near agricultural products and local markets	صناعة غذائية تحويلية	Food processing industry	t
16	16	14	موقع سياحي وأثري مميز	Tourism and archaeological location	يحتاج تطوير سياحي	Requires tourism development	t
17	17	16	منشأة صناعية قائمة قابلة لإعادة الاستثمار	Existing industrial facility ready for investment	بحاجة لإعادة تأهيل	Requires rehabilitation	t
18	18	11	وجود بنية صناعية قائمة وموقع جاهز	Existing industrial infrastructure and ready site	معمل متوقف	Idle factory	t
19	19	16	منشأة صناعية قائمة مع إمكانية التطوير	Existing industrial facility with development potential	مشروع استراتيجي	Strategic project	t
20	20	15	توفر موارد معدنية طبيعية وموقع تعدين	Natural mineral resources and mining location	مشروع استخراجي	Extraction project	t
21	21	1	توفر أراضي زراعية ومواد زراعية أساسية	Availability of agricultural lands and inputs	مشروع زراعي متخصص	Specialized agricultural project	t
22	22	10	موقع مناسب للأنشطة البحثية والزراعية التقنية	Suitable site for research and agricultural technology	مشروع بحثي إنتاجي	Research production project	t
23	23	2	قرب مصادر إنتاج التمور	Near date production sources	صناعة غذائية	Food industry	t
24	24	17	قرب الخدمات الزراعية ومراكز الدعم	Near agricultural services and support centers	مركز خدمي زراعي	Agricultural service center	t
25	25	6	منطقة صناعية واسعة قابلة للتوسع	Large expandable industrial area	فرصة تطوير صناعي	Industrial development opportunity	t
26	26	3	قرب الأسواق ومصادر المواد الغذائية	Near markets and food material sources	صناعة غذائية	Food industry	t
27	27	2	قرب مناطق إنتاج الحبوب	Near grain production areas	تصنيع غذائي	Food processing	t
28	28	2	قرب مزارع الذرة الصفراء ومصادر الإنتاج	Near yellow corn farms and production sources	تصنيع زراعي	Agro processing	t
29	29	7	مساحات واسعة للرعي والتربية الحيوانية	Large areas for grazing and livestock	إنتاج حيواني متكامل	Integrated livestock production	t
30	30	1	توفر الجلود الخام كمادة أولية	Availability of raw leather materials	صناعة تحويلية	Manufacturing industry	t
31	31	14	واجهة حضرية وموقع سياحي وتجاري	Urban, tourism and commercial frontage	قيمة عمرانية عالية	High urban value	t
32	32	5	موقع استراتيجي داخل المدينة	Strategic location inside city	مشروع خدمي	Service project	t
33	33	11	بنية صناعية قائمة قابلة للتطوير	Existing industrial infrastructure with development potential	تطوير صناعي	Industrial development	t
34	34	16	مبنى قائم وجاهز للاستثمار	Existing building ready for investment	قابل لإعادة الاستخدام	Suitable for reuse	t
35	35	14	موقع مناسب للنشاط السياحي والخدمي	Suitable location for tourism and service activities	فرصة سياحية	Tourism opportunity	t
\.


--
-- Data for Name: opportunity_statuses; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.opportunity_statuses (status_id, name_ar, name_en, description_ar, description_en, is_active) FROM stdin;
1	فرصة استراتيجية	Strategic Opportunity	فرصة ذات أهمية اقتصادية وتنموية عالية	High-impact investment opportunity with strategic importance	t
2	فرصة جديدة	New Opportunity	فرصة استثمارية جاهزة للدراسة أو الطرح	New investment opportunity ready for evaluation or offering	t
3	إعادة تأهيل	Rehabilitation	مشروع قائم يحتاج إلى إعادة تأهيل وتشغيل	Existing project requiring rehabilitation and operation	t
4	قيد الدراسة	Under Study	الفرصة قيد التحليل والتقييم الفني والاقتصادي	Opportunity under technical and economic evaluation	t
5	قيد الترويج	Under Promotion	الفرصة مطروحة للترويج وجذب المستثمرين	Opportunity promoted to attract investors	t
6	تم التعاقد	Contracted	تم توقيع عقد استثمار للمشروع	Investment contract has been signed	t
7	متوقف	Suspended	الفرصة متوقفة مؤقتاً لأسباب إدارية أو فنية	Opportunity temporarily suspended	t
8	مغلق	Closed	تم إغلاق الفرصة وعدم استمرارها	Opportunity closed and discontinued	t
\.


--
-- Data for Name: ownership_types; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.ownership_types (ownership_id, name_ar, name_en, description_ar, description_en, is_active) FROM stdin;
1	أملاك دولة	State Owned	عقار أو أرض عائدة للدولة	Property owned by the state	t
2	ملكية خاصة	Private Ownership	عقار أو أصل مملوك للقطاع الخاص	Privately owned property or asset	t
3	استثمار زراعي	Agricultural Land	أراضٍ مخصصة للاستثمار الزراعي	Agricultural investment land	t
4	وقف أو جهة عامة	Public Entity Ownership	أصول تابعة لجهة عامة أو مؤسسة	Assets owned by public entities	t
5	غير محدد	Undefined	لم يتم تحديد الملكية بعد	Ownership not specified yet	t
\.


--
-- Data for Name: project_details; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.project_details (project_detail_id, opportunity_id, description_ar, description_en, main_product_ar, main_product_en, main_product_specifications_ar, main_product_specifications_en, secondary_products_ar, secondary_products_en, production_capacity, capacity_unit_id, target_market_ar, target_market_en, economic_social_justification_ar, economic_social_justification_en) FROM stdin;
1	1	تطوير وإعادة تأهيل المدينة القديمة وتحويلها إلى منطقة استثمارية متعددة الاستخدامات	Redevelopment of old city into a multi-use investment area	منطقة تجارية وسكنية وسياحية	Commercial, residential and tourism area	تطوير عمراني متكامل	Integrated urban development	محلات ومرافق سياحية	Retail and tourism facilities	50000.00	1	السوق المحلي والسياح	Local market and tourists	إعادة الإعمار وتنشيط الاقتصاد المحلي	Reconstruction and local economic activation
2	2	إنشاء مجمعات سكنية وتجارية حديثة	Development of modern residential and commercial complexes	وحدات سكنية وتجارية	Residential and commercial units	مخططات عمرانية حديثة	Modern urban planning	خدمات ومرافق عامة	Public services and facilities	100000.00	1	السكان والمستثمرون	Residents and investors	تلبية الطلب السكني	Meeting housing demand
3	3	تأهيل وتشغيل فندق فرات الشام	Rehabilitation and operation of Furat Al Sham Hotel	خدمات فندقية	Hotel services	فندق سياحي	Tourism hotel	مطاعم وقاعات	Restaurants and halls	100.00	2	السياح ورجال الأعمال	Tourists and business visitors	دعم القطاع السياحي	Supporting tourism sector
4	4	زراعة وتصنيع الشوندر السكري	Sugar beet production and processing	شوندر سكري	Sugar beet	إنتاج زراعي واسع	Large scale agricultural production	سكر ومشتقات	Sugar and derivatives	50000.00	3	السوق المحلي والصناعات الغذائية	Local market and food industries	تطوير الزراعة والصناعة الغذائية	Agriculture and food industry development
5	5	استثمار موارد جبل البشري	Al Bishri resources investment	مواد معدنية وسياحية	Mineral and tourism resources	حسب الدراسات الجيولوجية	Based on geological studies	منتجات معدنية وخدمات سياحية	Mineral products and tourism services	100000.00	4	أسواق محلية ودولية	Local and international markets	استثمار الموارد الطبيعية	Natural resources investment
6	6	تربية وإنتاج أغنام العواس	Awassi sheep production	لحوم وألبان	Meat and dairy	سلالات محسنة	Improved breeds	منتجات حيوانية	Animal products	10000.00	5	السوق المحلي	Local market	دعم الثروة الحيوانية	Supporting livestock
7	7	استخراج وتصنيع الملح	Salt extraction and processing	ملح صناعي وغذائي	Industrial and food salt	حسب جودة الخام	Based on raw material quality	مشتقات الملح	Salt derivatives	50000.00	3	الصناعة المحلية والتصدير	Local industry and export	استثمار الموارد المعدنية	Mineral resources investment
8	8	إنشاء مصنع أعلاف	Animal feed factory	أعلاف حيوانية	Animal feed	خلطات أعلاف متخصصة	Specialized feed formulas	منتجات تغذية حيوانية	Animal nutrition products	30000.00	3	مربي الحيوانات	Livestock farmers	دعم الإنتاج الحيواني	Supporting livestock production
9	9	تصنيع معدات الري الحديث	Modern irrigation equipment manufacturing	أنظمة ري	Irrigation systems	معدات بلاستيكية ومعدنية	Plastic and metal equipment	قطع غيار	Spare parts	20000.00	3	المزارعون	Farmers	تطوير الزراعة الحديثة	Modern agriculture development
10	10	منشأة دواجن متكاملة	Integrated poultry farm	فروج وبيض	Poultry and eggs	إنتاج تجاري	Commercial production	سماد عضوي	Organic fertilizer	500000.00	6	السوق المحلي	Local market	تحقيق الأمن الغذائي	Food security
11	11	إنشاء وتشغيل مصنع إسمنت	Cement production facility	الإسمنت	Cement	طاقة إنتاجية صناعية	Industrial production capacity	مواد بناء	Building materials	1000000.00	3	السوق المحلي والتصدير	Local market and export	دعم قطاع البناء	Supporting construction sector
12	12	مجمع تدوير وإنتاج السماد	Waste recycling and fertilizer complex	سماد عضوي	Organic fertilizer	إنتاج من المخلفات الزراعية	Production from agricultural waste	مواد معالجة	Processed materials	50000.00	3	القطاع الزراعي	Agricultural sector	حل بيئي واقتصادي	Environmental and economic solution
13	13	مطحنة حبوب حديثة	Modern grain mill	طحين وحبوب معالجة	Flour and processed grains	خطوط إنتاج حديثة	Modern production lines	نخالة	Bran	100000.00	3	السوق المحلي	Local market	تعزيز الأمن الغذائي	Food security improvement
14	14	مختبر إكثار نباتي	Plant tissue culture laboratory	شتول نباتية	Plant seedlings	تقنيات مخبرية	Laboratory technologies	أصناف محسنة	Improved varieties	500000.00	6	المزارعون	Farmers	تطوير التقنيات الزراعية	Agricultural technology development
15	15	مصنع كونسروة	Canning factory	منتجات غذائية معلبة	Canned food products	خطوط تصنيع غذائي	Food processing lines	مخللات وعصائر	Pickles and juices	30000.00	3	السوق المحلي والتصدير	Local and export markets	تصنيع المنتجات الزراعية	Agricultural processing
16	16	تطوير موقع سد حلبية وزلبية سياحياً وترفيهياً	Development of Halabiya and Zalabiya dam area for tourism	خدمات سياحية وترفيهية	Tourism and recreation services	موقع أثري ومائي	Historic and water site	مطاعم ومنشآت سياحية	Restaurants and tourism facilities	200.00	2	السياح والسوق المحلي	Tourists and local market	تنمية السياحة واستثمار المواقع الطبيعية	Tourism development and natural resources utilization
17	17	إعادة تأهيل وتشغيل معمل الغزل والنسيج	Rehabilitation and operation of textile factory	منتجات نسيجية	Textile products	خطوط إنتاج صناعية	Industrial production lines	أقمشة ومنسوجات مختلفة	Various fabrics and textiles	20000.00	3	السوق المحلي والتصدير	Local and export markets	إعادة تشغيل منشأة صناعية وتوفير فرص عمل	Restarting industrial facility and creating jobs
18	18	إعادة إحياء معمل الورق	Paper factory rehabilitation	ورق ومنتجات ورقية	Paper products	خطوط تصنيع ورق	Paper production lines	مواد تعبئة وتغليف	Packaging materials	15000.00	3	السوق المحلي	Local market	دعم الصناعات التحويلية	Supporting manufacturing industries
19	19	إعادة تشغيل وتطوير معمل السكر	Sugar factory rehabilitation and development	سكر ومشتقات	Sugar and derivatives	خط إنتاج صناعي	Industrial production line	منتجات ثانوية زراعية	Agricultural by-products	100000.00	3	السوق المحلي والتصدير	Local and export markets	تطوير الصناعة الغذائية	Food industry development
20	20	استثمار منجم ملح الهرموشية	Al Harmoushiya salt mine investment	ملح خام ومعالج	Raw and processed salt	استخراج وتصنيع معدني	Mining and processing	منتجات ملحية متنوعة	Salt products	50000.00	3	الصناعة المحلية والتصدير	Local industry and export	استثمار الموارد الطبيعية	Natural resources investment
21	21	مجمع إنتاج البذار والفطر الزراعي	Seeds and mushroom production complex	بذار وفطر زراعي	Seeds and mushrooms	إنتاج مخبري وزراعي	Laboratory and agricultural production	منتجات زراعية محسنة	Improved agricultural products	500000.00	6	المزارعون والقطاع الزراعي	Farmers and agricultural sector	رفع إنتاجية القطاع الزراعي	Improving agricultural productivity
22	22	إنتاج الأعداء الحيوية للمكافحة الزراعية	Biological pest control production	مواد مكافحة حيوية	Biological control products	إنتاج مخبري متخصص	Specialized laboratory production	حلول زراعية صديقة للبيئة	Eco-friendly agricultural solutions	100000.00	6	المزارعون والمؤسسات الزراعية	Farmers and agricultural institutions	تقليل استخدام المبيدات الكيميائية	Reducing chemical pesticide use
23	23	إنشاء مصنع دبس التمر	Date molasses factory	دبس التمر	Date molasses	تصنيع غذائي	Food processing	منتجات تمر مصنعة	Processed date products	20000.00	3	السوق المحلي والتصدير	Local and export markets	استثمار الإنتاج الزراعي المحلي	Utilizing local agricultural production
24	24	إنشاء مراكز المكننة الزراعية الحديثة	Modern agricultural mechanization centers	خدمات وآليات زراعية	Agricultural machinery services	معدات زراعية حديثة	Modern agricultural equipment	صيانة وتأجير الآليات	Maintenance and rental services	50.00	7	المزارعون	Farmers	رفع كفاءة الإنتاج الزراعي	Improving agricultural efficiency
25	25	تطوير منطقة صناعية للورش	Industrial workshops zone development	مساحات صناعية	Industrial spaces	ورش ومرافق صناعية	Industrial workshops and facilities	خدمات لوجستية وصناعية	Industrial and logistics services	500000.00	1	المستثمرون الصناعيون	Industrial investors	تنظيم النشاط الصناعي وجذب الاستثمار	Organizing industry and attracting investment
26	26	إنشاء مصنع طحينية	Tahini factory	طحينية	Tahini	خطوط إنتاج غذائية	Food production lines	منتجات سمسمية	Sesame products	15000.00	3	السوق المحلي	Local market	دعم الصناعات الغذائية	Supporting food industries
27	27	مصنع المعكرونة والبرغل	Pasta and bulgur factory	معكرونة وبرغل	Pasta and bulgur	تصنيع حبوب	Grain processing	منتجات غذائية أخرى	Other food products	30000.00	3	السوق المحلي والتصدير	Local and export markets	استثمار المحاصيل المحلية	Utilizing local crops
28	28	مجفف صناعي للذرة الصفراء	Industrial yellow corn dryer	ذرة مجففة	Dried corn	تجفيف صناعي	Industrial drying	منتجات أعلاف	Feed products	50000.00	3	الصناعات الغذائية والعلفية	Food and feed industries	تقليل فاقد الإنتاج الزراعي	Reducing agricultural losses
29	29	منشأة أبقار متكاملة لإنتاج الحليب واللحوم	Integrated cattle farm	حليب ولحوم	Milk and meat	تربية وإنتاج متكامل	Integrated breeding and production	منتجات ألبان	Dairy products	5000.00	5	السوق المحلي	Local market	تعزيز الأمن الغذائي	Food security enhancement
30	30	مصنع دباغة جلود	Leather tanning factory	جلود معالجة	Processed leather	خطوط دباغة صناعية	Industrial tanning lines	منتجات جلدية	Leather products	20000.00	3	السوق المحلي والتصدير	Local and export markets	تطوير الصناعات الجلدية	Leather industry development
31	31	تطوير كورنيش طريق الشام	Damascus Road waterfront development	منطقة سياحية وتجارية	Tourism and commercial area	واجهة حضرية حديثة	Modern urban waterfront	مطاعم ومحلات وخدمات	Restaurants, shops and services	100000.00	1	المواطنون والسياح	Residents and tourists	تنشيط السياحة والاستثمار الحضري	Tourism and urban investment activation
32	32	شركة نقل داخلي بباصات كهربائية	Electric public transport company	خدمات نقل عام	Public transport services	أسطول باصات كهربائية	Electric bus fleet	خدمات صيانة وتشغيل	Maintenance and operation services	50.00	7	سكان المدينة	City residents	تحسين النقل وتقليل الانبعاثات	Improving transport and reducing emissions
33	33	تأهيل وتطوير المدينة الصناعية	Industrial city rehabilitation	بنية صناعية	Industrial infrastructure	مناطق إنتاج وخدمات	Production and service areas	مرافق داعمة	Supporting facilities	1000000.00	1	المستثمرون الصناعيون	Industrial investors	جذب الاستثمارات الصناعية	Attracting industrial investments
34	34	استثمار مبنى فارمكس	Farmex building investment	خدمات تجارية أو إدارية	Commercial or administrative services	منشأة قائمة	Existing facility	مكاتب وخدمات	Offices and services	7000.00	1	القطاع الخاص	Private sector	استثمار الأصول غير المستغلة	Utilizing unused assets
35	35	إنشاء وتشغيل فندق ثلاث نجوم	Three-star hotel development	خدمات فندقية	Hotel services	فندق متوسط المستوى	Mid-range hotel facility	مطاعم وقاعات اجتماعات	Restaurants and meeting halls	80.00	2	السياح ورجال الأعمال	Tourists and business visitors	تطوير القطاع السياحي	Tourism sector development
\.


--
-- Data for Name: project_scales; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.project_scales (project_scale_id, name_ar, name_en) FROM stdin;
1	صغير	Small
2	متوسط	Medium
3	كبير	Large
4	استراتيجي	Strategic
\.


--
-- Data for Name: project_types; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.project_types (project_type_id, name_ar, name_en, description_ar, description_en, is_active) FROM stdin;
1	تطوير وإنشاء جديد	New Development	مشروع جديد بالكامل أو إنشاء منشأة جديدة	New project development or new facility construction	t
2	تأهيل وتشغيل	Rehabilitation and Operation	إعادة تأهيل منشأة قائمة وتشغيلها	Rehabilitation and operation of existing facilities	t
3	إنتاج زراعي	Agricultural Production	مشاريع الإنتاج الزراعي والمحاصيل	Agricultural production projects	t
4	استثمار موارد طبيعية	Natural Resources Investment	استثمار واستخراج الموارد الطبيعية	Natural resources extraction and investment	t
5	إنتاج حيواني	Livestock Production	مشاريع تربية وإنتاج الثروة الحيوانية	Livestock breeding and production projects	t
6	استخراج وتصنيع معدني	Mining and Mineral Processing	مشاريع استخراج ومعالجة المعادن	Mining extraction and mineral processing projects	t
7	مصنع إنتاجي	Manufacturing Plant	إنشاء وتشغيل مصانع إنتاجية	Establishment and operation of manufacturing plants	t
8	مجمع إنتاجي	Production Complex	مشاريع المجمعات الإنتاجية المتكاملة	Integrated production complexes	t
9	مختبر وتقنيات إنتاج	Laboratory and Production Technology	مشاريع المختبرات والتقنيات الإنتاجية	Laboratories and production technology projects	t
10	تطوير موقع سياحي	Tourism Site Development	تطوير المواقع السياحية والترفيهية	Tourism and recreational site development	t
11	إعادة تأهيل مصنع	Factory Rehabilitation	إعادة تأهيل وتشغيل المصانع المتوقفة	Rehabilitation of idle factories	t
12	مراكز خدمات	Service Centers	إنشاء مراكز خدمية متخصصة	Specialized service centers	t
13	تطوير منطقة صناعية	Industrial Zone Development	إنشاء أو تطوير المناطق الصناعية	Industrial zone development projects	t
14	تشغيل خدمة نقل	Transport Operation	تشغيل خدمات النقل العام	Public transportation operation services	t
\.


--
-- Data for Name: sectors; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.sectors (sector_id, name_ar, name_en, description_ar, description_en, is_active) FROM stdin;
1	عقاري	Real Estate	مشاريع التطوير العقاري والمجمعات والمنشآت العقارية	Real estate development projects and properties	t
2	سياحي	Tourism	مشاريع الفنادق والضيافة والمواقع السياحية	Hotels, hospitality and tourism projects	t
3	زراعي	Agriculture	المشاريع الزراعية والثروة الحيوانية	Agricultural and livestock projects	t
4	تعدين	Mining	استثمار الموارد الطبيعية والمناجم	Mining and natural resources projects	t
5	صناعي	Industry	المصانع والصناعات التحويلية	Manufacturing and industrial projects	t
6	بيئي	Environment	مشاريع تدوير ومعالجة المخلفات	Environmental and recycling projects	t
7	بنية تحتية	Infrastructure	مشاريع البنية التحتية والمرافق العامة	Infrastructure and public facilities projects	t
8	خدمي	Services	الخدمات والمراكز التشغيلية	Service sector projects	t
9	نقل	Transportation	مشاريع النقل والخدمات اللوجستية	Transport and logistics projects	t
10	صحي	healthy	المشاريع الصحية	Health projects	t
\.


--
-- Data for Name: site_features; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.site_features (feature_id, name_ar, name_en, description_ar, description_en) FROM stdin;
1	توفر المواد الأولية	Availability of Raw Materials	توفر مصادر قريبة أو كافية للمواد الأولية اللازمة للمشروع	Availability of nearby or sufficient sources of required raw materials
2	قرب مصادر الإنتاج	Proximity to Production Sources	قرب الموقع من مناطق إنتاج المواد أو المحاصيل أو الموارد الأساسية	Location close to production areas or resource sources
3	قرب الأسواق	Proximity to Markets	سهولة الوصول إلى الأسواق المحلية والإقليمية	Easy access to local and regional markets
4	قرب طرق النقل الرئيسية	Proximity to Main Transport Routes	الموقع قريب من محاور النقل البرية أو ممرات الشحن الرئيسية	Location near major transport corridors
5	موقع استراتيجي	Strategic Location	موقع يتمتع بأهمية اقتصادية أو جغرافية خاصة	Location with strategic economic or geographic importance
6	إمكانية التوسع	Expansion Potential	توفر مساحات إضافية تسمح بتوسعة المشروع مستقبلاً	Availability of additional areas for future expansion
7	طبيعة الأرض المناسبة	Suitable Land Characteristics	ملاءمة طبيعة الأرض من حيث المساحة والتربة والطبوغرافيا	Suitability of land characteristics including area, soil and terrain
8	توفر العمالة	Availability of Workforce	توفر العمالة المحلية أو الخبرات المطلوبة للمشروع	Availability of local workforce and required skills
9	قرب مصادر الطاقة	Proximity to Energy Sources	قرب الموقع من مصادر الطاقة أو خطوط التغذية الرئيسية	Location close to energy sources or supply networks
10	قرب الخدمات العامة	Proximity to Public Services	قرب الموقع من الخدمات الداعمة مثل المدن والمراكز الخدمية	Proximity to supporting public services
11	وجود بنية تحتية داعمة	Supporting Infrastructure Availability	توفر بنية تحتية مناسبة تدعم الاستثمار (طرق، كهرباء، مياه، اتصالات وغيرها)	Availability of supporting infrastructure for investment
12	قرب المناطق الصناعية	Proximity to Industrial Areas	قرب الموقع من مناطق صناعية قائمة أو تجمعات إنتاجية	Location near existing industrial zones or production clusters
13	قرب الموانئ والمطارات	Proximity to Ports and Airports	سهولة الوصول إلى المنافذ اللوجستية والنقل الدولي	Easy access to ports and airports
14	ميزة سياحية أو طبيعية	Tourism or Natural Advantage	وجود عناصر طبيعية أو سياحية تعزز قيمة الموقع	Natural or tourism elements enhancing site value
15	توفر الموارد الطبيعية	Availability of Natural Resources	وجود موارد طبيعية مرتبطة بالمشروع مثل المعادن أو المياه أو غيرها	Availability of natural resources related to the project
16	جاهزية الموقع للاستثمار	Investment Readiness	توفر عوامل تجعل الموقع قابلاً للبدء بالمشروع بسرعة	Availability of factors enabling rapid project implementation
17	قرب التجمعات السكانية	Proximity to Population Centers	قرب الموقع من المدن أو التجمعات التي توفر سوقاً أو عمالة	Proximity to population centers providing markets or workforce
18	ميزة تنافسية أخرى	Other Competitive Advantage	أي ميزة إضافية تجعل الموقع أكثر جاذبية للاستثمار	Any additional factor increasing investment attractiveness
\.


--
-- Data for Name: sub_sectors; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.sub_sectors (sub_sector_id, sector_id, name_ar, name_en, description_ar, description_en, is_active) FROM stdin;
101	1	تطوير حضري	Urban Development	تطوير وإعادة تأهيل المناطق الحضرية	Urban area development and rehabilitation	t
102	1	مجمعات سكنية وتجارية	Residential and Commercial Complexes	إنشاء وتطوير المجمعات السكنية والتجارية	Residential and commercial complexes development	t
103	1	تطوير واجهة حضرية	Urban Waterfront Development	تطوير المناطق الحضرية والواجهات التجارية	Urban and commercial waterfront development	t
104	1	منشآت قائمة	Existing Facilities	استثمار وتأهيل المنشآت القائمة	Investment and rehabilitation of existing facilities	t
201	2	فنادق وضيافة	Hotels and Hospitality	إنشاء وتأهيل وتشغيل الفنادق	Hotel construction, rehabilitation and operation	t
202	2	سياحة ومواقع أثرية	Tourism and Heritage Sites	تطوير المواقع السياحية والأثرية	Tourism and heritage site development	t
301	3	محاصيل استراتيجية	Strategic Crops	إنتاج المحاصيل الزراعية الاستراتيجية	Strategic agricultural crops production	t
302	3	ثروة حيوانية	Livestock	مشاريع تربية وإنتاج الحيوانات	Livestock breeding and production projects	t
303	3	دواجن	Poultry	مشاريع إنتاج الفروج وبيض المائدة	Poultry and egg production projects	t
304	3	تقنيات زراعية	Agricultural Technologies	التقنيات الحديثة في الإنتاج الزراعي	Modern agricultural technologies	t
305	3	مدخلات زراعية	Agricultural Inputs	إنتاج البذار والفطر والمدخلات الزراعية	Seeds, mushrooms and agricultural inputs production	t
306	3	مكافحة حيوية	Biological Control	إنتاج الأعداء الحيوية والمكافحة الزراعية	Biological pest control production	t
401	4	موارد طبيعية	Natural Resources	استثمار الموارد الطبيعية	Natural resources investment	t
402	4	استخراج الملح	Salt Extraction	استخراج وتصنيع الملح	Salt extraction and processing	t
501	5	صناعات زراعية	Agro Industry	الصناعات المرتبطة بالقطاع الزراعي	Agricultural processing industries	t
502	5	صناعة زراعية	Agricultural Manufacturing	تصنيع المعدات والمنتجات الزراعية	Agricultural equipment and products manufacturing	t
503	5	مواد بناء	Building Materials	صناعة الإسمنت ومواد البناء	Cement and building materials industry	t
504	5	غذائي	Food Industry	تصنيع وطحن المنتجات الغذائية	Food processing and milling	t
505	5	تصنيع غذائي	Food Processing	صناعة الأغذية والمعلبات	Food manufacturing and canning	t
506	5	نسيج	Textile	صناعة وإعادة تأهيل معامل النسيج	Textile manufacturing and rehabilitation	t
507	5	ورق	Paper Industry	إنتاج وتصنيع الورق	Paper production industry	t
508	5	سكر	Sugar Industry	إنتاج وتصنيع السكر	Sugar production industry	t
509	5	مناطق صناعية	Industrial Zones	تطوير وتأهيل المناطق الصناعية	Industrial zones development	t
510	5	جلود	Leather Industry	تصنيع ودباغة الجلود	Leather processing and tanning	t
601	6	تدوير مخلفات	Waste Recycling	إدارة وتدوير المخلفات الزراعية	Agricultural waste recycling	t
701	7	مياه وسياحة	Water and Tourism Infrastructure	تطوير مشاريع المياه والمواقع السياحية	Water and tourism infrastructure projects	t
801	8	خدمات زراعية	Agricultural Services	خدمات المكننة والدعم الزراعي	Agricultural support services	t
901	9	نقل عام	Public Transportation	مشاريع النقل الجماعي	Public transport projects	t
1001	10	مشافي	\N	\N	\N	t
\.


--
-- Name: administrative_unit_types administrative_unit_types_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.administrative_unit_types
    ADD CONSTRAINT administrative_unit_types_pkey PRIMARY KEY (unit_type_id);


--
-- Name: administrative_units administrative_units_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.administrative_units
    ADD CONSTRAINT administrative_units_pkey PRIMARY KEY (administrative_unit_id);


--
-- Name: approval_types approval_types_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.approval_types
    ADD CONSTRAINT approval_types_pkey PRIMARY KEY (approval_type_id);


--
-- Name: area_units area_units_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.area_units
    ADD CONSTRAINT area_units_pkey PRIMARY KEY (area_unit_id);


--
-- Name: attachment_types attachment_types_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.attachment_types
    ADD CONSTRAINT attachment_types_pkey PRIMARY KEY (attachment_type_id);


--
-- Name: capacity_units capacity_units_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.capacity_units
    ADD CONSTRAINT capacity_units_pkey PRIMARY KEY (capacity_unit_id);


--
-- Name: contract_types contract_types_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.contract_types
    ADD CONSTRAINT contract_types_pkey PRIMARY KEY (contract_type_id);


--
-- Name: currencies currencies_code_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.currencies
    ADD CONSTRAINT currencies_code_key UNIQUE (code);


--
-- Name: currencies currencies_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.currencies
    ADD CONSTRAINT currencies_pkey PRIMARY KEY (currency_id);


--
-- Name: employment employment_opportunity_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.employment
    ADD CONSTRAINT employment_opportunity_id_key UNIQUE (opportunity_id);


--
-- Name: employment employment_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.employment
    ADD CONSTRAINT employment_pkey PRIMARY KEY (employment_id);


--
-- Name: entities entities_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.entities
    ADD CONSTRAINT entities_pkey PRIMARY KEY (entity_id);


--
-- Name: entity_relation_types entity_relation_types_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.entity_relation_types
    ADD CONSTRAINT entity_relation_types_pkey PRIMARY KEY (relation_type_id);


--
-- Name: entity_types entity_types_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.entity_types
    ADD CONSTRAINT entity_types_pkey PRIMARY KEY (entity_type_id);


--
-- Name: financial_data financial_data_opportunity_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.financial_data
    ADD CONSTRAINT financial_data_opportunity_id_key UNIQUE (opportunity_id);


--
-- Name: financial_data financial_data_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.financial_data
    ADD CONSTRAINT financial_data_pkey PRIMARY KEY (financial_id);


--
-- Name: financing_models financing_models_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.financing_models
    ADD CONSTRAINT financing_models_pkey PRIMARY KEY (financing_model_id);


--
-- Name: infrastructure_types infrastructure_types_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.infrastructure_types
    ADD CONSTRAINT infrastructure_types_pkey PRIMARY KEY (infrastructure_type_id);


--
-- Name: investment_opportunities investment_opportunities_opportunity_code_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.investment_opportunities
    ADD CONSTRAINT investment_opportunities_opportunity_code_key UNIQUE (opportunity_code);


--
-- Name: investment_opportunities investment_opportunities_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.investment_opportunities
    ADD CONSTRAINT investment_opportunities_pkey PRIMARY KEY (opportunity_id);


--
-- Name: investor_types investor_types_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.investor_types
    ADD CONSTRAINT investor_types_pkey PRIMARY KEY (investor_type_id);


--
-- Name: locations locations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_pkey PRIMARY KEY (location_id);


--
-- Name: opportunity_approvals opportunity_approvals_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.opportunity_approvals
    ADD CONSTRAINT opportunity_approvals_pkey PRIMARY KEY (opportunity_approval_id);


--
-- Name: opportunity_attachments opportunity_attachments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.opportunity_attachments
    ADD CONSTRAINT opportunity_attachments_pkey PRIMARY KEY (opportunity_attachment_id);


--
-- Name: opportunity_contracts opportunity_contracts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.opportunity_contracts
    ADD CONSTRAINT opportunity_contracts_pkey PRIMARY KEY (opportunity_contract_id);


--
-- Name: opportunity_entities opportunity_entities_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.opportunity_entities
    ADD CONSTRAINT opportunity_entities_pkey PRIMARY KEY (opportunity_entity_id);


--
-- Name: opportunity_infrastructure opportunity_infrastructure_opportunity_id_infrastructure_ty_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.opportunity_infrastructure
    ADD CONSTRAINT opportunity_infrastructure_opportunity_id_infrastructure_ty_key UNIQUE (opportunity_id, infrastructure_type_id);


--
-- Name: opportunity_infrastructure opportunity_infrastructure_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.opportunity_infrastructure
    ADD CONSTRAINT opportunity_infrastructure_pkey PRIMARY KEY (opportunity_infrastructure_id);


--
-- Name: opportunity_investors opportunity_investors_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.opportunity_investors
    ADD CONSTRAINT opportunity_investors_pkey PRIMARY KEY (opportunity_investor_id);


--
-- Name: opportunity_site_features opportunity_site_features_opportunity_id_site_feature_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.opportunity_site_features
    ADD CONSTRAINT opportunity_site_features_opportunity_id_site_feature_id_key UNIQUE (opportunity_id, site_feature_id);


--
-- Name: opportunity_site_features opportunity_site_features_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.opportunity_site_features
    ADD CONSTRAINT opportunity_site_features_pkey PRIMARY KEY (opportunity_site_feature_id);


--
-- Name: opportunity_statuses opportunity_statuses_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.opportunity_statuses
    ADD CONSTRAINT opportunity_statuses_pkey PRIMARY KEY (status_id);


--
-- Name: ownership_types ownership_types_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ownership_types
    ADD CONSTRAINT ownership_types_pkey PRIMARY KEY (ownership_id);


--
-- Name: project_details project_details_opportunity_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_details
    ADD CONSTRAINT project_details_opportunity_id_key UNIQUE (opportunity_id);


--
-- Name: project_details project_details_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_details
    ADD CONSTRAINT project_details_pkey PRIMARY KEY (project_detail_id);


--
-- Name: project_scales project_scales_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_scales
    ADD CONSTRAINT project_scales_pkey PRIMARY KEY (project_scale_id);


--
-- Name: project_types project_types_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_types
    ADD CONSTRAINT project_types_pkey PRIMARY KEY (project_type_id);


--
-- Name: sectors sectors_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sectors
    ADD CONSTRAINT sectors_pkey PRIMARY KEY (sector_id);


--
-- Name: site_features site_features_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.site_features
    ADD CONSTRAINT site_features_pkey PRIMARY KEY (feature_id);


--
-- Name: sub_sectors sub_sectors_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sub_sectors
    ADD CONSTRAINT sub_sectors_pkey PRIMARY KEY (sub_sector_id);


--
-- Name: administrative_units administrative_units_parent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.administrative_units
    ADD CONSTRAINT administrative_units_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.administrative_units(administrative_unit_id);


--
-- Name: administrative_units administrative_units_unit_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.administrative_units
    ADD CONSTRAINT administrative_units_unit_type_id_fkey FOREIGN KEY (unit_type_id) REFERENCES public.administrative_unit_types(unit_type_id);


--
-- Name: employment employment_opportunity_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.employment
    ADD CONSTRAINT employment_opportunity_id_fkey FOREIGN KEY (opportunity_id) REFERENCES public.investment_opportunities(opportunity_id);


--
-- Name: entities entities_entity_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.entities
    ADD CONSTRAINT entities_entity_type_id_fkey FOREIGN KEY (entity_type_id) REFERENCES public.entity_types(entity_type_id);


--
-- Name: financial_data financial_data_currency_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.financial_data
    ADD CONSTRAINT financial_data_currency_id_fkey FOREIGN KEY (currency_id) REFERENCES public.currencies(currency_id);


--
-- Name: financial_data financial_data_financing_model_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.financial_data
    ADD CONSTRAINT financial_data_financing_model_id_fkey FOREIGN KEY (financing_model_id) REFERENCES public.financing_models(financing_model_id);


--
-- Name: financial_data financial_data_opportunity_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.financial_data
    ADD CONSTRAINT financial_data_opportunity_id_fkey FOREIGN KEY (opportunity_id) REFERENCES public.investment_opportunities(opportunity_id);


--
-- Name: investment_opportunities investment_opportunities_contract_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.investment_opportunities
    ADD CONSTRAINT investment_opportunities_contract_type_id_fkey FOREIGN KEY (contract_type_id) REFERENCES public.contract_types(contract_type_id);


--
-- Name: investment_opportunities investment_opportunities_investor_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.investment_opportunities
    ADD CONSTRAINT investment_opportunities_investor_type_id_fkey FOREIGN KEY (investor_type_id) REFERENCES public.investor_types(investor_type_id);


--
-- Name: investment_opportunities investment_opportunities_ownership_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.investment_opportunities
    ADD CONSTRAINT investment_opportunities_ownership_id_fkey FOREIGN KEY (ownership_id) REFERENCES public.ownership_types(ownership_id);


--
-- Name: investment_opportunities investment_opportunities_project_scale_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.investment_opportunities
    ADD CONSTRAINT investment_opportunities_project_scale_id_fkey FOREIGN KEY (project_scale_id) REFERENCES public.project_scales(project_scale_id);


--
-- Name: investment_opportunities investment_opportunities_project_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.investment_opportunities
    ADD CONSTRAINT investment_opportunities_project_type_id_fkey FOREIGN KEY (project_type_id) REFERENCES public.project_types(project_type_id);


--
-- Name: investment_opportunities investment_opportunities_provider_entity_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.investment_opportunities
    ADD CONSTRAINT investment_opportunities_provider_entity_id_fkey FOREIGN KEY (provider_entity_id) REFERENCES public.entities(entity_id);


--
-- Name: investment_opportunities investment_opportunities_sector_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.investment_opportunities
    ADD CONSTRAINT investment_opportunities_sector_id_fkey FOREIGN KEY (sector_id) REFERENCES public.sectors(sector_id);


--
-- Name: investment_opportunities investment_opportunities_status_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.investment_opportunities
    ADD CONSTRAINT investment_opportunities_status_id_fkey FOREIGN KEY (status_id) REFERENCES public.opportunity_statuses(status_id);


--
-- Name: investment_opportunities investment_opportunities_sub_sector_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.investment_opportunities
    ADD CONSTRAINT investment_opportunities_sub_sector_id_fkey FOREIGN KEY (sub_sector_id) REFERENCES public.sub_sectors(sub_sector_id);


--
-- Name: locations locations_administrative_unit_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_administrative_unit_id_fkey FOREIGN KEY (administrative_unit_id) REFERENCES public.administrative_units(administrative_unit_id);


--
-- Name: locations locations_area_unit_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_area_unit_id_fkey FOREIGN KEY (area_unit_id) REFERENCES public.area_units(area_unit_id);


--
-- Name: locations locations_opportunity_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_opportunity_id_fkey FOREIGN KEY (opportunity_id) REFERENCES public.investment_opportunities(opportunity_id);


--
-- Name: locations locations_ownership_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_ownership_id_fkey FOREIGN KEY (ownership_id) REFERENCES public.ownership_types(ownership_id);


--
-- Name: opportunity_approvals opportunity_approvals_approval_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.opportunity_approvals
    ADD CONSTRAINT opportunity_approvals_approval_type_id_fkey FOREIGN KEY (approval_type_id) REFERENCES public.approval_types(approval_type_id);


--
-- Name: opportunity_approvals opportunity_approvals_issuing_entity_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.opportunity_approvals
    ADD CONSTRAINT opportunity_approvals_issuing_entity_id_fkey FOREIGN KEY (issuing_entity_id) REFERENCES public.entities(entity_id);


--
-- Name: opportunity_approvals opportunity_approvals_opportunity_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.opportunity_approvals
    ADD CONSTRAINT opportunity_approvals_opportunity_id_fkey FOREIGN KEY (opportunity_id) REFERENCES public.investment_opportunities(opportunity_id);


--
-- Name: opportunity_attachments opportunity_attachments_attachment_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.opportunity_attachments
    ADD CONSTRAINT opportunity_attachments_attachment_type_id_fkey FOREIGN KEY (attachment_type_id) REFERENCES public.attachment_types(attachment_type_id);


--
-- Name: opportunity_attachments opportunity_attachments_opportunity_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.opportunity_attachments
    ADD CONSTRAINT opportunity_attachments_opportunity_id_fkey FOREIGN KEY (opportunity_id) REFERENCES public.investment_opportunities(opportunity_id);


--
-- Name: opportunity_contracts opportunity_contracts_contract_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.opportunity_contracts
    ADD CONSTRAINT opportunity_contracts_contract_type_id_fkey FOREIGN KEY (contract_type_id) REFERENCES public.contract_types(contract_type_id);


--
-- Name: opportunity_contracts opportunity_contracts_opportunity_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.opportunity_contracts
    ADD CONSTRAINT opportunity_contracts_opportunity_id_fkey FOREIGN KEY (opportunity_id) REFERENCES public.investment_opportunities(opportunity_id);


--
-- Name: opportunity_entities opportunity_entities_entity_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.opportunity_entities
    ADD CONSTRAINT opportunity_entities_entity_id_fkey FOREIGN KEY (entity_id) REFERENCES public.entities(entity_id);


--
-- Name: opportunity_entities opportunity_entities_opportunity_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.opportunity_entities
    ADD CONSTRAINT opportunity_entities_opportunity_id_fkey FOREIGN KEY (opportunity_id) REFERENCES public.investment_opportunities(opportunity_id);


--
-- Name: opportunity_entities opportunity_entities_relation_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.opportunity_entities
    ADD CONSTRAINT opportunity_entities_relation_type_id_fkey FOREIGN KEY (relation_type_id) REFERENCES public.entity_relation_types(relation_type_id);


--
-- Name: opportunity_infrastructure opportunity_infrastructure_infrastructure_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.opportunity_infrastructure
    ADD CONSTRAINT opportunity_infrastructure_infrastructure_type_id_fkey FOREIGN KEY (infrastructure_type_id) REFERENCES public.infrastructure_types(infrastructure_type_id);


--
-- Name: opportunity_infrastructure opportunity_infrastructure_opportunity_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.opportunity_infrastructure
    ADD CONSTRAINT opportunity_infrastructure_opportunity_id_fkey FOREIGN KEY (opportunity_id) REFERENCES public.investment_opportunities(opportunity_id);


--
-- Name: opportunity_investors opportunity_investors_entity_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.opportunity_investors
    ADD CONSTRAINT opportunity_investors_entity_id_fkey FOREIGN KEY (entity_id) REFERENCES public.entities(entity_id);


--
-- Name: opportunity_investors opportunity_investors_investor_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.opportunity_investors
    ADD CONSTRAINT opportunity_investors_investor_type_id_fkey FOREIGN KEY (investor_type_id) REFERENCES public.investor_types(investor_type_id);


--
-- Name: opportunity_investors opportunity_investors_opportunity_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.opportunity_investors
    ADD CONSTRAINT opportunity_investors_opportunity_id_fkey FOREIGN KEY (opportunity_id) REFERENCES public.investment_opportunities(opportunity_id);


--
-- Name: opportunity_site_features opportunity_site_features_opportunity_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.opportunity_site_features
    ADD CONSTRAINT opportunity_site_features_opportunity_id_fkey FOREIGN KEY (opportunity_id) REFERENCES public.investment_opportunities(opportunity_id);


--
-- Name: opportunity_site_features opportunity_site_features_site_feature_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.opportunity_site_features
    ADD CONSTRAINT opportunity_site_features_site_feature_id_fkey FOREIGN KEY (site_feature_id) REFERENCES public.site_features(feature_id);


--
-- Name: project_details project_details_capacity_unit_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_details
    ADD CONSTRAINT project_details_capacity_unit_id_fkey FOREIGN KEY (capacity_unit_id) REFERENCES public.capacity_units(capacity_unit_id);


--
-- Name: project_details project_details_opportunity_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_details
    ADD CONSTRAINT project_details_opportunity_id_fkey FOREIGN KEY (opportunity_id) REFERENCES public.investment_opportunities(opportunity_id);


--
-- Name: sub_sectors sub_sectors_sector_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sub_sectors
    ADD CONSTRAINT sub_sectors_sector_id_fkey FOREIGN KEY (sector_id) REFERENCES public.sectors(sector_id);


--
-- PostgreSQL database dump complete
--

\unrestrict ePpPwRdoLYPuftUq5lemYrwesuG6zt9OiicNb2jgbtgio7d3kDVLJVv5Yv2sqws

