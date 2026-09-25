// Quote form delivery. Static hosting has no backend, so the form talks to a small Apps Script
// web app in the company Google account (antouan@novacom.bg): it emails the client a confirmation
// (BCC to the company), archives the request in a Google Form and answers {ok:true|false}, which the
// site turns into a success / failure message. If the endpoint cannot be reached at all, the form
// falls back to posting straight into the Google Form (opaque response) and, last, to mailto:.
//
// Apps Script project: "novacom.bg – формуляр за оферта (потвърждение до клиента)" (script.google.com,
// account antouan@novacom.bg). Redeploy there → new /exec URL → paste it into `endpoint`.
export const QUOTE_ENDPOINT = "https://script.google.com/macros/s/AKfycbx_lVXb4dtiIxZ6WHTq0s5lQElprCsq4IS8nF_AoJgvucRW18NUUOVsDicswBdsq4BU/exec";

// Google Form "Запитване за оферта – novacom.bg" (same account): used as the archive and as the fallback.
export const GOOGLE_FORM: { action: string | null; fields: Record<string, string> } = {
  action: "https://docs.google.com/forms/d/e/1FAIpQLScCHszsjkMAQs-vkBvDdfyyhx5U854bTsSxAMUrMIhqITdJWA/formResponse",
  fields: {
    name: "entry.1298751419",
    company: "entry.1463422895",
    phone: "entry.1823270845",
    email: "entry.1647993926",
    siteType: "entry.1058468082",
    battery: "entry.1904327791",
    kwp: "entry.229808046",
    location: "entry.260716136",
    message: "entry.146649814",
  },
};
