// Quote form delivery. Static hosting has no backend, so the form can post to a Google Form
// (which emails the owner on every response) and falls back to a prepared mailto: message.
//
// To switch on Google Forms: create the form, open its "Get pre-filled link", fill every field,
// copy the link and paste the entry IDs below; `action` is the form URL with /viewform → /formResponse.
export const GOOGLE_FORM: { action: string | null; fields: Record<string, string> } = {
  action: null, // e.g. "https://docs.google.com/forms/d/e/1FAIpQLSd.../formResponse"
  fields: {
    name: "entry.0000000001",
    company: "entry.0000000002",
    phone: "entry.0000000003",
    email: "entry.0000000004",
    siteType: "entry.0000000005",
    battery: "entry.0000000006",
    kwp: "entry.0000000007",
    location: "entry.0000000008",
    message: "entry.0000000009",
  },
};
