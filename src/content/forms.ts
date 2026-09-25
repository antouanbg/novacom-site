// Quote form delivery. Static hosting has no backend, so the form can post to a Google Form
// (which emails the owner on every response) and falls back to a prepared mailto: message.
//
// To switch on Google Forms: create the form, open its "Get pre-filled link", fill every field,
// copy the link and paste the entry IDs below; `action` is the form URL with /viewform → /formResponse.
export const GOOGLE_FORM: { action: string | null; fields: Record<string, string> } = {
  action: "https://docs.google.com/forms/d/e/1FAIpQLScCHszsjkMAQs-vkBvDdfyyhx5U854bTsSxAMUrMIhqITdJWA/formResponse", // e.g. "https://docs.google.com/forms/d/e/1FAIpQLSd.../formResponse"
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
