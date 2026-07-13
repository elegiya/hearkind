export const PRIVACY_NOTICE_VERSION = "2026-07-13";
export const LEGAL_LAST_UPDATED = "13 July 2026";

export const legalConfig = {
  controllerName:
    process.env.NEXT_PUBLIC_LEGAL_CONTROLLER_NAME || "Maryna Gaponova",
  contactEmail:
    process.env.NEXT_PUBLIC_LEGAL_CONTACT_EMAIL || "support@hearkind.app",
  operatorCountry: process.env.NEXT_PUBLIC_LEGAL_OPERATOR_COUNTRY || "",
  professionalAddress: process.env.NEXT_PUBLIC_LEGAL_ADDRESS || "",
  taxId: process.env.NEXT_PUBLIC_LEGAL_TAX_ID || "",
  registrationDetails:
    process.env.NEXT_PUBLIC_LEGAL_REGISTRATION_DETAILS || "",
  siteUrl: "https://hearkind.app",
  waitlistRetentionMonthsAfterLaunch: 12,
  analyticsRetentionMonths: 12,
  consentPreferenceMonths: 6,
} as const;
